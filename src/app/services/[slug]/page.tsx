import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { SmartImage } from '@/components/SmartImage';
import { Reveal } from '@/components/Reveal';
import { CTABand } from '@/components/CTABand';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { services, projects } from '@/lib/content';
import { ProjectCard } from '@/components/ProjectCard';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.title} - Construction Services`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
    keywords: [service.title.toLowerCase(), 'construction services india'],
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) {
    notFound();
  }

  const relatedProjects = projects
    .filter((p) => p.category.toLowerCase().includes(service.slug.split('-')[0]))
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      {/* Overview */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Overview" title="What this service includes" align="left" />
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-relaxed text-charcoal-light lg:text-lg">
                  {service.overview}
                </p>
              </Reveal>
            </div>
            <Reveal direction="left">
              <SmartImage
                src={service.image}
                alt={service.alt}
                aspect="aspect-[4/3]"
                className="rounded-2xl shadow-navy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
          </div>

          {/* Key deliverables + Process */}
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-heading text-xl font-bold text-navy">Key Deliverables</h2>
              <ul className="space-y-3">
                {service.keyDeliverables.map((item, i) => (
                  <Reveal as="li" key={i} delay={i * 0.05} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-charcoal-light">{item}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-heading text-xl font-bold text-navy">Our Process</h2>
              <ol className="space-y-4">
                {service.process.map((step, i) => (
                  <Reveal as="li" key={i} delay={i * 0.05} className="flex items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-sm font-bold text-gold">
                      {i + 1}
                    </span>
                    <span className="font-medium text-navy">{step}</span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="section bg-cream">
          <div className="container-page">
            <SectionHeading
              eyebrow="Related Work"
              title="Projects featuring this service"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {relatedProjects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.1}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
    </>
  );
}