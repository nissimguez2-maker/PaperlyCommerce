import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { universes } from '@/data/portfolio';
import { UniverseCard } from '@/components/portfolio/UniverseCard';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ts = await getTranslations({ locale, namespace: 'seo.portfolio' });
  return buildMetadata({
    locale,
    path: '/portfolio',
    title: ts('title'),
    description: ts('description'),
    ogImage: '/og/chloe-albert-deep-green.jpg',
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tp = await getTranslations({ locale, namespace: 'portfolio' });
  const tn = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: 'Home', path: '/' },
          { name: tn('portfolio'), path: '/portfolio' },
        ])}
      />
      <section className="section pb-0">
        <div className="container-page max-w-text">
          <p className="label">{tp('eyebrow')}</p>
          <h1 className="mt-4 text-h1-sm md:text-[3.5rem] md:leading-[1.05]">{tp('title')}</h1>
          <p className="mt-5 text-lg text-ink-60">{tp('intro')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-page space-y-20">
          {universes.map((universe, i) => (
            <UniverseCard key={universe.slug} universe={universe} locale={locale} priority={i === 0} />
          ))}
        </div>
      </section>
    </>
  );
}
