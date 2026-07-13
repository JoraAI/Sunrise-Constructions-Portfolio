'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SlideVideo {
  src: string;
  poster: string;
  label?: string;
}

interface VideoSlideshowProps {
  videos: SlideVideo[];
  /** Number of full sequence passes before stopping (0 = infinite). */
  loopAfter?: number;
  /** Crossfade duration in ms. */
  transitionDuration?: number;
  className?: string;
}

/**
 * Full-bleed background video slideshow.
 *
 * Behaviour:
 *  - Renders a static poster image immediately (LCP-friendly).
 *  - Lazy-inits the active <video> after the poster is painted + on user idle.
 *  - Each video autoplays muted; on `ended` advances to the next.
 *  - Crossfade between videos via opacity blend.
 *  - Progress indicator (thin bars) shows position in the sequence.
 *  - Mute/unmute toggle in the bottom corner.
 *  - Falls back to poster on video load failure.
 *
 * Usage: <VideoSlideshow videos={[...]} loopAfter={0} transitionDuration={600} />
 */
export function VideoSlideshow({
  videos,
  loopAfter = 0,
  transitionDuration = 600,
  className,
}: VideoSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Defer video initialisation until idle (protects LCP/INP).
  useEffect(() => {
    const idle =
      (window as Window & { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb) => setTimeout(cb, 1200));
    const handle = idle(() => setReady(true));
    return () => {
      if ('cancelIdleCallback' in window) {
        (window as Window & { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback?.(
          handle as number,
        );
      }
    };
  }, []);

  const advance = useCallback(() => {
    setActiveIndex((current) => {
      const isLast = current === videos.length - 1;
      if (isLast) {
        // Honour loopAfter: stop after N full passes (0 = infinite).
        const nextLoopCount = loopCount + 1;
        setLoopCount(nextLoopCount);
        if (loopAfter > 0 && nextLoopCount >= loopAfter) {
          return current; // freeze on last
        }
        return 0; // loop
      }
      return current + 1;
    });
  }, [videos.length, loopAfter, loopAfter]);

  // Play the active video whenever index changes.
  useEffect(() => {
    const v = videoRefs.current[activeIndex];
    if (!v || !ready) return;
    v.currentTime = 0;
    v.muted = muted;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => setFailed(true));
    }
  }, [activeIndex, ready, muted]);

  // Sync mute across all video elements.
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = muted;
    });
  }, [muted]);

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden>
      {/* Static poster fallback - painted immediately, doubles as LCP image. */}
      <img
        src={videos[0]?.poster}
        alt=""
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
          ready && !failed ? 'opacity-0' : 'opacity-100',
        )}
      />

      {/* Video stack - all mounted, crossfade via opacity. */}
      {ready && !failed && (
        <div className="absolute inset-0">
          {videos.map((video, i) => (
            <video
              key={video.src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={video.src}
              poster={video.poster}
              muted={muted}
              playsInline
              preload="auto"
              onEnded={advance}
              onError={() => i === activeIndex && setFailed(true)}
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out',
                i === activeIndex ? 'opacity-100' : 'opacity-0',
              )}
              style={{ transitionDuration: `${transitionDuration}ms` }}
              tabIndex={-1}
            />
          ))}
        </div>
      )}

      {/* Dark gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/55 to-navy/85" />

      {/* Mute toggle */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute background video' : 'Mute background video'}
        className="absolute bottom-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-navy/30 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      {/* Progress indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {videos.map((video, i) => (
          <button
            key={video.src}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}: ${video.label ?? ''}`}
            className={cn(
              'h-1 rounded-full transition-all duration-300',
              i === activeIndex
                ? 'w-10 bg-gold'
                : 'w-5 bg-white/40 hover:bg-white/70',
            )}
          />
        ))}
      </div>
    </div>
  );
}