# Paperly

**The vision, not the paper.**

Paperly is an event **artistic-direction studio** in Israel — not a print shop. It
designs coherent "visual universes" for premium events. This is the studio's
production website and shop, built with Next.js.

The site has two clear doors:

- **Bespoke Universes** — full art direction, sold by conversation (WhatsApp /
  Instagram). No prices. Lives in the Portfolio.
- **The Collection** — ready-made pieces bought directly with ₪ prices.

---

## Tech stack

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS**
- **next-intl** — English (default, at `/`) and Hebrew (full RTL mirror at `/he`), ILS (₪)
- **Supabase** — optional catalog + orders backend (the bundled seed is the default source of truth)
- **Grow / Meshulam** — Israeli hosted checkout (credit cards, **Bit**, **installments/תשלומים**)
- **Railway** — hosting (Nixpacks; Netlify config also included)

The site is **fully deployable with placeholder env values**. Payments and the
Supabase backend activate automatically once real keys are added — no code change.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values when ready
npm run dev                  # http://localhost:3000  (and /he)
```

Useful scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | ESLint |
| `node scripts/generate-og.mjs` | Regenerate Open Graph images (1200×630) |

---

## Environment variables

All variables live in [`.env.example`](./.env.example). Summary:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (canonicals, hreflang, OG, sitemap) |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase reads (optional) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side order writes / webhook reconciliation (never client) |
| `GROW_API_BASE` / `GROW_USER_ID` / `GROW_PAGE_CODE` / `GROW_API_KEY` | Grow/Meshulam hosted checkout |
| `GROW_WEBHOOK_SECRET` | Shared secret validating the payment webhook |
| `NEXT_PUBLIC_MAX_INSTALLMENTS` | Max installments (תשלומים) offered at checkout |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | wa.me number for pre-filled messages |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE` | Instagram handle |
| `NEXT_PUBLIC_PLANNER_EMAIL` | Studio email (shown discreetly on For Planners) |

With placeholder values: the catalog renders from the bundled seed, and checkout
falls back to a WhatsApp order hand-off instead of redirecting to the gateway.

---

## Deploying to Railway (recommended)

The app runs as a standard Next.js Node server. Railway auto-detects it via
Nixpacks; [`railway.json`](./railway.json) pins the build/start commands and a
healthcheck. `next start` binds to `0.0.0.0` and the `PORT` Railway provides, and
`sharp` is included so `next/image` optimization works on the server.

**From the Railway dashboard (git-connected, CI on every push):**
1. New Project → **Deploy from GitHub repo** → pick `nissimguez2-maker/paperlycommerce`
   (branch `claude/determined-davinci-f2g1x6`, or `main` after merge).
2. Add the environment variables above under **Variables**. At minimum set
   `NEXT_PUBLIC_SITE_URL` to the Railway domain (e.g. `https://paperly.up.railway.app`).
3. Railway builds (`npm run build`) and starts (`npm run start`) automatically.
4. Optional: add a custom domain under **Settings → Networking**, then update
   `NEXT_PUBLIC_SITE_URL` to match.
5. Point the gateway webhook to `https://<your-domain>/api/webhooks/payment` and set
   the matching `GROW_WEBHOOK_SECRET`.

**From the Railway CLI (from this repo):**
```bash
npm i -g @railway/cli
railway login            # or: export RAILWAY_TOKEN=<project-token>
railway init             # first time only — creates/links the project
railway up               # builds & deploys
railway variables --set NEXT_PUBLIC_SITE_URL=https://<your-domain>
```

The build is green with placeholders, so the first deploy works before any keys exist.

### Deploying to Netlify (alternative)

A [`netlify.toml`](./netlify.toml) is also included. Connect the repo in Netlify
and set the same environment variables; the official Next.js runtime plugin handles
SSR, route handlers and image optimization.

---

## The Collection — how to add or edit products

The catalog is **typed data**, the single source of truth:

- [`src/data/catalog.ts`](./src/data/catalog.ts) — products, variants, prices, collections
- [`src/data/types.ts`](./src/data/types.ts) — the shape of a product

To add a product, append a `Product` to the `products` array:

```ts
{
  slug: 'welcome-sign',
  collection: 'pieces',
  name: { en: 'Welcome Sign', he: 'שלט קבלת פנים' },
  tagline: { en: '…', he: '…' },
  description: { en: '…', he: '…' },
  included: { en: ['…'], he: ['…'] },
  dimensions: { en: '50 × 70 cm', he: '50 × 70 ס״מ' },
  optionGroups: [],                 // selectors; [] = single SKU
  variants: [
    { id: 'welcome-sign', label: { en: 'Welcome Sign', he: 'שלט קבלת פנים' }, options: {}, price: 320 },
  ],
  images: [],                       // [] renders a beige-soft placeholder
  imageAlt: { en: '…', he: '…' },
  crossSell: ['menu'],
  favourite: false,
}
```

Notes:
- Prices are **whole shekels** (ILS). Sell as **sets** via pack-size variants; the
  smallest variant is the minimum order. No per-piece math is ever shown.
- Product images go in `public/…`; reference their paths in `images`. An empty
  array shows a solid `--beige-soft` placeholder (never a gray "coming soon" box).
- Mark one item `premiumAnchor: true` and one `favourite: true` to anchor the grid.

Adding a product updates the shop, product pages, sitemap and JSON-LD automatically.

### Keeping Supabase in sync (optional)

If you run the Supabase backend, mirror catalog changes in
[`supabase/seed.sql`](./supabase/seed.sql). Apply
[`supabase/schema.sql`](./supabase/schema.sql) once, then `seed.sql` (idempotent).
Orders are written to the `orders` table server-side via the service-role key.

---

## Bespoke universes (Portfolio)

Case studies live in [`src/data/portfolio.ts`](./src/data/portfolio.ts). Each
universe has Brief → Direction → System → Pieces → Feeling → gallery (≤6 images)
and a WhatsApp CTA. **No prices.** Per-universe OG images are generated by
`scripts/generate-og.mjs`.

---

## Internationalization & RTL

- Copy lives in [`src/messages/en.json`](./src/messages/en.json) and
  [`src/messages/he.json`](./src/messages/he.json). Hebrew is transcreated, not
  literal. Catalog/portfolio strings are bilingual fields in the data files.
- EN is at the root; HE is a full RTL mirror at `/he`. Layout uses logical CSS
  properties so it mirrors automatically. Numbers, prices, the logo, photos,
  the Instagram link and the wa.me link are **not** mirrored.

---

## Project structure

```
src/
  app/[locale]/        Pages (home, collection, product, cart, checkout, portfolio, …)
  app/api/             checkout + payment webhook route handlers
  components/          Header, Footer, cart, shop, home sections, portfolio …
  data/                catalog + portfolio (source of truth) and types
  lib/                 site config, formatting, cart, payments, orders, seo, jsonld
  messages/            en.json / he.json
  i18n/                next-intl routing/navigation/request
supabase/              schema.sql + seed.sql
scripts/               generate-og.mjs
public/                photos + generated OG images
```

---

## SEO

Per-page titles/descriptions, hreflang (`en` / `he` / `x-default`),
self-referential canonicals, JSON-LD (ProfessionalService, Product, BreadcrumbList,
CreativeWork), Open Graph (per-universe images, `og:locale`), `sitemap.xml` and
`robots.txt` are all generated automatically.
