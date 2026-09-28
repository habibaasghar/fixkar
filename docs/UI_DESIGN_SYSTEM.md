# FixKar.pk — UI Design System

> **Document Type:** Implemented design system reference (Phase 1, 2026-09-28).
> **Status:** LIVE — this document describes what is actually in the code
> today (`app/globals.css`, `components/ui/*`, `components/icons/*`), not an
> aspirational direction. If code and doc ever disagree, treat the code as
> source of truth and fix this doc.
>
> This replaces an earlier draft of this file that recommended fonts
> (Plus Jakarta Sans/Outfit) and colors (slate-900 navy, blue-600 accent)
> that were never actually implemented — a reminder to keep this file tied
> to real code going forward, not aspiration.

---

## 1. Brand color system

The palette is built around the **real FixKar logo** (`public/logo.svg`,
`public/icon.svg`) — teal `#0f766e` and amber `#f59e0b` — rather than the
generic Tailwind blue the site used before Phase 1. Navy was added as a new
primary for a more premium, sophisticated weight than the logo's teal alone
provides.

All tokens live in `app/globals.css`'s `@theme` block. Tailwind v4
auto-generates utility classes from them (`--color-primary` → `bg-primary`,
`text-primary`, `border-primary`, etc.) — **use those utilities, never
hardcode a hex or a raw Tailwind color name** (`blue-600`, `slate-900`, etc.)
in a component.

| Token | Hex | Utility | Use |
|---|---|---|---|
| `--color-primary` | `#0e2a47` | `bg-primary` / `text-primary` | Primary buttons, links, headings on dark, brand wordmark |
| `--color-primary-hover` | `#163a5e` | `bg-primary-hover` | Hover/active state for primary elements |
| `--color-primary-light` | `#eaf0f5` | `bg-primary-light` | Subtle tinted backgrounds (badges, hero gradient) |
| `--color-primary-subtle` | `#d6e2ec` | `bg-primary-subtle` | Slightly stronger tint (badge borders, active chips) |
| `--color-secondary` | `#0f766e` | `bg-secondary` | **Logo teal.** Secondary CTAs, "Home & Property" pathway accent |
| `--color-secondary-hover` | `#14b8a6` | `bg-secondary-hover` | Hover state / logo's gradient endpoint |
| `--color-secondary-light` | `#f0fdfa` | `bg-secondary-light` | Tinted backgrounds using secondary |
| `--color-accent` | `#f59e0b` | `bg-accent` | **Logo amber.** Sparingly — highlights, the "fix" cue, small attention points |
| `--color-accent-hover` | `#d97706` | `bg-accent-hover` | Hover state for accent elements |
| `--color-success` | `#16a34a` | `bg-success` | Confirmation states |
| `--color-warning` | `#d97706` | `bg-warning` | Caution states |
| `--color-error` | `#dc2626` | `bg-error` | Errors, validation |
| `--color-whatsapp` | `#25d366` | `bg-whatsapp` | WhatsApp CTA only — not a general brand color, it's WhatsApp's own brand green |
| `--color-surface-bg` | `#fafaf8` | — (page `background`) | Warm off-white page background (not stark white) |
| `--color-surface-subtle` | `#f5f4f1` | `bg-surface-subtle` | Alternating section backgrounds |
| `--color-surface-muted` | `#efede8` | `bg-surface-muted` | Muted fills |
| `--color-text-main` | `#1a1d21` | (page `foreground`) | Body text — kept from the prior system, already good |
| `--color-text-muted` | `#5f6b7a` | `text-text-muted` (or plain `text-gray-600`, see note) | Secondary text |
| `--color-border-subtle` | `#e5e7eb` | `border-gray-200` equiv. | Card/section borders |

**Note on grays:** existing components still use Tailwind's default
`gray-*` scale for body text and borders (`text-gray-600`, `border-gray-200`)
rather than the `text-main`/`border-subtle` tokens. This was a deliberate
low-risk choice for Phase 1 — the default Tailwind gray scale is already
visually correct against the new warm background and rewriting every
`text-gray-600` sitewide was out of scope. Do this consolidation in a later
pass if full token purity is wanted; it is not urgent since there's no
visual inconsistency today.

