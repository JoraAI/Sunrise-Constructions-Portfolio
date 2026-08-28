import { NextResponse } from 'next/server';
import {
  getResendFrom,
  getStaffEmail,
  isResendConfigured,
} from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Lightweight check that Resend is configured on this deployment.
 * Does not expose the API key.
 */
export async function GET() {
  return NextResponse.json({
    configured: isResendConfigured(),
    staffEmail: getStaffEmail(),
    from: getResendFrom(),
  });
}
