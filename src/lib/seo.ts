import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { site } from './site';

const OG_LOCALE: Record<Locale, string> = { en: 'en_US', he: 'he_IL' };

/** Absolute URL for a path within a locale. EN lives at root, HE under /he. */
export function localeUrl(locale: Locale, path = ''): string {
  const clean = path === '/' ? '' : path;
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${site.url}${prefix}${clean}`;
}

interface BuildMetaArgs {
  locale: Locale;
  path?: string; // e.g. "/collection" ("" for home)
  title: string;
  description: string;
  /** Path under /public or absolute URL for the social image. */
  ogImage?: string;
  type?: 'website' | 'article';
  /** Set true on legal/utility pages to keep them out of the index. */
  noindex?: boolean;
}

export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  ogImage = '/og/default.jpg',
  type = 'website',
  noindex = false,
}: BuildMetaArgs): Metadata {
  const canonical = localeUrl(locale, path);
  const languages: Record<string, string> = {
    'x-default': localeUrl('en', path),
  };
  for (const loc of routing.locales) languages[loc] = localeUrl(loc, path);

  const image = ogImage.startsWith('http') ? ogImage : `${site.url}${ogImage}`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
