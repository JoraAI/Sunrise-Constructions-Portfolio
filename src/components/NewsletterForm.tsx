'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function NewsletterForm({ variant = 'footer' }: { variant?: 'footer' | 'light' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulated submission - wire to real endpoint later.
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    }, 900);
  }

  const isLight = variant === 'light';

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="relative flex items-center">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className={
            isLight
              ? 'input-field pr-12'
              : 'w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20'
          }
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label="Subscribe to newsletter"
          className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-navy transition-colors hover:bg-amber disabled:opacity-60"
        >
          {status === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
      {status === 'success' && (
        <p className="mt-2 text-xs text-gold">Thanks for subscribing! Check your inbox.</p>
      )}
    </form>
  );
}