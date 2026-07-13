import Link from 'next/link';
import { ArrowRight, Home, Wrench } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-navy py-20">
      <div className="bg-navy-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative text-center">
        <span className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gold/15 text-gold">
          <Wrench className="h-10 w-10" />
        </span>
        <p className="font-heading text-display-2xl font-extrabold text-gradient-gold">404</p>
        <h1 className="mt-2 font-heading text-display-lg font-bold text-white">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          The page you are looking for may have been moved, renamed, or is temporarily
          unavailable. Let us get you back on solid ground.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-primary group">
            <Home className="h-4 w-4" />
            Back to Home
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/contact-us" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}