import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import { ClearCart } from '@/components/checkout/ClearCart';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ts = await getTranslations({ locale, namespace: 'checkoutResult' });
  return buildMetadata({
    locale,
    path: '/checkout/success',
    title: ts('successTitle'),
    description: ts('successBody'),
    noindex: true,
  });
}

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ order?: string }>;
}) {
  const { locale } = await params;
  const { order } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'checkoutResult' });
  return (
    <div className="container-page section">
      <ClearCart orderId={order} />
      <div className="max-w-text">
        <h1 className="text-h1-sm md:text-h1">{t('successTitle')}</h1>
        <p className="mt-5 text-lg text-ink-60">{t('successBody')}</p>
        <Link href="/collection" className="btn-primary mt-8">
          {t('successCta')}
        </Link>
      </div>
    </div>
  );
}
