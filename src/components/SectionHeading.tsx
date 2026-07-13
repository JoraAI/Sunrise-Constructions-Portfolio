import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  variant = 'light',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal direction="none">
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.05}>
        <Tag
          className={cn(
            'text-display-lg text-balance',
            isDark ? 'text-white' : 'text-navy',
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed lg:text-lg',
              isDark ? 'text-white/70' : 'text-charcoal-light',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}