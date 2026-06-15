import type { Product } from '@/data/types';
import type { Universe } from '@/data/portfolio';
import type { Locale } from '@/i18n/routing';
import { t } from './format';
import { minPrice } from '@/data/catalog';
import { instagramUrl, site } from './site';
import { localeUrl } from './seo';

type Json = Record<string, unknown>;

/** ProfessionalService / LocalBusiness for the studio (brief §11). */
export function localBusinessJsonLd(locale: Locale): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description:
      locale === 'he'
        ? 'סטודיו לניהול אמנותי של אירועים בלתי נשכחים. חזון, לא נייר.'
        : 'A studio for the artistic direction of unforgettable events. The vision, not the paper.',
    url: localeUrl(locale, ''),
    image: `${site.url}/og/default.jpg`,
    areaServed: { '@type': 'Country', name: 'Israel' },
    priceRange: '₪₪₪',
    sameAs: [instagramUrl],
    founder: { '@type': 'Person', name: 'Sacha', jobTitle: 'Artistic Director' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: `+${site.whatsappNumber}`,
      areaServed: 'IL',
    },
  };
}

/** Product schema per Collection item, in ILS (brief §11). */
export function productJsonLd(product: Product, locale: Locale, url: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t(product.name, locale),
    description: t(product.description, locale),
    brand: { '@type': 'Brand', name: site.name },
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ILS',
      price: minPrice(product),
      availability: 'https://schema.org/InStock',
      url,
      seller: { '@type': 'Organization', name: site.name },
    },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(locale: Locale, crumbs: Crumb[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: localeUrl(locale, c.path),
    })),
  };
}

export function universeJsonLd(universe: Universe, locale: Locale, url: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${t(universe.title, locale)} — ${t(universe.subtitle, locale)}`,
    description: t(universe.excerpt, locale),
    url,
    creator: { '@type': 'Organization', name: site.name },
    image: `${site.url}${universe.hero.src}`,
  };
}
