import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { CTABand } from '@/components/CTABand';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { industries } from '@/lib/content';
import { SmartImage } from '@/components/SmartImage';
import { Icon } from '@/components/Icon';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Industries We Serve - Sector-Specific Construction',
  description:
    'From commercial towers to healthcare facilities, industrial plants to infrastructure - Sunrise Constructions brings deep sector expertise across seven core industries.',
  path: '/industries',
  keywords: [
    'construction industries',
    'commercial construction',
    'healthcare construction',
    'industrial construction',
    'infrastructure construction India',
  ],
});

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sectors We Serve"
        title={
          <>
            Industries we <span className="text-gradient-gold">build for</span>
          </>
        }
        description="Sector-specific expertise is what separates large firms from generalists. We bring proven capability across seven core industries."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
      />

      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 3) * 0.1}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="card card-hover group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative">
                    <SmartImage
                      src={industry.image}
                      alt={industry.alt}
                      aspect="aspect-[16/9]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" aria-hidden />
                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gold shadow-navy">
                      <Icon name={industry.icon} className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-lg font-bold text-navy">{industry.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-charcoal-light">{industry.shortDescription}</p>
                    <div className="mt-4 flex items-center gap-4 border-t border-navy/5 pt-4">
                      {industry.metrics.slice(0, 2).map((metric) => (
                        <div key={metric.label}>
                          <p className="font-heading text-sm font-bold text-navy">{metric.value}</p>
                          <p className="text-xs text-charcoal-muted">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                      Explore Sector
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
        ])}
      />
    </>
  );
}