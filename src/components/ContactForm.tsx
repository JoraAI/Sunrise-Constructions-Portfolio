'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { services } from '@/lib/content';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    // Simulated submission - wire to real endpoint later.
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 6000);
    }, 1200);
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-heading text-xl font-bold text-navy">Message sent!</h3>
        <p className="mt-2 text-sm text-charcoal-light">
          Thank you for reaching out. Our team will respond within one business day.
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-navy">
            Full Name *
          </label>
          <input id="contact-name" type="text" required className="input-field" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="contact-company" className="mb-1.5 block text-sm font-semibold text-navy">
            Company / Organisation
          </label>
          <input id="contact-company" type="text" className="input-field" placeholder="Your company" />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-navy">
            Email *
          </label>
          <input id="contact-email" type="email" required className="input-field" placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-semibold text-navy">
            Phone *
          </label>
          <input id="contact-phone" type="tel" required className="input-field" placeholder="+91 98765 43210" />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-service" className="mb-1.5 block text-sm font-semibold text-navy">
          Service of Interest
        </label>
        <select
          id="contact-service"
          className="input-field"
          defaultValue=""
        >
          <option value="" disabled>Select a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="other">Other / General Enquiry</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-navy">
          Project Details *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          className="input-field resize-none"
          placeholder="Tell us about your project - type, location, timeline, approximate scope…"
        />
      </div>

      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full sm:w-auto">
        {status === 'loading' ? 'Sending…' : 'Send Message'}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}