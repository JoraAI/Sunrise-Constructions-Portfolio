import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Briefcase, Clock, Calendar, Check } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { SectionHeading } from '@/components/SectionHeading';
import { ApplicationForm } from '@/components/ApplicationForm';
import { JobListingCard } from '@/components/JobListingCard';
import { buildMetadata, breadcrumbJsonLd, jobPostingJsonLd } from '@/lib/seo';
import { loadJobBySlug } from '@/lib/content-loader';
import { jobListings } from '@/lib/content';
import { formatDate } from '@/lib/utils';

export const dynamicParams = false;

export function generateStaticParams() {
  return jobListings.map((j) => ({ slug: j.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const job = jobListings.find((j) => j.slug === params.slug);
  if (!job) return {};

  return buildMetadata({
    title: `${job.title} - Careers at Sunrise Constructions`,
    description: job.summary,
    path: `/careers/${job.slug}`,
    keywords: [job.title.toLowerCase(), job.department.toLowerCase(), 'construction job', 'career'],
  });
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = jobListings.find((j) => j.slug === params.slug);
  if (!job) {
    notFound();
  }

  const otherJobs = jobListings.filter((j) => j.slug !== job.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`${job.department} · ${job.type}`}
        title={job.title}
        description={job.summary}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Careers', href: '/careers' },
          { label: job.title },
        ]}
      />

      {/* Meta strip */}
      <section className="bg-white pb-6 pt-8">
        <div className="container-page">
          <div className="grid gap-4 border-y border-navy/10 py-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Department</p>
                <p className="font-heading font-bold text-navy">{job.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Location</p>
                <p className="font-heading font-bold text-navy">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Experience</p>
                <p className="font-heading font-bold text-navy">{job.experience}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Posted</p>
                <p className="font-heading font-bold text-navy">{formatDate(job.postedDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section bg-white pt-8">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="Role Overview" title="About this position" align="left" />
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-relaxed text-charcoal-light lg:text-lg">
                  {job.description}
                </p>
              </Reveal>

              <h2 className="mb-5 mt-12 font-heading text-xl font-bold text-navy">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, i) => (
                  <Reveal as="li" key={i} delay={i * 0.04} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-charcoal-light">{item}</span>
                  </Reveal>
                ))}
              </ul>

              <h2 className="mb-5 mt-12 font-heading text-xl font-bold text-navy">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((item, i) => (
                  <Reveal as="li" key={i} delay={i * 0.04} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="text-charcoal-light">{item}</span>
                  </Reveal>
                ))}
              </ul>

              {job.niceToHave.length > 0 && (
                <>
                  <h2 className="mb-5 mt-12 font-heading text-xl font-bold text-navy">Nice to Have</h2>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item, i) => (
                      <Reveal as="li" key={i} delay={i * 0.04} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal-muted" />
                        <span className="text-charcoal-light">{item}</span>
                      </Reveal>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Application form sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28">
                <h2 className="mb-5 font-heading text-lg font-bold text-navy">Apply Now</h2>
                <ApplicationForm jobTitle={job.title} variant="compact" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Other openings */}
      <section className="section bg-cream">
        <div className="container-page">
          <SectionHeading eyebrow="Keep Looking" title="Other open positions" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {otherJobs.map((otherJob, i) => (
              <Reveal key={otherJob.slug} delay={i * 0.08}>
                <JobListingCard job={otherJob} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Structured data */}
      <JsonLd
        data={jobPostingJsonLd({
          title: job.title,
          description: job.description,
          department: job.department,
          location: job.location,
          type: job.type,
          postedDate: job.postedDate,
          slug: job.slug,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
          { name: job.title, path: `/careers/${job.slug}` },
        ])}
      />
    </>
  );
}