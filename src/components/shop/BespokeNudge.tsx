import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Arrow } from '@/components/Arrow';

/** Discreet upsell from The Collection toward a bespoke universe. */
export function BespokeNudge() {
  const t = useTranslations('collection.bespokeNudge');
  return (
    <section className="section">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-hairline pt-12 md:flex-row md:items-center">
          <div className="max-w-text">
            <h2 className="font-display text-h3">{t('title')}</h2>
            <p className="mt-3 text-ink-60">{t('body')}</p>
          </div>
          <Link href="/portfolio" className="link-quiet whitespace-nowrap">
            {t('cta')}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
