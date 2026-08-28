export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ServiceCard } from '@/components/ServiceCard';
import { PlantMachinerySection } from '@/components/PlantMachinerySection';
import { Reveal } from '@/components/Reveal';
import { CTABand } from '@/components/CTABand';
import { JsonLd } from '@/components/JsonLd';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { loadServices } from '@/lib/content-loader';

export const metadata: Metadata = buildMetadata({
  title: 'Construction Services - Full Lifecycle Delivery',
  description:
    'Explore our construction services: general construction, project management, design & build, renovation, and sustainable construction - delivered to enterprise standards.',
  path: '/services',
  keywords: [
    'construction services',
    'design and build',
    'project management construction',
    'sustainable construction India',
    'general contractor services',
  ],
});

export default async function ServicesPage() {
  const services = await loadServices();
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title={
          <>
            Full-service construction <span className="text-gradient-gold">capabilities</span>
          </>
        }
        description="From self-performed structural works to integrated design-build and ESG-aligned delivery, we cover the entire project lifecycle under one accountable roof."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.1}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Plant & Machinery Fleet */}
      <PlantMachinerySection
        eyebrow="Self-Performance Assets"
        title="Backed by our captive plant & machinery fleet"
        description="We control project quality and schedules through direct ownership of modern batching plants, transit mixers, motor graders, and boom placers."
        className="section bg-cream"
      />

      <ProcessTimeline />
      <CTABand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
    </>
  );
}