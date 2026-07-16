import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { ctaBand } from '@/lib/content';
import { Reveal } from './Reveal';

export function CTABand() {
  return (
    <section
      className="relative overflow-hidden bg-navy py-20 lg:py-28"
      aria-labelledby="cta-heading"
    >
      {/* Decorative background */}
      <div className="bg-navy-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative">
        <Reveal direction="none" className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold" aria-hidden />
            Get Started
          </span>
          <h2
            id="cta-heading"
            className="mt-5 text-display-xl font-extrabold text-white text-balance"
          >
            {ctaBand.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
            {ctaBand.subheading}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={ctaBand.cta.href} className="btn-primary group">
              {ctaBand.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {ctaBand.phone && (
              <a href={ctaBand.phoneHref} className="btn-secondary group">
                <Phone className="h-4 w-4" />
                {ctaBand.phone}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}