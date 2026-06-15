import Image from 'next/image';

interface MediaProps {
  src?: string;
  alt: string;
  /** Tailwind aspect ratio class, e.g. "aspect-card" or "aspect-[3/2]". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Faint mark shown on placeholder blocks (e.g. a piece initial). */
  mark?: string;
}

/**
 * Renders a real image, or — when none is provided yet — a SOLID beige-soft
 * editorial placeholder (never a gray "image coming soon" box, per the brief).
 */
export function Media({
  src,
  alt,
  ratio = 'aspect-card',
  sizes = '(min-width: 1024px) 33vw, 100vw',
  priority = false,
  className = '',
  mark,
}: MediaProps) {
  return (
    <div className={`relative overflow-hidden ${ratio} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          className="placeholder-fill flex h-full w-full items-center justify-center"
          role="img"
          aria-label={alt}
        >
          {mark && (
            <span
              className="font-display text-5xl font-medium text-ink/10 select-none"
              aria-hidden
              dir="ltr"
            >
              {mark}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
