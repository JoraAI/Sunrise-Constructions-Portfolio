import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth-helpers';

const BUCKET_NAME = 'media';

/**
 * PATCH — Update alt_text or section for a media asset.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = await requireAuth(req);
  if ('error' in auth) return auth.error;

  try {
    const body = await req.json();
    const updates: Record<string, string> = {};
    if (body.alt_text !== undefined) updates.alt_text = body.alt_text;
    if (body.section !== undefined) updates.section = body.section;
    updates.updated_at = new Date().toISOString();

    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from('media_assets')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, media: data });
  } catch (error) {
    console.error('Media update error:', error);
    return NextResponse.json({ error: 'Failed to update media' }, { status: 500 });
  }
}

/**
 * DELETE — Remove a media asset from Storage and database.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = await requireAuth(req);
  if ('error' in auth) return auth.error;

  try {
    const supabase = getServerSupabase();

    // 1. Get the record to find the storage path
    const { data: record, error: fetchError } = await supabase
      .from('media_assets')
      .select('storage_path')
      .eq('id', params.id)
      .single();

    if (fetchError || !record) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // 2. Delete from Storage
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([record.storage_path]);

    if (storageError) {
      console.error('Storage delete error:', storageError);
    }

    // 3. Delete from database
    const { error: dbError } = await supabase
      .from('media_assets')
      .delete()
      .eq('id', params.id);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Media delete error:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}