import {
  Cormorant_Garamond,
  Work_Sans,
  Frank_Ruhl_Libre,
  Heebo,
} from 'next/font/google';

/** EN display serif — headlines only. */
export const displayEn = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

/** EN body / nav / buttons / captions. */
export const bodyEn = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

/** HE display serif. */
export const displayHe = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display-he',
  display: 'swap',
});

/** HE body. */
export const bodyHe = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body-he',
  display: 'swap',
});

export const fontVariables = [
  displayEn.variable,
  bodyEn.variable,
  displayHe.variable,
  bodyHe.variable,
].join(' ');
