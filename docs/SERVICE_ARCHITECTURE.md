# FixKar.pk — Service Architecture (Phase 2)

> **Document Type:** Master category reference, tied to code.
> **Status:** Living reference — update whenever `lib/serviceTaxonomy.ts` or
> `lib/services.ts` changes.
> **Source of truth:** `web/lib/serviceTaxonomy.ts` (11 master categories,
> display/grouping layer) and `web/lib/services.ts` (actual bookable
> categories/cities — the only place that determines what's live).

This is the reference for the 11 master categories shown on `/services/`,
their current operational status, and their existing vs. proposed URLs. It
does **not** approve any new indexable page — see `SERVICE_PAGE_ROADMAP.md`
and the SEO quality gate in `SEO_PAGE_GENERATION_RULES.md` for that.

---

## Master categories

| # | Category | Description (as shown on /services/) | Representative services shown | Status | Live category slugs (`lib/services.ts`) | Existing URL | Proposed future URL |
|---|---|---|---|---|---|---|---|
| 1 | AC & Cooling | Repair, gas refill, and installation for home cooling systems. | AC Repair, Gas Refilling, Installation, General Service | **Live** (Lahore only) | `ac-repair` | `/lahore/ac-repair` | `/services/ac-cooling/` (candidate, not built) |
| 2 | Electrical | Wiring faults, installations, and electrical repairs done safely. | Wiring Repair, Switchboard Install, UPS Wiring, Breaker Panel | **Live** (Lahore only) | `electrician` | `/lahore/electrician` | `/services/electrical/` (candidate) |
| 3 | Plumbing & Water | Leak repairs, geyser fixes, and water system installation. | Leak Repair, Geyser Repair, Tap Installation, Drain Unblocking | **Live** (Lahore only) | `plumbing` | `/lahore/plumbing` | `/services/plumbing/` (candidate) |
| 4 | Cleaning | Home, deep, and specialized sofa & carpet cleaning at your doorstep. | Deep Cleaning, Sofa Cleaning, Carpet Cleaning, Water Tank Cleaning | **Live** (Lahore; sofa/carpet cluster also Islamabad & Gujranwala) | `cleaning`, `sofa-carpet-cleaning`, `sofa-cleaning`, `carpet-cleaning` | `/lahore/cleaning` + 3 more | `/services/cleaning/` (candidate hub over the 4) |
| 5 | Painting & Wall | Interior and exterior painting, texture work, and wall treatments. | Interior Painting, Exterior Painting, Dampness Treatment, Wall Texture | **Live** (Lahore only) | `painter` | `/lahore/painter` | `/services/painting/` (candidate) |
| 6 | Gardening & Landscaping | Garden upkeep and landscaping for homes and properties. | Garden Maintenance, Lawn Care, Tree Trimming, Landscaping | **Planned** — no vendor coverage in code | none | none | `/services/gardening/` (candidate, gated on vendor coverage) |
| 7 | Carpentry & Woodwork | Furniture repair, custom woodwork, and door/cabinet fixes. | Furniture Repair, Door Repair, Cabinets, Custom Woodwork | **Planned** — no vendor coverage in code | none | none | `/services/carpentry/` (candidate) |
| 8 | Renovation & Construction | Ceiling, flooring, and renovation work for homes and offices. | False Ceiling, Flooring, Home Renovation, Wall Construction | **Planned** — note: `FIXKAR-SOURCE-OF-TRUTH.md` records confirmed painting + ceiling vendor coverage in Gujrat, but Gujrat/ceiling are not yet in `lib/services.ts` | none | none | `/services/renovation/` (candidate — highest-priority planned category, has real vendor coverage waiting to be added to code) |
| 9 | Pest Control | Treatment for termites, cockroaches, and other household pests. | General Pest Control, Termite Control, Mosquito Control, Fumigation | **Planned** — no vendor coverage in code | none | none | `/services/pest-control/` (candidate) |
| 10 | Appliance Repair | Repairs for refrigerators, washing machines, and home appliances. | Refrigerator Repair, Washing Machine, Microwave Repair, Geyser Repair | **Planned** — no vendor coverage in code | none | none | `/services/appliance-repair/` (candidate) |
| 11 | Security & Smart Home | CCTV, smart locks, and home networking installation. | CCTV Installation, Smart Door Lock, Intercom, Wi-Fi Setup | **Planned** — no vendor coverage in code | none | none | `/services/security-smart-home/` (candidate) |

## Discovery pathways (not master categories, entry points only)

| Pathway | Purpose | CTA | Destination today | Future |
|---|---|---|---|---|
| Business & Commercial Services | B2B/facility customers | "Request a Business Quote" | `/request` (no dedicated flow yet) | `/business-services/` — see `BUSINESS_SERVICES.md` |
| Projects & Contracts | Large-scope/renovation customers | "Request a Project Quote" | `/request` (no dedicated flow yet) | `/projects/` — see `PROJECTS_AND_CONTRACTS.md` |

---

## Rules this table must keep following

1. **Never mark a category "Live" here unless it has at least one entry in `liveCategorySlugs` in `lib/serviceTaxonomy.ts`, which itself must reference a real slug in `lib/services.ts`.** The `/services/` hub UI (`CategoryCard.tsx`) enforces this automatically — a group with an empty `liveCategorySlugs` array always renders as "Coming Soon" with no link, never a bookable card.
2. City-specific nuance (e.g. Cleaning being live in 3 cities but only for the sofa/carpet slice) must stay visible in this table — don't flatten it to a single "Live" flag without the city note.
3. When a category moves from Planned → Live (vendor coverage confirmed and added to `lib/services.ts`), update this table's Status and Live slugs columns in the same change.
4. This table does not grant permission to build the "Proposed future URL" column's pages. That requires passing the gate in `SERVICE_PAGE_ROADMAP.md`.
