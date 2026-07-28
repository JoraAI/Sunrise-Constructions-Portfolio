import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { SectionHeading } from '@/components/SectionHeading';
import { SmartImage } from '@/components/SmartImage';
import { Reveal } from '@/components/Reveal';
import { StatsBar } from '@/components/StatsBar';
import { MissionVisionValues } from '@/components/MissionVisionValues';
import { TeamGrid } from '@/components/TeamGrid';
import { CTABand } from '@/components/CTABand';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { Star, Quote } from 'lucide-react';
import {
  aboutSection,
  founderMessage,
  aboutApproach,
  aboutDifferentiators,
  employeeTestimonials,
} from '@/lib/content';

export const metadata: Metadata = buildMetadata({
  title: 'About Us - Building Since 2014',
  description:
    'Founded in 2014 in Nagpur, Maharashtra, Sunrise Constructions is a ₹115Cr+ construction enterprise delivering landmark projects across Maharashtra and beyond.',
  path: '/about-us',
  keywords: [
    'about construction company',
    'construction enterprise India',
    'engineering excellence',
    'construction leadership',
  ],
});

const timeline = [
  { year: '2014', title: 'Founded in Nagpur', description: 'Sunrise Constructions is established in Nagpur, Maharashtra, as a civil and structural contractor focused on highway and irrigation works.' },
  { year: '2016', title: 'First NHAI Highway Project', description: 'Awarded our first major NHAI highway project, marking our entry into large-scale infrastructure delivery.' },
  { year: '2019', title: '4-Laning of NH-7', description: 'Completed the 77 km four-laning of NH-7 (MP-MH Border to Nagpur) for NHAI under NHDP Phase-II - our largest project to date.' },
  { year: '2020', title: 'Healthcare & Residential Expansion', description: 'Delivered the MPEB/WRD residential colony near Pench and expanded into healthcare with the GMC Hospital paying ward project.' },
  { year: '2022', title: 'Kanhan Major Bridge', description: 'Completed the major bridge across the Kanhan River on NH-7 - a critical all-weather infrastructure link for the region.' },
  { year: '2024', title: '₹115Cr+ Enterprise', description: 'A 250+ strong enterprise delivering landmark infrastructure across Maharashtra, with an expanding portfolio of irrigation and highway projects.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Sunrise Constructions"
        title={
          <>
            Engineering excellence <span className="text-gradient-gold">since 2014</span>
          </>
        }
        description="A ₹115Cr+ engineering and construction enterprise delivering landmark highways, bridges, irrigation systems, and public infrastructure across Maharashtra - on time, built to last."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        backgroundImage="/images/pageheader-about.jpg"
      />

      {/* Founder's Message */}
      <section className="section bg-white" aria-labelledby="founder-heading">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Founder image */}
            <div className="lg:col-span-5">
              <Reveal direction="right">
                <div className="relative">
                  <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl border-2 border-gold/30" aria-hidden />
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-gold/10" aria-hidden />
                  <SmartImage
                    src={founderMessage.image}
                    alt={founderMessage.alt}
                    aspect="aspect-[4/5]"
                    className="relative rounded-2xl shadow-navy"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    imgClassName=""
                  />
                </div>
              </Reveal>
            </div>

            {/* Message */}
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="From the Founder&rsquo;s Desk"
                title={<span id="founder-heading">{founderMessage.heading}</span>}
                align="left"
              />
              <div className="mt-6 space-y-4">
                {founderMessage.body.map((para, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className="text-base leading-relaxed text-charcoal-light lg:text-lg">
                      {para}
                    </p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.2} className="mt-6">
                <p className="font-heading text-xl font-bold text-navy">{founderMessage.signature}</p>
                <p className="text-sm font-semibold text-gold">{founderMessage.title}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Story */}
      <section className="section bg-cream" aria-labelledby="story-heading">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title={<span id="story-heading">From a village contractor to an emerging engineering enterprise</span>}
                align="left"
              />
              <div className="mt-6 space-y-4">
                {aboutSection.body.map((para, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className="text-base leading-relaxed text-charcoal-light lg:text-lg">{para}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.2}>
                <Link href="/projects" className="btn-outline mt-8 group">
                  Explore Our Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
            <Reveal direction="left">
              <div className="relative">
                <SmartImage
                  src={aboutSection.image}
                  alt={aboutSection.imageAlt}
                  aspect="aspect-[4/3]"
                  className="rounded-2xl shadow-navy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-navy p-6 shadow-navy-lg sm:block">
                  <p className="font-heading text-3xl font-extrabold text-gold">12+ Years</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                    Building Maharashtra&rsquo;s infrastructure
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced Differentiators */}
      <section className="section bg-white" aria-labelledby="differentiators-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Choose Sunrise"
            title={<span id="differentiators-heading">What sets us apart</span>}
            description="Four commitments that define how we work on every project, large or small."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {aboutDifferentiators.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-navy/5 bg-cream/40 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:bg-white hover:shadow-navy">
                  <span className="pointer-events-none absolute right-4 top-2 font-heading text-7xl font-extrabold text-navy/5 transition-colors group-hover:text-gold/10">
                    {item.number}
                  </span>
                  <h3 className="relative font-heading text-xl font-bold text-navy">{item.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-charcoal-light">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section section-dark relative overflow-hidden" aria-labelledby="approach-heading">
        <div className="bg-navy-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="How We Work"
            title={<span id="approach-heading" className="text-white">Our approach</span>}
            description="A disciplined methodology that turns ambitious briefs into infrastructure that performs."
            variant="dark"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aboutApproach.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <article className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-gold/40 hover:bg-white/[0.07]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy font-heading text-base font-extrabold">
                      {item.step}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <MissionVisionValues />

      {/* Timeline */}
      <section className="section bg-cream" aria-labelledby="timeline-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Journey"
            title={<span id="timeline-heading">A decade of milestones</span>}
            description="Key moments in the growth of Sunrise Constructions since 2014."
          />
          <ol className="relative mt-14 space-y-6 before:absolute before:left-[7.5rem] before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-gradient-to-b before:from-gold before:via-gold/40 before:to-transparent md:before:left-1/2">
            {timeline.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 0.05} className="relative flex items-start gap-6">
                {/* Year */}
                <span className="w-24 shrink-0 pt-1 font-heading text-lg font-extrabold text-gold">{item.year}</span>
                {/* Node */}
                <span className="z-10 mt-2.5 h-4 w-4 shrink-0 rounded-full border-2 border-gold bg-white shadow-[0_0_0_4px_rgba(245,166,35,0.15)]" />
                {/* Content card */}
                <div className="flex-1 pb-2">
                  <Reveal>
                    <div className="rounded-xl border border-navy/5 bg-white p-5 shadow-navy-sm">
                      <h3 className="font-heading text-base font-bold text-navy">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-charcoal-light">{item.description}</p>
                    </div>
                  </Reveal>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <TeamGrid />

      {/* Employee Testimonials */}
      <section className="section bg-navy" aria-labelledby="emp-testimonials-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Employee Voices"
            title={<span id="emp-testimonials-heading" className="text-white">Hear from our team</span>}
            description="The people who build with us every day - in their own words."
            variant="dark"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {employeeTestimonials.map((emp, i) => (
              <Reveal key={emp.id} delay={(i % 3) * 0.1}>
                <figure className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-gold/30">
                  <Quote className="h-7 w-7 text-gold" aria-hidden />
                  <blockquote className="mt-4 text-sm leading-relaxed text-white/80">
                    &ldquo;{emp.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full border border-gold/30">
                      <SmartImage
                        src={emp.image}
                        alt={emp.alt}
                        aspect="aspect-square"
                        sizes="2.5rem"
                      />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-bold text-white">{emp.name}</p>
                      <p className="text-xs text-white/60">{emp.role} &middot; {emp.project}</p>
                    </div>
                  </figcaption>
                  <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: emp.rating }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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