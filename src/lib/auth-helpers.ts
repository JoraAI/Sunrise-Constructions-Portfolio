import { NextRequest, NextResponse } from 'next/server';
import { verifySession, type UserRole } from './auth';

const ACCESS_TOKEN_COOKIE = 'sunrise_admin_token';

/**
 * Require authentication for an API route.
 * Returns the user if valid, or a 401 response if not.
 */
export async function requireAuth(req: NextRequest): Promise<{
  user: { id: string; email: string; role: UserRole };
} | {
  error: NextResponse;
}> {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const { valid, user } = await verifySession(accessToken);

  if (!valid || !user) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { user };
}

/**
 * Require super_admin role for an API route.
 * Returns the user if they're a super admin, or a 403 response if not.
 */
export async function requireSuperAdmin(req: NextRequest): Promise<{
  user: { id: string; email: string; role: UserRole };
} | {
  error: NextResponse;
}> {
  const auth = await requireAuth(req);
  if ('error' in auth) return auth;

  if (auth.user.role !== 'super_admin') {
    return {
      error: NextResponse.json({ error: 'Super admin access required' }, { status: 403 }),
    };
  }

  return auth;
}