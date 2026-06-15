import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata, localeUrl } from '@/lib/seo';
import { t, tList } from '@/lib/format';
import {
  fulfillment as defaultFulfillment,
  getCollection,
  getProductBySlug,
  productPath,
  products,
} from '@/data/catalog';
import { Link } from '@/i18n/navigation';
import { Arrow } from '@/components/Arrow';
import { Media } from '@/components/Media';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductPurchase } from '@/components/shop/ProductPurchase';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, productJsonLd } from '@/lib/jsonld';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((p) => ({ locale, category: p.collection, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const ts = await getTranslations({ locale, namespace: 'seo' });
  const desc = t(product.description, locale);
  return buildMetadata({
    locale,
    path: productPath(product),
    title: `${t(product.name, locale)} — ${ts('productSuffix')}`,
    description: desc.length > 152 ? `${desc.slice(0, 152)}…` : desc,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const tp = await getTranslations({ locale, namespace: 'product' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const collection = getCollection(product.collection)!;
  const ff = { ...defaultFulfillment, ...product.fulfillment };
  const url = localeUrl(locale, productPath(product));
  const crossSell = product.crossSell
    .map(getProductBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product, locale, url),
          breadcrumbJsonLd(locale, [
            { name: 'Home', path: '/' },
            { name: tn('collection'), path: '/collection' },
            { name: t(collection.name, locale), path: `/collection/${collection.slug}` },
            { name: t(product.name, locale), path: productPath(product) },
          ]),
        ]}
      />

      <div className="container-page section pb-24 md:pb-0">
        <Breadcrumbs
          items={[
            { name: tn('collection'), href: '/collection' },
            { name: t(collection.name, locale), href: `/collection/${collection.slug}` },
            { name: t(product.name, locale) },
          ]}
        />

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Gallery */}
          <div>
            <div className="md:sticky md:top-28">
              {product.favourite && (
                <span className="mb-3 inline-block bg-beige-soft px-3 py-1 text-label text-ink">
                  {tp('favourite')}
                </span>
              )}
              <Media
                src={product.images[0]}
                alt={t(product.imageAlt, locale)}
                ratio="aspect-[4/5]"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                mark={t(product.name, locale).charAt(0)}
              />
              {product.images.length > 1 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {product.images.slice(1, 4).map((src) => (
                    <Media
                      key={src}
                      src={src}
                      alt={t(product.imageAlt, locale)}
                      ratio="aspect-square"
                      sizes="20vw"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-h2-sm md:text-h2">{t(product.name, locale)}</h1>
            <p className="mt-2 text-lg text-ink-60">{t(product.tagline, locale)}</p>

            <ProductPurchase product={product} locale={locale} />

            <p className="mt-8 max-w-text leading-relaxed text-ink">
              {t(product.description, locale)}
            </p>

            {/* What's included */}
            <section className="mt-10 border-t border-hairline pt-8">
              <h2 className="label">{tp('included')}</h2>
              <ul className="mt-4 space-y-2">
                {tList(product.included, locale).map((line) => (
                  <li key={line} className="flex gap-3 text-ink">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-beige-accent" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Format / dimensions */}
            <section className="mt-8 border-t border-hairline pt-8">
              <h2 className="label">{tp('dimensions')}</h2>
              <p className="mt-3 text-ink">{t(product.dimensions, locale)}</p>
            </section>

            {/* Fulfillment & lead time */}
            <section className="mt-8 border-t border-hairline pt-8">
              <h2 className="label">{tp('fulfillment')}</h2>
              <ul className="mt-4 space-y-2 text-ink">
                <li>{t(ff.digital, locale)}</li>
                <li>{t(ff.courier, locale)}</li>
                <li>{t(ff.pickup, locale)}</li>
                <li className="text-ink-60">{t(ff.leadTime, locale)}</li>
              </ul>
            </section>

            <Link href="/collection" className="link-quiet mt-10">
              {tp('backToCollection')}
              <Arrow />
            </Link>
          </div>
        </div>
      </div>

      {/* Cross-sell */}
      {crossSell.length > 0 && (
        <section className="section">
          <div className="container-page">
            <h2 className="mb-8 text-h3 font-display">{tp('crossSell')}</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
              {crossSell.map((p) => (
                <ProductCard key={p.slug} product={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
