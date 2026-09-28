# FixKar.pk — Homepage Architecture (Phase 1)

> **Document Type:** Section-by-section reference for `app/page.tsx`.
> **Status:** LIVE — describes the actual rebuilt homepage (2026-09-28).

---

## Section order, purpose, and conversion objective

| # | Section | Purpose | Conversion objective | Key components |
|---|---|---|---|---|
| 1 | Hero | Communicate what FixKar does, who it's for, how to start — within seconds | Get the visitor searching or clicking "Get a Quote" | Custom hero markup, `HeroServiceSearch`, `Button`, `WhatsAppCTA` |
| 2 | Trust strip | Immediate, compact credibility signal right after the promise | Reduce bounce before scroll | Plain inline markup (not full `TrustPoint` cards — deliberately lighter here since a fuller trust section exists further down) |
| 3 | Service discovery ("What Do You Need Help With?") | Show the real service categories, let visitors self-select | Click into a real `/[city]/[category]` page | `CategoryCard` × 5 (live groups only) + a "View All 11 Categories" card linking to `/services` |
| 4 | How FixKar Works | Explain the (real, founder-mediated) process so it doesn't feel like an anonymous directory | Build process confidence before the ask | `HowItWorksStep` × 3 |
| 5 | Why FixKar | Answer "why not just find a random worker myself" | Reinforce trust with specifics | `TrustPoint` × 4 |
| 6 | Home & Property / Business & Commercial split | Establish the future platform architecture (residential vs. B2B) without building the B2B system yet | Route business customers toward "Request a Business Quote" instead of the generic residential form | Two custom cards, both CTAs → `/request` (no dedicated `/business-services` flow exists yet) |
| 7 | Projects preview | Signal that FixKar also handles larger-scope work, distinctly from a quick booking | "Request a Project Quote" click | Custom `Section background="brand"` panel, CTA → `/request` |
| 8 | Serving Cities | Honest geographic-coverage overview, extensible as new cities activate | Click into a real `/[city]` page | `CityCard` × 5 (reused unchanged from the prior homepage — already honest about active/partial/coming-soon status) |
| 9 | Final CTA + lead form | Last-chance conversion for visitors who scrolled the whole page | Form submission or WhatsApp click | `LeadForm`, `WhatsAppCTA` |

**Testimonials:** deliberately omitted. No real customer reviews exist
anywhere in the codebase or database (confirmed in
`FIXKAR-SOURCE-OF-TRUTH.md`) — per the Phase 1 brief's explicit instruction,
no fabricated names/photos/ratings were added, and no placeholder section
was inserted either (a section that's clearly "coming soon" for reviews
would draw attention to their absence for no benefit).

---

## Responsive behavior

- Mobile-first grids throughout: `grid-cols-1` base → `sm:grid-cols-2` →
  `lg:grid-cols-3` (category cards, trust points) or `md:grid-cols-2`
  (Home/Business split), `md:grid-cols-3` (city cards).
- Hero CTAs stack vertically below `sm`, sit side-by-side above it
  (`flex-col sm:flex-row`).
- `HeroServiceSearch`'s result dropdown is full-width relative to the input
  at every breakpoint — no separate mobile treatment needed since it's
  already a simple stacked list.
- Verified down to 320px width via responsive utility review (see final
  report in conversation) — build passes, no fixed-width elements that
  would overflow at any tested breakpoint.

---

## Future extension points

- **Hero search → `/services?q=`:** the `WebSite` `SearchAction` schema on
  the homepage already declares `/services?q={search_term_string}` as the
  search target for search-engine sitelinks search box support. The actual
  `/services` page does not yet read a `q` query param to pre-filter
  `CategoryDiscovery` — a small, safe follow-up (not done now to keep
  Phase 1 scoped to homepage + design system, not cross-page wiring).
- **Business & Projects CTAs** currently both route to `/request` (the
  existing generic lead form). Once `/business-services/` and `/projects/`
  are built (see `BUSINESS_SERVICES.md`, `PROJECTS_AND_CONTRACTS.md`), swap
  these two `href`s to the dedicated flows — no other homepage change
  needed.
- **City section** already reads from `lib/services.ts`'s `cities` array,
  so adding a new city (e.g. Gujrat, per the source-of-truth's confirmed-
  vendor note) automatically appears here with zero homepage code changes.
- **Service discovery section** reads from `lib/serviceTaxonomy.ts`'s
  `liveCategorySlugs` — when a currently-planned category (e.g. Renovation)
  gets real vendor coverage added to `lib/services.ts` and its taxonomy
  group updated, it automatically appears on the homepage as a live card,
  again with zero homepage code changes.
- **Illustrations:** see `UI_DESIGN_SYSTEM.md` §6 — the category
  icon/accent abstraction in `CategoryCard` is the seam for adding real
  imagery later.

---

## Deliberate deviations from the Phase 1 brief

1. **Header nav does not include "Locations," "Business Services," or
   "Projects"** as the brief's example structure suggested. Those routes
   don't exist yet, and every phase of this project has carried the same
   overriding rule: never link to a page that doesn't exist. Once
   `/business-services/` and `/projects/` are real, add them to the nav in
   that same change.
2. **No fake "10,000+ customers" / rating claims anywhere** — per the
   brief's own instruction and the standing trust-claims policy from the
   prior cleanup pass.
