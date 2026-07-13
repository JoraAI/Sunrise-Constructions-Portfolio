'use client';

import { useMemo, useState } from 'react';
import { Filter } from 'lucide-react';
import type { JobListing } from '@/types/content';
import { JobListingCard } from './JobListingCard';
import { cn } from '@/lib/utils';

interface JobListingsFilterProps {
  jobs: JobListing[];
}

export function JobListingsFilter({ jobs }: JobListingsFilterProps) {
  const departments = useMemo(
    () => ['All Departments', ...Array.from(new Set(jobs.map((j) => j.department)))],
    [jobs],
  );
  const locations = useMemo(
    () => ['All Locations', ...Array.from(new Set(jobs.map((j) => j.location)))],
    [jobs],
  );

  const [department, setDepartment] = useState('All Departments');
  const [location, setLocation] = useState('All Locations');

  const filtered = jobs.filter((job) => {
    const deptMatch = department === 'All Departments' || job.department === department;
    const locMatch = location === 'All Locations' || job.location === location;
    return deptMatch && locMatch;
  });

  return (
    <div>
      {/* Filter controls */}
      <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-navy/10 bg-cream/30 p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-navy">
          <Filter className="h-4 w-4 text-gold" />
          Filter by:
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          {/* Department */}
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setDepartment(dept)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  department === dept
                    ? 'bg-navy text-white'
                    : 'bg-white text-charcoal-muted hover:bg-navy/5',
                )}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Location select */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-xl border border-navy/10 bg-white px-4 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          aria-label="Filter by location"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobListingCard key={job.slug} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-navy/10 bg-cream/30 p-12 text-center">
          <p className="font-heading text-lg font-bold text-navy">No positions match your filters.</p>
          <p className="mt-2 text-sm text-charcoal-light">
            Try adjusting your filters or submit an open application below.
          </p>
          <button
            type="button"
            onClick={() => {
              setDepartment('All Departments');
              setLocation('All Locations');
            }}
            className="btn-outline mt-6"
          >
            Reset Filters
          </button>
        </div>
      )}

      <p className="mt-6 text-sm text-charcoal-muted">
        Showing {filtered.length} of {jobs.length} open positions.
      </p>
    </div>
  );
}