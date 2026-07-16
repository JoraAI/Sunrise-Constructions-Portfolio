import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';

/**
 * GET — Returns the current user's email and role.
 */
export async function GET(req: Request) {
  const auth = await requireAuth(req as never);
  if ('error' in auth) return auth.error;

  return NextResponse.json({
    email: auth.user.email,
    role: auth.user.role,
  });
}