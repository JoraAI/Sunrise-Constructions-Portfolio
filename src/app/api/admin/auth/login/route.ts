import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { getUserRole } from '@/lib/auth';

const ACCESS_TOKEN_COOKIE = 'sunrise_admin_token';
const SESSION_DURATION = 7 * 24 * 60 * 60; // 7 days

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 },
      );
    }

    const supabase = getServerSupabase();

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user || !data.session) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    // Check if user has admin role
    const role = await getUserRole(data.user.id);
    if (!role) {
      return NextResponse.json(
        { error: 'Account not authorized for admin access' },
        { status: 403 },
      );
    }

    // Set access token in HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      email: data.user.email,
      role,
    });

    response.cookies.set(ACCESS_TOKEN_COOKIE, data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: SESSION_DURATION,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 },
    );
  }
}