/** Shared client/server-friendly form validation helpers. */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Accepts +91, spaces, dashes, parentheses; requires 10–15 digits. */
export const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!PHONE_RE.test(trimmed)) return false;
  const digits = digitsOnly(trimmed);
  // India mobile often 10 digits; allow country code (11–15)
  return digits.length >= 10 && digits.length <= 15;
}

export function isAllowedResume(file: File): boolean {
  const nameOk = /\.(pdf|doc|docx)$/i.test(file.name);
  const typeOk =
    !file.type ||
    file.type === 'application/pdf' ||
    file.type === 'application/msword' ||
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/octet-stream';
  return nameOk || typeOk;
}

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export type FieldErrors = Record<string, string>;
