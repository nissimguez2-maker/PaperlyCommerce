'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';
import { useCart } from '@/components/cart/CartProvider';

/** Empties the cart once a payment has completed, and fires a purchase event. */
export function ClearCart({ orderId }: { orderId?: string }) {
  const { clear } = useCart();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    if (orderId) track('purchase', { transaction_id: orderId, currency: 'ILS' });
    clear();
  }, [clear, orderId]);

  return null;
}
