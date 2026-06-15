'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Product } from '@/data/types';
import type { Locale } from '@/i18n/routing';
import { formatPrice, t } from '@/lib/format';
import { useCart } from '@/components/cart/CartProvider';

/** Resolve the variant matching the currently selected option values. */
function matchVariant(product: Product, selected: Record<string, string>) {
  if (product.optionGroups.length === 0) return product.variants[0];
  return (
    product.variants.find((v) =>
      product.optionGroups.every((g) => v.options[g.key] === selected[g.key]),
    ) ?? product.variants[0]
  );
}

export function ProductPurchase({ product, locale }: { product: Product; locale: Locale }) {
  const tp = useTranslations('product');
  const tc = useTranslations('common');
  const { addLine } = useCart();

  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.optionGroups.map((g) => [g.key, g.values[0].value])),
  );
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const variant = useMemo(() => matchVariant(product, selected), [product, selected]);

  const onAdd = () => {
    addLine({ productSlug: product.slug, variantId: variant.id, qty });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  const priceLabel = formatPrice(variant.price);

  return (
    <div>
      <p className="mt-4 font-body text-3xl font-semibold text-ink" aria-live="polite">
        {priceLabel}
      </p>

      {/* Option selectors */}
      {product.optionGroups.map((group) => (
        <fieldset key={group.key} className="mt-7">
          <legend className="label mb-3">{t(group.label, locale)}</legend>
          <div className="flex flex-wrap gap-2">
            {group.values.map((opt) => {
              const active = selected[group.key] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelected((s) => ({ ...s, [group.key]: opt.value }))}
                  aria-pressed={active}
                  className={`rounded-none border px-4 py-2.5 text-button uppercase transition-colors ${
                    active
                      ? 'border-ink bg-ink text-paper'
                      : 'border-hairline text-ink hover:border-ink'
                  }`}
                >
                  {t(opt.label, locale)}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      {/* Quantity */}
      <div className="mt-7">
        <p className="label mb-3">{tp('quantity')}</p>
        <div className="inline-flex items-center border border-hairline">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-3 text-lg leading-none transition-colors hover:bg-beige-soft"
            aria-label="−"
          >
            −
          </button>
          <span className="min-w-10 px-2 text-center tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-4 py-3 text-lg leading-none transition-colors hover:bg-beige-soft"
            aria-label="+"
          >
            +
          </button>
        </div>
      </div>

      {/* Desktop add-to-cart */}
      <button type="button" onClick={onAdd} className="btn-primary btn-block mt-8">
        {justAdded ? `${tp('added')} ✓` : tp('addToCart')}
      </button>

      <p className="mt-4 text-caption text-ink-60">{tp('finalSale')}</p>

      {/* Sticky add-to-cart on mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-paper/95 p-3 backdrop-blur-sm md:hidden">
        <div className="flex items-center gap-3">
          <span className="font-body text-lg font-semibold">{priceLabel}</span>
          <button type="button" onClick={onAdd} className="btn-primary flex-1">
            {justAdded ? `${tp('added')} ✓` : tc('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}
