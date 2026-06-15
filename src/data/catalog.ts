import type { Collection, Fulfillment, Product } from './types';

/**
 * THE COLLECTION — seed catalog (brief §7).
 * Sold as SETS via pack-size variants; smallest variant = minimum order.
 * No per-piece math, no sort-by-price, no discount badges. Prices in ILS.
 *
 * This file is the canonical source of truth. The same data is mirrored to
 * Supabase via supabase/seed.sql; the app reads Supabase when configured and
 * falls back to this seed otherwise (see src/lib/catalog.ts).
 */

export const fulfillment: Fulfillment = {
  digital: {
    en: 'Instant digital download',
    he: 'הורדה דיגיטלית מיידית',
  },
  courier: {
    en: 'Local courier — about ₪50',
    he: 'שליח עד הבית — כ-₪50',
  },
  pickup: {
    en: 'Studio pickup, by appointment',
    he: 'איסוף מהסטודיו, בתיאום מראש',
  },
  leadTime: {
    en: 'Made to order — about 7–10 days',
    he: 'מיוצר בהזמנה — כ-7–10 ימים',
  },
};

export const collections: Collection[] = [
  {
    id: 'complete-sets',
    slug: 'complete-sets',
    name: { en: 'Complete Sets', he: 'סטים שלמים' },
    tagline: {
      en: 'One coherent world, in a single piece.',
      he: 'עולם אחד שלם, ביצירה אחת.',
    },
    description: {
      en: 'Curated sets that dress an entire table in one visual language — the simplest way to bring the studio to your evening.',
      he: 'סטים אצורים שמלבישים שולחן שלם בשפה ויזואלית אחת — הדרך הפשוטה ביותר להביא את הסטודיו לערב שלך.',
    },
  },
  {
    id: 'pieces',
    slug: 'pieces',
    name: { en: 'Pieces', he: 'פריטים' },
    tagline: {
      en: 'Individual pieces, designed by the studio.',
      he: 'פריטים בודדים, בעיצוב הסטודיו.',
    },
    description: {
      en: 'Single pieces from the collection, each art-directed and made in studio on premium stock.',
      he: 'פריטים בודדים מהקולקציה, כל אחד בניהול אמנותי ומיוצר בסטודיו על נייר איכותי.',
    },
  },
];