---

## 2. Typography

- **Font:** Inter (`next/font/google`, `--font-sans`), loaded once in
  `app/layout.tsx`. Kept from the prior system — it's fast, highly legible
  at small sizes, and has no reason to change.
- **Scale in use** (Tailwind utilities, not custom tokens — Tailwind's
  default type scale is already systematic):
  - Hero H1: `text-3xl sm:text-5xl font-extrabold tracking-tight`
  - Page H1 (`PageHeader`): `text-3xl sm:text-4xl font-extrabold tracking-tight`
  - Section H2: `text-2xl sm:text-3xl font-extrabold`
  - Card H3: `text-lg font-bold`
  - Body: `text-sm sm:text-base` (`text-gray-600`)
  - Small/caption: `text-xs`
- Weight: headings `font-extrabold`/`font-bold`, never thinner than
  `font-medium` for anything load-bearing (no thin/light weights used).

---

## 3. Spacing, radius, shadow

No new custom tokens were introduced for these — Tailwind's built-in scales
are already systematic (4px base spacing unit, fixed radius/shadow steps),
and reusing them avoids design debt (a second parallel token system nobody
would consistently use). Instead, this is the **usage convention** now in
place:

**Spacing:**
- Section vertical padding: `py-12 sm:py-16 md:py-20` (`Section` component
  — every section on the site gets this automatically)
- Card padding: `p-6` (`Card` component)
- Section header to content gap: `mb-10` to `mb-12`

**Radius:**
- Small (inputs, small chips): `rounded-xl` (12px)
- Medium (buttons): `rounded-xl` (12px)
- Large (cards): `rounded-2xl` (16px)
- Extra-large (hero-adjacent feature blocks, CTA panels): `rounded-3xl` (24px)
- Pill (badges, tags): `rounded-full`

**Shadow:**
- Subtle (default card state): `shadow-sm`
- Elevated (card hover, dropdown): `shadow-md` / `shadow-lg`
- Nothing heavier is used anywhere — no diffuse/dark drop shadows.

---

## 4. Components

Reuse these — do not create parallel implementations.

| Component | File | Notes |
|---|---|---|
| `Button` | `components/ui/Button.tsx` | 5 variants: `primary`, `secondary`, `ghost`, `whatsapp`, `danger`. 3 sizes with WCAG-compliant touch targets (36/44/52px min-height). |
| `Card` | `components/ui/Card.tsx` | `rounded-2xl border shadow-sm`, optional `hoverable` (lift + border color on hover) |
| `Badge` | `components/ui/Badge.tsx` | `brand`/`success`/`warning`/`error`/`neutral` |
| `Input` / `Select` / `Textarea` | `components/ui/*` | 44px min height, visible focus ring (`focus:ring-2 focus:ring-primary`), label + error/help text slots |
| `Container` / `Section` / `PageHeader` | `components/layout/Container.tsx` | `Section` backgrounds: `white` / `subtle` / `brand` (navy) / `secondary` (teal) |
| `TrustPoint` | `components/domain/TrustPoint.tsx` | icon + title + text card, used for all trust/value messaging |
| `CategoryCard` | `components/domain/CategoryCard.tsx` | Master-category discovery card (Phase 2), reused on the homepage |
| `HeroServiceSearch` | `components/domain/HeroServiceSearch.tsx` | Homepage hero search — client-side match against live categories only, links to real pages |
| `WhatsAppCTA` | `components/domain/WhatsAppCTA.tsx` | Pre-filled `wa.me` link wrapped in the `whatsapp` button variant |

---

## 5. Icon system

One coherent hand-drawn stroke icon set, `components/icons/index.tsx` —
`viewBox="0 0 24 24"`, `stroke="currentColor"`, `strokeWidth="1.75"`,
rounded caps/joins. No Font Awesome, no mixed icon libraries. As of Phase 1
this includes UI chrome icons (search, phone, menu, chevron, map pin, etc.)
plus 6 category icons added for the Services Hub (`IconSnow`, `IconBolt`,
`IconDroplet`, `IconSparkle`, `IconLeaf`, `IconHome`) alongside the
pre-existing `IconPaint`, `IconWrench`, `IconShield`.

