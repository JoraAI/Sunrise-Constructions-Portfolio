import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { escapeHtml, sendStaffEmail } from '@/lib/email';
import {
  isAllowedResume,
  isValidEmail,
  isValidPhone,
  MAX_RESUME_BYTES,
  MAX_RESUME_LABEL,
} from '@/lib/form-validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isUploadFile(value: FormDataEntryValue | null): value is File {
  if (!value || typeof value === 'string') return false;
  // Next/Node may expose Blob-like uploads; require name + size + arrayBuffer
  const maybe = value as File;
  return (
    typeof maybe.arrayBuffer === 'function' &&
    typeof maybe.size === 'number' &&
    typeof maybe.name === 'string'
  );
}

export async function POST(req: NextRequest) {
  try {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return NextResponse.json(
        {
          error: `Upload too large or unreadable. Please use a resume under ${MAX_RESUME_LABEL}.`,
        },
        { status: 413 },
      );
    }

    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const experience = String(form.get('experience') || '').trim();
    const coverLetter = String(form.get('coverLetter') || '').trim();
    const jobTitle = String(form.get('jobTitle') || '').trim();
    const jobSlug = String(form.get('jobSlug') || '').trim();
    const resume = form.get('resume');

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
    if (experience) {
      const n = Number(experience);
      if (!Number.isFinite(n) || n < 0 || n > 60) {
        return NextResponse.json(
          { error: 'Enter experience between 0 and 60 years.' },
          { status: 400 },
        );
      }
    }

    if (!isUploadFile(resume) || resume.size === 0) {
      return NextResponse.json({ error: 'Resume / CV is required.' }, { status: 400 });
    }

    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: `Resume must be ${MAX_RESUME_LABEL} or smaller.` },
        { status: 400 },
      );
    }

    if (!isAllowedResume(resume)) {
      return NextResponse.json(
        { error: 'Resume must be a PDF or Word document.' },
        { status: 400 },
      );
    }

    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const resumeFileName = resume.name.replace(/[^\w.\-()+ ]+/g, '_') || 'resume.pdf';

    const coverForDb = [
      experience ? `Years of experience: ${experience}` : '',
      coverLetter,
    ]
      .filter(Boolean)
      .join('\n\n');

    let applicationId: string | undefined;
    let dbErrorMessage: string | undefined;

    try {
      const supabase = getServerSupabase();
      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          job_slug: jobSlug || null,
          job_title: jobTitle || 'Open Application',
          name,
          email,
          phone,
          cover_letter: coverForDb || null,
          resume_url: resumeFileName,
          status: 'new',
        })
        .select('id')
        .single();

      if (error) {
        console.error('Application DB error:', error);
        dbErrorMessage = error.message;
      } else {
        applicationId = data?.id;
      }
    } catch (err) {
      console.error('Application DB exception:', err);
      dbErrorMessage = err instanceof Error ? err.message : 'Database error';
    }

    const roleLabel = jobTitle || 'Open Application';
    const emailResult = await sendStaffEmail({
      subject: `New Job Application — ${name} (${roleLabel})`,
      replyTo: email,
      attachments: [{ filename: resumeFileName, content: resumeBuffer }],
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0b1b33">
          <h2 style="margin:0 0 12px">New Career Application</h2>
          <p style="margin:0 0 16px;color:#5c6b7a">Submitted via the website careers form.</p>
          <table style="border-collapse:collapse;width:100%;max-width:560px">
            <tr><td style="padding:6px 0;font-weight:bold;width:140px">Name</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Email</td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Phone</td><td>${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Role</td><td>${escapeHtml(roleLabel)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Job slug</td><td>${escapeHtml(jobSlug || '—')}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Experience</td><td>${escapeHtml(experience || '—')}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Resume</td><td>${escapeHtml(resumeFileName)} (attached)</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold">Application ID</td><td>${escapeHtml(applicationId || 'N/A')}</td></tr>
          </table>
          <h3 style="margin:20px 0 8px">Cover letter</h3>
          <blockquote style="margin:0;padding:12px 16px;background:#f7f3ea;border-left:3px solid #f5a623;white-space:pre-wrap">${escapeHtml(coverLetter || '—')}</blockquote>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb" />
          <p style="font-size:13px;color:#5c6b7a">Reply directly to this email to contact the applicant.</p>
        </div>
      `,
    });

    // If attachment send fails (size/provider), retry once without attachment so staff still gets notified
    let finalEmail = emailResult;
    if (!emailResult.ok && !emailResult.skipped && resumeBuffer.length > 0) {
      finalEmail = await sendStaffEmail({
        subject: `New Job Application — ${name} (${roleLabel}) [resume attach failed]`,
        replyTo: email,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0b1b33">
            <h2>New Career Application</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Role:</strong> ${escapeHtml(roleLabel)}</p>
            <p><strong>Resume file:</strong> ${escapeHtml(resumeFileName)} (attachment could not be delivered — ask applicant to resend CV)</p>
            <p><strong>Application ID:</strong> ${escapeHtml(applicationId || 'N/A')}</p>
            <blockquote style="white-space:pre-wrap">${escapeHtml(coverLetter || '—')}</blockquote>
          </div>
        `,
      });
    }

    if (!applicationId && !finalEmail.ok) {
      return NextResponse.json(
        {
          error:
            finalEmail.error ||
            dbErrorMessage ||
            'Unable to submit your application right now. Please email info@sunrisegroupltd.in.',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      id: applicationId,
      emailed: finalEmail.ok,
      emailError: finalEmail.ok ? undefined : finalEmail.error,
    });
  } catch (error) {
    console.error('Careers apply API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to submit application.';
    return NextResponse.json(
      {
        error: message.includes('FUNCTION_PAYLOAD_TOO_LARGE') || message.includes('413')
          ? `Resume is too large. Please upload a file under ${MAX_RESUME_LABEL}.`
          : 'Failed to submit application. Please try again or email info@sunrisegroupltd.in.',
      },
      { status: 500 },
    );
  }
}
