import { NextResponse } from 'next/server';

const ACCESS_TOKEN_COOKIE = 'sunrise_admin_token';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  return response;
}