One known inconsistency, not fixed in this phase: `ServiceCategoryCard.tsx`
(the older, still-used card on `/[city]` pages) renders category icons as
raw emoji (❄️⚡🪠🧹🎨) instead of the SVG set. `CategoryCard.tsx` (the newer
Phase 2/homepage component) correctly uses the SVG icon set. Reconciling
these — either migrating `ServiceCategoryCard` to SVG icons or retiring it
in favor of `CategoryCard` — is a good candidate for the next design-system
cleanup pass, not done now to avoid touching unrelated working pages.

---

## 6. Illustration system

**No custom illustrations exist yet.** Real assets on the site today: 5
real vendor before/after photos for the Sofa & Carpet Cleaning vertical
(`public/images/sofa-carpet-cleaning/gallery/`) — nothing else.

Rather than commissioning or AI-generating illustrations now (which the
Phase 1 brief explicitly warns against doing carelessly — no copied styles,
no generic AI human figures), Phase 1 establishes the **abstraction layer**
so real illustrations can be added later without touching component code:
`CategoryCard.tsx`'s `iconMap` indirection and `lib/serviceTaxonomy.ts`'s
per-group `icon`/`accent` fields are the seam — add an `imageUrl` field to
`TaxonomyGroup` and a conditional render branch in `CategoryCard` when real
assets exist, nothing else needs to change.

**Naming convention for future illustrations** (not yet in use, documented
for when real assets are produced):
```
public/images/illustrations/{category-slug}-{variant}.webp
```
e.g. `public/images/illustrations/ac-cooling-hero.webp`,
`public/images/illustrations/plumbing-icon.webp`. Style direction when
produced: Pakistani homes/environments, technicians mid-task, premium/
friendly/slightly-dimensional, consistent stroke weight and color treatment
across all categories — not cartoonish, not generic AI stock-figure style.

---

## 7. Animation

Minimal, deliberate motion only — matches the "no excessive animation"
rule:
- Buttons: `active:scale-[0.98]`, `transition-all duration-150`
- Cards: `hover:-translate-y-0.5 hover:shadow-md`, `transition-all duration-200`
- No parallax, no auto-playing carousels, no floating decorative elements,
  no scroll-triggered reveal animations.
- Respect `prefers-reduced-motion`: none of the above transitions are
  essential to understanding content, so no explicit media query override
  was needed — but if a future animation is added that IS load-bearing
  (e.g. a progress indicator), gate it behind
  `@media (prefers-reduced-motion: no-preference)`.

---

## 8. Accessibility rules already in place

- All interactive elements ≥ 36px, primary CTAs ≥ 44px (mobile-safe touch
  targets).
- Every `Input`/`Select`/`Textarea` has an associated `<label>` via
  `React.useId()` when no explicit `id` is passed.
- Focus states: `focus:outline-none focus:ring-2 focus:ring-primary` (or
  variant-specific ring color) on all interactive components — never
  removed without replacement.
- One `<h1>` per page, logical heading nesting after that.
- `aria-label` on icon-only buttons (menu toggle, search input).
- Availability communicated with text + badge (e.g. "Coming Soon"), never
  color alone.

---

## 9. Breakpoints

Standard Tailwind breakpoints, used consistently (`sm` 640px / `md` 768px /
`lg` 1024px / `xl` 1280px) — no custom breakpoint scale introduced. Layouts
are mobile-first (`grid-cols-1` base, `sm:grid-cols-2`, `lg:grid-cols-3`
etc.), verified down to 320px.

---

## 10. What NOT to do (design-debt rules)

- Don't hardcode `blue-*`/`slate-*`/other raw Tailwind brand-adjacent
  colors in new components — use the semantic tokens.
- Don't add a second button, card, or badge implementation — extend the
  existing `variant` props instead.
- Don't invent a new spacing/radius/shadow scale — use the conventions in
  §3.
- Don't add an icon library — extend `components/icons/index.tsx` in the
  same stroke style.
- Don't add animation/illustration dependencies (Framer Motion, Lottie,
  etc.) — nothing on the site currently needs them, and the brief
  explicitly asks to avoid heavy animation libraries.
