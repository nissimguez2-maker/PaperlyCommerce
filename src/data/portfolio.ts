import type { I18nText } from './types';

export interface UniverseImage {
  src: string;
  alt: I18nText;
}

export interface UniverseSystemEntry {
  label: I18nText;
  value: I18nText;
}

export interface Universe {
  slug: string;
  /** Title shown as the universe name, e.g. "Chloé & Albert". */
  title: I18nText;
  /** The descriptive line, e.g. "a wedding in deep green". */
  subtitle: I18nText;
  /** Short editorial summary for portfolio cards + OG description. */
  excerpt: I18nText;
  hero: UniverseImage;
  brief: I18nText;
  direction: I18nText; // the "vision, not paper" beat
  system: UniverseSystemEntry[]; // palette / materials / typography / motif
  pieces: I18nText;
  feeling: I18nText;
  gallery: UniverseImage[]; // capped at ~6
}

/**
 * BESPOKE / PORTFOLIO (brief §8). No prices anywhere.
 * One launch universe; photos are the real Paperly Chloé & Albert wedding.
 */
export const universes: Universe[] = [
  {
    slug: 'chloe-albert-deep-green',
    title: { en: 'Chloé & Albert', he: 'קלואי ואלבר' },
    subtitle: { en: 'A wedding in deep green', he: 'חתונה בירוק עמוק' },
    excerpt: {
      en: 'Deep green and candlelight, with a single, deliberate note of pop-art. A complete visual world built around one feeling.',
      he: 'ירוק עמוק ואור נרות, עם נקודה אחת מכוונת של פופ-ארט. עולם ויזואלי שלם שנבנה סביב תחושה אחת.',
    },
    hero: {
      src: '/universes/chloe-albert/hero.jpg',
      alt: {
        en: 'A wedding table dressed in deep green with custom menus, designed by Paperly',
        he: 'שולחן חתונה בירוק עמוק עם תפריטים מותאמים אישית, בעיצוב Paperly',
      },
    },
    brief: {
      en: 'Chloé and Albert came to the studio with a feeling more than a brief: an evening that should feel intimate and a little bold at once — deep, warm, candlelit, with room for a wink of personality. The question was never which invitation. It was: what world does this couple want to step into for one night?',
      he: 'קלואי ואלבר הגיעו לסטודיו עם תחושה יותר מאשר עם תקציר: ערב שצריך להרגיש אינטימי ומעט נועז בו-זמנית — עמוק, חמים, מואר בנרות, עם מקום לקריצה של אישיות. השאלה מעולם לא הייתה איזו הזמנה. היא הייתה: לאיזה עולם בני הזוג רוצים להיכנס ללילה אחד?',
    },
    direction: {
      en: 'We chose deep green as the ground note — the colour of something grown, alive and quietly luxurious — and let candlelight do the rest. Against that depth we placed one disciplined gesture of pop-art: a single playful accent that keeps the whole evening from taking itself too seriously. This is the part you cannot buy by the sheet. It is a point of view, held steady across every surface of the night.',
      he: 'בחרנו בירוק עמוק כצליל הבסיס — צבע של דבר מה שצומח, חי ומעודן בשקט — ונתנו לאור הנרות לעשות את השאר. אל מול העומק הזה הצבנו מחווה מדודה אחת של פופ-ארט: אקצנט שובב יחיד ששומר על כך שהערב כולו לא ייקח את עצמו ברצינות יתרה. זה החלק שאי אפשר לקנות לפי גיליון. זו נקודת מבט, מוחזקת באיתנות על פני כל משטח בלילה.',
    },
    system: [
      {
        label: { en: 'Palette', he: 'פלטה' },
        value: { en: 'Deep forest green, warm candle gold, soft paper cream', he: 'ירוק יער עמוק, זהב נרות חמים, שמנת נייר רכה' },
      },
      {
        label: { en: 'Materials', he: 'חומרים' },
        value: { en: 'Heavy uncoated stock, matte finishes, hand-placed details', he: 'נייר מאט כבד, גימורים מאטיים, פרטים בהנחה ידנית' },
      },
      {
        label: { en: 'Typography', he: 'טיפוגרפיה' },
        value: { en: 'A tall, quiet serif paired with a precise modern sans', he: 'סריף גבוה ושקט בשילוב סן-סריף מודרני ומדויק' },
      },
      {
        label: { en: 'Motif', he: 'מוטיב' },
        value: { en: 'A single pop-art accent, repeated with restraint', he: 'אקצנט פופ-ארט יחיד, חוזר באיפוק' },
      },
    ],
    pieces: {
      en: 'Custom menus for every seat, round place cards that echo the curve of the table, and a suite of signage that carried the green from the entrance to the last toast. Each piece was art-directed as part of one system — never designed alone.',
      he: 'תפריטים מותאמים לכל מושב, כרטיסי מקום עגולים שמהדהדים את עקומת השולחן, וסוויטת שילוט שנשאה את הירוק מהכניסה ועד ההרמת כוסית האחרונה. כל פריט נוהל אמנותית כחלק ממערכת אחת — מעולם לא עוצב לבד.',
    },
    feeling: {
      en: 'Guests walked into a room that felt like it had always existed — deep, warm, alive, with one knowing smile of colour. That is the work: not paper on a table, but a world to spend an evening inside.',
      he: 'האורחים נכנסו לחדר שהרגיש כאילו תמיד היה קיים — עמוק, חמים, חי, עם חיוך אחד יודע של צבע. זו העבודה: לא נייר על שולחן, אלא עולם לבלות בתוכו ערב.',
    },
    gallery: [
      {
        src: '/universes/chloe-albert/hero.jpg',
        alt: {
          en: 'Deep green wedding table with custom Paperly menus and candlelight',
          he: 'שולחן חתונה בירוק עמוק עם תפריטים מותאמים של Paperly ואור נרות',
        },
      },
      {
        src: '/universes/chloe-albert/place-cards.jpg',
        alt: {
          en: 'Round wedding place cards designed by Paperly',
          he: 'כרטיסי מקום עגולים לחתונה בעיצוב Paperly',
        },
      },
      {
        src: '/universes/chloe-albert/signage.jpg',
        alt: {
          en: 'Deep green and pop-art wedding signage designed by Paperly',
          he: 'שילוט חתונה בירוק עמוק ופופ-ארט בעיצוב Paperly',
        },
      },
    ],
  },
];

export function getUniverseBySlug(slug: string): Universe | undefined {
  return universes.find((u) => u.slug === slug);
}
