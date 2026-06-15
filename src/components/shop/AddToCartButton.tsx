'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { track } from '@/lib/analytics';
import { useCart } from '@/components/cart/CartProvider';

interface Props {
  productSlug: string;
  variantId: string;
  qty?: number;
  variant?: 'primary' | 'secondary';
  className?: string;
  /** For analytics + the SR status message. */
  itemName?: string;
  price?: number;
}

/** Adds a line to the cart with a brief, accessible "Added" confirmation. */
export function AddToCartButton({
  productSlug,
  variantId,
  qty = 1,
  variant = 'primary',
  className = '',
  itemName,
  price,
}: Props) {
  const t = useTranslations('common');
  const { addLine } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = () => {
    addLine({ productSlug, variantId, qty });
    track('add_to_cart', {
      currency: 'ILS',
      value: price ? price * qty : undefined,
      item_id: variantId,
      item_name: itemName,
      quantity: qty,
    });
    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}
      >
        {justAdded ? `${t('added')} ✓` : t('addToCart')}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {justAdded && itemName ? `${itemName} — ${t('added')}` : ''}
      </span>
    </>
  );
}
