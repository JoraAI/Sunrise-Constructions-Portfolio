import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  href?: string;
}

/**
 * Brand logo - uses the real company logo PNG (mark + wordmark together).
 * Renders at a consistent height with auto width based on the image aspect ratio.
 */
export function Logo({ className, href = '/' }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn('group inline-flex items-center', className)}
      aria-label="Sunrise Constructions - home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-nav.png"
        alt="Sunrise Constructions"
        className="h-12 w-auto transition-opacity hover:opacity-90 lg:h-14"
        width={600}
        height={231}
      />
    </Link>
  );
}