import { Resend } from 'resend';

/**
 * Prefer `resend_api_key` (as configured for this project).
 * Also accept common aliases used in Vercel / local env files.
 */
export function getResendApiKey(): string {
  const raw =
    process.env.resend_api_key ||
    process.env.RESEND_API_KEY ||
    process.env.Resend_Api_Key ||
    '';
  return raw.trim();
}

export function getStaffEmail(): string {
  return (process.env.STAFF_EMAIL || process.env.staff_email || 'info@sunrisegroupltd.in').trim();
}

export function getResendFrom(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    process.env.resend_from_email ||
    'Sunrise Website <noreply@sunrisegroupltd.in>'
  ).trim();
}

export function isResendConfigured(): boolean {
  return Boolean(getResendApiKey());
}

export type StaffEmailAttachment = {
  filename: string;
  /** Raw file bytes — converted to base64 for Resend compatibility. */
  content: Buffer | Uint8Array;
};

export type StaffEmailResult = {
  ok: boolean;
  id?: string;
  error?: string;
  skipped?: boolean;
};

/**
 * Sends a notification email to the staff inbox via Resend.
 * Returns { ok, id?, error? }. Does not throw when the API key is missing —
 * callers can still persist to the DB and succeed for the visitor.
 */
export async function sendStaffEmail(options: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: StaffEmailAttachment[];
}): Promise<StaffEmailResult> {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    console.warn('Resend skipped: resend_api_key is not set');
    return { ok: false, skipped: true, error: 'resend_api_key is not set on the server' };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: getResendFrom(),
      to: getStaffEmail(),
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo || undefined,
      attachments: options.attachments?.map((a) => ({
        filename: a.filename,
        content: Buffer.from(a.content).toString('base64'),
      })),
    });

    if (error) {
      console.error('Resend error:', error);
      return { ok: false, error: error.message };
    }

    return { ok: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send email';
    console.error('Resend exception:', err);
    return { ok: false, error: message };
  }
}

/** Escape user-provided text for safe HTML email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function emailShell(title: string, intro: string, bodyHtml: string): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#0b1b33;max-width:640px">
      <div style="background:#0b1b33;color:#f5a623;padding:16px 20px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700">
        Sunrise Constructions · Website
      </div>
      <div style="padding:20px;border:1px solid #e8e0d0;border-top:none;background:#fff">
        <h2 style="margin:0 0 8px;font-size:20px;color:#0b1b33">${title}</h2>
        <p style="margin:0 0 16px;color:#5c6b7a;font-size:14px">${intro}</p>
        ${bodyHtml}
        <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb" />
        <p style="font-size:12px;color:#5c6b7a;margin:0">
          Delivered to ${escapeHtml(getStaffEmail())}. Reply to the visitor when their email is provided.
        </p>
      </div>
    </div>
  `;
}

function rows(items: Array<[string, string]>): string {
  return `
    <table style="border-collapse:collapse;width:100%">
      ${items
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding:6px 0;font-weight:bold;width:140px;vertical-align:top">${label}</td>
          <td style="padding:6px 0">${value}</td>
        </tr>`,
        )
        .join('')}
    </table>
  `;
}

export function quoteRequestEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
  submissionId?: string;
}): string {
  return emailShell(
    'New Quote / Contact Request',
    'Submitted via the website contact form.',
    `
      ${rows([
        ['Name', escapeHtml(data.name)],
        ['Email', escapeHtml(data.email)],
        ['Phone', escapeHtml(data.phone)],
        ['Company', escapeHtml(data.company || '—')],
        ['Service', escapeHtml(data.service || '—')],
        ['Submission ID', escapeHtml(data.submissionId || 'N/A')],
      ])}
      <h3 style="margin:20px 0 8px;font-size:15px">Project details</h3>
      <blockquote style="margin:0;padding:12px 16px;background:#f7f3ea;border-left:3px solid #f5a623;white-space:pre-wrap">${escapeHtml(data.message)}</blockquote>
    `,
  );
}

export function jobApplicationEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  roleLabel: string;
  jobSlug?: string;
  experience?: string;
  resumeFileName: string;
  coverLetter?: string;
  applicationId?: string;
  attachmentNote?: string;
}): string {
  return emailShell(
    'New Career Application',
    'Submitted via the website careers form.',
    `
      ${rows([
        ['Name', escapeHtml(data.name)],
        ['Email', escapeHtml(data.email)],
        ['Phone', escapeHtml(data.phone)],
        ['Role', escapeHtml(data.roleLabel)],
        ['Job slug', escapeHtml(data.jobSlug || '—')],
        ['Experience', escapeHtml(data.experience || '—')],
        [
          'Resume',
          `${escapeHtml(data.resumeFileName)}${data.attachmentNote ? ` — ${escapeHtml(data.attachmentNote)}` : ' (attached)'}`,
        ],
        ['Application ID', escapeHtml(data.applicationId || 'N/A')],
      ])}
      <h3 style="margin:20px 0 8px;font-size:15px">Cover letter</h3>
      <blockquote style="margin:0;padding:12px 16px;background:#f7f3ea;border-left:3px solid #f5a623;white-space:pre-wrap">${escapeHtml(data.coverLetter || '—')}</blockquote>
    `,
  );
}

export function chatTicketEmailHtml(data: {
  message: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  ticketId?: string;
}): string {
  return emailShell(
    'New Chat Support Request',
    'Submitted via the website chat widget.',
    `
      ${rows([
        ['From', escapeHtml(data.visitorName || 'Anonymous')],
        ['Email', escapeHtml(data.visitorEmail || 'Not provided')],
        ['Phone', escapeHtml(data.visitorPhone || 'Not provided')],
        ['Ticket ID', escapeHtml(data.ticketId || 'N/A')],
        ['Time', escapeHtml(new Date().toISOString())],
      ])}
      <h3 style="margin:20px 0 8px;font-size:15px">Message</h3>
      <blockquote style="margin:0;padding:12px 16px;background:#f7f3ea;border-left:3px solid #f5a623;white-space:pre-wrap">${escapeHtml(data.message)}</blockquote>
    `,
  );
}

export function newsletterSignupEmailHtml(data: {
  email: string;
  subscriberId?: string;
}): string {
  return emailShell(
    'New Newsletter Subscriber',
    'Someone subscribed via the website footer newsletter form.',
    rows([
      ['Email', escapeHtml(data.email)],
      ['Subscriber ID', escapeHtml(data.subscriberId || 'N/A')],
      ['Time', escapeHtml(new Date().toISOString())],
    ]),
  );
}
