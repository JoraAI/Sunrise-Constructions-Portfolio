import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  href?: string;
}

/**
 * Sunrise-over-skyline brand mark + two-line wordmark.
 * "SUNRISE" bold, "CONSTRUCTIONS" tracked-out and lighter.
 */
export function Logo({ variant = 'dark', className, href = '/' }: LogoProps) {
  const isLight = variant === 'light';

  return (
    <Link
      href={href}
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label="Sunrise Constructions - home"
    >
      <span className="relative flex h-11 w-11 items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          aria-hidden="true"
        >
          {/* sun rays */}
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gold">
            <path d="M24 4v4" />
            <path d="M10.5 10.5l2.8 2.8" />
            <path d="M4 24h4" />
            <path d="M37.5 10.5l-2.8 2.8" />
            <path d="M44 24h-4" />
          </g>
          {/* sun disc */}
          <circle cx="24" cy="26" r="7" className="fill-gold" />
          {/* skyline */}
          <g className="fill-navy dark:fill-white">
            <rect x="8" y="34" width="6" height="10" rx="1" />
            <rect x="16" y="28" width="7" height="16" rx="1" />
            <rect x="25" y="31" width="6" height="13" rx="1" />
            <rect x="33" y="35" width="7" height="9" rx="1" />
          </g>
          {/* baseline */}
          <rect x="6" y="44" width="36" height="2" rx="1" className="fill-gold" />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-heading text-base font-extrabold tracking-tight lg:text-lg',
            isLight ? 'text-white' : 'text-navy',
          )}
        >
          SUNRISE
        </span>
        <span
          className={cn(
            'mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.35em] lg:text-[0.65rem]',
            isLight ? 'text-white/60' : 'text-charcoal-muted',
          )}
        >
          Constructions
        </span>
      </span>
    </Link>
  );
}