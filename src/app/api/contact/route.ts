import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { escapeHtml, sendStaffEmail } from '@/lib/email';
import { isValidEmail, isValidPhone } from '@/lib/form-validation';

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
      } else {
        submissionId = data?.id;
      }
    } catch (err) {
      console.error('Contact DB exception:', err);
    }

    const emailResult = await sendStaffEmail({
      subject: `New Quote Request — ${name}${company ? ` (${company})` : ''}`,
      replyTo: email,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0b1b33">
          <h2 style="margin:0 0 12px">New Quote / Contact Request</h2>
          <p style="margin:0 0 16px;color:#5c6b7a">Submitted via the website contact form.</p>
          <table style="border-collapse:collapse;width:100%;max-width:560px">
            <tr><td style="padding:6px 0;font-weight:bold;width:140px">Name</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Email</td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Phone</td><td>${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Company</td><td>${escapeHtml(company || '—')}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Service</td><td>${escapeHtml(service || '—')}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Submission ID</td><td>${escapeHtml(submissionId || 'N/A')}</td></tr>
          </table>
          <h3 style="margin:20px 0 8px">Project details</h3>
          <blockquote style="margin:0;padding:12px 16px;background:#f7f3ea;border-left:3px solid #f5a623;white-space:pre-wrap">${escapeHtml(message)}</blockquote>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb" />
          <p style="font-size:13px;color:#5c6b7a">Reply directly to this email to respond to the visitor.</p>
        </div>
      `,
    });

    if (!submissionId && !emailResult.ok && !emailResult.skipped) {
      return NextResponse.json(
        { error: 'Unable to submit your request right now. Please email info@sunrisegroupltd.in.' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      id: submissionId,
      emailed: emailResult.ok,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to submit contact form.' }, { status: 500 });
  }
}
