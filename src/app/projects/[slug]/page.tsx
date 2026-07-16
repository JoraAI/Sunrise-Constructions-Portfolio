import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Building2, Quote } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { SmartImage } from '@/components/SmartImage';
import { Reveal } from '@/components/Reveal';
import { CTABand } from '@/components/CTABand';
import { JsonLd } from '@/components/JsonLd';
import { SectionHeading } from '@/components/SectionHeading';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { loadProjectBySlug } from '@/lib/content-loader';
import { projects } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return buildMetadata({
    title: `${project.title} - ${project.category} Project`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    keywords: [project.title.toLowerCase(), project.category.toLowerCase(), 'construction project'],
  });
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow={`${project.category} · ${project.year}`}
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
      />

      {/* Hero image */}
      <section className="bg-white pb-10 pt-12">
        <div className="container-page">
          <Reveal>
            <SmartImage
              src={project.image}
              alt={project.alt}
              aspect="aspect-[21/9]"
              className="rounded-2xl shadow-navy-lg"
              sizes="100vw"
              priority
            />
          </Reveal>

          {/* Meta strip */}
          <div className="mt-8 grid gap-6 border-y border-navy/10 py-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Location</p>
                <p className="font-heading font-bold text-navy">{project.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Completed</p>
                <p className="font-heading font-bold text-navy">{project.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Client</p>
                <p className="font-heading font-bold text-navy">{project.client}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview + Metrics */}
      <section className="section bg-white pt-4">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="Overview" title="Project details" align="left" />
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-relaxed text-charcoal-light lg:text-lg">
                  {project.overview}
                </p>
              </Reveal>

              <h2 className="mb-5 mt-12 font-heading text-xl font-bold text-navy">Scope of Work</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.scope.map((item, i) => (
                  <Reveal as="li" key={i} delay={i * 0.05} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="text-charcoal-light">{item}</span>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Metrics sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl border border-navy/10 bg-cream/50 p-6">
                <h2 className="mb-5 font-heading text-lg font-bold text-navy">Key Metrics</h2>
                <dl className="grid grid-cols-2 gap-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">
                        {metric.label}
                      </dt>
                      <dd className="font-heading text-xl font-extrabold text-navy">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="section bg-navy">
          <div className="container-page">
            <Reveal direction="none" className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto h-10 w-10 text-gold" aria-hidden />
              <blockquote className="mt-6 font-heading text-xl font-medium leading-relaxed text-white lg:text-2xl">
                &ldquo;{project.testimonial}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-gold">{project.testimonialAuthor}</p>
            </Reveal>
          </div>
        </section>
      )}

      <CTABand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
    </>
  );
}