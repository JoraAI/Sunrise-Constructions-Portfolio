import Link from 'next/link';
import { ArrowRight, Users2, Shield, TrendingUp } from 'lucide-react';
import { careerStats } from '@/lib/content';
import { Reveal } from './Reveal';
import { Icon } from './Icon';

export function CareersTeaser() {
  const highlights = [
    { icon: Shield, label: 'Zero-harm safety culture' },
    { icon: TrendingUp, label: 'Structured growth pathways' },
    { icon: Users2, label: '2,400+ strong team' },
  ];

  return (
    <section className="section bg-cream" aria-labelledby="careers-teaser-heading">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <Reveal direction="none">
              <span className="eyebrow">
                <span className="h-px w-6 bg-gold" aria-hidden />
                Careers
              </span>
              <h2 id="careers-teaser-heading" className="mt-4 text-display-lg text-navy">
                Join our team
              </h2>
              <p className="mt-4 max-w-xl text-lg text-charcoal-light">
                We are always looking for engineers, project managers, and skilled
                professionals who want to build careers, not just hold jobs. At Sunrise,
                you will work on landmark projects alongside some of the best in the industry.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 flex flex-wrap gap-3">
                {highlights.map((h) => (
                  <li
                    key={h.label}
                    className="flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 text-sm font-medium text-navy"
                  >
                    <h.icon className="h-4 w-4 text-gold" />
                    {h.label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/careers" className="btn-primary group">
                  View Open Positions
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/careers" className="btn-outline group">
                  Life at Sunrise
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: stats */}
          <Reveal direction="left">
            <div className="grid grid-cols-2 gap-4">
              {careerStats.map((stat) => (
                <div
                  key={stat.id}
                  className="rounded-2xl border border-navy/5 bg-white p-6 shadow-navy-sm"
                >
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon name={stat.icon} className="h-5 w-5" />
                  </span>
                  <p className="font-heading text-2xl font-extrabold text-navy">{stat.value}</p>
                  <p className="mt-1 text-sm text-charcoal-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}