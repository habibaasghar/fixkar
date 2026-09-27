# FixKar.pk — `/services/` Hub Page Build Brief

> **Document Type:** Single-page build spec (planning reference for the manually
> designed `/services/` route). Modeled on the same level of rigor as a
> professional agency brief, adapted to FixKar's real data and real
> operating model — no invented services, cities, or trust claims.
> **Status:** Planning only. Do not implement from this doc without a
> separate go-ahead — see `CHANGE_SAFETY_RULES.md`.

---

## 0. Non-negotiable rules (read before touching code)

* **DO NOT** create any new individual service pages.
* **DO NOT** create dynamic routes for this page (no `[slug]`, `[service]`,
  `[location]`, `[category]` under `/services/`).
* **DO NOT** use programmatic SEO or a generic template that stamps out
  pages by substituting a city or service name.
* **DO NOT** generate city pages, suburb pages, or service-location
  combination pages as part of this task.
* This is **one manually coded page**: `app/services/page.tsx` (already
  exists today as a basic grid — see Section 1). This brief describes how
  to evolve that single file, not how to build a page-generation system.
* The `/services/` hub must look and feel **different** from a
  `/[city]/[category]` money page (e.g. `/lahore/ac-repair`). Don't reuse
  that layout wholesale — it should read as a directory/navigation
  experience, not another landing page.
* Keep the existing brand: same header, footer, typography, and favicon
  used across the rest of fixkar.pk. Do not introduce a second visual
  identity for this one page.
* **No false claims.** Every sentence on this page must be checkable
  against real data in `lib/services.ts`, `docs/FIXKAR-SOURCE-OF-TRUTH.md`,
  and `BUSINESS_PLAN.md`. If a fact isn't confirmed operationally, don't
  state it (see Section 9 and `docs/TRUST_AND_PROVIDER_SYSTEM.md`).

---

## 1. Current state (verified 2026-09-28)

* Route already exists: `app/services/page.tsx`.
* Current implementation: a single generic grid rendering all 8 categories
  from `lib/services.ts`, hardcoded to `cities[0]` (Lahore). No category
  grouping, no city awareness, no FAQ, no guide section.
* Individual "service pages" are **not** at `/services/[slug]/` — they live
  at `/[city]/[category]/` (e.g. `/lahore/ac-repair`, `/lahore/electrician`).
  This is structurally different from the Melbourne Cleaning Pro reference
  (which uses flat `/services/[service]/` URLs for a single-city site).
  **Any hub-page redesign must link to the real `/[city]/[category]` URLs,
  not to a `/services/[slug]` pattern that doesn't exist.**
* Real category data currently in `lib/services.ts` (8 categories, all
  under the flat array — no category-of-categories grouping exists yet):
  1. `ac-repair` — AC Repair & Gas Refill
  2. `electrician` — Electrician Services
  3. `plumbing` — Plumbing Services
  4. `cleaning` — Deep Cleaning Services
  5. `painter` — House Painting Services
  6. `sofa-carpet-cleaning` — Sofa & Carpet Cleaning Services (pillar)
  7. `sofa-cleaning` — Sofa Cleaning Services
  8. `carpet-cleaning` — Carpet Cleaning Services
* Real city/category availability (do not contradict this on the hub page):
  | City | Status | Active categories |
  |---|---|---|
  | Lahore | active | all 8 |
  | Islamabad | coming_soon | sofa-carpet-cleaning, sofa-cleaning, carpet-cleaning only |
  | Gujranwala | coming_soon | sofa-carpet-cleaning, sofa-cleaning, carpet-cleaning only |
  | Rawalpindi | coming_soon | none |
  | Karachi | coming_soon | none |
* `docs/SERVICE_TAXONOMY.md` documents 11 long-term categories (AC & Cooling,
  Electrical, Plumbing, Cleaning, Painting, Gardening, Carpentry,
  Renovation, Pest Control, Appliance Repair, Security/Smart Home). Only
  5 of those 11 have any live implementation today (AC, Electrical,
  Plumbing, Cleaning, Painting) plus the Sofa/Carpet vertical. **The hub
  page must only list what's actually bookable** — it must not pre-list
  the other 6 taxonomy categories as if they're live.
