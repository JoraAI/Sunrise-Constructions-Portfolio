import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth-helpers';

/**
 * GET — Check which CMS items are using a specific media asset.
 * URL: /api/admin/media/[id]/usage
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = await requireAuth(req);
  if ('error' in auth) return auth.error;

  try {
    const supabase = getServerSupabase();

    const { data: media } = await supabase
      .from('media_assets')
      .select('public_url, storage_path')
      .eq('id', params.id)
      .single();

    if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const terms = [media.public_url, media.storage_path];
    const usage: { type: string; id: string; title: string }[] = [];

    const tables: { table: string; label: string; col: string }[] = [
      { table: 'content_projects', label: 'Project', col: 'title' },
      { table: 'content_services', label: 'Service', col: 'title' },
      { table: 'content_industries', label: 'Industry', col: 'title' },
      { table: 'content_team', label: 'Team Member', col: 'name' },
      { table: 'content_testimonials', label: 'Testimonial', col: 'name' },
      { table: 'content_blog_posts', label: 'Blog Post', col: 'title' },
    ];

    for (const { table, label, col } of tables) {
      const { data } = await supabase.from(table).select('*');
      if (data) {
        for (const row of data as Record<string, unknown>[]) {
          const image = String(row.image || '');
          const gallery = String(row.gallery || '');
          const checkStr = `${image} ${gallery}`;
          if (terms.some(t => checkStr.includes(t))) {
            usage.push({ type: label, id: String(row.id), title: String(row[col] || '') });
          }
        }
      }
    }

    return NextResponse.json({ usage, inUse: usage.length > 0 });
  } catch (error) {
    console.error('Usage check error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}