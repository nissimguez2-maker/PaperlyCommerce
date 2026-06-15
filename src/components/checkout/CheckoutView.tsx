'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { cartSubtotal, resolveLines } from '@/lib/cart';
import { formatPrice, t } from '@/lib/format';
import { whatsappLink } from '@/lib/site';
import { track } from '@/lib/analytics';
import { Arrow } from '@/components/Arrow';
import { useCart } from '@/components/cart/CartProvider';

type Phase = 'form' | 'processing' | 'placeholder' | 'error';

export function CheckoutView() {
  const tc = useTranslations('checkout');
  const locale = useLocale() as Locale;
  const { lines, ready } = useCart();
  const resolved = resolveLines(lines);
  const subtotal = cartSubtotal(resolved);

  const [phase, setPhase] = useState<Phase>('form');
  const [customer, setCustomer] = useState({ fullName: '', email: '', phone: '' });
  const [contactError, setContactError] = useState(false);

  if (!ready) return <div className="container-page section min-h-[40vh]" aria-hidden />;

  if (resolved.length === 0) {
    return (
      <div className="container-page section">
        <h1 className="text-h1-sm md:text-h1">{tc('title')}</h1>
        <Link href="/collection" className="btn-primary mt-8">
          {tc('backToCart')}
        </Link>
      </div>
    );
  }

  const waOrderMessage = () => {
    const linesText = resolved
      .map(
        (l) =>
          `• ${t(l.product.name, locale)} — ${t(l.variant.label, locale)} ×${l.qty} (${formatPrice(l.lineTotal)})`,
      )
      .join('\n');
    const who = [customer.fullName, customer.phone, customer.email].filter(Boolean).join(' · ');
    const whoLine = who ? `\n${who}` : '';
    return `${tc('placeholder.waMessage')}\n${linesText}\n${tc('subtotal')}: ${formatPrice(subtotal)}${whoLine}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Require at least one contact channel so we can send the proof.
    if (!customer.email.trim() && !customer.phone.trim()) {
      setContactError(true);
      return;
    }
    setContactError(false);
    track('begin_checkout', { currency: 'ILS', value: subtotal, items: resolved.length });
    setPhase('processing');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lines, locale, customer }),
      });
      const data = await res.json();
      if (data.ok && data.redirect) {
        window.location.href = data.redirect;
        return;
      }
      if (data.configured === false) {
        setPhase('placeholder');
        return;
      }
      setPhase('error');
    } catch {
      setPhase('error');
    }
  };

  return (
    <div className="container-page section">
      <h1 className="text-h1-sm md:text-h1">{tc('title')}</h1>
      <p className="mt-3 text-ink-60">{tc('intro')}</p>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        {/* Left: form / states */}
        <div className="lg:col-span-7">
          {phase === 'placeholder' ? (
            <div className="border border-hairline p-7">
              <h2 className="font-display text-h3">{tc('placeholder.title')}</h2>
              <p className="mt-3 text-ink-60">{tc('placeholder.body')}</p>
              <a
                href={whatsappLink(waOrderMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
                data-track="whatsapp_click"
                data-context="checkout-fallback"
              >
                {tc('placeholder.cta')}
              </a>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h2 className="label">{tc('yourDetails')}</h2>
              <div className="mt-5 space-y-5">
                <Field
                  id="fullName"
                  label={tc('fullName')}
                  value={customer.fullName}
                  onChange={(v) => setCustomer((c) => ({ ...c, fullName: v }))}
                  required
                />
                <Field
                  id="email"
                  type="email"
                  label={`${tc('email')} (${tc('optional')})`}
                  value={customer.email}
                  onChange={(v) => setCustomer((c) => ({ ...c, email: v }))}
                />
                <Field
                  id="phone"
                  type="tel"
                  label={`${tc('phone')} (${tc('optional')})`}
                  value={customer.phone}
                  onChange={(v) => setCustomer((c) => ({ ...c, phone: v }))}
                />
              </div>

              <p className="mt-6 text-caption text-ink-60">{tc('payNote')}</p>
              <p className="mt-1 text-caption text-ink-60">{tc('secureNote')}</p>

              {/* Payment marks — practical reassurance for the Israeli buyer. */}
              <div className="mt-4 flex flex-wrap items-center gap-2" aria-label={tc('payWith')}>
                {['Visa', 'Mastercard', 'Isracard', 'Bit', 'תשלומים'].map((mark) => (
                  <span
                    key={mark}
                    className="border border-hairline px-2.5 py-1 text-caption text-ink-60"
                  >
                    {mark}
                  </span>
                ))}
              </div>

              {contactError && (
                <p className="mt-4 text-caption text-danger">{tc('contactRequired')}</p>
              )}
              {phase === 'error' && (
                <p className="mt-4 text-caption text-danger">{tc('error')}</p>
              )}

              <button
                type="submit"
                disabled={phase === 'processing'}
                className="btn-primary btn-block mt-6 disabled:opacity-60"
              >
                {phase === 'processing' ? tc('processing') : tc('pay')}
              </button>

              {phase === 'error' && (
                <a
                  href={whatsappLink(waOrderMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet mt-5"
                  data-track="whatsapp_click"
                  data-context="checkout-error"
                >
                  {tc('placeholder.cta')}
                  <Arrow />
                </a>
              )}
            </form>
          )}

          <Link href="/cart" className="link-quiet mt-8">
            {tc('backToCart')}
            <Arrow />
          </Link>
        </div>

        {/* Right: summary */}
        <aside className="lg:col-span-5">
          <div className="border border-hairline p-7">
            <h2 className="label">{tc('orderSummary')}</h2>
            <ul className="mt-5 space-y-4">
              {resolved.map((l) => (
                <li key={`${l.productSlug}-${l.variantId}`} className="flex justify-between gap-4 text-sm">
                  <span>
                    {t(l.product.name, locale)}
                    <span className="block text-caption text-ink-60">
                      {t(l.variant.label, locale)} · ×{l.qty}
                    </span>
                  </span>
                  <span className="font-body font-semibold">{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-hairline pt-5">
              <span className="text-lg">{tc('subtotal')}</span>
              <span className="font-body text-xl font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-3 text-caption text-ink-60">{tc('vat')} {tc('installments')}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="label">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-none border border-ink-60 bg-paper px-4 py-3 text-ink transition-colors focus:border-ink"
      />
    </label>
  );
}
