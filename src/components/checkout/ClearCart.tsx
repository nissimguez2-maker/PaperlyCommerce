'use client';

import { useEffect } from 'react';
import { useCart } from '@/components/cart/CartProvider';

/** Empties the cart once a payment has completed. */
export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
