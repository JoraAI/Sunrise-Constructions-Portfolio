import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { heroContent, heroVideos } from '@/lib/content';
import { VideoSlideshow } from './VideoSlideshow';

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy"
      aria-labelledby="hero-heading"
    >
      {/* Background video slideshow */}
      <VideoSlideshow
        videos={heroVideos}
        loopAfter={0}
        transitionDuration={700}
      />

      {/* Content */}
      <div className="container-page relative z-10 py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden />
            {heroContent.eyebrow}
          </p>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-heading text-display-2xl font-extrabold text-white text-balance"
          >
            {heroContent.headline}{' '}
            <span className="text-gradient-gold">{heroContent.headlineAccent}</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 lg:text-xl">
            {heroContent.subheadline}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href={heroContent.primaryCta.href} className="btn-primary group">
              {heroContent.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={heroContent.secondaryCta.href} className="btn-secondary group">
              <Play className="h-4 w-4 fill-current" />
              {heroContent.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade into stats bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent" aria-hidden />
    </section>
  );
}