* There is no commercial/B2B category live yet, and no `/business-services/`
  or `/projects/` route exists yet (those are planning-only per
  `docs/BUSINESS_SERVICES.md` and `docs/PROJECTS_AND_CONTRACTS.md`).
  **Do not add a "Commercial Services" section with real category cards** —
  at most, a single CTA row pointing at a future business-quote flow,
  worded as "for businesses" rather than implying a live commercial catalog.

---

## 2. Page purpose

The `/services/` page is the central directory for everything FixKar
currently offers or is actively expanding into. Its job:

1. Show visitors what's actually bookable today, grouped sensibly.
2. Make city availability honest and visible (don't let someone in
   Karachi think AC repair is bookable there today).
3. Route each visitor to the correct real page: `/[city]/[category]`.
4. Give a clear path to "not sure what I need" via a guide section.
5. Give a single, clear quote/booking CTA — not a competing wall of buttons.

This is a **navigation/decision page**, not another SEO money page trying
to rank for every individual service keyword (see Section 10,
cannibalization).

---

## 3. Section-by-section content plan

### Section 1 — Hero
* H1 candidate: **"All FixKar Home Services"** or **"Home Services Across
  Pakistan"** — do not claim nationwide *availability*; the claim is about
  the brand/category scope, and city availability is disclosed honestly
  in Section 4.
* Supporting line: explain FixKar connects customers with CNIC-checked
  local partners for home repair, maintenance, and cleaning — only state
  "CNIC-checked" if that is genuinely verified per current vendor
  onboarding (cross-check against `FIXKAR-SOURCE-OF-TRUTH.md` before
  keeping this line; if unconfirmed for current live vendors, soften to
  "vetted by our team").
* Primary CTA: **Get a Quote** (routes to `/request` or WhatsApp, matching
  existing `/request` flow — reuse it, don't invent a new form).
  Given the real operating model (see `BUSINESS_PLAN.md` broker flow),
  the CTA should not promise instant booking — "Get a Quote" is accurate,
  "Book Now" is not, since every job currently goes through a manual
  quote relay before confirmation.
* Secondary CTA: **Browse Services** (anchor scroll to Section 3).

### Section 2 — City availability strip
Unlike the Melbourne reference (single-city site), FixKar spans multiple
cities with different real availability. Add a compact, honest strip near
the top:
* Lahore — fully available (all services)
* Islamabad / Gujranwala — Sofa & Carpet Cleaning available now, other
  services coming soon
* Rawalpindi / Karachi — coming soon

This prevents every category card below from needing an inline disclaimer,
and keeps the page truthful without repeating "coming soon" 8 times.

### Section 3 — Category directory
Group the 8 live categories into visually distinct clusters (not one flat
identical grid):
* **AC & Cooling** — AC Repair
* **Electrical** — Electrician Services
* **Plumbing & Water** — Plumbing Services
* **Cleaning** — Deep Cleaning, Sofa & Carpet Cleaning (pillar), Sofa
  Cleaning, Carpet Cleaning (make clear these are related but distinct
  intents — link each to its own real page, don't merge them into one card)
* **Painting** — House Painting Services

Each card links to the best available real page for that category — for a
category only live in Lahore, link straight to `/lahore/[category]`; do not
force a city-selection step for categories that only exist in one city
today.

Do **not** add cards for the other 6 `SERVICE_TAXONOMY.md` categories
(Gardening, Carpentry, Renovation, Pest Control, Appliance Repair, Security)
— they aren't live. If desired, a single small "More services coming soon"
note is acceptable; do not build placeholder cards/pages for them.

### Section 4 — "Not sure what you need?" guide
Short, genuinely useful scenario list, e.g.:
* "My AC isn't cooling" → AC Repair
* "I need a light/fan/switch fixed" → Electrician
* "My tap/pipe is leaking" → Plumbing
* "My home needs a deep clean" → Deep Cleaning
* "My sofa or carpet needs cleaning" → Sofa & Carpet Cleaning
* "I want to repaint a room" → Painting

Keep this short and practical — do not turn it into a keyword-stuffed list.

### Section 5 — Why FixKar (factual only)
Pull only facts that are true today. Candidates, each must be checked
against real operational status before use:
* Real quotation from a real local partner before you commit (matches the
  actual broker flow — this is honest and differentiates from generic
  directories).
* No upfront platform payment — you pay the partner directly after the job.
* Pakistan-focused, expanding city by city (true — matches
  `CITY_COVERAGE_STRATEGY.md`).

Do **not** claim: number of vendors, number of jobs completed, star
ratings, "verified" badges, guarantees/warranties, or response-time
promises (e.g. "15-minute dispatch") unless each is independently confirmed
as real and currently operating — per `docs/TRUST_AND_PROVIDER_SYSTEM.md`
and the false-claims flag already raised in `FIXKAR_MASTER_PLAN.md`.

### Section 6 — FAQ (hub-level only)
6-8 FAQs about the hub itself, not duplicating category-page FAQs:
* What services does FixKar offer?
* Is FixKar available in my city?
* How does pricing/quoting work?
* Do I pay FixKar or the technician?
* What if my service isn't listed?
* How do I get a quote?

### Section 7 — Final CTA
Distinct visual treatment from category-page CTAs (per Section 0 rule).
Primary: **Get a Quote**. Secondary: **WhatsApp Us**.

---

## 4. What this page must NOT become

* Not a copy of any `/[city]/[category]` page's layout, hero, or CTA
  wording.
* Not a place that lists services/cities that don't have real coverage.
* Not a page that tries to rank for individual service keywords (that's
  the job of the `/[city]/[category]` pages — see Section 10).
* Not a multi-category commercial catalog — commercial/business is a
  single forward-looking CTA at most, until `/business-services/` actually
  exists.

---

## 5. SEO scope

* Primary intent: **"home services Pakistan / Lahore"** (broad hub intent),
  not any single service keyword.
* One H1, logical H2 structure, breadcrumbs, canonical `/services`,
  Organization + ItemList structured data (not per-category Service schema
  — that belongs on the category pages).
* Title/meta must be written fresh for this page — do not reuse or lightly
  edit any existing category page's title/meta (violates
  `DUPLICATE_CONTENT_POLICY.md`).

## 6. Cannibalization prevention

`/services/` → broad "what does FixKar offer" intent.
`/lahore/ac-repair`, `/lahore/electrician`, etc. → each own specific
service+city intent. The hub must not duplicate the category pages'
intro/FAQ/pricing content — link to it, don't repeat it (see
`INTERNAL_LINKING_STRATEGY.md`).

