# FixKar.pk — Service Page Roadmap

> **Document Type:** Future-page tracking. One row per potential future
> service page. Nothing in this table is approved for implementation —
> "Page Required?" is a research conclusion, not a build order.
> **Rule:** Never fill in a keyword-volume number. Use `TBD` until real
> research (Ahrefs/GSC/Screaming Frog, per `BUSINESS_PLAN.md`'s SEO research
> workflow) has actually been run. An invented number is worse than no
> number — see `DUPLICATE_CONTENT_POLICY.md` / `PROGRAMMATIC_SEO_RULES.md`.

## How to read this table

- **Page Required?** — `YES` only after the full gate below is checked.
  `TBD` is the default for anything not yet researched. `NO` means research
  concluded a dedicated page isn't justified (e.g. intent already served by
  an existing page).
- **Vendor availability** — pulled from `FIXKAR-SOURCE-OF-TRUTH.md` §1 and
  `lib/services.ts`, not guessed.
- **Implementation status** — `Not started` / `Researching` / `Approved,
  not built` / `Built`. Nothing below is past `Not started` as of this doc.

---

## SEO quality gate (every row must pass before Page Required? = YES)

```
[ ] Real service exists
[ ] FixKar can fulfill it
[ ] Search intent is distinct from existing pages
[ ] Keyword research completed (no TBD left)
[ ] No cannibalization with existing/other planned pages
[ ] Unique content opportunity exists
[ ] URL is logical and matches URL_ARCHITECTURE.md rules
[ ] Internal linking plan exists
[ ] CTA exists and matches customer intent
[ ] Schema opportunity evaluated
[ ] City strategy evaluated
[ ] Duplicate-content check passed
```

---

## Tier 1 — category hub pages (`/services/[category]/`)

These would sit between `/services/` and the existing `/[city]/[category]/`
money pages — a category overview across all cities/sub-services. None
exist today.

| Category | Current URL | Proposed URL | Page Required? | Search intent | Primary keyword | Secondary keywords | City strategy | Vendor availability | Unique content opportunity | Cannibalization risk | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| AC & Cooling | `/lahore/ac-repair` only | `/services/ac-cooling/` | TBD | Likely overlaps with `/lahore/ac-repair`'s existing intent | TBD | TBD | Would need to justify existing vs city page | Live, Lahore only | Low while only 1 city — a category hub with one city underneath adds little over the existing page | **High** — near-identical intent to `/lahore/ac-repair` until multi-city | Not started |
| Electrical | `/lahore/electrician` only | `/services/electrical/` | TBD | Same pattern as AC & Cooling | TBD | TBD | Same | Live, Lahore only | Low while single-city | High, same reason | Not started |
| Plumbing & Water | `/lahore/plumbing` only | `/services/plumbing/` | TBD | Same pattern | TBD | TBD | Same | Live, Lahore only | Low while single-city | High, same reason | Not started |
| Cleaning | `/lahore/cleaning`, `/lahore/sofa-carpet-cleaning`, `/lahore/sofa-cleaning`, `/lahore/carpet-cleaning` | `/services/cleaning/` | TBD | **Best current candidate** — 4 real sub-pages already exist, a hub genuinely aggregates distinct intents instead of duplicating one | TBD | TBD | Multi-city already (Lahore/Islamabad/Gujranwala for sofa/carpet) — real differentiation opportunity | Live, multi-city for sofa/carpet cluster | **Higher than the others** — can legitimately compare/route between 4 real pages | Medium — must stay clearly "hub linking to 4 pages," not repeat their content | Not started |
| Painting & Wall | `/lahore/painter` only | `/services/painting/` | TBD | Same pattern as AC/Electrical/Plumbing | TBD | TBD | Same | Live, Lahore only | Low while single-city | High, same reason | Not started |
| Gardening & Landscaping | none | `/services/gardening/` | **NO** (for now) | N/A | — | — | — | **Not available — no vendor coverage** | — | — | Blocked on vendor coverage |
| Carpentry & Woodwork | none | `/services/carpentry/` | **NO** (for now) | N/A | — | — | — | **Not available — no vendor coverage** | — | — | Blocked on vendor coverage |
| Renovation & Construction | none | `/services/renovation/` | TBD, but **highest priority to research next** | Likely strong — renovation/ceiling has real demand and real vendor coverage in Gujrat | TBD | TBD | Gujrat has confirmed painting + ceiling vendor coverage per `FIXKAR-SOURCE-OF-TRUTH.md`, not yet in `lib/services.ts` | **Vendor coverage confirmed (Gujrat), not yet in code** | High — genuinely new category, no existing page to cannibalize | Low — nothing else covers this intent today | Not started, but recommended next research target |
| Pest Control | none | `/services/pest-control/` | **NO** (for now) | N/A | — | — | — | **Not available — no vendor coverage** | — | — | Blocked on vendor coverage |
| Appliance Repair | none | `/services/appliance-repair/` | **NO** (for now) | N/A | — | — | — | **Not available — no vendor coverage** | — | — | Blocked on vendor coverage |
| Security & Smart Home | none | `/services/security-smart-home/` | **NO** (for now) | N/A | — | — | — | **Not available — no vendor coverage** | — | — | Blocked on vendor coverage |

## Tier 2 — individual service pages within a category (example candidates only)

Per the Phase 2 brief, individual service URLs like these are **candidates
to research later, category-by-category** — none are approved, none have
had keyword research run. Listed here only so the shape of the future table
is established.

| Category | Service | Proposed URL | Page Required? | Notes |
|---|---|---|---|---|
| Cleaning | Home Cleaning | `/services/cleaning/home-cleaning/` | TBD | Currently covered as one issue within `/lahore/cleaning`; would need distinct intent proof to split out |
| Cleaning | Deep Cleaning | `/services/cleaning/deep-cleaning/` | TBD | Same — currently the same page as Home Cleaning (`cleaning` category) |
| Cleaning | Sofa Cleaning | `/services/cleaning/sofa-cleaning/` | **NO** | Already has its own real page at `/lahore/sofa-cleaning` — do not create a second URL for the same intent |
| Cleaning | Carpet Cleaning | `/services/cleaning/carpet-cleaning/` | **NO** | Already has its own real page at `/lahore/carpet-cleaning` — same reasoning |

---

## Next research action

Per `BUSINESS_PLAN.md`'s SEO research workflow: run Ahrefs/Screaming Frog on
**Renovation & Construction** and **Cleaning** first — they're the two rows
above with the strongest real-world signal (confirmed vendor coverage /
existing multi-page cluster) to justify the research time. Do not run
keyword research on the 5 blocked (no vendor coverage) categories until
vendor coverage exists — research on unfulfillable categories is wasted
effort per `CHANGE_SAFETY_RULES.md`.
