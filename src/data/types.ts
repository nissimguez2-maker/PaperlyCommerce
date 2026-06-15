import type { Locale } from '@/i18n/routing';

/** A bilingual string. EN is canonical; HE is transcreated (not literal). */
export type I18nText = Record<Locale, string>;
export type I18nList = Record<Locale, string[]>;

/** Prices are whole shekels (ILS). No per-piece math is ever surfaced. */
export type Money = number;

export interface ProductOptionValue {
  value: string; // stable key, e.g. "round"
  label: I18nText;
}

export interface ProductOption {
  key: string; // e.g. "format" | "pack"
  label: I18nText;
  values: ProductOptionValue[];
}

export interface ProductVariant {
  /** SKU — stable id used in cart + orders. */
  id: string;
  /** Human label shown when a variant is chosen, e.g. "Set of 50". */
  label: I18nText;
  /** Maps option keys to chosen values; empty for single-SKU products. */
  options: Record<string, string>;
  price: Money;
}

export type CollectionId = 'pieces' | 'complete-sets';

export interface Fulfillment {
  digital: I18nText;
  courier: I18nText;
  pickup: I18nText;
  leadTime: I18nText;
}

export interface Product {
  slug: string;
  collection: CollectionId;
  name: I18nText;
  /** One-line editorial line under the name. */
  tagline: I18nText;
  /** Optional richer SEO <title> (intent-bearing); falls back to name. */
  seoTitle?: I18nText;
  description: I18nText;
  /** "What's included" — art direction, premium stock, personalization, etc. */
  included: I18nList;
  dimensions: I18nText;
  /** Selector groups; empty array = single SKU (complete sets). */
  optionGroups: ProductOption[];
  variants: ProductVariant[];
  /** Public image paths in /public. Empty → editorial beige-soft placeholder. */
  images: string[];
  /** Alt text for SEO — describes the real piece, design-intent framing. */
  imageAlt: I18nText;
  /** Cross-sell slugs ("completes the table"). */
  crossSell: string[];
  /** Anchors the grid as the most premium item. */
  premiumAnchor?: boolean;
  /** "Studio favourite" badge. */
  favourite?: boolean;
  fulfillment?: Partial<Fulfillment>;
}

export interface Collection {
  id: CollectionId;
  slug: string;
  name: I18nText;
  tagline: I18nText;
  description: I18nText;
}
