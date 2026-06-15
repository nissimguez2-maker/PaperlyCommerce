import type { Config } from 'tailwindcss';

/**
 * Paperly design system.
 * Minimal, editorial, "very chic". Tokens mirror the brief's design spec.
 */
const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    // Editorial palette — single source of truth.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ink: {
        DEFAULT: '#111111', // text / buttons
        60: '#5C5C5C',      // captions / secondary text
      },
      paper: '#FAFAF8',          // page background
      beige: {
        accent: '#CBB89D',       // accents / hover only (never body text on light)
        soft: '#F1EBE1',         // alt sections / placeholders
      },
      hairline: '#E4DED2',       // borders / dividers
      white: '#FFFFFF',
      // Functional minimum for forms / states.
      danger: '#9B2C2C',
    },
    fontFamily: {
      // Display serif (EN) + body sans (EN); Hebrew families layered via CSS vars.
      display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
      body: ['var(--font-body)', 'Work Sans', 'system-ui', 'sans-serif'],
    },
    extend: {
      // Editorial type tokens, ADDED to Tailwind's defaults (so text-2xl/3xl/… still work).
      fontSize: {
        label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.16em' }], // 12, uppercase
        button: ['0.875rem', { lineHeight: '1', letterSpacing: '0.1em' }],  // 14, uppercase
        caption: ['0.8125rem', { lineHeight: '1.6' }],                       // 13
        base: ['1rem', { lineHeight: '1.7' }],                               // 16
        lg: ['1.125rem', { lineHeight: '1.7' }],                             // 18 body large
        xl: ['1.375rem', { lineHeight: '1.6' }],                             // 22
        h3: ['2rem', { lineHeight: '1.2' }],                                 // 32
        h2: ['3rem', { lineHeight: '1.1' }],                                 // 48
        'h2-sm': ['2.25rem', { lineHeight: '1.12' }],                        // 36 mobile h2
        h1: ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.01em' }],    // 72
        'h1-sm': ['2.5rem', { lineHeight: '1.08', letterSpacing: '-0.01em' }], // 40 mobile h1
      },
      maxWidth: {
        content: '1280px',  // max content width
        text: '680px',      // readable text column
      },
      spacing: {
        section: '8rem',      // 128px desktop section padding
        'section-sm': '4.5rem', // 72px mobile section padding
        gutter: '2rem',       // 32px grid gutter
      },
      borderRadius: {
        none: '0',
        sm: '2px', // the only allowed soft corner
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      aspectRatio: {
        card: '4 / 5', // product card ratio
      },
    },
  },
  plugins: [],
};

export default config;
