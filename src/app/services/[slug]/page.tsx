import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { SmartImage } from '@/components/SmartImage';
import { Reveal } from '@/components/Reveal';
import { CTABand } from '@/components/CTABand';
import { JsonLd } from '@/components/JsonLd';
import { SectionHeading } from '@/components/SectionHeading';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { loadServiceBySlug } from '@/lib/content-loader';
import { services, projects } from '@/lib/content';
import { ProjectCard } from '@/components/ProjectCard';
import { ServiceFaq } from '@/components/ServiceFaq';

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

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await loadServiceBySlug(params.slug);
  if (!service) {
    notFound();
  }

  const relatedProjects = projects
    .filter((p) => p.category.toLowerCase().includes(service.slug.split('-')[0]))
    .slice(0, 3);

  const gallery = service.gallery || [];
  const capabilities = service.capabilities || [];
  const stats = service.stats || [];
  const faqs = service.faqs || [];

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

      {/* Stats band (optional) */}
      {stats.length > 0 && (
        <section className="section section-dark relative overflow-hidden">
          <div className="bg-navy-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />
          <div className="container-page relative">
            <SectionHeading
              eyebrow="By the Numbers"
              title={<span className="text-white">Measurable outcomes</span>}
              description="Performance metrics that define how we deliver this service."
              variant="dark"
            />
            <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <Reveal key={i} delay={i * 0.08} className="text-center">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <p className="font-heading text-3xl font-extrabold text-gold sm:text-4xl">{stat.value}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities (optional) */}
      {capabilities.length > 0 && (
        <section className="section bg-white">
          <div className="container-page">
            <SectionHeading
              eyebrow="Capabilities"
              title="What we can deliver"
              description="The full scope of works we undertake under this service line."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((cap, i) => (
                <Reveal key={i} delay={(i % 3) * 0.08}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-navy/5 bg-cream/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white hover:shadow-navy-sm">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-navy">{cap}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery (optional) */}
      {gallery.length > 1 && (
        <section className="section bg-cream">
          <div className="container-page">
            <SectionHeading
              eyebrow="Gallery"
              title="This service in action"
              description="Representative imagery from our portfolio."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.slice(1).map((img, i) => (
                <Reveal key={i} delay={(i % 3) * 0.08}>
                  <SmartImage
                    src={img}
                    alt={`${service.title} gallery image ${i + 2}`}
                    aspect="aspect-[4/3]"
                    className="rounded-2xl shadow-navy-sm transition-transform duration-500 hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-charcoal-muted">
              Representative stock imagery for illustration. Actual project photos are in the Projects section.
            </p>
          </div>
        </section>
      )}

      {/* FAQs (optional) */}
      {faqs.length > 0 && (
        <section className="section bg-white">
          <div className="container-page max-w-3xl">
            <SectionHeading
              eyebrow="FAQs"
              title="Questions we often hear"
              description="Clear answers about scope, process, and commercial terms."
            />
            <div className="mt-10 space-y-4">
              {faqs.map((faq, i) => (
                <ServiceFaq key={i} faq={faq} />
              ))}
            </div>
          </div>
        </section>
      )}

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