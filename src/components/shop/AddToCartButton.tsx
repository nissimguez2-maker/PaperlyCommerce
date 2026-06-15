'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/components/cart/CartProvider';

interface Props {
  productSlug: string;
  variantId: string;
  qty?: number;
  variant?: 'primary' | 'secondary';
  className?: string;
}

/** Adds a line to the cart with a brief "Added" confirmation. */
export function AddToCartButton({
  productSlug,
  variantId,
  qty = 1,
  variant = 'primary',
  className = '',
}: Props) {
  const t = useTranslations('common');
  const { addLine } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const onClick = () => {
    addLine({ productSlug, variantId, qty });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}
      aria-live="polite"
    >
      {justAdded ? `${t('added')} ✓` : t('addToCart')}
    </button>
  );
}
