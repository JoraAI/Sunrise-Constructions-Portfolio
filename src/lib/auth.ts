import { getServerSupabase } from './supabase';

export type UserRole = 'admin' | 'super_admin';

export interface AdminUser {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
}

export const SESSION_COOKIE_NAMES = [
  'sb-access-token',
  'sb-refresh-token',
];

/**
 * Get the current user's role from user_roles table.
 * Called server-side with the service role client (bypasses RLS).
 */
export async function getUserRole(userId: string): Promise<UserRole | null> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();

  return (data?.role as UserRole) || null;
}

/**
 * Get all admin users (for super admin user management page).
 */
export async function getAllAdminUsers(): Promise<AdminUser[]> {
  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from('user_roles')
    .select('user_id, email, role, full_name')
    .order('created_at', { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.user_id,
    email: row.email,
    role: row.role as UserRole,
    full_name: row.full_name,
  }));
}

/**
 * Verify a session by checking the Supabase access token.
 * Used by middleware and API routes.
 */
export async function verifySession(accessToken: string | undefined): Promise<{
  valid: boolean;
  user?: { id: string; email: string; role: UserRole };
}> {
  if (!accessToken) return { valid: false };

  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data.user) return { valid: false };

    const role = await getUserRole(data.user.id);
    if (!role) return { valid: false };

    return {
      valid: true,
      user: {
        id: data.user.id,
        email: data.user.email || '',
        role,
      },
    };
  } catch {
    // Network error (timeout, DNS, etc.) — return invalid instead of crashing
    return { valid: false };
  }
}
