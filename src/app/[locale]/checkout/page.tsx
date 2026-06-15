import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { CheckoutView } from '@/components/checkout/CheckoutView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ts = await getTranslations({ locale, namespace: 'seo.checkout' });
  return buildMetadata({
    locale,
    path: '/checkout',
    title: ts('title'),
    description: ts('description'),
    noindex: true,
  });
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CheckoutView />;
}
