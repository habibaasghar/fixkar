# FixKar.pk — SEO Money-Page Architecture Roadmap (Phase 1: Audit + Architecture)

> **Audit + architecture only.** No components, routes, metadata, database,
> sitemap, navigation, or content were changed to produce this document —
> per explicit instruction. Full raw URL inventory lives in the companion
> file `FIXKAR-URL-MAP.md`; this file is the strategy and phasing built on
> top of it. Grounded against the actual repo as of 2026-09-12 and
> `vendors.csv` (root) for real vendor coverage.

---

## 0. TL;DR for the founder

The site is not starting from zero — Lahore already has a real, working
`/[city]/[category]` engine with 8 categories, correct per-category gating
for Islamabad/Gujranwala (shipped 2026-09-12), schema markup, and a
sitemap. The problem isn't missing architecture, it's that **the site is
already one page-swap away from becoming a template farm**, and **one
category (`painter`) is live with zero evidence of any real vendor
behind it.** This roadmap's job is to say clearly which pages deserve real
investment (content, links, ads) right now, which are legitimate future
bets, and which should not exist yet — before more pages get added on
autopilot.

---

## 1. Current architecture findings

Full row-by-row inventory: **`FIXKAR-URL-MAP.md`**. Summary:

- **Route pattern already correct**: `/[city]/[category]`, generated via
  `generateStaticParams` as a full cross-product — 5 cities × 8 categories
  = 40 category URLs + 5 city hubs. This matches the architecture this
  brief asks to evaluate (`/{city}/{service}`) — **no URL restructuring is
  needed**, the existing pattern should be kept.
- **8 categories exist today**: `ac-repair`, `electrician`, `plumbing`,
  `cleaning`, `painter`, `sofa-carpet-cleaning`, `sofa-cleaning`,
  `carpet-cleaning`. The last 3 were added 2026-09-12 for a confirmed real
  vendor.
- **5 cities exist in code**: Lahore (fully active), Islamabad & Gujranwala
  (partially active — sofa/carpet cluster only, correctly gated), Rawalpindi
  & Karachi (fully "coming soon", **not in this brief's 3-city scope** —
  see URL map §3c).
- **No locality-level pages exist** (no `/lahore/ac-repair-dha` style URLs)
  — DHA/Gulberg/Bahria Town etc. are already handled as a content section
  (`AreaCoverageList`) inside the city page, exactly the "genuine service
  area, not doorway page" pattern this brief asks for. **This is already
  correct — do not change it.**
- **No existing Islamabad or Gujranwala painter/AC/electrician/plumbing
  pages with unique content** — those combinations exist as routes (because
  the route is a cross-product) but render a `ComingSoonState`, not a
  templated money page. No duplicate-content risk there today.
- **`/lahore/painter` exists, not `/lahore/painters`.** Singular. See §7
  and Current Problem #2 below for the recommendation.
- **Two structural risks found that predate this audit and aren't part of
  the sofa/carpet work**: the unbounded `/blog/[slug]` route, and the
  Footer's broken area-links. Both detailed below — not fixed here per
  Rule 2, but they materially affect "crawlability/indexation," which this
  brief lists as a success criterion, so they're documented for Phase 2.

---

## 2. Vendor-reality check (Rule 4, "real services only")

Cross-referencing `vendors.csv` (the CRM prospect sheet) against what's
live on the site:

