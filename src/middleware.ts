import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

const ACCESS_TOKEN_COOKIE = 'sunrise_admin_token';
const ADMIN_PATH = '/admin';
const LOGIN_PATH = '/admin/login';

/**
 * Protects all /admin/* routes.
 * Checks for valid Supabase session via custom access token cookie.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Set x-pathname header so the root layout can detect admin routes
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // Allow the login page itself
  if (pathname === LOGIN_PATH) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Only protect /admin routes
  if (!pathname.startsWith(ADMIN_PATH)) {
    return NextResponse.next();
  }

  // Check session cookie
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const { valid } = await verifySession(accessToken);

  if (!valid) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/admin/:path*'],
};