import { useTranslations } from 'next-intl';
import { instagramUrl, site } from '@/lib/site';

/**
 * A FINITE Instagram strip — 6 tiles on desktop, 4 on mobile. Every tile opens
 * Instagram in a new tab. This is the graceful fallback / scaffold: once a feed
 * token or curated images exist, drop them into the tiles. The handle, link and
 * embed are never mirrored under RTL.
 */
export function InstagramFeed() {
  const t = useTranslations('instagram');
  const tiles = Array.from({ length: 6 });

  return (
    <section className="section pt-0">
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-h3 font-display">{t('title')}</h2>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet"
            dir="ltr"
          >
            {t('cta')}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((_, i) => (
            <a
              key={i}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`@${site.instagramHandle} on Instagram`}
              className={`placeholder-fill group relative flex aspect-square items-center justify-center transition-colors hover:bg-beige-accent/40 ${
                i >= 4 ? 'hidden lg:flex' : ''
              }`}
            >
              <InstagramGlyph />
            </a>
          ))}
        </div>

        <p className="mt-6 text-caption text-ink-60">{t('fallback')}</p>
      </div>
    </section>
  );
}

function InstagramGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="text-ink/40">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}