| Category | Live on site? | Vendor evidence in `vendors.csv` | Confidence |
|---|---|---|---|
| Sofa & Carpet Cleaning (all 3 URLs) | Yes | **Not in this CSV** (secured 2026-09-11, after the CSV's 2026-08-16 date) — but confirmed real, agreement-willing, in this project's own conversation history. | **Highest** — the only category with an actually-confirmed vendor. |
| AC Repair | Yes | 6 Lahore prospects, all `Status: Not Contacted` | Unverified — CSV may be stale, confirm with founder before treating as proven |
| Electrician | Yes | 8 Lahore prospects, all `Not Contacted` | Unverified, same caveat |
| Plumbing | Yes | 7 Lahore prospects, all `Not Contacted` | Unverified, same caveat |
| Cleaning (general) | Yes | 7 Lahore prospects, all `Not Contacted` | Unverified, same caveat |
| **Painter** | **Yes** | **Zero rows of any kind** — no Painter category exists anywhere in the vendor sheet | **Lowest — no evidence of any vendor prospect, contacted or not** |

This is the single most important input to the batching decisions below:
**this roadmap does not treat "already live in code" as equivalent to
"ready for SEO investment."** A page can stay live (Rule 2 forbids removing
it anyway) while the roadmap withholds content/backlink/ad investment from
it until fulfillment is real.

---

## 3. Proposed URL architecture

**Keep `/{city}/{service}` exactly as implemented.** No change recommended.

Specifically:
- Do **not** add a locality segment (`/lahore/ac-repair/dha`) — no service
  currently has locality-differentiated pricing, availability, or content
  that would justify it, and it would fragment the vendor-thin categories
  (painter, cleaning) even further. Revisit only if a specific
  locality+service combination shows independent search volume in GSC
  *and* has locality-specific vendor coverage worth writing about.
- Do **not** introduce a `/services/{service}/{city}` inverted structure —
  the current `/{city}/{service}` matches how Pakistani users actually
  search ("AC repair Lahore", not "Lahore AC repair services directory"),
  and matches the competitor pattern already documented in
  `docs/SOFA_CARPET_CLEANING_LAUNCH_PLAN.md` (Mahir Company, the one
  competitor with real SEO depth, uses this same city-first ordering).
- **`/lahore/painter` stays as-is, singular, not renamed to `/lahore/painters`.**
  Reasoning: no evidence either form converts or ranks better in Pakistani
  search behavior; renaming now costs a redirect on a URL that may already
  have some initial indexation, for zero proven benefit. The category's
  real problem is vendor coverage (§2), not its URL spelling — fix that
  first, revisit naming only if/when real keyword data says otherwise.
- Commercial services, if/when validated, should live under the **same**
  `/{city}/{service}` pattern with a commercial-specific slug (e.g.
  `/lahore/office-cleaning`), not a separate `/commercial/` namespace —
  keeps one flat, consistent architecture rather than two parallel systems.

---

## 4. Service classification (A/B/C/D)

**A = Launch money page now · B = Future money page (needs vendor/data first) · C = Supporting content on an existing page, not its own URL · D = Do not create yet**

### Cleaning
| Service | Class | Why |
|---|---|---|
| House / general cleaning | A | Already live (`/lahore/cleaning`), real content, prospect vendors exist. |
| Deep cleaning | C | No distinct search/content justification separate from general cleaning — keep as a sub-section. |
| Sofa cleaning | A | Real confirmed vendor, dedicated page already shipped. |
| Carpet cleaning | A | Same vendor, dedicated page already shipped. |
| Mattress cleaning | B | Plausible extension of the sofa/carpet vendor's actual capability; no dedicated page/pricing/photos yet — Phase 2 per the sofa/carpet launch plan. |
| Water tank cleaning | B | Genuinely distinct, high-frequency seasonal Pakistani search term (worth checking GSC volume) — currently only a bullet + price line inside the generic `/lahore/cleaning` page, which is adequate for now. Split into its own URL once real search-volume data justifies it, to avoid cannibalizing the general cleaning page early. |
| Kitchen cleaning / Bathroom cleaning | C | Narrow sub-intents, fold into general cleaning content. |
| Curtain cleaning | B | Plausible sofa/carpet vendor extension (Phase 2 per launch plan) — **not currently in the codebase at all**, needs vendor capability confirmation first. |
| Curtain **installation** | D | **Different service from curtain cleaning** — a fitting/hardware job, not a cleaning-crew job. Zero vendor evidence of any kind. Flagging explicitly because it's easy to conflate with curtain cleaning (same word, different trade) — exactly the kind of template-keyword-swap mistake Rule 4/5 warn against. |

### AC
| Service | Class | Why |
|---|---|---|
| AC repair | A | Live, prospect vendors exist, highest seasonal intent category on the site. |
| AC service / maintenance | C | Already a price-line inside `/lahore/ac-repair` ("General Service / Cleaning") — same vendor pool, overlapping intent, keep merged. |
| AC installation | C | Already a price-line inside `/lahore/ac-repair` — same technicians typically do both repair and install; split only if GSC shows install-specific volume large enough to justify its own page. |
| AC gas refill | B | Strong standalone Pakistani search term, already the #1 price line on the existing page **and** already has a matching blog post title ("AC Gas Refill Cost Guide in Lahore"). Natural Batch 2 candidate — the content groundwork already half-exists. |

### Painting
| Service | Class | Why |
|---|---|---|
| Painter / house painting | **A (shipped) but flagged** | Live in code, but zero vendor evidence (§2). Do not invest further SEO/content/ad spend here until at least 2-3 real painter vendors are sourced and contacted — otherwise FixKar risks generating a real lead it cannot fulfill, which is worse for trust than not ranking at all. |
| Wall painting | C | Sub-intent of house painting, no standalone justification. |
| Commercial painting | D | No vendor evidence, no validated commercial demand yet. |

### Home maintenance
| Service | Class | Why |
|---|---|---|
| Electrician | A | Live, prospect vendors exist. |
| Plumber | A | Live, prospect vendors exist (slug is `plumbing`, page covers the plumber trade). |
| Carpenter | D | No page, no vendor, no content anywhere in the codebase. Genuinely common Pakistani home-service search term — worth vendor-sourcing before any page work. |
| Handyman | D | Already used as **brand/positioning language** site-wide ("verified fixers," general marketplace framing), not a distinct bookable trade. A dedicated `/lahore/handyman` page would cannibalize the individual trade pages, since "handyman" search intent in Pakistan is usually a catch-all for exactly what the trade pages already cover. Keep it as homepage/city-hub copy, not a URL. |

### Installation
| Service | Class | Why |
|---|---|---|
| Curtain rod installation | D | Same reasoning as curtain installation above — no vendor evidence, different trade than cleaning. |
| TV / wall mounting | D | No evidence anywhere in the codebase or business context; not urgent per the brief itself ("only if genuinely available"). |

### Commercial (evaluated individually per Rule 4, not auto-created)
| Service | Class | Why |
|---|---|---|
| Office cleaning | B | Most plausible commercial extension of the existing home-cleaning vendor pool (closer in scope to home cleaning than restaurant/kitchen work). Validate demand + get one vendor to confirm commercial capability before building. |
| Restaurant cleaning | D | No vendor evidence of commercial-grade capability; different scale/equipment/insurance expectations than home cleaning. |
| Commercial deep cleaning | D/C | Overlaps office + restaurant cleaning — do not build as a 3rd separate page; if built, consolidate into whichever commercial page ships first. |
| Restaurant exhaust/kitchen cleaning | D | Specialized equipment (grease trap, hood cleaning) — requires a dedicated specialist vendor, not a natural extension of home cleaning crews. |
| Commercial AC services | D | Plausible long-term extension (VRF/ducted/cassette units) but needs a vendor to confirm commercial-unit capability first — home AC technicians don't automatically have this. |
| Commercial painting | D | See painting cluster. |

---

## 5. City × Service launch matrix

| Service | Lahore | Islamabad | Gujranwala |
|---|---|---|---|
| Sofa & Carpet Cleaning cluster (3 URLs) | **Launch now** (live) | **Launch now** (live — real vendor confirmed coverage here) | **Launch now** (live — same) |
| AC repair | Launch now (live) | Launch later — no vendor yet | Launch later — no vendor yet |
| Electrician | Launch now (live) | Launch later | Launch later |
| Plumbing | Launch now (live) | Launch later | Launch later |
| Cleaning (general) | Launch now (live) | Launch later | Launch later |
| Painter | Live, but flagged (§4) | Do not create yet | Do not create yet |
| Mattress / curtain cleaning | Launch later (Batch 2) | Launch later | Launch later |
| Water tank cleaning (standalone) | Launch later | Launch later | Launch later |
| Commercial services | Launch later (validate first) | Do not create yet | Do not create yet |

Note the sofa/carpet cluster is the **only** service currently justified to
launch in all 3 cities simultaneously — because it's the only one with a
vendor who actually confirmed multi-city coverage. Every other category
expanding to Islamabad/Gujranwala should wait for its own real vendor,
exactly mirroring how the sofa/carpet cluster earned its spot — not a
blanket "expand everything to 3 cities" move.

---

## 6. Money-page batching

Status legend: ✅ Shipped · 🔲 Not started · ⏳ Blocked (waiting on vendor/data)

### Batch 1 — Lahore, launch now (7 pages)
| URL | Status |
|---|---|
| `/lahore/ac-repair` | ✅ Shipped |
| `/lahore/electrician` | ✅ Shipped |
| `/lahore/plumbing` | ✅ Shipped |
| `/lahore/cleaning` | ✅ Shipped |
| `/lahore/sofa-carpet-cleaning` | ✅ Shipped |
| `/lahore/sofa-cleaning` | ✅ Shipped |
| `/lahore/carpet-cleaning` | ✅ Shipped |

*(`/lahore/painter` deliberately excluded from the confident Batch 1 list — it's live, but see §4/§7 before spending further SEO effort on it.)*

### Batch 2 — Additional high-intent Lahore services
| URL | Status | Gate |
|---|---|---|
| `/lahore/painter` (content/link investment) | ⏳ | Blocked on: 2-3 real painter vendors contacted/confirmed |
| `/lahore/mattress-cleaning` | 🔲 | Blocked on: vendor capability confirmation + photos/pricing |
| `/lahore/curtain-cleaning` | 🔲 | Blocked on: vendor capability confirmation |
| `/lahore/water-tank-cleaning` | 🔲 | Blocked on: GSC volume check justifying a split from `/lahore/cleaning` |
| `/lahore/ac-gas-refill` | 🔲 | Blocked on: GSC volume check justifying a split from `/lahore/ac-repair`; pair with the existing blog post |

### Batch 3 — Proven services expanded to Islamabad
| URL | Status | Gate |
|---|---|---|
| Sofa/Carpet cluster (3 URLs) | ✅ Already shipped | — (justified exception, see §5) |
| `/islamabad/ac-repair`, `/electrician`, `/plumbing`, `/cleaning`, `/painter` | ⏳ Gated to Coming-Soon | Blocked on: real Islamabad vendor per category |

### Batch 4 — Proven services expanded to Gujranwala
| URL | Status | Gate |
|---|---|---|
| Sofa/Carpet cluster (3 URLs) | ✅ Already shipped | — (same justified exception) |
| `/gujranwala/ac-repair`, `/electrician`, `/plumbing`, `/cleaning`, `/painter` | ⏳ Gated to Coming-Soon | Blocked on: real Gujranwala vendor per category |

### Batch 5 — Commercial/B2B
| URL | Status | Gate |
|---|---|---|
| `/lahore/office-cleaning` | 🔲 | Blocked on: one cleaning vendor confirming commercial capability + validated demand |
| `/lahore/commercial-ac-services` | 🔲 | Blocked on: one AC vendor confirming commercial-unit capability |
| Everything else in the commercial cluster | Do not create | See §4 |

### Batch 6 — Locality/service pages
**None currently justified.** DHA/Gulberg/Bahria Town/etc. remain served
inside the city page's `AreaCoverageList` content section, not as separate
URLs (this already matches Rule 3). Revisit only if GSC shows a specific
locality+service pair with independent search volume *and* FixKar has
locality-specific vendor coverage worth writing unique content about.

---

## 7. Keyword mapping — Batch 1

| URL | Primary Keyword | Secondary Keywords | Intent | City | Audience | Priority |
|---|---|---|---|---|---|---|
| `/lahore/ac-repair` | ac repair Lahore | ac technician Lahore, ac gas refill price Lahore, ac not cooling repair, ac service near me | Transactional/emergency | Lahore | Homeowners, summer urgency | High |
| `/lahore/electrician` | electrician Lahore | electrician near me, home wiring repair Lahore, UPS wiring Lahore, electrician contact number Lahore | Transactional/emergency | Lahore | Homeowners | High |
| `/lahore/plumbing` | plumber Lahore | plumber near me, geyser repair Lahore, water leakage repair Lahore, blocked drain Lahore | Transactional/emergency | Lahore | Homeowners | High |
| `/lahore/cleaning` | home cleaning services Lahore | house cleaning Lahore, deep cleaning service Lahore, cleaning company Lahore | Transactional, planned (not emergency) | Lahore | Homeowners, pre-event/moving | Medium-High |
| `/lahore/sofa-carpet-cleaning` | sofa and carpet cleaning services Lahore | sofa carpet cleaning near me, home upholstery cleaning Lahore | Transactional, planned | Lahore | Homeowners, DHA/Bahria-type households | High |
| `/lahore/sofa-cleaning` | sofa cleaning Lahore | sofa cleaning price Lahore, sofa cleaning near me, sofa shampoo Lahore, how much does sofa cleaning cost | Transactional + price-research (high commercial value) | Lahore | Homeowners | High |
| `/lahore/carpet-cleaning` | carpet cleaning Lahore | carpet cleaning service near me, carpet shampoo Lahore, carpet cleaning price per square foot | Transactional + price-research | Lahore | Homeowners | High |

Keyword data pulled from live search results and competitor pages
(2026-09-11 research, already logged in
`docs/SOFA_CARPET_CLEANING_LAUNCH_PLAN.md` §6) for the sofa/carpet rows;
AC/electrician/plumbing/cleaning rows use standard Pakistani local-service
query patterns already reflected in the existing page copy — **flag for a
real Ahrefs/GSC volume check per the founder's existing SEO workflow**
before treating these as validated, same caveat as the sofa/carpet keywords.

---

## 8. Internal linking architecture — Batch 1

| Page | Links TO | Linked FROM | Anchor text pattern |
|---|---|---|---|
| `/lahore/ac-repair` | `/lahore` (breadcrumb), homepage (breadcrumb) | Homepage category grid, `/lahore` city hub, Footer "Our Services", existing blog post (**currently does not link back — gap, see §9**) | "AC Repair in Lahore", "verified AC technician" |
| `/lahore/electrician` | Same pattern | Same sources | "Electrician in Lahore" |
| `/lahore/plumbing` | Same pattern | Same sources | "Plumber in Lahore" |
| `/lahore/cleaning` | Should link to `/lahore/sofa-carpet-cleaning` ("need your sofa or carpets cleaned too?") — **not yet implemented** | Same core sources | "Deep Cleaning in Lahore" |
| `/lahore/sofa-carpet-cleaning` | `/lahore/sofa-cleaning`, `/lahore/carpet-cleaning` (cross-links) — **speced in the launch plan, not yet built** | Homepage, `/lahore`, `/lahore/cleaning` (once added), Footer | "Sofa & Carpet Cleaning in Lahore" |
| `/lahore/sofa-cleaning` | `/lahore/sofa-carpet-cleaning` (pillar), `/lahore/carpet-cleaning` (sibling) | Same + pillar page | "Sofa Cleaning Service in Lahore" |
| `/lahore/carpet-cleaning` | `/lahore/sofa-carpet-cleaning` (pillar), `/lahore/sofa-cleaning` (sibling) | Same + pillar page | "Carpet Cleaning Service in Lahore" |

Rules applied (avoiding sitewide anchor spam):
- **Homepage** links to every *active* category card once each — already
  correct behavior via `categories.map`, no sitewide repetition.
- **City hub** links to every category active *in that specific city* —
  already correct as of the 2026-09-12 gating change.
- **Cross-links** are limited to genuinely related services (sofa ↔ carpet
  ↔ pillar; cleaning ↔ sofa/carpet pillar) — not a "link every page to
  every page" mesh.
- **Footer** links to every category once under "Our Services" — acceptable
  sitewide pattern since it's a single, clearly-labeled navigation block,
  not repeated keyword-anchor spam in body content.

---

## 9. SEO metadata plan — Batch 1

All 7 Batch 1 pages already have this implemented via `ServiceCategory`
templates in `lib/services.ts` (`h1Template`, `metaTitleTemplate`,
`metaDescriptionTemplate`) — the pattern is correct and should be the
template for Batch 2. Current values:

| URL | SEO Title | H1 | Canonical |
|---|---|---|---|
| `/lahore/ac-repair` | "AC Repair in Lahore \| Verified Technicians" | "AC Repair & Gas Refill Services in Lahore" | `/lahore/ac-repair` ✅ set |
| `/lahore/electrician` | "Electrician in Lahore \| Verified Professionals" | "Certified Electrician Services in Lahore" | ✅ set |
| `/lahore/plumbing` | "Emergency Plumber in Lahore" | "Emergency Plumber Services in Lahore" | ✅ set |
| `/lahore/cleaning` | "Deep Cleaning Service in Lahore" | "Deep Cleaning Services in Lahore" | ✅ set |
| `/lahore/sofa-carpet-cleaning` | "Sofa & Carpet Cleaning in Lahore \| Verified Teams" | "Sofa & Carpet Cleaning Services in Lahore" | ✅ set |
| `/lahore/sofa-cleaning` | "Sofa Cleaning Service in Lahore \| Same-Day Booking" | "Sofa Cleaning Service in Lahore" | ✅ set |
| `/lahore/carpet-cleaning` | "Carpet Cleaning Service in Lahore \| Deep Shampoo & Stain Removal" | "Carpet Cleaning Service in Lahore" | ✅ set |

Gap carried over from `FIXKAR-URL-MAP.md` §4: `FAQSchema` component exists
and is used on `/faq`, but is **not yet wired into any category page** —
recommended for Phase 2 once FAQ copy is written per category (already
speced for the sofa/carpet cluster in the launch plan doc).

---

## 10. Page purpose / CTA structure

Every Batch 1 page already follows one consistent conversion pattern (do
not deviate per-page):
1. **Primary CTA**: `WhatsAppCTA` pre-filled with `"Hi FixKar.pk, I need
   {service} in {city}."` — matches this brief's example
   ("Find a verified AC technician in Lahore") rather than a generic
   "Learn More."
2. **Secondary CTA**: `LeadForm` (name/phone/service/area) further down the
   page for users who don't use WhatsApp — submits to the existing
   `/api/leads` route.
3. No page currently offers a phone-call CTA on desktop (mobile nav has a
   `tel:` link) — consistent, not a gap worth flagging.

---

## 11. Content differentiation requirements

For the sofa/carpet cluster, this is already fully specified in
`docs/SOFA_CARPET_CLEANING_LAUNCH_PLAN.md` §4 (unique intro per city,
city-specific common issues, FAQ variation). For AC/Electrician/
Plumbing/Cleaning (already live, Lahore-only today), the same principle
applies **before** any of them expand to Islamabad/Gujranwala: each city's
version must differ in at least — local area names actually served, 1-2
locally-relevant common issues (e.g. Islamabad's colder winters vs Lahore's
summer-heavy AC demand could shift which issues are emphasized), and at
least one city-specific FAQ. **Do not expand any of these 4 categories to a
new city by copy-pasting the Lahore page with a find-replace on the city
name** — exactly the failure mode this brief warns against.

---

## FINAL REPORT

### A. Current problems (max 10)

1. **Zero confirmed vendor evidence for `painter`, and unconfirmed (stale?)
   contact status for AC/Electrician/Plumbing/Cleaning** — yet all 5 render
   as fully live, bookable pages (§2).
2. **`/blog/[slug]` is an unbounded catch-all** — any slug returns 200 with
   auto-generated title but identical boilerplate body content across every
   possible URL. Real duplicate-content/thin-content risk if ever crawled
   or linked broadly.
3. **Footer's locality links are all wired to the same destination**
   (`/lahore/ac-repair`) regardless of which area label is shown —
   internal-linking defect and mildly misleading anchor text.
4. **No explicit canonical tag on 13 of 15 route types** (all static
   marketing pages) — low risk today, becomes real risk as page count grows.
5. **`FAQSchema` is built but unused on any money page** — missed rich-result
   opportunity on exactly the pages that most need trust signals.
6. **Cross-linking between the sofa/carpet cluster's 3 pages is speced but
   not yet implemented** — pillar and sibling pages don't currently link to
   each other.
7. **`/lahore/cleaning` doesn't cross-sell into the new sofa/carpet cluster**
   despite obvious topical overlap (sofa/mattress cleaning is still
   mentioned inside the generic cleaning page's copy too — mild internal
   keyword overlap between `/lahore/cleaning` and `/lahore/sofa-cleaning`,
   worth a light content pass so they don't compete for the same query).
8. **Rawalpindi and Karachi exist in code but aren't in the current 3-city
   business scope** — 18 near-duplicate Coming-Soon URLs with no
   differentiation, sitting in the sitemap at low priority. Not harmful
   today, but scope creep if left unexamined.
9. **`/request` page metadata hasn't been updated** to mention the new
   sofa/carpet services (cosmetic, not a routing issue).
10. **Category slug naming is inconsistent** (`electrician`/`painter` =
    person-nouns vs `plumbing`/`cleaning` = activity-nouns) — cosmetic,
    not worth a redirect-churn fix now, but should inform naming choices
    for every new category going forward (favor activity-noun style:
    `ac-repair`, `sofa-cleaning`, `office-cleaning`, not `ac-repairer`).

### B. Recommended URL architecture

**Keep exactly what exists: `/{city}/{service}`, flat, no locality segment,
no inverted `/services/{service}/{city}`.** This is already correctly
implemented. The only architectural change worth planning (not doing yet)
is splitting a few currently-merged sub-services into their own URLs once
real search data justifies it (`ac-gas-refill`, `water-tank-cleaning`) —
see Batch 2.

### C. Batch 1 — the 7 pages to actually push right now

| URL | Primary keyword | Secondary keywords | Intent | Audience | Priority | Why it can generate leads |
|---|---|---|---|---|---|---|
| `/lahore/ac-repair` | ac repair Lahore | ac technician Lahore, ac gas refill price | Emergency/transactional | Homeowners | High | Highest-urgency category, already has price transparency + WhatsApp CTA |
| `/lahore/electrician` | electrician Lahore | home wiring repair Lahore | Emergency/transactional | Homeowners | High | Safety-driven urgency converts fast |
| `/lahore/plumbing` | plumber Lahore | geyser repair Lahore, water leakage | Emergency/transactional | Homeowners | High | Same urgency profile |
| `/lahore/cleaning` | home cleaning services Lahore | house cleaning Lahore | Planned/transactional | Homeowners | Medium-High | Broad umbrella term, decent volume, real content |
| `/lahore/sofa-carpet-cleaning` | sofa and carpet cleaning Lahore | sofa carpet cleaning near me | Planned/transactional | DHA/Bahria-type households | High | Real confirmed vendor, dramatic before/after visuals available |
| `/lahore/sofa-cleaning` | sofa cleaning Lahore | sofa cleaning price Lahore | Price-research + transactional | Homeowners | High | Price-intent searches convert well; real market pricing published |
| `/lahore/carpet-cleaning` | carpet cleaning Lahore | carpet cleaning near me | Transactional | Homeowners | High | Under-served by competitors on transparent pricing — real differentiator |

### D. Pages NOT to build yet

- `/lahore/painters` (renamed) — no benefit over existing `/lahore/painter`
- Any `/lahore/painter*` **content/backlink investment** — until vendor sourced
- `/lahore/carpenter`, `/lahore/handyman` — no vendor, cannibalization risk
- `/lahore/curtain-installation`, `/lahore/tv-wall-mounting` — no vendor evidence
- `/lahore/restaurant-cleaning`, `/lahore/restaurant-exhaust-cleaning`,
  `/lahore/commercial-painting` — no vendor evidence, unvalidated demand
- Any `/lahore/ac-repair-{locality}` or `/lahore/{service}-{area}` style page
- Any Islamabad/Gujranwala page outside the sofa/carpet cluster
- Any Rawalpindi/Karachi page (out of current business scope)
- `/lahore/water-tank-cleaning`, `/lahore/ac-gas-refill`,
  `/lahore/mattress-cleaning`, `/lahore/curtain-cleaning` as **separate
  URLs right now** — real candidates, but currently adequately served as
  sections of an existing page; splitting too early risks cannibalizing
  the parent page before it has authority

### E. Risks

- **Keyword cannibalization**: `/lahore/cleaning` and `/lahore/sofa-cleaning`
  both currently reference sofa cleaning — needs a content pass so each
  page has a clearly distinct primary intent (§Current Problems #7).
- **Duplicate pages**: none currently exist among real money pages; the
  `/blog/[slug]` catch-all is the one true duplicate-content mechanism
  in the codebase (#2 above).
- **Thin pages**: `/lahore/painter` is content-complete but
  fulfillment-thin (no vendor) — a different kind of "thin" than word-count,
  but the same trust risk.
- **Doorway pages**: none built; the architecture correctly avoids this by
  keeping localities inside city pages rather than as separate URLs.
- **Over-programmatic expansion**: the temptation will be to expand the
  sofa/carpet win pattern (3 pages × 3 cities) to every category
  immediately — resist this per §5's city×service matrix; each expansion
  needs its own real vendor, not a template copy.
- **Irrelevant commercial pages**: avoided by classifying every commercial
  keyword individually (§4) instead of building the full list from the brief.
- **Weak vendor coverage**: the single biggest live risk on the site today
  is `/lahore/painter` (§2, §Current Problems #1).

---

## PHASE 2 IMPLEMENTATION LOG (2026-09-12)

Approved architecture unchanged (`/{city}/{service}`, no new URLs, no renamed
URLs). All 9 tasks below completed in this order. Validation results at the
end of this log.

| # | Task | Change | Affected routes/files | Verification |
|---|---|---|---|---|
| 1 | Fix blog catch-all | Added `lib/blog.ts` as single source of truth for the 3 real posts; `blog/[slug]/page.tsx` now has `generateStaticParams` scoped to those 3 slugs and calls `notFound()` for anything else instead of deriving a fake title from the slug. `blog/page.tsx` now imports the same source instead of a separate hardcoded list. | `lib/blog.ts` (new), `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` | ✅ Build shows exactly 3 prerendered `/blog/*` paths. Runtime: known slug → 200, `/blog/this-slug-does-not-exist-12345` → 404. |
| 2 | Fix footer locality links | Removed the 6 identical-destination links (all previously pointed to `/lahore/ac-repair`). Column heading now links once to `/lahore` (the real page that lists these areas); area names render as plain text, not individually-misleading links. Also corrected the adjacent "Operating City" line, which still said "Expanding to Karachi" and didn't mention the now-live Islamabad/Gujranwala sofa-carpet coverage. | `components/layout/Footer.tsx` | ✅ Visual/manual check — no more duplicate-destination links; copy now accurate. |
| 3 | Explicit canonicals | Added `alternates.canonical` to all 13 listed static pages + homepage. `/partner/register` is a client component (can't export `metadata`), so added `app/partner/register/layout.tsx` to carry its metadata/canonical. `/thank-you` also got `robots: { index: false, follow: true }` (post-conversion page, no independent search value) — money pages were left untouched (still indexable). | `app/page.tsx`, `app/services/page.tsx`, `app/how-it-works/page.tsx`, `app/trust-safety/page.tsx`, `app/about/page.tsx`, `app/faq/page.tsx`, `app/partner/page.tsx`, `app/partner/register/layout.tsx` (new), `app/contact/page.tsx`, `app/request/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/thank-you/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` (bonus, natural fit while fixing Task 1) | ✅ Curl-verified `<link rel="canonical">` present and correct on `/`, `/about`, `/thank-you`; `noindex` meta confirmed on `/thank-you`. |
| 4 | Money-page FAQs + schema | Added `faqs?: CategoryFAQ[]` to the `ServiceCategory` type and wrote 5 genuine, distinct FAQs per category (availability, process, pricing approach, booking, what to prepare) for all 8 categories — no identical questions across pages, no invented guarantees/stats beyond what's already claimed elsewhere on the site (pay-after-service, CNIC verification). Category page now renders them via the existing `AccordionItem` UI and mirrors the exact same text into the existing `FAQSchema` component. | `lib/types.ts`, `lib/services.ts`, `app/[city]/[category]/page.tsx` | ✅ Curl-verified `"@type":"FAQPage"` present on `/lahore/ac-repair` and `/lahore/electrician`; visible accordion text matches schema text (same source array). |
| 5 | Sofa/carpet internal linking | Added `relatedCategories?: string[]` to `ServiceCategory`; wired pillar ↔ sofa-cleaning ↔ carpet-cleaning as a 3-way cross-link via a new small `RelatedServices` component (one line, "You might also need: X, Y" — not a card grid/link dump). Links are filtered through `isCategoryActiveInCity` so a city never links to a category that isn't actually live there. | `components/domain/RelatedServices.tsx` (new), `lib/services.ts`, `app/[city]/[category]/page.tsx` | ✅ Curl-verified correct links render on `/lahore/sofa-cleaning` (→ pillar + carpet-cleaning). |
| 6 | Cleaning-page cannibalization | `/lahore/cleaning` no longer mentions "sofa" as a common issue or lists a sofa price line (both removed) — it now leads with general/house cleaning (full home, move-in/move-out, water tank, post-construction, kitchen/washroom) and points sofa/carpet seekers to the dedicated pages via its intro line, an FAQ, and the new related-services link (added as part of task 5's mechanism). Sofa/carpet/pillar pages were already correctly keyword-separated — no change needed there. | `lib/services.ts` (`cleaning` category only) | ✅ Curl-verified `/lahore/cleaning` now links to `/lahore/sofa-carpet-cleaning`; no remaining "sofa" text in its commonIssues/priceRanges. |
| 7 | Painter page | Reviewed per instruction — no rename, no locality pages. Only gap found was the missing FAQ block, which Task 4 already closed. No other SEO/content problems found worth changing under a "light touch" mandate. | `lib/services.ts` (`painter` FAQs, same edit as Task 4) | ✅ Same build/route verification as Task 4. |
| 8 | Request page metadata | Updated the meta description to include "sofa & carpet cleaning" (previously listed only the original 5 categories) — one-line, concise change, no other copy touched. | `app/request/page.tsx` (combined with its Task 3 canonical edit) | ✅ Reviewed diff — single sentence changed. |

**Two small adjacent fixes made while already editing the same lines** (flagged transparently, not separate scope): `app/services/page.tsx`'s meta description also only listed 5 categories — added "sofa & carpet cleaning" there too, same one-line reasoning as Task 8.

### Validation results

- **TypeScript** (`npx tsc --noEmit`): ✅ Pass, zero errors.
- **Production build** (`npm run build`): ✅ Pass. Route manifest confirms `/blog/[slug]` now prerenders exactly 3 paths (previously unbounded).
- **Route tests** (production server, curl): `/`, `/lahore/ac-repair`, `/lahore/sofa-cleaning`, `/lahore/painter`, `/islamabad/sofa-carpet-cleaning` → 200. `/islamabad/ac-repair` → 200 rendering the existing (unchanged) Coming-Soon state, as expected/by design. `/blog/ac-gas-refill-cost-guide-lahore-2026` → 200. `/blog/this-slug-does-not-exist-12345` → **404** (was 200 before this phase). `/sitemap.xml`, `/robots.txt`, `/partner/register` → 200.
- **Metadata**: canonical confirmed correct on `/`, `/about`, `/thank-you`; `noindex` confirmed on `/thank-you`; all money-page canonicals unchanged and still correct.
- **Structured data**: `FAQPage` JSON-LD confirmed present only on the 8 category pages (all now have `faqs`); visible accordion text and schema text come from the same array, so they cannot drift apart.

### Remaining open item (not part of this phase, unresolved)

Real current vendor-contact status for AC/Electrician/Plumbing/Cleaning/Painter
is still unconfirmed (the founder has said fulfillment exists beyond what
`vendors.csv` shows, but the CSV itself wasn't updated this phase — no code
change was appropriate for that, it's a data/ops question). Recommend
updating `vendors.csv` itself once real contact status is known, so future
audits don't need this caveat repeated.

---

### F. Next implementation step (Phase 2 — do NOT do this yet, approval needed first)

Once this architecture is approved, Phase 2 should be scoped as its own
session and should **only** cover, in this order:
1. Fix the `/blog/[slug]` unbounded-slug issue (gate to known posts,
   `notFound()` for anything else) — highest-severity item, independent of
   any money-page work.
2. Fix the Footer locality-links bug (each area should link to a real,
   distinct destination or be removed if there's nothing distinct to link to).
3. Add explicit `alternates.canonical` to the static marketing pages.
4. Wire `FAQSchema` + real FAQ copy into the 7 Batch 1 category pages.
5. Build the sofa/carpet cross-linking (`RelatedServices` block) already
   speced in the launch plan.
6. **Only after founder confirms real current vendor-contact status**
   for AC/Electrician/Plumbing/Cleaning/Painter: decide whether Painter
   gets paused (no new content/links until vendors exist) or fast-tracked
   (if it turns out vendors were actually contacted since the CSV was last
   updated).
7. Batch 2 pages only begin after (1)-(6) are done and Batch 1 has real
   lead data to prove the pattern.
