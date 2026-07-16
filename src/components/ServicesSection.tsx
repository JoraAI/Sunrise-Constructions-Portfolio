import type { Service } from '@/types/content';
import { services as defaultServices } from '@/lib/content';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SectionHeading } from './SectionHeading';
import { ServiceCard } from './ServiceCard';
import { Reveal } from './Reveal';

export function ServicesSection({ services = defaultServices }: { services?: Service[] }) {
  return (
    <section className="section bg-cream" aria-labelledby="services-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Do"
          title={<span id="services-heading">Full-service construction capabilities</span>}
          description="From self-performed structural works to integrated design-build and ESG-aligned delivery, we cover the entire project lifecycle under one accountable roof."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.1}>
              <ServiceCard service={service} />
            </Reveal>
          ))}

          {/* View all CTA card */}
          <Reveal delay={0.3}>
            <Link
              href="/services"
              className="group flex h-full min-h-[18rem] flex-col justify-between rounded-2xl bg-navy p-8 text-white transition-shadow hover:shadow-navy"
            >
              <div>
                <span className="eyebrow text-gold">All Capabilities</span>
                <h3 className="mt-3 font-heading text-2xl font-bold">
                  Explore our full range of services
                </h3>
                <p className="mt-3 text-sm text-white/70">
                  Discover how our integrated teams deliver complex projects with precision.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                View All Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}