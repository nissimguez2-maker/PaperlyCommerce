# Paperly — Consolidated Audit

_24 specialist agents (Opus), auditing the live site + codebase + screenshots. De-duplicated and impact-ranked. Nothing in here is implemented yet — this is for your approval._

Live: `https://paperlycommerce-production.up.railway.app` · Branch: `claude/determined-davinci-f2g1x6`

---

## 0. Direction: "make it leaner, fewer words, more practical"

Per the latest steering, the guiding principle is **utility over showcase**. Applied as:

- **Cut / shorten (words & showcase):** the long hero paragraph, duplicate founder/story bands, repeated closing copy, generic USP fluff, over-written product descriptions. Push commerce higher; slim the story.
- **Keep as "practical" (NOT showcase):** real **product photos** (a shop must show what you're buying — this is function, not decoration), one short **proof line**, payment/VAT clarity, a tight **FAQ that replaces prose**.
- **Deferred per this direction (do NOT do now):** more portfolio universes, expanded galleries, richer founder narrative, added "storytelling" beats. (Listed in §K so they're a conscious choice, not an oversight.)

> Tension to flag: most agents say "add real product imagery + one proof point." That reads like "more showcase," but it's the opposite — today the shop shows *nothing* to buy. These are the practical minimum, not lookbook material.

---

## 1. Top priorities (impact-ranked, reconciled with "leaner")

| # | Priority | Impact | Effort | Raised by | Leaner-aligned |
|---|----------|--------|--------|-----------|----------------|
| 1 | **Tailwind `fontSize` bug** — `text-2xl/3xl/5xl/sm` emit no CSS → PDP price, logo, footer, placeholder marks fall back to 16px; **PDP price renders smaller than the card price** | High | **S** | UI, Frontend, QA | ✅ correctness |
| 2 | **Trim copy & sections** — shorten hero para, merge duplicate Sacha/story bands, cut repeated contact copy, tighten descriptions | High | M | Content, Narratologist, Brand, PM, UXR | ✅ the ask |
| 3 | **Product imagery** — ≥1 real photo per Collection item (shop shows nothing today) | Very High | L* | CRO(P0), Visual, PM, P&MR, Growth, SEO | ✅ practical |
| 4 | **One CTA verb** — wire "Begin your universe" everywhere (4 drifting verbs today; `common.begin` defined but unused) | High | **S** | Content, CRO, Narratologist, UX Arch | ✅ |
| 5 | **Two-door clarity** — add "Bespoke" to nav (only "Portfolio" shows); standardize terminology; surface "which door?" on home | High | S–M | UX Arch(P0), PM, UXR, Narratologist | ✅ practical |
| 6 | **Add-to-cart momentum** — cart drawer/toast + "View cart / Checkout" (today it dead-ends on a 1.6s "Added ✓") | High | M | CRO, Behavioral, Frontend | ✅ practical |
| 7 | **Social proof** — one real, attributed proof line / count (zero on site today) | High | S–M* | CRO, Psych, P&MR, Narratologist, Biz | ✅ few words |
| 8 | **Israeli commerce essentials** — VAT/מע"מ "כולל מע"מ" note, Bit/card icons, price bidi `<bdi dir="ltr">` | High | S | E-com(P0/P1), Frontend, Cultural | ✅ practical |
| 9 | **Variant cards** — multi-variant cards silently add the *cheapest* set; route to PDP + show set size with price | High | S | E-com, Pricing, UXR | ✅ practical |
| 10 | **Accessibility** — input contrast 1.28:1 + `outline-none`; qty button labels; mobile drawer focus-trap/Escape; beige-accent step numbers (1.85:1) | High | S–M | QA(P1s), Frontend, Brand | ✅ practical |
| 11 | **Analytics + consent** — zero tracking today; add GA4/GTM + events + consent banner | High | M | Tracking(P0) | ✅ practical |
| 12 | **Security hardening** — webhook HMAC+idempotency, security headers/CSP, rate-limit, input validation, NaN/qty cap, JSON-LD escaping, `server-only` | High | M | Security(P1s) | ✅ |
| 13 | **SEO/AEO quick wins** — Product JSON-LD `image` + `availability: MadeToOrder`; richer product titles; `llms.txt`; FAQ schema | Med | S–M | SEO, AEO | ✅ (FAQ replaces prose) |
| 14 | **Hebrew consistency** — unify "you" register (שלך/שלכם/slash mix); fix hero line "חזון, שלם"; neutralize wedding-only alt/SEO | Med | M | Cultural(P1) | ✅ quality |
| 15 | **Pricing/AOV** — set size on cards, "what's inside" bundle value, "most chosen" on a set | Med | S | Pricing | ✅ practical |
| 16 | **Checkout practicality** — surface WhatsApp option up front; require ≥1 contact; pass name into WA msg; show shipping+VAT in summary | Med | S | E-com, CRO, Behavioral, Growth | ✅ practical |

\* L / S–M items marked with `*` need **owner-supplied content** (photos, a real testimonial) — code/slots are ready.

---

## 2. Findings by theme (de-duplicated)

### A. Leaner — copy & section reduction (the new priority)
- **Long hero paragraph** restated by `LeadBand` → cut or shorten; the manifesto H1 can stand closer to the CTAs. _(Content, Narratologist)_
- **Three founder/story bands overlap** (hero para = first-person, `authority`, `proof`, plus `/studio`). Keep one personal voice; merge the rest. _(Content, Narratologist, P&MR)_
- **Repeated closing copy** — home `contactBand` ≈ `/contact` body; "I keep Paperly small" appears twice. Say each once. _(Content)_
- **USP strip is generic** ("Ships nationwide / Premium stock") and re-anchors on *paper*. Trim to one practical line or remove. _(Content, P&MR, Biz)_
- **Dead/unused copy keys** (`common.learnMore/viewProduct/explore/begin/startProject`) — delete. _(Content, Brand)_
- **"printed" leaks into vision copy** ("a complete printed world", "every printed piece") — swap to "complete world / every piece". _(Content, Brand)_
- **Product descriptions** can lose ~30–40% length and stay on-brand. _(Content)_

### B. Conversion & commerce (practical)
- **No product imagery** anywhere in the Collection (all `images: []`) — #1 conversion blocker; OG cards all fall back to default. _(CRO P0, Visual P0, PM, Growth, SEO)_
- **Add-to-cart dead-ends** — no drawer, header badge easy to miss. _(CRO, Behavioral, Frontend)_
- **Variant cards add cheapest set silently**; card shows floor price w/o set-size context → wrong-variant orders + low anchor. _(E-com, Pricing, UXR)_
- **Checkout**: WhatsApp fallback only appears *after* form-fill; email optional → leads/lead-recovery lost; WA order omits the customer name just typed. _(CRO, Growth, E-com)_
- **Bespoke funnel asymmetry** — "begin" routes to a gallery, not the conversation; portfolio index has no CTA. _(PM, UX Arch, Behavioral)_

### C. IA & navigation
- **"Bespoke" missing from nav** — flagship door hides behind "Portfolio". _(UX Arch P0)_
- **Terminology drift** — "Two ways to begin / Two doors / Bespoke / Portfolio / Bespoke Universes" for the same concept. _(UX Arch, Narratologist)_
- **"How It Works"** (best door-explainer) buried at nav #4, unlinked from home content. _(UX Arch, PM, UXR)_
- **Portfolio pages lack visible breadcrumbs** (shop side has them). _(UX Arch)_
- **For-Planners** is footer-only + groups oddly under "Connect". _(UX Arch, PM)_

### D. Israeli-market essentials
- **No VAT (מע"מ) disclosure** on any price — local buyers expect "כולל מע"מ". _(E-com P0)_ ⚠ confirm prices are entered VAT-inclusive.
- **Bit + installments described but no icons** at the decision point. _(E-com)_
- **Price bidi unguarded** — `₪220` not isolated `<bdi dir="ltr">` in RTL flows (works by luck today). _(E-com, Frontend, Cultural)_

### E. Code defects (frontend / UI / a11y)
- **`fontSize` map replaces defaults** (not under `extend`) → default-named sizes output no CSS. One-line config fix repairs price/logo/footer/placeholder at once. _(UI — verified in live CSS)_
- **`aria-live` spam** on static price/qty/buttons → SR announcement noise. _(Frontend, QA)_
- **Mobile drawer**: no focus trap, no Escape, no `aria-controls`. _(Frontend, QA)_
- **Input contrast 1.28:1 + `outline-none`** on checkout fields (WCAG 1.4.11 fail). _(QA)_
- **beige-accent step numbers** 1.85:1 (also the brief's one palette "never"). _(QA, Brand)_
- **Qty buttons** announce only "minus/plus"; no "added" status region. _(QA, Frontend)_
- **Over-eager `priority`** on below-fold images; 3840w hero fallback → LCP risk once photos land. _(Frontend, QA)_
- **Mobile sticky add-to-cart collides with WhatsApp FAB.** _(Frontend)_
- Note: QA verified **ink-60 on paper/beige passes** contrast (the brief's worry was unfounded); real fails are inputs + beige-accent.

### F. Security & data (before real payment goes live)
- **Webhook auth = echoed plaintext secret, not HMAC**; non-constant-time compare. _(Security P1)_
- **No webhook idempotency** — replay can flip order status. _(Security)_
- **No security headers / CSP / HSTS**; `x-powered-by` leaks stack. _(Security)_
- **No rate-limiting / input validation** on `/api/checkout`; **NaN / unbounded qty** poisons totals. _(Security)_
- **`dangerouslySetInnerHTML` JSON-LD** doesn't escape `</script>` — fine now, risky once catalog is CMS/Supabase-editable. _(Security)_
- Add `import 'server-only'` to `supabase.ts`/`orders.ts`. _(Security)_

### G. Measurement
- **Zero analytics/consent** (no GA4/GTM/Pixel). WhatsApp clicks + purchases untracked; success page fires no `purchase`; webhook fires no server-side conversion. _(Tracking P0)_

### H. SEO / AEO (practical subset)
- Product JSON-LD **missing required `image`** + **`availability: InStock`** on made-to-order → no rich results. _(SEO)_
- **Generic 1-word product titles** ("Menu — Paperly"). _(SEO)_
- **No `llms.txt` / AI-crawler policy / FAQ schema / ItemList**; event types ("wedding/bar-mitzvah") never named as entities. _(AEO, SEO)_
- ✅ hreflang/x-default, canonicals, RTL transcreation, OG, breadcrumbs, internal linking all verified solid. _(SEO)_

### I. Hebrew quality
- **Inconsistent address** — masc-singular שלך vs plural שלכם vs slash מתכננ/ת within one journey. _(Cultural P1)_
- **Hero line** "זו הזמנה של חזון, שלם" — dangling agreement + lost pun → "זו הזמנה לעולם שלם." _(Cultural)_
- **Wedding-only** alt/SEO ("לחתונה") + sole wedding case excludes bar/bat-mitzvah market. _(Cultural, UXR)_
- ✅ RTL mechanics, feminine forms for Sacha, ₪ order, non-mirrored logo/handle all correct. _(Cultural)_

### J. Pricing / AOV
- **Bundle value invisible** — The Table ₪590 actually beats à-la-carte ₪650; never shown. _(Pricing)_
- **No good-better-best emphasis**; mid-tier "The Setting" is weakest value-per-shekel and has no "most chosen". _(Pricing)_
- **"The Full Universe" SKU name collides with "Bespoke Universes"** — protect the word "universe" for bespoke. _(PM, Pricing)_

### K. Deferred per "leaner" (conscious non-actions for now)
- Add more portfolio universes / expand galleries to ~6 images. _(Narratologist, Visual, Biz, PM, P&MR)_
- Richer founder origin "turn"; recast customer as hero throughout. _(Narratologist)_
- Add a "stakes" storytelling beat on home. _(Narratologist)_
- Semi-bespoke mid-tier offer; planner economic terms. _(Biz)_ — strategy, revisit later.
- Bespoke budget/qualifier line — **keep** as a one-liner (practical, filters leads), not a section. _(PM, Psych, P&MR, Biz)_

---

## 3. Proposed fix batches (pick what to greenlight)

- **Batch 1 — Leaner + free quick wins (S):** trim copy/sections (§A), one CTA verb (#4), `fontSize` bug (#1), a11y quick wins (#10), SEO schema fixes (#13), Hebrew hero line + register (#14), set-size on cards (#15). _No new assets needed._
- **Batch 2 — Practical commerce (S–M):** variant cards → PDP (#9), add-to-cart drawer (#6), checkout practicality + VAT/Bit/bidi (#8, #16), nav "Bespoke" + breadcrumbs (#5).
- **Batch 3 — Trust & measurement (M):** analytics + consent (#11), social-proof slot + short FAQ (#7, #13).
- **Batch 4 — Security hardening (M):** all of §F (do before real gateway keys go live).
- **Owner-supplied (no code blocker):** product photos (#3), one real testimonial (#7), Sacha portrait, IG images.

_Recommend starting with **Batch 1** (pure lean-down + correctness, zero new assets), then 2 and 4._
