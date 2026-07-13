import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({ eyebrow, title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-36 lg:pb-20 lg:pt-44">
      <div className="bg-navy-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/50">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-gold">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Reveal direction="none">
          {eyebrow && (
            <span className="eyebrow mb-4">
              <span className="h-px w-6 bg-gold" aria-hidden />
              {eyebrow}
            </span>
          )}
          <h1 className="max-w-4xl text-display-xl font-extrabold text-white text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}