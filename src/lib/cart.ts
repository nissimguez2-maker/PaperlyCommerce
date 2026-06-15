import { getProductBySlug, getVariant } from '@/data/catalog';
import type { Product, ProductVariant } from '@/data/types';

/** Persisted cart line — minimal; product details resolve from the catalog. */
export interface CartLine {
  productSlug: string;
  variantId: string;
  qty: number;
}

export interface ResolvedLine extends CartLine {
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
}

export const CART_STORAGE_KEY = 'paperly.cart.v1';

export function lineKey(line: CartLine): string {
  return `${line.productSlug}::${line.variantId}`;
}

/** Resolve persisted lines against the catalog, dropping anything stale. */
export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  const resolved: ResolvedLine[] = [];
  for (const line of lines) {
    const product = getProductBySlug(line.productSlug);
    if (!product) continue;
    const variant = getVariant(product, line.variantId);
    if (!variant) continue;
    const qty = Math.max(1, Math.floor(line.qty));
    resolved.push({ ...line, qty, product, variant, lineTotal: variant.price * qty });
  }
  return resolved;
}

export function cartSubtotal(lines: ResolvedLine[]): number {
  return lines.reduce((sum, l) => sum + l.lineTotal, 0);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}
