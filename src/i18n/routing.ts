import { defineRouting } from 'next-intl/routing';

/**
 * EN is the default locale and lives at the root (no prefix).
 * HE is a full RTL mirror served under /he.
 */
export const routing = defineRouting({
  locales: ['en', 'he'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
