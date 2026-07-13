import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { SectionHeading } from '@/components/SectionHeading';
import { SmartImage } from '@/components/SmartImage';
import { Reveal } from '@/components/Reveal';
import { StatsBar } from '@/components/StatsBar';
import { MissionVisionValues } from '@/components/MissionVisionValues';
import { TeamGrid } from '@/components/TeamGrid';
import { CredibilityBand } from '@/components/CredibilityBand';
import { CTABand } from '@/components/CTABand';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { aboutSection, aboutChecklist } from '@/lib/content';

export const metadata: Metadata = buildMetadata({
  title: 'About Us - Building Since 2016',
  description:
    'Founded in 2016 in Nagpur, Maharashtra, Sunrise Constructions is a ₹300Cr+ construction enterprise delivering landmark projects across Maharashtra and beyond.',
  path: '/about-us',
  keywords: [
    'about construction company',
    'construction enterprise India',
    'engineering excellence',
    'construction leadership',
  ],
});

const timeline = [
  { year: '2016', title: 'Founded in Nagpur', description: 'Sunrise Constructions is established in Nagpur, Maharashtra, as a civil and structural contractor.' },
  { year: '2018', title: 'First Major Commercial Project', description: 'Delivered our first large-scale Grade-A commercial development, expanding beyond residential works.' },
  { year: '2020', title: 'ISO 9001 Certification', description: 'Achieved ISO 9001 certification, formalising our quality management systems across all sites.' },
  { year: '2022', title: '₹100 Cr Turnover', description: 'Crossed ₹100 crore annual turnover, expanding operations across Maharashtra with offices in Mumbai and Pune.' },
  { year: '2023', title: 'Digital Transformation', description: 'Rolled out BIM, digital project controls, and an enterprise PMO across all active projects.' },
  { year: '2024', title: '₹300Cr+ Enterprise', description: 'A 500+ strong enterprise delivering landmark projects across 5 cities in Maharashtra.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Sunrise Constructions"
        title={
          <>
            Engineering excellence <span className="text-gradient-gold">since 2016</span>
          </>
        }
        description={aboutSection.body[0]}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      {/* Story */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title={<>From regional contractor to engineering enterprise</>}
                align="left"
              />
              <div className="mt-6 space-y-4">
                {aboutSection.body.map((para, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className="text-base leading-relaxed text-charcoal-light lg:text-lg">{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal direction="left">
              <SmartImage
                src={aboutSection.image}
                alt={aboutSection.imageAlt}
                aspect="aspect-[4/3]"
                className="rounded-2xl shadow-navy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Values checklist */}
      <section className="section bg-cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="What Sets Us Apart"
            title="Why clients choose Sunrise"
            description="Four commitments that define how we work on every project, large or small."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutChecklist.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <div className="card h-full p-6">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="font-heading text-base font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-charcoal-light">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Journey"
            title="Our milestones"
            description="Key moments in the growth of Sunrise Constructions since 2016."
          />
          <ol className="relative mt-14 space-y-8 before:absolute before:left-[7.5rem] before:top-0 before:h-full before:w-px before:bg-navy/10">
            {timeline.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 0.05} className="relative flex items-start gap-6">
                <span className="w-24 shrink-0 font-heading text-lg font-bold text-gold">{item.year}</span>
                <span className="z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-gold bg-white" />
                <div className="flex-1 pb-2">
                  <h3 className="font-heading text-base font-bold text-navy">{item.title}</h3>
                  <p className="mt-1 text-sm text-charcoal-light">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <MissionVisionValues />
      <CredibilityBand />
      <TeamGrid />
      <CTABand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about-us' },
        ])}
      />
    </>
  );
}