import { Resend } from 'resend';

/**
 * Prefer `resend_api_key` (as configured for this project).
 * Also accept common aliases used in Vercel / local env files.
 */
export function getResendApiKey(): string {
  return (
    process.env.resend_api_key ||
    process.env.RESEND_API_KEY ||
    process.env.Resend_Api_Key ||
    ''
  );
}

export function getStaffEmail(): string {
  return process.env.STAFF_EMAIL || process.env.staff_email || 'info@sunrisegroupltd.in';
}

export function getResendFrom(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    process.env.resend_from_email ||
    'Sunrise Website <noreply@sunrisegroupltd.in>'
  );
}

export type StaffEmailAttachment = {
  filename: string;
  /** Raw file bytes — converted to base64 for Resend compatibility. */
  content: Buffer | Uint8Array;
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
}): Promise<{ ok: boolean; id?: string; error?: string; skipped?: boolean }> {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    console.warn('Resend skipped: resend_api_key is not set');
    return { ok: false, skipped: true, error: 'resend_api_key is not set' };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: getResendFrom(),
      to: getStaffEmail(),
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
      attachments: options.attachments?.map((a) => ({
        filename: a.filename,
        // Resend reliably accepts base64 strings across runtimes
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
