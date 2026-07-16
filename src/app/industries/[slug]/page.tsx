import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { SmartImage } from '@/components/SmartImage';
import { Reveal } from '@/components/Reveal';
import { CTABand } from '@/components/CTABand';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectCard } from '@/components/ProjectCard';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { loadIndustryBySlug } from '@/lib/content-loader';
import { industries, projects } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) return {};

  return buildMetadata({
    title: `${industry.title} Construction - Sector Expertise`,
    description: industry.shortDescription,
    path: `/industries/${industry.slug}`,
    keywords: [industry.title.toLowerCase(), 'construction', 'sector expertise'],
  });
}

export default function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) {
    notFound();
  }

  const relatedProjects = projects
    .filter((p) => p.category.toLowerCase() === industry.slug || p.category.toLowerCase().includes(industry.slug))
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Industry"
        title={
          <span className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/20 text-gold">
              <Icon name={industry.icon} className="h-7 w-7" />
            </span>
            {industry.title} Construction
          </span>
        }
        description={industry.shortDescription}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: industry.title },
        ]}
      />

      {/* Overview */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Overview" title={`Building for the ${industry.title.toLowerCase()} sector`} align="left" />
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-relaxed text-charcoal-light lg:text-lg">
                  {industry.overview}
                </p>
              </Reveal>
            </div>
            <Reveal direction="left">
              <SmartImage
                src={industry.image}
                alt={industry.alt}
                aspect="aspect-[4/3]"
                className="rounded-2xl shadow-navy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
          </div>

          {/* Capabilities + Metrics */}
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-heading text-xl font-bold text-navy">Capabilities</h2>
              <ul className="space-y-3">
                {industry.capabilities.map((cap, i) => (
                  <Reveal as="li" key={i} delay={i * 0.05} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-charcoal-light">{cap}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-heading text-xl font-bold text-navy">Track Record</h2>
              <div className="grid grid-cols-3 gap-4">
                {industry.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-navy/10 bg-cream/50 p-5 text-center">
                    <p className="font-heading text-2xl font-extrabold text-navy">{metric.value}</p>
                    <p className="mt-1 text-xs text-charcoal-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="section bg-cream">
          <div className="container-page">
            <SectionHeading eyebrow="Case Studies" title={`Featured ${industry.title.toLowerCase()} projects`} />
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
          { name: 'Industries', path: '/industries' },
          { name: industry.title, path: `/industries/${industry.slug}` },
        ])}
      />
    </>
  );
}