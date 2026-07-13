import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { aboutSection, aboutChecklist } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { SmartImage } from './SmartImage';
import { Reveal } from './Reveal';
import { Icon } from './Icon';

export function AboutSection() {
  return (
    <section className="section bg-white" aria-labelledby="about-heading">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text column */}
          <div>
            <SectionHeading
              eyebrow={aboutSection.eyebrow}
              title={
                <span id="about-heading">{aboutSection.heading}</span>
              }
              align="left"
            />
            <div className="mt-6 space-y-4">
              {aboutSection.body.map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.05}>
                  <p className="text-base leading-relaxed text-charcoal-light lg:text-lg">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25}>
              <Link href={aboutSection.cta.href} className="btn-outline mt-8 group">
                {aboutSection.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* Image + checklist column */}
          <div className="flex flex-col gap-8">
            <Reveal direction="left">
              <SmartImage
                src={aboutSection.image}
                alt={aboutSection.imageAlt}
                aspect="aspect-[4/3]"
                className="rounded-2xl shadow-navy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutChecklist.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 0.08}>
                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-heading text-sm font-bold text-navy">{item.title}</p>
                      <p className="mt-0.5 text-sm text-charcoal-light">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}