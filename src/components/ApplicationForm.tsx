'use client';

import { useState } from 'react';
import { Upload, CheckCircle2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationFormProps {
  jobTitle?: string;
  variant?: 'full' | 'compact';
}

export function ApplicationForm({ jobTitle, variant = 'full' }: ApplicationFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [fileName, setFileName] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    // Simulated submission - wire to real endpoint later.
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1200);
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
      </div>
    );
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
          <label htmlFor="applicant-name" className="mb-1.5 block text-sm font-semibold text-navy">
            Full Name *
          </label>
          <input id="applicant-name" type="text" required className="input-field" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="applicant-email" className="mb-1.5 block text-sm font-semibold text-navy">
            Email *
          </label>
          <input id="applicant-email" type="email" required className="input-field" placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="applicant-phone" className="mb-1.5 block text-sm font-semibold text-navy">
            Phone *
          </label>
          <input id="applicant-phone" type="tel" required className="input-field" placeholder="+91 98765 43210" />
        </div>
        {variant === 'full' && (
          <div>
            <label htmlFor="applicant-experience" className="mb-1.5 block text-sm font-semibold text-navy">
              Years of Experience
            </label>
            <input id="applicant-experience" type="number" min={0} className="input-field" placeholder="e.g. 8" />
          </div>
        )}
      </div>

      {/* Resume upload placeholder */}
      <div className="mt-5">
        <label htmlFor="applicant-resume" className="mb-1.5 block text-sm font-semibold text-navy">
          Resume / CV *
        </label>
        <div
          className={cn(
            'flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-navy/15 bg-white px-4 py-4 transition-colors hover:border-gold',
          )}
        >
          <Upload className="h-5 w-5 text-gold" />
          <input
            id="applicant-resume"
            type="file"
            accept=".pdf,.doc,.docx"
            required
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          />
          <span className="text-sm text-charcoal-muted">
            {fileName || 'Click to upload PDF or DOC (max 5MB)'}
          </span>
        </div>
      </div>

      {/* Cover letter */}
      <div className="mt-5">
        <label htmlFor="applicant-cover" className="mb-1.5 block text-sm font-semibold text-navy">
          Cover Letter
        </label>
        <textarea
          id="applicant-cover"
          rows={4}
          className="input-field resize-none"
          placeholder="Tell us why you'd be a great fit for this role…"
        />
      </div>

      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full sm:w-auto">
        {status === 'loading' ? 'Submitting…' : 'Submit Application'}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}