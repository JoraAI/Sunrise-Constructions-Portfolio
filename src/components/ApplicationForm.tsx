'use client';

import { useId, useRef, useState } from 'react';
import { Upload, CheckCircle2, Send, FileText, X } from 'lucide-react';
import {
  isAllowedResume,
  isValidEmail,
  isValidPhone,
  MAX_RESUME_BYTES,
  type FieldErrors,
} from '@/lib/form-validation';
import { cn } from '@/lib/utils';

interface ApplicationFormProps {
  jobTitle?: string;
  jobSlug?: string;
  variant?: 'full' | 'compact';
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ApplicationForm({
  jobTitle,
  jobSlug,
}: ApplicationFormProps) {
  const uid = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function clearResume() {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFieldErrors((prev) => ({ ...prev, resume: '' }));
  }

  function onResumeChange(file: File | null) {
    if (!file) {
      clearResume();
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setFieldErrors((prev) => ({
        ...prev,
        resume: 'Resume must be 5MB or smaller.',
      }));
      return;
    }
    if (!isAllowedResume(file)) {
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setFieldErrors((prev) => ({
        ...prev,
        resume: 'Please upload a PDF or Word document (.pdf, .doc, .docx).',
      }));
      return;
    }
    setResumeFile(file);
    setFieldErrors((prev) => ({ ...prev, resume: '' }));
  }

  function validate(values: {
    name: string;
    email: string;
    phone: string;
    experience: string;
    resume: File | null;
  }): FieldErrors {
    const errors: FieldErrors = {};
    if (!values.name || values.name.length < 2) {
      errors.name = 'Please enter your full name.';
    }
    if (!values.email) {
      errors.email = 'Email is required.';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!values.phone) {
      errors.phone = 'Phone number is required.';
    } else if (!isValidPhone(values.phone)) {
      errors.phone = 'Please enter a valid phone number (10+ digits).';
    }
    if (values.experience) {
      const n = Number(values.experience);
      if (!Number.isFinite(n) || n < 0 || n > 60) {
        errors.experience = 'Enter experience between 0 and 60 years.';
      }
    }
    if (!values.resume) {
      errors.resume = 'Please upload your resume / CV.';
    }
    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage('');

    const form = e.currentTarget;
    const values = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value.trim(),
      experience: (form.elements.namedItem('experience') as HTMLInputElement).value.trim(),
      coverLetter: (form.elements.namedItem('coverLetter') as HTMLTextAreaElement).value.trim(),
      resume: resumeFile,
    };

    const errors = validate(values);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus('error');
      setErrorMessage('Please fix the highlighted fields and try again.');
      if (errors.resume) openFilePicker();
      else {
        const firstKey = Object.keys(errors)[0];
        const el = form.elements.namedItem(firstKey);
        if (el && 'focus' in el) (el as HTMLElement).focus();
      }
      return;
    }

    setStatus('loading');

    const formData = new FormData();
    formData.set('name', values.name);
    formData.set('email', values.email);
    formData.set('phone', values.phone);
    formData.set('experience', values.experience);
    formData.set('coverLetter', values.coverLetter);
    if (jobTitle) formData.set('jobTitle', jobTitle);
    if (jobSlug) formData.set('jobSlug', jobSlug);
    formData.set('resume', values.resume as File);

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formData,
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(payload.error || 'Failed to submit application.');
      }

      setStatus('success');
      setFieldErrors({});
      form.reset();
      clearResume();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to submit application.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-heading text-xl font-bold text-navy">Application submitted!</h3>
        <p className="mt-2 text-sm text-charcoal-light">
          Thank you for your interest in joining Sunrise Constructions. Our talent team will
          review your application and reach out within 5–7 business days.
        </p>
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => {
            setStatus('idle');
            setErrorMessage('');
          }}
        >
          Submit another application
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
      className="rounded-2xl border border-navy/10 bg-cream/30 p-6 lg:p-8"
      noValidate
    >
      {jobTitle && (
        <div className="mb-6 rounded-xl bg-gold/10 px-4 py-3">
          <p className="text-sm font-semibold text-navy">Applying for: {jobTitle}</p>
        </div>
      )}

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
            onChange={() => setFieldErrors((prev) => ({ ...prev, name: '' }))}
          />
          {fieldErrors.name && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.name}</p>}
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
            onChange={() => setFieldErrors((prev) => ({ ...prev, email: '' }))}
          />
          {fieldErrors.email && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>}
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
            onChange={() => setFieldErrors((prev) => ({ ...prev, phone: '' }))}
          />
          {fieldErrors.phone && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.phone}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-experience`} className="mb-1.5 block text-sm font-semibold text-navy">
            Years of Experience
          </label>
          <input
            id={`${uid}-experience`}
            name="experience"
            type="number"
            min={0}
            max={60}
            inputMode="numeric"
            className={fieldClass('experience')}
            placeholder="e.g. 8"
            aria-invalid={Boolean(fieldErrors.experience)}
            onChange={() => setFieldErrors((prev) => ({ ...prev, experience: '' }))}
          />
          {fieldErrors.experience && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.experience}</p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <span className="mb-1.5 block text-sm font-semibold text-navy">Resume / CV *</span>

        {/* Native file input — visually hidden but focusable; opened via button for reliable pickers */}
        <input
          ref={fileInputRef}
          id={`${uid}-resume`}
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => onResumeChange(e.target.files?.[0] ?? null)}
        />

        {!resumeFile ? (
          <button
            type="button"
            onClick={openFilePicker}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl border-2 border-dashed bg-white px-4 py-4 text-left transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
              fieldErrors.resume ? 'border-red-400' : 'border-navy/15',
            )}
            aria-describedby={fieldErrors.resume ? `${uid}-resume-err` : undefined}
          >
            <Upload className="h-5 w-5 shrink-0 text-gold" />
            <span className="text-sm text-charcoal-muted">
              Click to upload PDF or DOC (max 5MB)
            </span>
          </button>
        ) : (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <FileText className="h-5 w-5 shrink-0 text-gold" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-navy">{resumeFile.name}</p>
                <p className="text-xs text-charcoal-muted">
                  {(resumeFile.size / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={openFilePicker}
                className="text-xs font-semibold text-navy underline-offset-2 hover:underline"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={clearResume}
                className="rounded-lg p-1.5 text-charcoal-muted hover:bg-navy/5 hover:text-navy"
                aria-label="Remove resume"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {fieldErrors.resume && (
          <p id={`${uid}-resume-err`} className="mt-1.5 text-xs text-red-600">
            {fieldErrors.resume}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor={`${uid}-cover`} className="mb-1.5 block text-sm font-semibold text-navy">
          Cover Letter
        </label>
        <textarea
          id={`${uid}-cover`}
          name="coverLetter"
          rows={4}
          maxLength={4000}
          className="input-field resize-none"
          placeholder="Tell us why you'd be a great fit for this role…"
        />
      </div>

      {status === 'error' && errorMessage && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full sm:w-auto">
        {status === 'loading' ? 'Submitting…' : 'Submit Application'}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
