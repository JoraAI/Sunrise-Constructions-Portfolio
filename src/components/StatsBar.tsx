import { stats } from '@/lib/content';
import { StatCounter } from './StatCounter';

export function StatsBar() {
  return (
    <section className="relative z-20 -mt-px bg-navy py-14 lg:py-16" aria-label="Company at a glance">
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {stats.map((stat) => (
            <StatCounter key={stat.id} stat={stat} />
          ))}
        </dl>
      </div>
    </section>
  );
}