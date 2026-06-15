import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function LocaleNotFound() {
  const t = await getTranslations('notFound');
  return (
    <div className="container-page section">
      <div className="max-w-text">
        <p className="label">404</p>
        <h1 className="mt-4 text-h1-sm md:text-h1">{t('title')}</h1>
        <p className="mt-5 text-lg text-ink-60">{t('body')}</p>
        <Link href="/" className="btn-primary mt-8">
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
