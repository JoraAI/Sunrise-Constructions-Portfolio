'use client';

import { useId, useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { services } from '@/lib/content';
import { isValidEmail, isValidPhone, type FieldErrors } from '@/lib/form-validation';
import { cn } from '@/lib/utils';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const isLoading = status === 'loading';

  function validate(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): FieldErrors {
    const errors: FieldErrors = {};
    if (!data.name || data.name.length < 2) {
      errors.name = 'Please enter your full name.';
    }
    if (!data.email) {
      errors.email = 'Email is required.';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!data.phone) {
      errors.phone = 'Phone number is required.';
    } else if (!isValidPhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number (10+ digits).';
    }
    if (!data.message || data.message.length < 10) {
      errors.message = 'Please share a short project description (at least 10 characters).';
    }
    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;
    setErrorMessage('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem('company') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value.trim(),
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };

    const errors = validate(data);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus('error');
      setErrorMessage('Please fix the highlighted fields and try again.');
      const firstKey = Object.keys(errors)[0];
      const el = form.elements.namedItem(firstKey);
      if (el && 'focus' in el) (el as HTMLElement).focus();
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const contentType = res.headers.get('content-type') || '';
      const payload = contentType.includes('application/json')
        ? await res.json().catch(() => ({}))
        : {};

      if (!res.ok) {
        throw new Error(payload.error || 'Failed to send message.');
      }

      setStatus('success');
      setFieldErrors({});
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-heading text-xl font-bold text-navy">Message sent!</h3>
        <p className="mt-2 text-sm text-charcoal-light">
          Thank you for reaching out. Our team will respond within one business day.
        </p>
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => {
            setStatus('idle');
            setErrorMessage('');
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  function fieldClass(name: string) {
    return cn('input-field', fieldErrors[name] && 'border-red-400 focus:border-red-500 focus:ring-red-200');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-2xl border border-navy/10 bg-cream/30 p-6 lg:p-8"
      noValidate
      aria-busy={isLoading}
    >
      {isLoading && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-[2px]"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="h-9 w-9 animate-spin text-gold" />
          <p className="text-sm font-semibold text-navy">Sending your message…</p>
          <p className="text-xs text-charcoal-muted">Please wait — do not close this page.</p>
        </div>
      )}

      <fieldset disabled={isLoading} className="min-w-0 border-0 p-0">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm font-semibold text-navy">
              Full Name *
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={120}
              className={fieldClass('name')}
              placeholder="Your full name"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? `${uid}-name-err` : undefined}
              onChange={() => setFieldErrors((prev) => ({ ...prev, name: '' }))}
            />
            {fieldErrors.name && (
              <p id={`${uid}-name-err`} className="mt-1.5 text-xs text-red-600">
                {fieldErrors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${uid}-company`} className="mb-1.5 block text-sm font-semibold text-navy">
              Company / Organisation
            </label>
            <input
              id={`${uid}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={160}
              className="input-field"
              placeholder="Your company"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-semibold text-navy">
              Email *
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={160}
              className={fieldClass('email')}
              placeholder="you@email.com"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? `${uid}-email-err` : undefined}
              onChange={() => setFieldErrors((prev) => ({ ...prev, email: '' }))}
            />
            {fieldErrors.email && (
              <p id={`${uid}-email-err`} className="mt-1.5 text-xs text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-sm font-semibold text-navy">
              Phone *
            </label>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              maxLength={20}
              className={fieldClass('phone')}
              placeholder="+91 98765 43210"
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? `${uid}-phone-err` : undefined}
              onChange={() => setFieldErrors((prev) => ({ ...prev, phone: '' }))}
            />
            {fieldErrors.phone && (
              <p id={`${uid}-phone-err`} className="mt-1.5 text-xs text-red-600">
                {fieldErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor={`${uid}-service`} className="mb-1.5 block text-sm font-semibold text-navy">
            Service of Interest
          </label>
          <select id={`${uid}-service`} name="service" className="input-field" defaultValue="">
            <option value="" disabled>
              Select a service…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other / General Enquiry">Other / General Enquiry</option>
          </select>
        </div>

        <div className="mt-5">
          <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm font-semibold text-navy">
            Project Details *
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            required
            maxLength={4000}
            className={cn(fieldClass('message'), 'resize-none')}
            placeholder="Tell us about your project - type, location, timeline, approximate scope…"
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? `${uid}-message-err` : undefined}
            onChange={() => setFieldErrors((prev) => ({ ...prev, message: '' }))}
          />
          {fieldErrors.message && (
            <p id={`${uid}-message-err`} className="mt-1.5 text-xs text-red-600">
              {fieldErrors.message}
            </p>
          )}
        </div>

        {status === 'error' && errorMessage && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        )}

        <button type="submit" disabled={isLoading} className="btn-primary mt-6 w-full sm:w-auto">
          {isLoading ? 'Sending…' : 'Send Message'}
          <Send className="h-4 w-4" />
        </button>
      </fieldset>
    </form>
  );
}
