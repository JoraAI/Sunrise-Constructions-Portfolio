import { ShieldCheck, Award, Newspaper, Users } from 'lucide-react';
import { certifications, clientLogos, pressMentions } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

export function CredibilityBand() {
  return (
    <section className="section bg-white" aria-labelledby="credibility-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Trusted & Recognised"
          title={<span id="credibility-heading">Proof, not promises</span>}
          description="Certifications, client relationships, and press recognition that underscore the scale and credibility of our enterprise."
        />

        {/* Certifications */}
        <Reveal delay={0.1} className="mt-14">
          <div className="flex items-center justify-center gap-3 text-center">
            <ShieldCheck className="h-5 w-5 text-gold" />
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-charcoal-muted">
              Certifications & Memberships
            </h3>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert.name}
                title={cert.description}
                className="flex items-center gap-2 rounded-xl border border-navy/10 bg-cream px-4 py-2.5 text-sm font-semibold text-navy"
              >
                <Award className="h-4 w-4 text-gold" />
                {cert.name}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Client logos */}
        <Reveal delay={0.15} className="mt-16">
          <div className="flex items-center justify-center gap-3 text-center">
            <Users className="h-5 w-5 text-gold" />
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-charcoal-muted">
              Clients & Partners
            </h3>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {clientLogos.map((logo) => (
              <div
                key={logo}
                className="flex items-center justify-center rounded-xl border border-navy/10 bg-cream/50 px-4 py-6"
              >
                <span className="font-heading text-lg font-bold text-navy/40">{logo}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Press mentions */}
        <Reveal delay={0.2} className="mt-16">
          <div className="flex items-center justify-center gap-3 text-center">
            <Newspaper className="h-5 w-5 text-gold" />
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-charcoal-muted">
              In the Press
            </h3>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pressMentions.map((press) => (
              <figure
                key={press.outlet}
                className="rounded-xl border border-navy/10 bg-cream/50 p-5 text-center"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-gold">{press.outlet}</p>
                <blockquote className="mt-2 text-sm italic text-charcoal-light">
                  {press.headline}
                </blockquote>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}