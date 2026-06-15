/**
 * Central site configuration. Reads from env where provided, with safe
 * public defaults so the site renders fully even before real keys exist.
 */

export const site = {
  name: 'Paperly',
  tagline: 'The vision, not the paper.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://paperly.netlify.app').replace(/\/$/, ''),

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '972586170698',
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'paper.ly_',
  plannerEmail: process.env.NEXT_PUBLIC_PLANNER_EMAIL ?? 'sachaguez.mt@gmail.com',

  maxInstallments: Number(process.env.NEXT_PUBLIC_MAX_INSTALLMENTS ?? '12'),
} as const;

export const instagramUrl = `https://www.instagram.com/${site.instagramHandle}/`;

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
