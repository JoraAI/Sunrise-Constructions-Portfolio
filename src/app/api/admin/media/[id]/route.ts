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

const PLACEHOLDER = '/images/placeholder.svg';

/** Replace image references with placeholder in all content tables */
async function replaceWithPlaceholder(
  supabase: ReturnType<typeof getServerSupabase>,
  storagePath: string,
  publicUrl: string,
) {
  const terms = [storagePath, publicUrl];
  const tables = [
    'content_projects', 'content_services', 'content_industries',
    'content_team', 'content_testimonials', 'content_blog_posts',
  ];

  for (const table of tables) {
    const { data } = await supabase.from(table).select('*');
    if (data) {
      for (const row of data as Record<string, unknown>[]) {
        const image = String(row.image || '');
        const gallery = String(row.gallery || '');
        if (terms.some(t => image.includes(t) || gallery.includes(t))) {
          const updates: Record<string, unknown> = {};
          if (image && terms.some(t => image.includes(t))) updates.image = PLACEHOLDER;
          if (gallery && terms.some(t => gallery.includes(t))) {
            try {
              const arr = JSON.parse(gallery) as string[];
              updates.gallery = JSON.stringify(arr.map(g => terms.some(t => g.includes(t)) ? PLACEHOLDER : g));
            } catch { /* ignore */ }
          }
          if (Object.keys(updates).length > 0) {
            await supabase.from(table).update(updates).eq('id', row.id);
          }
        }
      }
    }
  }
}

/**
 * DELETE — Remove a media asset from Storage and database.
 * If the image is in use, replaces references with placeholder.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = await requireAuth(req);
  if ('error' in auth) return auth.error;

  try {
    const supabase = getServerSupabase();

    const { data: record } = await supabase
      .from('media_assets')
      .select('storage_path, public_url')
      .eq('id', params.id)
      .single();

    if (!record) return NextResponse.json({ error: 'Media not found' }, { status: 404 });

    // Replace references with placeholder before deleting
    await replaceWithPlaceholder(supabase, record.storage_path, record.public_url);

    // Delete from Storage
    await supabase.storage.from(BUCKET_NAME).remove([record.storage_path]);

    // Delete from database
    await supabase.from('media_assets').delete().eq('id', params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Media delete error:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
