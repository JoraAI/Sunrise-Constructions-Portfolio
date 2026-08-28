'use client';

import { useId, useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { isValidEmail } from '@/lib/form-validation';

export function NewsletterForm({ variant = 'footer' }: { variant?: 'footer' | 'light' }) {
  const uid = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const isLoading = status === 'loading';
  const isLight = variant === 'light';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLoading) return;

    const trimmed = email.trim();
    if (!trimmed || !isValidEmail(trimmed)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload.error || 'Failed to subscribe.');
      }
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to subscribe.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full" noValidate aria-busy={isLoading}>
      <label htmlFor={`${uid}-newsletter-email`} className="sr-only">
        Email address
      </label>
      <div className="relative flex items-center">
        <input
          id={`${uid}-newsletter-email`}
          type="email"
          required
          value={email}
          disabled={isLoading}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') {
              setStatus('idle');
              setErrorMessage('');
            }
          }}
          placeholder="Your email address"
          autoComplete="email"
          inputMode="email"
          className={
            isLight
              ? 'input-field pr-12'
              : 'w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 disabled:opacity-60'
          }
        />
        <button
          type="submit"
          disabled={isLoading}
          aria-label="Subscribe to newsletter"
          className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-navy transition-colors hover:bg-amber disabled:opacity-60"
        >
          {status === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
      {status === 'success' && (
        <p className={`mt-2 text-xs ${isLight ? 'text-navy' : 'text-gold'}`}>
          Thanks for subscribing!
        </p>
      )}
      {status === 'error' && errorMessage && (
        <p className={`mt-2 text-xs ${isLight ? 'text-red-600' : 'text-red-300'}`} role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
