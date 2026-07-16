import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth-helpers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const BUCKET_NAME = 'media';

/**
 * GET — List all media assets, optionally filtered by section.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const section = searchParams.get('section');

  const supabase = getServerSupabase();
  let query = supabase.from('media_assets').select('*').order('created_at', { ascending: false });

  if (section && section !== 'all') {
    query = query.eq('section', section);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ media: data || [] });
}

/**
 * POST — Upload a media file to Supabase Storage and record in DB.
 *
 * Accepts multipart form data:
 *   - file: the media file (image or video)
 *   - section: which website section it belongs to
 *   - alt_text: accessibility text for images
 */
export async function POST(req: NextRequest) {
  // Auth check
  const auth = await requireAuth(req);
  if ('error' in auth) return auth.error;
  const username = auth.user.email;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const section = (formData.get('section') as string) || 'general';
    const altText = (formData.get('alt_text') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || '';
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const storagePath = `${section}/${timestamp}-${safeName}`;

    // Upload to Supabase Storage
    const supabase = getServerSupabase();
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 },
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);

    // Record in database
    const { data: record, error: dbError } = await supabase
      .from('media_assets')
      .insert({
        section,
        filename: file.name,
        storage_path: storagePath,
        public_url: urlData.publicUrl,
        alt_text: altText,
        mime_type: file.type,
        file_size: file.size,
        uploaded_by: username || 'unknown',
      })
      .select()
      .single();

    if (dbError) {
      console.error('DB insert error:', dbError);
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, media: record });
  } catch (error) {
    console.error('Media upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload media' },
      { status: 500 },
    );
  }
}