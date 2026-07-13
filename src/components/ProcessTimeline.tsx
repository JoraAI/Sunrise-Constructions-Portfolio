import { processSteps } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { Icon } from './Icon';

export function ProcessTimeline() {
  return (
    <section className="section bg-white" aria-labelledby="process-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="How We Work"
          title={<span id="process-heading">A proven delivery process</span>}
          description="Six disciplined stages that take a project from first conversation to confident handover - with accountability at every step."
        />

        <ol className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
          {/* Connecting line for large screens */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent lg:block"
            aria-hidden
          />
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.id} delay={(i % 3) * 0.1} className="relative">
              <div className="flex gap-5">
                {/* Step number + icon */}
                <div className="relative shrink-0">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold shadow-navy">
                    <Icon name={step.icon} className="h-6 w-6" />
                  </span>
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal-light">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}