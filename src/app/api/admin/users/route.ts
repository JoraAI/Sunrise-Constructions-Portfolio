import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/auth-helpers';

/**
 * GET — List all admin users (super_admin only).
 */
export async function GET(req: NextRequest) {
  const auth = await requireSuperAdmin(req);
  if ('error' in auth) return auth.error;

  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from('user_roles')
    .select('user_id, email, role, full_name, created_at')
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ users: data || [] });
}

/**
 * POST — Create a new admin user (super_admin only).
 * Creates auth user + assigns role.
 */
export async function POST(req: NextRequest) {
  const auth = await requireSuperAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const { email, password, fullName, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 },
      );
    }

    const supabase = getServerSupabase();

    // 1. Create the auth user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName || '' },
    });

    if (createError) {
      return NextResponse.json(
        { error: createError.message },
        { status: 400 },
      );
    }

    // 2. Update the role (trigger already created default 'admin' entry)
    const assignedRole = role === 'super_admin' ? 'super_admin' : 'admin';
    const { error: roleError } = await supabase
      .from('user_roles')
      .update({ role: assignedRole, full_name: fullName || '' })
      .eq('user_id', newUser.user.id);

    if (roleError) {
      console.error('Role assignment error:', roleError);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.user.id,
        email: newUser.user.email,
        role: assignedRole,
        full_name: fullName || '',
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}