import Link from 'next/link';
import { MapPin, Briefcase, Clock, ArrowRight, Check } from 'lucide-react';
import type { JobListing } from '@/types/content';

interface JobListingCardProps {
  job: JobListing;
}

export function JobListingCard({ job }: JobListingCardProps) {
  // Show up to 3 key requirements so candidates can self-assess at a glance.
  const topRequirements = job.requirements.slice(0, 3);

  return (
    <Link
      href={`/careers/${job.slug}`}
      className="card card-hover group flex flex-col p-6"
      aria-label={`View and apply for ${job.title}`}
    >
      {/* Header: badge + title + arrow */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold">
            {job.department}
          </span>
          <h3 className="mt-3 font-heading text-lg font-bold text-navy">{job.title}</h3>
        </div>
        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
      </div>

      {/* Full description (2-3 sentences) */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-light">{job.description}</p>

      {/* Key requirements */}
      {topRequirements.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {topRequirements.map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-charcoal-light">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Meta footer */}
      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-navy/5 pt-4 text-xs text-charcoal-muted">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-gold" />
          {job.type}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-gold" />
          {job.experience}
        </span>
      </div>

      {/* CTA link */}
      <span className="mt-4 text-xs font-semibold text-gold transition-colors group-hover:text-gold/80">
        View details & apply
        <ArrowRight className="ml-1 inline-block h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}