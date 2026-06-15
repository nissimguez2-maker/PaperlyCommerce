import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { t } from '@/lib/format';
import { collections, getProductsByCollection } from '@/data/catalog';
import { Link } from '@/i18n/navigation';
import { Arrow } from '@/components/Arrow';
import { ProductCard } from '@/components/shop/ProductCard';
import { BespokeNudge } from '@/components/shop/BespokeNudge';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ts = await getTranslations({ locale, namespace: 'seo.collection' });
  return buildMetadata({
    locale,
    path: '/collection',
    title: ts('title'),
    description: ts('description'),
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations({ locale, namespace: 'collection' });
  const tn = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: 'Home', path: '/' },
          { name: tn('collection'), path: '/collection' },
        ])}
      />

      {/* No full-bleed hero on shop pages. */}
      <section className="section pb-0">
        <div className="container-page max-w-text">
          <p className="label">{tc('eyebrow')}</p>
          <h1 className="mt-4 text-h1-sm md:text-[3.5rem] md:leading-[1.05]">{tc('title')}</h1>
          <p className="mt-5 text-lg text-ink-60">{tc('intro')}</p>
        </div>
      </section>

      {collections.map((collection) => {
        const items = getProductsByCollection(collection.id);
        return (
          <section key={collection.id} className="section pb-0" id={collection.slug}>
            <div className="container-page">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-t border-hairline pt-10">
                <div className="max-w-text">
                  <h2 className="text-h2-sm md:text-h2">{t(collection.name, locale)}</h2>
                  <p className="mt-2 text-ink-60">{t(collection.tagline, locale)}</p>
                </div>
                <Link href={`/collection/${collection.slug}`} className="link-quiet">
                  {tn('collection')}
                  <Arrow />
                </Link>
              </div>
              <ProductGrid collectionId={collection.id} locale={locale} />
            </div>
          </section>
        );
      })}

      <BespokeNudge />
    </>
  );
}

function ProductGrid({
  collectionId,
  locale,
}: {
  collectionId: 'pieces' | 'complete-sets';
  locale: Locale;
}) {
  const items = getProductsByCollection(collectionId);
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
      {items.map((product, i) => (
        <ProductCard key={product.slug} product={product} locale={locale} priority={i < 3} />
      ))}
    </div>
  );
}
