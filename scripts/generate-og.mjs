// Generates Open Graph images (1200×630). Run with: node scripts/generate-og.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'og');
await mkdir(outDir, { recursive: true });

// 1) Branded default card.
const defaultSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FAFAF8"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#E4DED2" stroke-width="2"/>
  <text x="600" y="250" text-anchor="middle" fill="#5C5C5C"
        font-family="Arial, sans-serif" font-size="22" letter-spacing="6">ARTISTIC DIRECTION FOR EVENTS</text>
  <text x="600" y="360" text-anchor="middle" fill="#111111"
        font-family="Georgia, 'Times New Roman', serif" font-size="120" font-weight="500">Paperly</text>
  <text x="600" y="430" text-anchor="middle" fill="#5C5C5C"
        font-family="Georgia, serif" font-size="34" font-style="italic">The vision, not the paper.</text>
</svg>`;

await sharp(Buffer.from(defaultSvg)).jpeg({ quality: 86 }).toFile(join(outDir, 'default.jpg'));
console.log('✓ og/default.jpg');

// 2) Per-universe card — crop the universe hero to 1200×630 with a label band.
const heroIn = join(root, 'public', 'universes', 'chloe-albert', 'hero.jpg');
const labelBand = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#111111" stop-opacity="0.78"/>
      <stop offset="0.5" stop-color="#111111" stop-opacity="0.15"/>
      <stop offset="1" stop-color="#111111" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="70" y="540" fill="#FAFAF8" font-family="Arial, sans-serif" font-size="20" letter-spacing="5">A WEDDING IN DEEP GREEN</text>
  <text x="70" y="590" fill="#FAFAF8" font-family="Georgia, serif" font-size="56" font-weight="500">Chloé &amp; Albert</text>
</svg>`);

await sharp(heroIn)
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .composite([{ input: labelBand }])
  .jpeg({ quality: 84 })
  .toFile(join(outDir, 'chloe-albert-deep-green.jpg'));
console.log('✓ og/chloe-albert-deep-green.jpg');
