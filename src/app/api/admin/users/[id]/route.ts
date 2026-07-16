import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/auth-helpers';

/**
 * PATCH — Update user role or name (super_admin only).
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = await requireSuperAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const body = await req.json();
    const updates: Record<string, string> = {};
    if (body.role) updates.role = body.role;
    if (body.full_name !== undefined) updates.full_name = body.full_name;

    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from('user_roles')
      .update(updates)
      .eq('user_id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: data });
  } catch (error) {
    console.error('User update error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

/**
 * DELETE — Remove an admin user (super_admin only).
 * Deletes from auth.users (cascades to user_roles).
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = await requireSuperAdmin(req);
  if ('error' in auth) return auth.error;

  // Prevent self-deletion
  if (params.id === auth.user.id) {
    return NextResponse.json(
      { error: 'You cannot delete your own account' },
      { status: 400 },
    );
  }

  try {
    const supabase = getServerSupabase();
    const { error } = await supabase.auth.admin.deleteUser(params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('User delete error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}