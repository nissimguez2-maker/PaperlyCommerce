import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { t } from '@/lib/format';
import { collections, getCollection, getProductsByCollection } from '@/data/catalog';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductCard } from '@/components/shop/ProductCard';
import { BespokeNudge } from '@/components/shop/BespokeNudge';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    collections.map((c) => ({ locale, category: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const collection = getCollection(category as 'pieces' | 'complete-sets');
  if (!collection) return {};
  return buildMetadata({
    locale,
    path: `/collection/${collection.slug}`,
    title: `${t(collection.name, locale)} — Paperly`,
    description: t(collection.description, locale),
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const collection = getCollection(category as 'pieces' | 'complete-sets');
  if (!collection) notFound();

  const tn = await getTranslations({ locale, namespace: 'nav' });
  const items = getProductsByCollection(collection.id);
  const collName = t(collection.name, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: 'Home', path: '/' },
          { name: tn('collection'), path: '/collection' },
          { name: collName, path: `/collection/${collection.slug}` },
        ])}
      />

      <section className="section pb-0">
        <div className="container-page">
          <Breadcrumbs
            items={[
              { name: tn('collection'), href: '/collection' },
              { name: collName },
            ]}
          />
          <div className="mt-8 max-w-text">
            <h1 className="text-h1-sm md:text-[3.25rem] md:leading-[1.06]">{collName}</h1>
            <p className="mt-4 text-lg text-ink-60">{t(collection.description, locale)}</p>
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
            {items.map((product, i) => (
              <ProductCard key={product.slug} product={product} locale={locale} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>

      <BespokeNudge />
    </>
  );
}
