import type { TeamMember } from '@/types/content';
import { team as defaultTeam } from '@/lib/content';
import { Linkedin } from 'lucide-react';

import { SectionHeading } from './SectionHeading';
import { SmartImage } from './SmartImage';
import { Reveal } from './Reveal';

export function TeamGrid({ team = defaultTeam }: { team?: TeamMember[] }) {
  return (
    <section className="section bg-white" aria-labelledby="team-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Leadership"
          title={<span id="team-heading">The people behind the work</span>}
          description="An experienced leadership team that has scaled Sunrise from a regional contractor to a ₹300Cr+ engineering enterprise."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={(i % 3) * 0.1}>
              <article className="card group h-full overflow-hidden ring-1 ring-transparent transition-all duration-500 hover:shadow-xl hover:ring-gold/40">
                <div className="relative">
                  <SmartImage
                    src={member.image}
                    alt={member.alt}
                    aspect="aspect-[4/5]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" aria-hidden />
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-gold text-navy opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-navy">{member.name}</h3>
                  <p className="text-sm font-semibold text-gold">{member.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-light">{member.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}