## 7. Internal linking

* Hub links to every real live category page (best available city for
  that category).
* Category pages should link back to `/services/` with natural anchor text
  ("View all services" / "Explore all FixKar services").
* Do not force links to non-existent pages (no `/services/[slug]/` pages,
  no commercial category pages, no unlaunched taxonomy categories).

## 8. Technical requirements

* Stay within the existing Next.js App Router single-page file
  (`app/services/page.tsx`), existing Tailwind setup, existing
  `Container`/`Section`/`PageHeader` layout primitives, existing header/
  footer, existing favicon.
* No new dynamic segments, no new API routes required for this page.
* Static/server-rendered like the rest of the site — no client-side-only
  rendering that would hide content from crawlers.
* Data should come from the existing `lib/services.ts` (`categories`,
  `cities`) — extend that file's shape only if a category-grouping field is
  genuinely needed; do not fork a separate parallel data source.

## 9. Design requirements

Per `docs/UI_DESIGN_SYSTEM.md`: mobile-first, premium-but-accessible,
Pakistani-context illustration language (not generic SaaS stock imagery),
no excessive gradients, strong but singular CTA hierarchy. The hub should
feel like a curated directory — varied card/row treatments per category
cluster, not one repeated identical grid tile x8.

## 10. QA checklist before calling this "done" (once implementation is approved)

1. Production build passes, no TypeScript errors.
2. `/services` loads and every category card links to a real, existing
   `/[city]/[category]` page — no dead links.
3. No city or category is shown as available where `lib/services.ts` says
   otherwise.
4. No new dynamic route or `[slug]` folder was created.
5. No commercial/business category cards were added.
6. Canonical is `/services`, header/footer/favicon unchanged.
7. Responsive check at 390 / 768 / 1024 / 1440px, no horizontal scroll.
8. Every factual claim on the page traced back to a real, current source
   (`lib/services.ts`, `FIXKAR-SOURCE-OF-TRUTH.md`, `BUSINESS_PLAN.md`) —
   nothing invented.

---

**This document is planning/spec only.** Implementation of the redesigned
`/services/page.tsx` should happen as its own reviewed step, not bundled
silently into an unrelated change — per `docs/CHANGE_SAFETY_RULES.md`.
