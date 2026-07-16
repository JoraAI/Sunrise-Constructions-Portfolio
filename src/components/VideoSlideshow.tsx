'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { mediaUrl } from '@/lib/cdn';

export interface SlideVideo {
  src: string;
  poster: string;
  label?: string;
}

interface VideoSlideshowProps {
  videos: SlideVideo[];
  loopAfter?: number;
  transitionDuration?: number;
  className?: string;
}

/**
 * Full-bleed background video slideshow.
 * Videos start immediately on page load (no lazy init).
 * All muted, no audio toggle.
 */
export function VideoSlideshow({
  videos,
  loopAfter = 0,
  transitionDuration = 600,
  className,
}: VideoSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const advance = useCallback(() => {
    setActiveIndex((current) => {
      const isLast = current === videos.length - 1;
      if (isLast) {
        const nextLoopCount = loopCount + 1;
        setLoopCount(nextLoopCount);
        if (loopAfter > 0 && nextLoopCount >= loopAfter) {
          return current;
        }
        return 0;
      }
      return current + 1;
    });
  }, [videos.length, loopAfter, loopCount]);

  useEffect(() => {
    const v = videoRefs.current[activeIndex];
    if (!v) return;
    v.currentTime = 0;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => setFailed(true));
    }
  }, [activeIndex]);

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden>
      <img
        src={mediaUrl(videos[0]?.poster || '')}
        alt=""
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
          loaded && !failed ? 'opacity-0' : 'opacity-100',
        )}
      />

      {!failed && (
        <div className="absolute inset-0">
          {videos.map((video, i) => (
            <video
              key={video.src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={mediaUrl(video.src)}
              poster={mediaUrl(video.poster)}
              muted
              autoPlay={i === 0}
              playsInline
              preload="auto"
              onLoadedData={() => i === 0 && setLoaded(true)}
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

      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/55 to-navy/85" />

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