import Link from 'next/link';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import type { JobListing } from '@/types/content';
import { formatDate } from '@/lib/utils';

interface JobListingCardProps {
  job: JobListing;
}

export function JobListingCard({ job }: JobListingCardProps) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="card card-hover group flex flex-col p-6"
      aria-label={`View and apply for ${job.title}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold">
            {job.department}
          </span>
          <h3 className="mt-3 font-heading text-lg font-bold text-navy">{job.title}</h3>
        </div>
        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-light">{job.summary}</p>

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
    </Link>
  );
}