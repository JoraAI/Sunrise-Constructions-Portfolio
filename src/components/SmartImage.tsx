import { cn } from '@/lib/utils';

interface SmartImageProps {
  src: string;
  alt: string;
  /** Aspect ratio class for the reserved container (prevents CLS). */
  aspect?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  sizes?: string;
}

/**
 * Image wrapper with a reserved aspect-ratio container to prevent CLS.
 *
 * Uses a plain <img> element so it works reliably with local SVG placeholders
 * without requiring the next/image optimizer. When you swap in real raster
 * assets (jpg/png/webp), you can switch the inner element back to next/image
 * for automatic optimisation and responsive srcsets.
 */
export function SmartImage({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  priority = false,
  className,
  imgClassName,
}: SmartImageProps) {
  return (
    <div className={cn('relative overflow-hidden', aspect, className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </div>
  );
}