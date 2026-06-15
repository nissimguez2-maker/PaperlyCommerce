'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  CART_STORAGE_KEY,
  cartCount,
  lineKey,
  type CartLine,
} from '@/lib/cart';

interface CartContextValue {
  lines: CartLine[];
  count: number;
  ready: boolean;
  addLine: (line: CartLine) => void;
  setQty: (productSlug: string, variantId: string, qty: number) => void;
  removeLine: (productSlug: string, variantId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        l && typeof l.productSlug === 'string' && typeof l.variantId === 'string',
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  // Hydrate from storage once on mount.
  useEffect(() => {
    setLines(readStorage());
    setReady(true);
  }, []);

  // Persist + keep other tabs in sync.
  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) setLines(readStorage());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addLine = useCallback((incoming: CartLine) => {
    const qty = Math.max(1, Math.floor(incoming.qty));
    setLines((prev) => {
      const idx = prev.findIndex((l) => lineKey(l) === lineKey(incoming));
      if (idx === -1) return [...prev, { ...incoming, qty }];
      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + qty };
      return next;
    });
  }, []);

  const setQty = useCallback((productSlug: string, variantId: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.productSlug === productSlug && l.variantId === variantId
            ? { ...l, qty: Math.max(0, Math.floor(qty)) }
            : l,
        )
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeLine = useCallback((productSlug: string, variantId: string) => {
    setLines((prev) =>
      prev.filter((l) => !(l.productSlug === productSlug && l.variantId === variantId)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: cartCount(lines),
      ready,
      addLine,
      setQty,
      removeLine,
      clear,
    }),
    [lines, ready, addLine, setQty, removeLine, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
