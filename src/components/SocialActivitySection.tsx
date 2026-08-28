import { Flag, Users2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { SmartImage } from './SmartImage';
import { Reveal } from './Reveal';
import { socialActivities } from '@/lib/content';

interface SocialActivitySectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function SocialActivitySection({
  eyebrow = 'Culture & Community',
  title = 'Life, celebrations & social responsibility',
  description = 'Behind our infrastructure are the dedicated people who build it. We foster an inclusive culture rooted in national pride, worker welfare, and community celebration.',
  className = 'section bg-cream',
}: SocialActivitySectionProps) {
  return (
    <section className={className} aria-labelledby="social-activities-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow={eyebrow}
          title={<span id="social-activities-heading">{title}</span>}
          description={description}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {socialActivities.map((act, i) => (
            <Reveal key={act.id} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-navy-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-navy">
                <div className="relative overflow-hidden">
                  <SmartImage
                    src={act.image}
                    alt={act.alt}
                    aspect="aspect-[16/10]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy/85 px-3 py-1 text-xs font-semibold text-gold backdrop-blur-md">
                    {act.id.includes('flag') ? (
                      <Flag className="h-3.5 w-3.5 text-gold" />
                    ) : (
                      <Users2 className="h-3.5 w-3.5 text-gold" />
                    )}
                    <span>{act.category}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal-muted">
                    {act.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-gold" />
                        {act.date}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      {act.location}
                    </span>
                  </div>

                  <h3 className="mt-3 font-heading text-xl font-bold text-navy group-hover:text-gold transition-colors">
                    {act.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-charcoal-light">
                    {act.description}
                  </p>

                  <div className="mt-6 border-t border-navy/5 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy">
                      Key Highlights:
                    </p>
                    <ul className="mt-3 space-y-2">
                      {act.highlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-charcoal-light">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
