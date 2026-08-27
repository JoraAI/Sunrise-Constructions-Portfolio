import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import {
  newsletterSignupEmailHtml,
  sendStaffEmail,
  type StaffEmailResult,
} from '@/lib/email';
import { isValidEmail } from '@/lib/form-validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    let subscriberId: string | undefined;
    let alreadySubscribed = false;

    try {
      const supabase = getServerSupabase();
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email })
        .select('id')
        .single();

      if (error) {
        if (error.code === '23505' || /duplicate|unique/i.test(error.message)) {
          alreadySubscribed = true;
        } else {
          console.error('Newsletter DB error:', error);
          return NextResponse.json(
            { error: 'Unable to subscribe right now. Please try again later.' },
            { status: 502 },
          );
        }
      } else {
        subscriberId = data?.id;
      }
    } catch (err) {
      console.error('Newsletter DB exception:', err);
      return NextResponse.json(
        { error: 'Unable to subscribe right now. Please try again later.' },
        { status: 502 },
      );
    }

    let emailResult: StaffEmailResult = { ok: false, skipped: true };

    if (!alreadySubscribed) {
      emailResult = await sendStaffEmail({
        subject: `New Newsletter Subscriber — ${email}`,
        replyTo: email,
        html: newsletterSignupEmailHtml({ email, subscriberId }),
      });
    }

    return NextResponse.json({
      ok: true,
      id: subscriberId,
      alreadySubscribed,
      emailed: alreadySubscribed ? false : emailResult.ok,
      emailError: alreadySubscribed || emailResult.ok ? undefined : emailResult.error,
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json({ error: 'Failed to subscribe.' }, { status: 500 });
  }
}
