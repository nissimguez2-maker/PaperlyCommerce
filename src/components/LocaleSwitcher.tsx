'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LABELS: Record<string, string> = { en: 'EN', he: 'עב' };

/** Swap locale while preserving the current path. Numbers/handles never flip. */
export function LocaleSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`flex items-center gap-2 text-button uppercase ${className}`} dir="ltr">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span className="text-hairline" aria-hidden>/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={loc === locale ? 'true' : undefined}
            className={
              loc === locale
                ? 'text-ink'
                : 'text-ink-60 transition-colors hover:text-ink'
            }
          >
            {LABELS[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
