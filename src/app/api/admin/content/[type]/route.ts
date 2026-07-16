import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth-helpers';

/**
 * Maps content type slugs to their database table names.
 */
const TABLE_MAP: Record<string, string> = {
  projects: 'content_projects',
  services: 'content_services',
  industries: 'content_industries',
  team: 'content_team',
  testimonials: 'content_testimonials',
  blog: 'content_blog_posts',
  jobs: 'content_job_listings',
};

/**
 * GET — List all items for a content type.
 * URL: /api/admin/content/[type]
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { type: string } },
) {
  const auth = await requireAuth(req);
  if ('error' in auth) return auth.error;

  const table = TABLE_MAP[params.type];
  if (!table) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data || [] });
}

/**
 * POST — Create a new content item.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { type: string } },
) {
  const auth = await requireAuth(req);
  if ('error' in auth) return auth.error;

  const table = TABLE_MAP[params.type];
  if (!table) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  try {
    const body = await req.json();

    // Convert JSONB arrays/objects to JSON strings for Supabase
    const fieldsToSerialize = ['gallery', 'scope', 'metrics', 'key_deliverables', 'process', 'capabilities', 'tags', 'content', 'responsibilities', 'requirements', 'qualifications', 'stats', 'about_body', 'certifications', 'process_steps'];
    const row: Record<string, unknown> = { ...body };
    for (const field of fieldsToSerialize) {
      if (row[field] && typeof row[field] !== 'string') {
        row[field] = JSON.stringify(row[field]);
      }
    }

    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from(table)
      .insert(row)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: data });
  } catch (error) {
    console.error('Content create error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}