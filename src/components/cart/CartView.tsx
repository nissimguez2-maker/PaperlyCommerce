'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { cartSubtotal, resolveLines } from '@/lib/cart';
import { formatPrice, t } from '@/lib/format';
import { productPath } from '@/data/catalog';
import { Media } from '@/components/Media';
import { Arrow } from '@/components/Arrow';
import { useCart } from './CartProvider';

export function CartView() {
  const tc = useTranslations('cart');
  const locale = useLocale() as Locale;
  const { lines, setQty, removeLine, ready } = useCart();
  const resolved = resolveLines(lines);
  const subtotal = cartSubtotal(resolved);

  if (!ready) {
    return <div className="container-page section min-h-[40vh]" aria-hidden />;
  }

  if (resolved.length === 0) {
    return (
      <div className="container-page section">
        <h1 className="text-h1-sm md:text-h1">{tc('title')}</h1>
        <div className="mt-12 max-w-text">
          <h2 className="font-display text-h3">{tc('empty.title')}</h2>
          <p className="mt-3 text-ink-60">{tc('empty.body')}</p>
          <Link href="/collection" className="btn-primary mt-6">
            {tc('empty.cta')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page section">
      <h1 className="text-h1-sm md:text-h1">{tc('title')}</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        {/* Lines */}
        <ul className="lg:col-span-7 xl:col-span-8">
          {resolved.map((line) => (
            <li
              key={`${line.productSlug}-${line.variantId}`}
              className="flex gap-5 border-t border-hairline py-6 first:border-t-0 first:pt-0"
            >
              <Link href={productPath(line.product)} className="w-24 shrink-0 sm:w-28">
                <Media
                  src={line.product.images[0]}
                  alt={t(line.product.imageAlt, locale)}
                  ratio="aspect-card"
                  sizes="120px"
                  mark={t(line.product.name, locale).charAt(0)}
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={productPath(line.product)} className="font-display text-xl">
                      {t(line.product.name, locale)}
                    </Link>
                    <p className="mt-1 text-caption text-ink-60">{t(line.variant.label, locale)}</p>
                  </div>
                  <span className="font-body font-semibold">{formatPrice(line.lineTotal)}</span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                  <div className="inline-flex items-center border border-hairline">
                    <button
                      type="button"
                      onClick={() => setQty(line.productSlug, line.variantId, line.qty - 1)}
                      className="px-3 py-2 leading-none transition-colors hover:bg-beige-soft"
                      aria-label="−"
                    >
                      −
                    </button>
                    <span className="min-w-8 px-1 text-center tabular-nums">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(line.productSlug, line.variantId, line.qty + 1)}
                      className="px-3 py-2 leading-none transition-colors hover:bg-beige-soft"
                      aria-label="+"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.productSlug, line.variantId)}
                    className="text-caption uppercase tracking-wide text-ink-60 transition-colors hover:text-ink"
                  >
                    {tc('remove')}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="lg:col-span-5 xl:col-span-4">
          <div className="border border-hairline p-7">
            <h2 className="label">{tc('summary')}</h2>
            <div className="mt-5 flex items-center justify-between border-t border-hairline pt-5">
              <span className="text-lg">{tc('subtotal')}</span>
              <span className="font-body text-xl font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-caption text-ink-60">{tc('subtotalNote')}</p>
            <Link href="/checkout" className="btn-primary btn-block mt-6">
              {tc('checkout')}
            </Link>
            <Link href="/collection" className="link-quiet mt-5 justify-center">
              {tc('continue')}
              <Arrow />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
