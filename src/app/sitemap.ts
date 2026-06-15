import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { localeUrl } from '@/lib/seo';
import { collections, products, productPath } from '@/data/catalog';
import { universes } from '@/data/portfolio';

/** Indexable paths (cart/checkout are intentionally excluded). */
function indexablePaths(): string[] {
  return [
    '',
    '/collection',
    ...collections.map((c) => `/collection/${c.slug}`),
    ...products.map(productPath),
    '/portfolio',
    ...universes.map((u) => `/portfolio/${u.slug}`),
    '/studio',
    '/how-it-works',
    '/for-planners',
    '/contact',
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of indexablePaths()) {
    const languages: Record<string, string> = { 'x-default': localeUrl('en', path) };
    for (const locale of routing.locales) languages[locale] = localeUrl(locale, path);

    for (const locale of routing.locales) {
      entries.push({
        url: localeUrl(locale, path),
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path.startsWith('/collection') ? 0.8 : 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
