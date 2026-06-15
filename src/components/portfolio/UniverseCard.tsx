import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Universe } from '@/data/portfolio';
import type { Locale } from '@/i18n/routing';
import { t } from '@/lib/format';
import { Media } from '@/components/Media';
import { Arrow } from '@/components/Arrow';

export function UniverseCard({
  universe,
  locale,
  priority,
}: {
  universe: Universe;
  locale: Locale;
  priority?: boolean;
}) {
  const tp = useTranslations('portfolio');
  const href = `/portfolio/${universe.slug}`;
  return (
    <article className="group grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <Link href={href} aria-label={t(universe.title, locale)}>
        <Media
          src={universe.hero.src}
          alt={t(universe.hero.alt, locale)}
          ratio="aspect-[4/5]"
          sizes="(min-width: 768px) 50vw, 100vw"
          priority={priority}
        />
      </Link>
      <div>
        <p className="label">{t(universe.subtitle, locale)}</p>
        <h2 className="mt-3 text-h2-sm md:text-h2">
          <Link href={href} className="transition-colors group-hover:text-ink-60">
            {t(universe.title, locale)}
          </Link>
        </h2>
        <p className="mt-4 max-w-text text-lg text-ink-60">{t(universe.excerpt, locale)}</p>
        <Link href={href} className="link-quiet mt-6">
          {tp('viewUniverse')}
          <Arrow />
        </Link>
      </div>
    </article>
  );
}
