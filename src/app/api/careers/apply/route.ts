import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import {
  jobApplicationEmailHtml,
  sendStaffEmail,
} from '@/lib/email';
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
    let finalEmail = await sendStaffEmail({
      subject: `New Job Application — ${name} (${roleLabel})`,
      replyTo: email,
      attachments: [{ filename: resumeFileName, content: resumeBuffer }],
      html: jobApplicationEmailHtml({
        name,
        email,
        phone,
        roleLabel,
        jobSlug,
        experience,
        resumeFileName,
        coverLetter,
        applicationId,
      }),
    });

    // If attachment send fails, retry without attachment so staff still get notified
    if (!finalEmail.ok && !finalEmail.skipped) {
      finalEmail = await sendStaffEmail({
        subject: `New Job Application — ${name} (${roleLabel}) [resume attach failed]`,
        replyTo: email,
        html: jobApplicationEmailHtml({
          name,
          email,
          phone,
          roleLabel,
          jobSlug,
          experience,
          resumeFileName,
          coverLetter,
          applicationId,
          attachmentNote: 'attachment could not be delivered — ask applicant to resend CV',
        }),
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
