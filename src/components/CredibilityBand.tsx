import { Newspaper, Users, Building2 } from 'lucide-react';
import { clientLogos, pressMentions } from '@/lib/content';
import { mediaUrl } from '@/lib/cdn';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

export function CredibilityBand() {
  return (
    <section className="section bg-white" aria-labelledby="credibility-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Trusted & Recognised"
          title={<span id="credibility-heading">Proof, not promises</span>}
          description="Institutional clients and press recognition that underscore the scale and credibility of our enterprise."
        />

        {/* Client logos - premium horizontal strip */}
        <Reveal delay={0.1} className="mt-14">
          <div className="rounded-3xl border border-navy/10 bg-gradient-to-br from-cream/60 to-white p-8 sm:p-10">
            <div className="mb-8 flex items-center justify-center gap-3 text-center">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
              <Users className="h-5 w-5 text-gold" />
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-charcoal-muted">
                Clients & Partners
              </h3>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            {/* Logo grid with premium card styling */}
            <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {clientLogos.map((client) => (
                <div
                  key={client.name}
                  className="group relative flex h-24 items-center justify-center rounded-2xl border border-navy/5 bg-white px-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-navy-md"
                >
                  {client.logo ? (
                    <img
                      src={mediaUrl(client.logo)}
                      alt={`${client.name} - client of Sunrise Constructions`}
                      className="max-h-14 w-auto object-contain opacity-70 transition-all duration-500 group-hover:opacity-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                      <Building2 className="h-8 w-8 text-navy/30" />
                      <span className="text-center text-xs font-semibold leading-tight text-navy/50">
                        {client.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-charcoal-muted">
              Trusted by India&rsquo;s leading infrastructure authorities and enterprises
            </p>
          </div>
        </Reveal>

        {/* Press mentions */}
        <Reveal delay={0.2} className="mt-16">
          <div className="flex items-center justify-center gap-3 text-center">
            <Newspaper className="h-5 w-5 text-gold" />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-charcoal-muted">
              In the Press
            </h3>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {pressMentions.map((press) => (
              <figure
                key={press.outlet}
                className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-cream/40 p-6 text-center transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white hover:shadow-navy-sm"
              >
                {/* Decorative quote mark */}
                <span className="pointer-events-none absolute -right-2 -top-2 font-heading text-6xl font-bold text-navy/5 transition-colors group-hover:text-gold/10">
                  &rdquo;
                </span>
                <p className="relative text-xs font-bold uppercase tracking-wide text-gold">{press.outlet}</p>
                <blockquote className="relative mt-3 text-sm italic leading-relaxed text-charcoal-light">
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