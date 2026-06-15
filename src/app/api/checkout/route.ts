import { NextResponse } from 'next/server';
import { resolveLines, cartSubtotal, type CartLine } from '@/lib/cart';
import { t } from '@/lib/format';
import { createCheckout } from '@/lib/payments/grow';
import { saveOrder } from '@/lib/orders';
import { site } from '@/lib/site';
import { localeUrl } from '@/lib/seo';
import { routing, type Locale } from '@/i18n/routing';

export const runtime = 'nodejs';

interface CheckoutBody {
  items: CartLine[];
  locale: Locale;
  customer?: { fullName?: string; email?: string; phone?: string };
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const locale = routing.locales.includes(body.locale) ? body.locale : routing.defaultLocale;

  // Re-resolve and re-price against the catalog — the client price is never trusted.
  const resolved = resolveLines(Array.isArray(body.items) ? body.items : []);
  if (resolved.length === 0) {
    return NextResponse.json({ ok: false, error: 'Cart is empty' }, { status: 400 });
  }
  const total = cartSubtotal(resolved);

  const orderId = `PL-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;

  const orderItems = resolved.map((l) => ({
    productSlug: l.productSlug,
    variantId: l.variantId,
    name: `${t(l.product.name, locale)} · ${t(l.variant.label, locale)}`,
    qty: l.qty,
    price: l.variant.price,
  }));

  // Record the pending order before redirecting to the gateway.
  await saveOrder({
    id: orderId,
    locale,
    total,
    currency: 'ILS',
    status: 'pending',
    items: orderItems,
    customer: body.customer,
  });

  const result = await createCheckout({
    amount: total,
    description: `Paperly — ${resolved.length} item${resolved.length > 1 ? 's' : ''}`,
    lines: orderItems.map((i) => ({ name: i.name, quantity: i.qty, price: i.price })),
    customer: body.customer,
    orderId,
    maxInstallments: site.maxInstallments,
    successUrl: `${localeUrl(locale, '/checkout/success')}?order=${orderId}`,
    cancelUrl: localeUrl(locale, '/checkout/cancel'),
  });

  if (result.ok) {
    return NextResponse.json({ ok: true, redirect: result.url, orderId });
  }

  if (!result.configured) {
    // Gateway not wired yet — let the client offer the WhatsApp fallback.
    return NextResponse.json({ ok: false, configured: false, orderId });
  }

  return NextResponse.json({ ok: false, configured: true, error: result.error }, { status: 502 });
}
