import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth-helpers';

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
 * PATCH — Update a content item by ID.
 * URL: /api/admin/content/[type]/[id]
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { type: string; id: string } },
) {
  const auth = await requireAuth(req);
  if ('error' in auth) return auth.error;

  const table = TABLE_MAP[params.type];
  if (!table) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  try {
    const body = await req.json();

    // Serialize JSONB fields
    const fieldsToSerialize = ['gallery', 'scope', 'metrics', 'key_deliverables', 'process', 'capabilities', 'tags', 'content', 'responsibilities', 'requirements', 'qualifications', 'stats', 'about_body', 'certifications', 'process_steps'];
    const updates: Record<string, unknown> = { ...body };
    for (const field of fieldsToSerialize) {
      if (updates[field] !== undefined && typeof updates[field] !== 'string') {
        updates[field] = JSON.stringify(updates[field]);
      }
    }
    updates.updated_at = new Date().toISOString();

    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: data });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

/**
 * DELETE — Remove a content item by ID.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { type: string; id: string } },
) {
  const auth = await requireAuth(req);
  if ('error' in auth) return auth.error;

  const table = TABLE_MAP[params.type];
  if (!table) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  try {
    const supabase = getServerSupabase();
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Content delete error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}