export const products: Product[] = [
  // ---- COMPLETE SETS (the AOV ladder) -------------------------------------
  {
    slug: 'the-full-universe',
    collection: 'complete-sets',
    name: { en: 'The Full Universe', he: 'היקום המלא' },
    tagline: {
      en: 'A complete printed world for your evening.',
      he: 'עולם שלם ומודפס לערב שלך.',
    },
    description: {
      en: 'The studio’s most complete set. One hundred menus, one hundred place cards and a full signage suite, art-directed end to end so every surface of the evening speaks the same language.',
      he: 'הסט המקיף ביותר של הסטודיו. מאה תפריטים, מאה כרטיסי מקום וסוויטת שילוט מלאה — בניהול אמנותי מקצה לקצה, כך שכל פינה בערב מדברת באותה שפה.',
    },
    included: {
      en: [
        '100 menus + 100 place cards + full signage suite',
        'Studio artistic direction across every piece',
        'Premium stock, made in studio',
        'Personalization of every name and detail',
      ],
      he: [
        '100 תפריטים + 100 כרטיסי מקום + סוויטת שילוט מלאה',
        'ניהול אמנותי של הסטודיו בכל פריט',
        'נייר איכותי, מיוצר בסטודיו',
        'התאמה אישית של כל שם וכל פרט',
      ],
    },
    dimensions: {
      en: 'Menus A5 · place cards 90 mm · signage large-format',
      he: 'תפריטים A5 · כרטיסי מקום 90 מ״מ · שילוט בפורמט גדול',
    },
    optionGroups: [],
    variants: [
      {
        id: 'full-universe',
        label: { en: 'The Full Universe', he: 'היקום המלא' },
        options: {},
        price: 1200,
      },
    ],
    images: [],
    imageAlt: {
      en: 'The Full Universe — a complete suite of wedding menus, place cards and signage designed by Paperly',
      he: 'היקום המלא — סוויטה שלמה של תפריטים, כרטיסי מקום ושילוט לחתונה בעיצוב Paperly',
    },
    crossSell: ['the-setting', 'menu'],
    premiumAnchor: true,
    favourite: true,
  },
  {
    slug: 'the-setting',
    collection: 'complete-sets',
    name: { en: 'The Setting', he: 'הסידור' },
    tagline: {
      en: 'From the entrance to the table, one language.',
      he: 'מהכניסה ועד השולחן, שפה אחת.',
    },
    description: {
      en: 'Everything in The Table, plus a welcome sign that sets the tone the moment your guests arrive — a single visual language from entrance to seat.',
      he: 'כל מה שיש בשולחן, בתוספת שלט קבלת פנים שמכתיב את הנימה כבר ברגע שהאורחים מגיעים — שפה ויזואלית אחת מהכניסה ועד הכיסא.',
    },
    included: {
      en: [
        'Everything in The Table, plus a welcome sign',
        'A single visual language from entrance to table',
        'Premium stock and large-format signage',
        'Personalization throughout',
      ],
      he: [
        'כל מה שיש בשולחן, בתוספת שלט קבלת פנים',
        'שפה ויזואלית אחת מהכניסה ועד השולחן',
        'נייר איכותי ושילוט בפורמט גדול',
        'התאמה אישית לאורך כל הסט',
      ],
    },
    dimensions: {
      en: 'Menus A5 · place cards 90 mm · welcome sign 50 × 70 cm',
      he: 'תפריטים A5 · כרטיסי מקום 90 מ״מ · שלט קבלת פנים 50 × 70 ס״מ',
    },
    optionGroups: [],
    variants: [
      {
        id: 'setting',
        label: { en: 'The Setting', he: 'הסידור' },
        options: {},
        price: 850,
      },
    ],
    images: [],
    imageAlt: {
      en: 'The Setting — wedding menus, place cards and a welcome sign designed by Paperly',
      he: 'הסידור — תפריטים, כרטיסי מקום ושלט קבלת פנים לחתונה בעיצוב Paperly',
    },
    crossSell: ['the-full-universe', 'the-table'],
    favourite: false,
  },
  {
    slug: 'the-table',
    collection: 'complete-sets',
    name: { en: 'The Table', he: 'השולחן' },
    tagline: {
      en: 'Menus and place cards, one coherent set.',
      he: 'תפריטים וכרטיסי מקום, סט אחד קוהרנטי.',
    },
    description: {
      en: 'Fifty menus and fifty place cards, art-directed as one. The cleanest way to give every seat at the table a sense of intention.',
      he: 'חמישים תפריטים וחמישים כרטיסי מקום, בניהול אמנותי כמקשה אחת. הדרך הנקייה ביותר להעניק לכל מושב בשולחן תחושת כוונה.',
    },
    included: {
      en: [
        '50 menus + 50 place cards, one system',
        'Unified artistic direction across every piece',
        'Premium stock, made in studio',
        'Personalization throughout',
      ],
      he: [
        '50 תפריטים + 50 כרטיסי מקום, מערכת אחת',
        'ניהול אמנותי אחיד בכל פריט',
        'נייר איכותי, מיוצר בסטודיו',
        'התאמה אישית לאורך כל הסט',
      ],
    },
    dimensions: {
      en: 'Menus A5 · place cards 90 mm',
      he: 'תפריטים A5 · כרטיסי מקום 90 מ״מ',
    },
    optionGroups: [],
    variants: [
      {
        id: 'table',
        label: { en: 'The Table', he: 'השולחן' },
        options: {},
        price: 590,
      },
    ],
    images: [],
    imageAlt: {
      en: 'The Table — a coordinated set of wedding menus and place cards designed by Paperly',
      he: 'השולחן — סט מתואם של תפריטים וכרטיסי מקום לחתונה בעיצוב Paperly',
    },
    crossSell: ['the-setting', 'place-card'],
    favourite: false,
  },

  // ---- PIECES --------------------------------------------------------------
  {
    slug: 'menu',
    collection: 'pieces',
    name: { en: 'Menu', he: 'תפריט' },
    tagline: {
      en: 'The piece every guest holds.',
      he: 'הפריט שכל אורח מחזיק.',
    },
    description: {
      en: 'A menu carries the tone of the whole evening in the hand. Art-directed composition, considered typography and a palette set by the studio, made in studio on premium stock.',
      he: 'תפריט נושא בכף היד את הנימה של הערב כולו. קומפוזיציה בניהול אמנותי, טיפוגרפיה מדודה ופלטה שנקבעת על ידי הסטודיו, מיוצר בסטודיו על נייר איכותי.',
    },
    included: {
      en: [
        'Complete artistic direction — composition, typography, palette',
        'Premium uncoated stock, made in studio',
        'Personalization of your names, menu and wording',
        'A digital proof before anything is produced',
      ],
      he: [
        'ניהול אמנותי מלא — קומפוזיציה, טיפוגרפיה ופלטה',
        'נייר מאט איכותי, מיוצר בסטודיו',
        'התאמה אישית של השמות, התפריט והנוסח',
        'הדמיה דיגיטלית לפני כל ייצור',
      ],
    },
    dimensions: {
      en: 'A5 portrait · 148 × 210 mm',
      he: 'A5 לאורך · 148 × 210 מ״מ',
    },
    optionGroups: [
      {
        key: 'pack',
        label: { en: 'Set size', he: 'גודל הסט' },
        values: [
          { value: '25', label: { en: 'Set of 25', he: 'סט של 25' } },
          { value: '50', label: { en: 'Set of 50', he: 'סט של 50' } },
          { value: '100', label: { en: 'Set of 100', he: 'סט של 100' } },
        ],
      },
    ],
    variants: [
      { id: 'menu-25', label: { en: 'Set of 25', he: 'סט של 25' }, options: { pack: '25' }, price: 220 },
      { id: 'menu-50', label: { en: 'Set of 50', he: 'סט של 50' }, options: { pack: '50' }, price: 390 },
      { id: 'menu-100', label: { en: 'Set of 100', he: 'סט של 100' }, options: { pack: '100' }, price: 690 },
    ],
    images: [],
    imageAlt: {
      en: 'Editorial wedding menu designed by Paperly on premium stock',
      he: 'תפריט חתונה אדיטוריאלי בעיצוב Paperly על נייר איכותי',
    },
    crossSell: ['place-card', 'the-table'],
    favourite: true,
  },
  {
    slug: 'place-card',
    collection: 'pieces',
    name: { en: 'Place Card', he: 'כרטיס מקום' },
    tagline: {
      en: 'A name, placed with intention.',
      he: 'שם, ממוקם בכוונה.',
    },
    description: {
      en: 'The small gesture that tells each guest they were expected. Choose folded or round, art-directed to sit in quiet harmony with the rest of the table.',
      he: 'המחווה הקטנה שמספרת לכל אורח שחיכו לו. בחירה בין מקופל לעגול, בניהול אמנותי שמשתלב בהרמוניה שקטה עם שאר השולחן.',
    },
    included: {
      en: [
        'Artistic direction matched to your table',
        'Folded or round format on premium stock',
        'Personalization of every guest name',
        'A digital proof before anything is produced',
      ],
      he: [
        'ניהול אמנותי בהתאמה לשולחן שלך',
        'פורמט מקופל או עגול על נייר איכותי',
        'התאמה אישית של כל שם אורח',
        'הדמיה דיגיטלית לפני כל ייצור',
      ],
    },
    dimensions: {
      en: 'Folded 90 × 90 mm · Round 90 mm ⌀',
      he: 'מקופל 90 × 90 מ״מ · עגול 90 מ״מ קוטר',
    },
    optionGroups: [
      {
        key: 'format',
        label: { en: 'Format', he: 'פורמט' },
        values: [
          { value: 'folded', label: { en: 'Folded', he: 'מקופל' } },
          { value: 'round', label: { en: 'Round', he: 'עגול' } },
        ],
      },
      {
        key: 'pack',
        label: { en: 'Set size', he: 'גודל הסט' },
        values: [
          { value: '50', label: { en: 'Set of 50', he: 'סט של 50' } },
          { value: '100', label: { en: 'Set of 100', he: 'סט של 100' } },
        ],
      },
    ],
    variants: [
      { id: 'place-folded-50', label: { en: 'Folded · Set of 50', he: 'מקופל · סט של 50' }, options: { format: 'folded', pack: '50' }, price: 260 },
      { id: 'place-folded-100', label: { en: 'Folded · Set of 100', he: 'מקופל · סט של 100' }, options: { format: 'folded', pack: '100' }, price: 460 },
      { id: 'place-round-50', label: { en: 'Round · Set of 50', he: 'עגול · סט של 50' }, options: { format: 'round', pack: '50' }, price: 260 },
      { id: 'place-round-100', label: { en: 'Round · Set of 100', he: 'עגול · סט של 100' }, options: { format: 'round', pack: '100' }, price: 460 },
    ],
    images: [],
    imageAlt: {
      en: 'Round and folded wedding place cards designed by Paperly',
      he: 'כרטיסי מקום עגולים ומקופלים לחתונה בעיצוב Paperly',
    },
    crossSell: ['menu', 'the-table'],
    favourite: false,
  },
];

// ---- Lookups ---------------------------------------------------------------

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Canonical product path, nested under its collection for clean breadcrumbs. */
export function productPath(product: Product): string {
  return `/collection/${product.collection}/${product.slug}`;
}

export function getCollection(id: Collection['id']): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getProductsByCollection(id: Collection['id']): Product[] {
  return products.filter((p) => p.collection === id);
}

export function getVariant(product: Product, variantId: string) {
  return product.variants.find((v) => v.id === variantId);
}

/** Lowest variant price — used only for internal ordering, never shown as "from ₪". */
export function minPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}
