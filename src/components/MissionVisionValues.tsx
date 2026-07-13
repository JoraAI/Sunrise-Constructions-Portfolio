import { missionVisionValues } from '@/lib/content';
import { Reveal } from './Reveal';
import { Icon } from './Icon';

export function MissionVisionValues() {
  return (
    <section
      className="section section-dark relative overflow-hidden"
      aria-labelledby="mvv-heading"
    >
      <div className="bg-navy-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="container-page relative">
        <Reveal direction="none" className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold" aria-hidden />
            Our Foundation
          </span>
          <h2 id="mvv-heading" className="mt-4 text-display-lg text-white">
            What drives us forward
          </h2>
          <p className="mt-4 text-white/70">
            For over three decades, a clear sense of purpose has guided every decision
            we make and every structure we build.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {missionVisionValues.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.12}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-gold/40 hover:bg-white/[0.07]">
                <span className="absolute right-6 top-6 font-heading text-6xl font-extrabold text-white/5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold transition-transform duration-500 group-hover:scale-110">
                  <Icon name={item.icon} className="h-7 w-7" />
                </span>
                <h3 className="font-heading text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}