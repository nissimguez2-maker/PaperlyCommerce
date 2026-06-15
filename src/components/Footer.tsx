import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { instagramUrl, site, whatsappLink } from '@/lib/site';

const EXPLORE = [
  { href: '/collection', key: 'collection' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/studio', key: 'studio' },
  { href: '/how-it-works', key: 'howItWorks' },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-section-sm border-t border-hairline md:mt-section">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        {/* Brand */}
        <div className="md:col-span-5">
          <p className="font-display text-3xl font-medium" dir="ltr">
            Paperly
          </p>
          <p className="mt-3 max-w-text text-ink-60">{t('blurb')}</p>
        </div>

        {/* Explore */}
        <nav className="md:col-span-3" aria-label={t('explore')}>
          <p className="label mb-4">{t('explore')}</p>
          <ul className="space-y-3">
            {EXPLORE.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-60 transition-colors hover:text-ink">
                  {tn(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect */}
        <div className="md:col-span-4">
          <p className="label mb-4">{t('connect')}</p>
          <ul className="space-y-3">
            <li>
              <a
                href={whatsappLink(t('waMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-60 transition-colors hover:text-ink"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-60 transition-colors hover:text-ink"
                dir="ltr"
              >
                @{site.instagramHandle}
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-ink-60 transition-colors hover:text-ink">
                {tn('contact')}
              </Link>
            </li>
            <li>
              <Link href="/for-planners" className="text-ink-60 transition-colors hover:text-ink">
                {t('forPlanners')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-page flex flex-col gap-2 py-6 text-caption text-ink-60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Paperly · {t('rights')}</p>
          <p>{t('madeIn')}</p>
        </div>
      </div>
    </footer>
  );
}
