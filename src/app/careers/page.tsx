export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { SmartImage } from '@/components/SmartImage';
import { JobListingsFilter } from '@/components/JobListingsFilter';
import { ApplicationForm } from '@/components/ApplicationForm';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { loadJobListings } from '@/lib/content-loader';
import {
  jobPerks,
  careerStats,
  lifeAtSunrise,
  employeeTestimonials,
} from '@/lib/content';
import { Star, Quote } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Careers - Build Your Future with Sunrise Constructions',
  description:
    'Join a 2,400-strong team building landmark projects across India. Explore open roles in engineering, site operations, design, project management, and corporate functions.',
  path: '/careers',
  keywords: [
    'construction careers India',
    'construction jobs',
    'civil engineering jobs',
    'project manager jobs',
    'site engineer jobs',
  ],
});

export default async function CareersPage() {
  const jobListings = await loadJobListings();
  return (
    <>
      {/* Hero */}
      <PageHeader
        eyebrow="Careers at Sunrise"
        title={
          <>
            Build your career <span className="text-gradient-gold">with us</span>
          </>
        }
        description="We are always looking for engineers, project managers, and skilled professionals who want to build careers, not just hold jobs. At Sunrise, you will work on landmark projects alongside some of the best in the industry."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
      />

      {/* Stats band */}
      <section className="bg-navy py-12">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {careerStats.map((stat, i) => (
              <Reveal key={stat.id} delay={i * 0.08} className="text-center">
                <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Icon name={stat.icon} className="h-6 w-6" />
                </span>
                <p className="font-heading text-2xl font-extrabold text-white lg:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-white/60">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work at Sunrise - Perks */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Work Here"
            title="A workplace built for growth"
            description="We invest in our people as deliberately as we invest in our projects. Here is what you can expect when you join Sunrise."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobPerks.map((perk, i) => (
              <Reveal key={perk.id} delay={(i % 3) * 0.1}>
                <div className="card h-full p-6">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon name={perk.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="font-heading text-base font-bold text-navy">{perk.title}</h3>
                  <p className="mt-2 text-sm text-charcoal-light">{perk.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Life at Sunrise - Gallery */}
      <section className="section bg-cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="Life at Sunrise"
            title="More than a job"
            description="From site visits and team events to office life and learning sessions - here is a glimpse of what it is like to work here."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {lifeAtSunrise.map((img, i) => (
              <Reveal
                key={img}
                delay={(i % 3) * 0.08}
                className={i === 0 || i === 5 ? 'col-span-2 md:col-span-1' : ''}
              >
                <SmartImage
                  src={img}
                  alt={`Life at Sunrise Constructions - culture snapshot ${i + 1}`}
                  aspect="aspect-square"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="rounded-2xl shadow-navy-sm"
                  imgClassName="transition-transform duration-700 hover:scale-105"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section bg-white" id="open-positions">
        <div className="container-page">
          <SectionHeading
            eyebrow="Open Positions"
            title="Find your next role"
            description="Browse our current openings. Filter by department or location to find the right fit."
          />
          <div className="mt-12">
            <JobListingsFilter jobs={jobListings} />
          </div>
        </div>
      </section>

      {/* Employee testimonials */}
      <section className="section bg-navy">
        <div className="container-page">
          <SectionHeading
            eyebrow="Employee Voices"
            title="Hear from our team"
            variant="dark"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {employeeTestimonials.map((emp, i) => (
              <Reveal key={emp.id} delay={i * 0.1}>
                <figure className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
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
                      <p className="text-xs text-white/60">{emp.role}</p>
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

      {/* General Application CTA */}
      <section className="section bg-cream" id="open-application">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Don't See a Fit?"
              title="Submit an open application"
              description="If none of our current openings match your profile, we would still love to hear from you. Tell us about your experience and we will reach out when a suitable role opens up."
            />
            <Reveal delay={0.15} className="mt-10">
              <ApplicationForm variant="compact" />
            </Reveal>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
        ])}
      />
    </>
  );
}