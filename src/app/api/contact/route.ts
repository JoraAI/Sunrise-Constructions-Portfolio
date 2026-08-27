import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { quoteRequestEmailHtml, sendStaffEmail } from '@/lib/email';
import { isValidEmail, isValidPhone } from '@/lib/form-validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const company = String(body.company || '').trim();
    const service = String(body.service || '').trim();
    const message = String(body.message || '').trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }
    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Please provide a valid phone number (10+ digits).' },
        { status: 400 },
      );
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: 'Please share a short project description (at least 10 characters).' },
        { status: 400 },
      );
    }

    let submissionId: string | undefined;
    let dbErrorMessage: string | undefined;

    try {
      const supabase = getServerSupabase();
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert({
          name,
          email,
          phone,
          company: company || null,
          project_type: service || null,
          message,
          status: 'new',
        })
        .select('id')
        .single();

      if (error) {
        console.error('Contact DB error:', error);
        dbErrorMessage = error.message;
      } else {
        submissionId = data?.id;
      }
    } catch (err) {
      console.error('Contact DB exception:', err);
      dbErrorMessage = err instanceof Error ? err.message : 'Database error';
    }

    const emailResult = await sendStaffEmail({
      subject: `New Quote Request — ${name}${company ? ` (${company})` : ''}`,
      replyTo: email,
      html: quoteRequestEmailHtml({
        name,
        email,
        phone,
        company,
        service,
        message,
        submissionId,
      }),
    });

    if (!submissionId && !emailResult.ok) {
      return NextResponse.json(
        {
          error:
            emailResult.error ||
            dbErrorMessage ||
            'Unable to submit your request right now. Please email info@sunrisegroupltd.in.',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      id: submissionId,
      emailed: emailResult.ok,
      emailError: emailResult.ok ? undefined : emailResult.error,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to submit contact form.' }, { status: 500 });
  }
}
