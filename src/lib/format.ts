import type { I18nText, I18nList } from '@/data/types';
import type { Locale } from '@/i18n/routing';

/**
 * Format a whole-shekel amount as ILS. Numbers are NEVER mirrored in RTL,
 * so we wrap the ₪+digits unit in a Unicode LTR isolate (FSI…PDI) — this keeps
 * the glyph/number order correct even inside Hebrew/RTL flows.
 */
export function formatPrice(amount: number): string {
  return `⁦₪${amount.toLocaleString('en-US')}⁩`;
}

/** Pick the right language out of a bilingual field. */
export function t(field: I18nText, locale: Locale): string {
  return field[locale] ?? field.en;
}

export function tList(field: I18nList, locale: Locale): string[] {
  return field[locale] ?? field.en;
}
