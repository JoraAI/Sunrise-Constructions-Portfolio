'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/lib/content';
import { cn } from '@/lib/utils';
import { SmartImage } from './SmartImage';

const AUTOPLAY_MS = 6000;

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [go, paused]);

  const active = testimonials[index];

  return (
    <section
      className="section section-dark relative overflow-hidden"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="bg-navy-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container-page relative">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold" aria-hidden />
            Client Voices
          </span>
          <h2 id="testimonials-heading" className="mt-4 text-display-lg text-white">
            What our clients say
          </h2>
        </div>

        <div
          className="mx-auto max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={active.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <Quote className="h-10 w-10 text-gold" aria-hidden />
              <blockquote className="mt-6 max-w-3xl font-heading text-xl font-medium leading-relaxed text-white lg:text-2xl">
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-8 flex flex-col items-center gap-3">
                <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-gold/30">
                  <SmartImage
                    src={active.image}
                    alt={active.alt}
                    aspect="aspect-square"
                    sizes="4rem"
                    className="h-full w-full"
                  />
                </div>
                <div>
                  <p className="font-heading font-bold text-white">{active.name}</p>
                  <p className="text-sm text-white/60">
                    {active.role}, {active.company}
                  </p>
                  <p className="mt-1 text-xs text-gold">{active.project}</p>
                </div>
                <div className="mt-1 flex gap-0.5" aria-label={`${active.rating} out of 5 stars`}>
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === index ? 'w-8 bg-gold' : 'w-2 bg-white/30 hover:bg-white/50',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}