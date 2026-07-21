import type { Industry } from '@/types/content';
import { industries as defaultIndustries } from '@/lib/content';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SectionHeading } from './SectionHeading';
import { SmartImage } from './SmartImage';
import { Reveal } from './Reveal';
import { Icon } from './Icon';

export function IndustriesGrid({ industries = defaultIndustries }: { industries?: Industry[] }) {
  return (
    <section className="section bg-white" aria-labelledby="industries-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Sectors We Serve"
          title={<span id="industries-heading">Industries we build for</span>}
          description="Sector-specific expertise is what separates large firms from generalists. We bring proven capability across seven core industries."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {/* Feature first card larger */}
          {industries.slice(0, 1).map((industry, i) => {
            const heroMetric = industry.metrics[0];
            return (
              <Reveal key={industry.slug} className="col-span-2 lg:col-span-2 lg:row-span-2" delay={i * 0.08}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden rounded-2xl"
                >
                  <SmartImage
                    src={industry.image}
                    alt={industry.alt}
                    aspect="aspect-none h-full min-h-[18rem] absolute inset-0"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                    className="absolute inset-0 h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" aria-hidden />
                  <div className="relative z-10 p-6 lg:p-8">
                    <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-navy">
                      <Icon name={industry.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-white">{industry.title}</h3>
                    <p className="mt-2 max-w-md text-sm text-white/80">{industry.shortDescription}</p>
                    {/* Hero metric badge */}
                    {heroMetric && (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="font-heading text-2xl font-extrabold text-gold">{heroMetric.value}</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-white/70">{heroMetric.label}</span>
                      </div>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                      Explore Sector
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}

          {/* Remaining cards - now with background images */}
          {industries.slice(1).map((industry, i) => {
            const heroMetric = industry.metrics[0];
            return (
              <Reveal key={industry.slug} delay={(i % 3) * 0.1}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group relative flex h-full min-h-[16rem] flex-col items-start justify-end overflow-hidden rounded-2xl p-6"
                >
                  <SmartImage
                    src={industry.image}
                    alt={industry.alt}
                    aspect="aspect-none absolute inset-0 h-full"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                    className="absolute inset-0 h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10" aria-hidden />
                  <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-gold backdrop-blur-sm">
                    <Icon name={industry.icon} className="h-5 w-5" />
                  </span>
                  <div className="relative z-10 w-full">
                    <h3 className="font-heading text-base font-bold text-white">{industry.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/80 line-clamp-2">
                      {industry.shortDescription}
                    </p>
                    {/* Hero stat badge */}
                    {heroMetric && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="font-heading text-sm font-extrabold text-gold">{heroMetric.value}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60">{heroMetric.label}</span>
                      </div>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold">
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}