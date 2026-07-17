import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth-helpers';

/**
 * POST — Upload an image to Supabase Storage and create a media_assets record.
 * Accepts multipart/form-data with: file, section
 */
export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if ('error' in auth) return auth.error;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const section = (formData.get('section') as string) || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
    const ext = fileName.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const storagePath = `${section}/${timestamp}-${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
      gif: 'image/gif', svg: 'image/svg+xml', webp: 'image/webp',
      mp4: 'video/mp4', webm: 'video/webm',
    };
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    const supabase = getServerSupabase();

    // Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(storagePath, fileBuffer, { contentType: mimeType, upsert: true });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(storagePath);
    const publicUrl = urlData.publicUrl;

    // Insert into media_assets
    const { data, error: dbError } = await supabase
      .from('media_assets')
      .insert({
        section,
        filename: fileName,
        storage_path: storagePath,
        public_url: publicUrl,
        alt_text: fileName.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
        mime_type: mimeType,
        file_size: fileBuffer.length,
        uploaded_by: 'admin',
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, media: data, url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}