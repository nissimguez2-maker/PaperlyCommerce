'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LocaleSwitcher } from './LocaleSwitcher';
import { useCart } from './cart/CartProvider';

const NAV = [
  { href: '/collection', key: 'collection' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/studio', key: 'studio' },
  { href: '/how-it-works', key: 'howItWorks' },
  { href: '/contact', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label={t('primary')}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-button uppercase transition-colors hover:text-ink ${
                isActive(item.href) ? 'text-ink' : 'text-ink-60'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LocaleSwitcher className="hidden sm:flex" />
          <CartLink count={ready ? count : 0} label={t('cart')} />
          <button
            type="button"
            className="lg:hidden"
            aria-expanded={open}
            aria-label={t('menu')}
            onClick={() => setOpen((v) => !v)}
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          className="border-t border-hairline bg-paper lg:hidden"
          aria-label={t('primary')}
        >
          <ul className="container-page flex flex-col py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-button uppercase ${
                    isActive(item.href) ? 'text-ink' : 'text-ink-60'
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-hairline pt-4">
              <LocaleSwitcher />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function CartLink({ count, label }: { count: number; label: string }) {
  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 text-button uppercase text-ink"
      aria-label={`${label}${count ? ` (${count})` : ''}`}
    >
      <span className="hidden sm:inline">{label}</span>
      <BagIcon />
      {count > 0 && (
        <span
          className="absolute -end-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-medium leading-none text-paper"
          aria-hidden
        >
          {count}
        </span>
      )}
    </Link>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h12l-1 13H7L6 7Z M9 7V5a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      ) : (
        <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      )}
    </svg>
  );
}
