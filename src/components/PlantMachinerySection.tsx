import { Check, Truck, ShieldCheck, Gauge, Wrench } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { SmartImage } from './SmartImage';
import { Reveal } from './Reveal';
import { plantAndMachinery } from '@/lib/content';

interface PlantMachinerySectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function PlantMachinerySection({
  eyebrow = 'In-House Fleet & Assets',
  title = 'Plant, machinery & heavy equipment fleet',
  description = 'We own and operate high-capacity automated batching plants, motor graders, boom placers, and heavy tippers—delivering complete self-performance with zero third-party dependency.',
  className = 'section bg-white',
}: PlantMachinerySectionProps) {
  const fleetHighlights = [
    {
      icon: Gauge,
      value: '100%',
      label: 'Self-Performance',
      sub: 'Zero reliance on rental equipment delays',
    },
    {
      icon: Truck,
      value: 'Captive',
      label: 'Batching & Transit Fleet',
      sub: 'Dedicated twin-silo RMC plant & mixers',
    },
    {
      icon: Wrench,
      value: 'Modern',
      label: 'CAT & Wirtgen Fleet',
      sub: 'Precision graders, loaders & pavers',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'All-Weather Ready',
      sub: 'Mobilised across Maharashtra sites',
    },
  ];

  return (
    <section className={className} aria-labelledby="plant-machinery-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow={eyebrow}
          title={<span id="plant-machinery-heading">{title}</span>}
          description={description}
        />

        {/* Fleet KPI Banner */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {fleetHighlights.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-navy/5 bg-cream/40 p-5 transition-all duration-300 hover:border-gold/30 hover:bg-white hover:shadow-navy-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-heading text-2xl font-extrabold text-navy">{item.value}</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-light">
                      {item.label}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-charcoal-muted">{item.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Machinery Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {plantAndMachinery.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-navy-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-navy">
                <div className="relative overflow-hidden">
                  <SmartImage
                    src={item.image}
                    alt={item.alt}
                    aspect="aspect-[16/10]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-navy/80 px-3 py-1 text-xs font-semibold text-gold backdrop-blur-md">
                    {item.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-heading text-xl font-bold text-navy group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-gold">{item.specs}</p>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal-light">
                    {item.description}
                  </p>

                  <div className="mt-6 border-t border-navy/5 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy">
                      Key Capabilities:
                    </p>
                    <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {item.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-charcoal-light">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                          <span>{feat}</span>
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
