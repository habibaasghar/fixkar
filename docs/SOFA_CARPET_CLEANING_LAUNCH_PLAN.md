# FixKar.pk — Sofa & Carpet Cleaning Launch Plan (Lahore / Islamabad / Gujranwala)

> Planning document only. No code, routes, or pages created by this document.
> Grounded against the actual codebase as of 2026-09-11 (`lib/services.ts`,
> `lib/types.ts`, `app/[city]/[category]/page.tsx`, `app/page.tsx`, `public/`).
> Supersedes nothing — extends `docs/FIXKAR_VENDOR_OPERATIONS_V1.md` (vendor
> ops) and the root `BUSINESS_PLAN.md` (business model ledger).

## 0. Decisions locked this session

| Question | Decision |
|---|---|
| Sofa/Carpet Cleaning: own vertical or folded into generic "Cleaning"? | **Own vertical** — new pillar category `sofa-carpet-cleaning` + two single-intent categories `sofa-cleaning` and `carpet-cleaning`. Generic `cleaning` category stays for water-tank/full-home/post-construction. |
| Islamabad & Gujranwala currently `status: "coming_soon"` site-wide | **Per-category activation.** These two cities go live *only* for the sofa/carpet vertical. AC/Electrician/Plumbing/generic-Cleaning stay "coming soon" there until a vendor exists. Requires a small data-model change (§3). |
| "Azeem Sofa Carpet Cleaners" (DHA Phase 1, Lahore) | **Not our vendor. Not displayed anywhere on site.** Sent to us purely as a competitor reference to understand what a real, established (since-1992, 5★/719-reviews) sofa/carpet cleaner in Lahore offers, so our content/service list matches real market vocabulary and search intent. Our own vendor for this vertical is separate and stays unbranded on-site, same as every other category (FixKar-branded marketplace model, vendor identity revealed only after booking — consistent with existing AC/Electrician/Plumbing pages). |

---

## 1. Competitor research snapshot (reference only)

Source: `sofacarpetcleaner.com` (Azeem Sofa Carpet Cleaning Services, DHA Phase 1
Lahore, operating since 1992, 5★ / 719 reviews, 24/7, +92-321-4907581).

**Their service taxonomy** (8 services, each a separate page):
Sofa Cleaning, Carpet Cleaning, Curtain Cleaning, Laundry Service, Rugs
Cleaning, Blinds Cleaning, Dining Chairs Cleaning, Mattress Cleaning, plus a
Dry Cleaning product line.

**What to borrow:**
- Splitting sofa vs. carpet into separate pages/keywords instead of one blob —
  confirms these are two distinct high-intent searches, not one.
- FAQ content answering literal query phrasing: "sofa cleaning prices in
  Lahore", "sofa cleaning services near me" — good raw material for our FAQ
  schema (§8), rewritten in our own words.
- 4-step process framing (contact → schedule → work → payment) mirrors our
  own "How FixKar Works" pattern already on the homepage — reuse, don't
  reinvent.

**What to avoid replicating:**
- No visible fixed pricing ("Rs. 0.00" placeholder, "Availability: N/A") —
  we already do better with real `priceRanges` on every category page; keep
  that advantage for sofa/carpet too.
- Contradictory trust claims (footer says "since 1992", body copy says
  "17 years", "25 years" in different spots) — a credibility leak. Keep our
  own claims single-sourced from `constants.ts`/`services.ts`, never
  hand-typed differently per page.
- Single-city (Lahore/DHA) framing only — our multi-city structure is the
  actual differentiator once Islamabad/Gujranwala go live.

---

## 2. URL / page architecture

Current routing is already fully data-driven: `app/[city]/[category]/page.tsx`
renders *any* entry added to the `categories` array in `lib/services.ts` — no
new route files are needed for this launch. This keeps the URL structure flat
(good for indexing — no unnecessary depth, no duplicate-content risk from an
extra nesting level) and matches the pattern Google already understands from
the existing AC/Electrician/Plumbing/Cleaning pages.

| URL | Role | Target keyword |
|---|---|---|
| `/lahore/sofa-carpet-cleaning` | Pillar page (this vertical's hub) | "sofa and carpet cleaning services Lahore" |
| `/lahore/sofa-cleaning` | Single-intent page | "sofa cleaning Lahore", "sofa shampoo Lahore" |
| `/lahore/carpet-cleaning` | Single-intent page | "carpet cleaning Lahore", "carpet shampoo Lahore" |
| `/islamabad/sofa-carpet-cleaning`, `/islamabad/sofa-cleaning`, `/islamabad/carpet-cleaning` | Same 3, Islamabad | "...Islamabad" variants |
| `/gujranwala/sofa-carpet-cleaning`, `/gujranwala/sofa-cleaning`, `/gujranwala/carpet-cleaning` | Same 3, Gujranwala | "...Gujranwala" variants |

**Phase 2 (only after these prove out):** `mattress-cleaning`,
`curtain-cleaning` — same pattern, zero new code, just new `categories.ts`
entries once there's real content/photos to back them.

**Why not `/lahore/sofa-carpet-cleaning/sofa-cleaning` (nested)?** It would
require a new 3-level dynamic route, adds a redundant path segment with no
keyword value, and risks the pillar and sub-pages cannibalizing each other in
search results. Flat siblings + strong internal linking between them (§7)
gets the SEO benefit without the engineering cost.

---

## 3. Data model change required

`City.status` is currently one value for the *whole* city. Per-category
activation needs a per-category override. Minimal addition to `lib/types.ts`:

```ts
export type City = {
  slug: string;
  name: string;
  status: CityStatus; // fallback / default for categories not listed below
  activeCategories?: string[]; // category slugs live in this city, overrides `status`
  areas: string[];
  metaTitle: string;
  metaDescription: string;
};
```

Then in `lib/services.ts`, Islamabad and Gujranwala keep `status:
"coming_soon"` but add `activeCategories: ["sofa-carpet-cleaning",
"sofa-cleaning", "carpet-cleaning"]`. Any page/component that currently
gates on `city.status === "active"` (homepage city picker, `ComingSoonState`,
sitemap generation) needs a small helper:

```ts
export function isCategoryActiveInCity(city: City, categorySlug: string) {
  return city.status === "active" || city.activeCategories?.includes(categorySlug);
}
```

This is the only structural code change this plan requires before content
work can start — flagging it now so it isn't discovered mid-build.

---

## 4. Page-by-page content plan

Each of the 9 URLs in §2 needs **unique** copy (not city-name find/replace) —
duplicate boilerplate across cities is the fastest way to get city pages
filtered out of the index. Minimum unique elements per page:

1. **H1** via `h1Template(city)` — already forces per-city uniqueness.
2. **Intro paragraph** — must reference something locally specific (area
   names from `city.areas`, e.g. "sofas in DHA and Bahria Town apartments see
   more dust from construction than older Model Town homes" style detail),
   not just the city name swapped in.
3. **`commonIssues`** — keep 5 items but let 1–2 vary by city if there's a
   real local reason (e.g. Islamabad: more wall-to-wall carpeting in
   government-sector homes vs. Lahore's mixed sofa-heavy DHA households).
4. **`priceRanges`** — sofa/carpet pricing structured like the existing
   cleaning category: per-seat sofa pricing (2/5/7-seater), per-room carpet
   pricing, add-ons (stain treatment, anti-allergen treatment).
5. **Area coverage list** (`AreaCoverageList`, already built) — reuse as-is.
6. **FAQ block** (new — see §8) — 4-6 Q&As, can share ~70% across cities but
   1-2 must be city-specific ("Do you cover Bahria Town Islamabad?").
7. **Pillar → sub-page cross-links** (§7).

**Content source of truth:** extend `lib/services.ts` `categories` array with
3 new `ServiceCategory` entries (`sofa-carpet-cleaning`, `sofa-cleaning`,
`carpet-cleaning`), following the exact shape already used by `cleaning`/
`ac-repair`. No new component code needed — `[city]/[category]/page.tsx`
already renders whatever is in the array.

---

## 5. Images plan

Current state: **zero real photography anywhere in `public/`** — only
default Next.js scaffold SVGs (`next.svg`, `vercel.svg`, `globe.svg`,
`window.svg`, `file.svg`) plus generic icon/logo files. This is the single
biggest driver of the "generic" feeling — every category page currently
renders with no photo at all.

**What's needed per city page (minimum viable):**
- 1 hero image: sofa or carpet mid-clean (steam/shampoo visible), real job
  photo, not stock. Source: ask the vendor to WhatsApp 3-5 before/after
  photos from their next 2-3 completed jobs (same pattern already planned
  for vendor onboarding in the Ops doc) — this is free and authentic.
- 2-3 supporting images: before/after pair, equipment/technician at work,
  optionally a "verified technician" style photo (face blurred/cropped if
  privacy is a concern at this stage).
- Fallback while waiting on real photos: a single well-designed illustrated
  hero (not stock photography, not another SVG placeholder) so the page never
  ships looking empty — but treat this as temporary, swap for real photos
  within the first 2-3 completed jobs per city.

**Received 2026-09-11 — first 5 real vendor photos, now in
`public/images/sofa-carpet-cleaning/gallery/`:**
- `sofa-fabric-cleaning-before-after-01.jpg` — patterned red/cream 3-seater, diagonal before/after split
- `sofa-cleaning-before-after-beige-damask-02.jpg` — beige damask loveseat, stacked before/after
- `heavily-soiled-sofa-deep-cleaning-before-after-03.jpg` — heavily soiled suede/velvet armchair, dramatic transformation (**strongest trust-building shot of the 5** — use as the hero/lead image)
- `tufted-sofa-cleaning-before-after-04.jpg` — tufted beige velvet chesterfield-style chair
- `round-rug-cleaning-before-after-05.jpg` — round rug/ottoman surface, grey

These are generic before/after shots with no visible city context, so they
can be reused across all 3 city pages (Lahore/Islamabad/Gujranwala) until
enough per-city job photos exist to split them out. Still pending before
these go live on a page: (1) convert to WebP + compress (currently raw
WhatsApp JPEGs, 240KB-580KB each — over the ≤150KB target below), (2) confirm
with the vendor these are jobs they're OK being shown publicly, (3) write
real alt text per image (draft below, confirm details with vendor):
  - `"Patterned fabric 3-seater sofa before and after steam cleaning"`
  - `"Beige damask loveseat cushions before and after shampoo cleaning"`
  - `"Heavily soiled suede armchair deep cleaned — before and after"`
  - `"Tufted velvet accent chair before and after fabric cleaning"`
  - `"Round rug before and after deep cleaning"`

**Technical spec:**
- Format: WebP, served via `next/image` (already available in Next.js) for
  automatic responsive sizing + lazy loading — do not hand-link `<img>` tags.
- Target ≤150KB per hero image after compression.
- Filenames: descriptive + keyword-bearing, e.g.
  `sofa-cleaning-dha-lahore-before-after.webp`, not `IMG_2031.webp`.
- Alt text: describe the actual photo content + locality, e.g. `"5-seater
  fabric sofa steam cleaning in progress, DHA Phase 3 Lahore"` — never
  keyword-stuffed ("best sofa cleaning Lahore Islamabad Gujranwala cheap").
- Store under `public/images/sofa-carpet-cleaning/[city]/` so the asset path
  itself stays organized as more categories/cities get real photos later.

---

## 6. SEO plan

**Per-page metadata** — already systematized via `metaTitleTemplate` /
`metaDescriptionTemplate` on `ServiceCategory`; just needs the 3 new entries
written well:

| Category | Title pattern | Description pattern |
|---|---|---|
| `sofa-carpet-cleaning` | `Sofa & Carpet Cleaning in {city} \| Verified Teams — FixKar.pk` | Doorstep sofa + carpet shampoo/steam cleaning in {city}. Verified teams, transparent pricing, pay after the job. Book via WhatsApp. |
| `sofa-cleaning` | `Sofa Cleaning Service in {city} \| Same-Day Booking` | Professional sofa shampoo & steam cleaning in {city} — all fabric types. No advance payment. |
| `carpet-cleaning` | `Carpet Cleaning Service in {city} \| Deep Shampoo & Stain Removal` | Deep carpet shampoo, stain and allergen removal in {city}. Verified teams, pay after service. |

**Structured data** (component already exists — `components/seo/
ServiceSchema.tsx`, `LocalBusinessSchema.tsx`, reuse as-is per page):
- `Service` schema on all 9 pages (already wired into `[category]` page).
- Add `FAQPage` schema (component exists: `components/seo/FAQSchema.tsx` but
  is currently unused by the category page — wire it in once FAQ content
  from §4/§8 is written).
- `BreadcrumbList` — `Breadcrumbs` component already renders visually; verify
  it also emits schema (check before assuming — don't duplicate if it does).

**Keyword clusters to target** (real phrasing pulled from live competitor
pages + search results 2026-09-11, not guessed — still flag for a final
Ahrefs/GSC volume check per the existing workflow in `BUSINESS_PLAN.md`
once founder has time, but this is grounded in actual ranking pages, not
assumptions):
- Transactional: "sofa cleaning price in Lahore", "sofa cleaning near me",
  "carpet cleaning service near me", "sofa cleaning services Islamabad".
- Price-intent (**high commercial value — people who search a price
  question convert well**): "how much does sofa cleaning cost", "sofa
  cleaning prices in Lahore", "carpet cleaning price per square foot
  Pakistan".
- Problem-based: "sofa stain removal", "carpet smell removal", "sofa
  cleaning for allergies", "sofa cleaning without shampoo damage".
- Comparison/trust: "best sofa cleaning service {city}", "verified carpet
  cleaner {city}", "sofa cleaner near me reviews".

**Real market pricing benchmarks found** (use to sanity-check whatever the
vendor quotes us — if our page prices are wildly off-market either
direction, it hurts trust or margin):
- Sofa cleaning: **Rs. 350–500 per seat** is the going city rate (Mr.
  Cleaner from Rs. 350/seat, Mahir Company Rs. 350–500/seat). A 5-seater
  full set runs roughly **Rs. 1,800–2,500**, 7-seater up to ~Rs. 3,500.
- Carpet cleaning: no public per-sqft price found for Islamabad/Lahore
  competitors — most hide pricing behind a quote form (same gap noted for
  Azeem Sofa in §1). **This is an opportunity**: publishing a real
  transparent carpet price table (even a range) is a differentiator most
  competitors avoid.

**Additional competitors surfaced by this search** (beyond the 4 already
logged in `BUSINESS_PLAN.md`) — worth a quick look before finalizing our
content, since a couple use the same aggressive location-page pattern Mahir
Company does:
- **Mahir Company** — confirmed again here: runs granular per-neighborhood
  carpet-cleaning pages (e.g. `/carpet-cleaning-services-f-6-islamabad`,
  `/carpet-cleaning-services-g-9-islamabad`) — same pSEO pattern already
  flagged in `BUSINESS_PLAN.md`, now confirmed live in Islamabad too, not
  just Lahore.
- **Saaf.pk** — has a public `/pricing` page, 24/7 claim, active in
  Islamabad.
- **Hassan & Hussain Enterprises** — dedicated Islamabad carpet cleaning
  page.
- **Kam Kaj (kamkaj.pk)** — carpet cleaning listed as one of several home
  services (marketplace-style, closer to our own model than a single-niche
  cleaner).
- **Mr. Cleaner (mrcleaner.pk)**, **ecoservices.com.pk** — sofa-cleaning
  specific pricing/content, Lahore-focused.

**`/services` hub page and `sitemap.ts`** must include all 9 new URLs —
check both files before shipping (sitemap is likely already
category-array-driven since it mirrors `generateStaticParams`, but confirm).

---

## 7. Internal linking plan

- **Homepage** (`app/page.tsx`): once Islamabad/Gujranwala have live
  categories, the hero badge text ("📍 Currently Active in Lahore •
  Expanding to...") needs updating to reflect per-category truth — don't
  claim full-city activation it doesn't have. Category grid already
  auto-renders from `categories` array, so the 3 new cards appear for free;
  just needs correct copy so it doesn't overpromise other categories in
  Islamabad/Gujranwala.
- **`/services` page**: add sofa-carpet-cleaning cluster with all 3 cities
  linked.
- **City hub pages** (`/[city]/page.tsx`): must link to whichever categories
  are actually active in that city (uses the §3 helper) — this is the
  primary internal-link path search engines will crawl from city → service.
- **Cross-links between the 3 new pages themselves**: pillar page
  (`sofa-carpet-cleaning`) links out to both `sofa-cleaning` and
  `carpet-cleaning`; each single-intent page links back up to the pillar
  ("Need both done? See our combined Sofa & Carpet Cleaning service") and
  sideways to its sibling. Add a small `RelatedServices` block to the
  category page template — reusable for future verticals too.
- **Blog** (`app/blog/`): 1-2 supporting posts ("How often should you clean
  your sofa in Lahore's dusty season?", "Carpet vs. sofa cleaning: what's the
  difference?") link into the service pages — cheap authority + long-tail
  capture, and gives Google fresh crawlable content between category-page
  updates.
- **Footer**: confirm sofa/carpet links get added to the service list in
  `Footer.tsx` once live — footer links are crawled site-wide, high value
  for a new vertical's discovery.

---

## 8. AIO / GEO plan (AI Overviews & generative-engine optimization)

Goal: be the page an AI answer engine (Google AI Overviews, ChatGPT search,
Perplexity, Copilot) quotes or links when someone asks "who does sofa
cleaning in Lahore" or "how much does carpet cleaning cost in Islamabad."

- **Answer-first paragraphs.** Open each page's intro with a direct,
  quotable 2-3 sentence answer (what the service is, price range, how
  booking works) before any marketing language — LLM extractors favor the
  first self-contained factual block on a page.
- **FAQ schema wired in** (§6) with literal question phrasing users/LLMs
  actually use — pulls directly from real query patterns seen on the
  competitor's site (§1), rewritten in our own voice and with our own real
  prices.
- **Single source of truth for facts.** Price ranges, coverage areas, and
  trust claims ("pay after service", "verified teams") must read identically
  everywhere they appear (page copy, schema, FAQ) — AI systems cross-check
  consistency across a domain before trusting/citing it; the competitor's
  contradictory "since 1992 / 17 years / 25 years" mistake (§1) is exactly
  what erodes that trust.
- **`llms.txt`** at the site root (`public/llms.txt` in Next.js) — a short
  plain-text summary of what FixKar.pk is, which cities/categories are live,
  and links to the key pages. Increasingly read by AI crawlers as a
  lightweight sitemap-for-LLMs; cheap to add, low downside.
- **Entity consistency (NAP + brand facts).** Same business name, phone
  format, and service-area wording across the site, `LocalBusinessSchema`,
  and any future Google Business Profile / directory listings — this is what
  lets AI systems and Google's Knowledge Graph confidently associate
  "FixKar.pk" with "sofa cleaning, Lahore/Islamabad/Gujranwala."
- **Keep pages skimmable, not just SEO-dense.** Numbered price tables,
  bullet-point common issues, and short FAQ answers (already the existing
  page pattern) are exactly the format generative engines extract cleanly —
  don't let new sofa/carpet copy regress into a wall of paragraph text.

---

## 9. Visual design plan (the "generic" problem)

Concrete gaps found in the current build, in priority order:

1. **No real photography anywhere** — biggest single fix, covered in §5.
   Every page currently looks like a template because, visually, it is one.
2. **Default Next.js scaffold assets still in `public/`** (`next.svg`,
   `vercel.svg`, `window.svg`, `file.svg`, `globe.svg`) — these are
   framework boilerplate, not brand assets. Should be deleted once confirmed
   unused, or replaced with actual brand iconography.
3. **Single flat blue theme, no visual hierarchy between categories.**
   Sofa/carpet cleaning, being a tactile/visual service (fabric, texture,
   before-after transformation), is a strong candidate for a distinct accent
   treatment (e.g. a warm accent color for the cleaning family of categories
   vs. the technical/blue tone for AC/electrician/plumbing) — makes the site
   feel less like one generic template stamped 9 times.
4. **No before/after visual pattern** — sofa/carpet cleaning is one of the
   most visually persuasive services to sell (dramatic before/after) and the
   current page template has no slot for that at all. Recommend a dedicated
   `BeforeAfterSlider` or simple side-by-side component for this vertical
   specifically, reusable later for painting/deep-cleaning too.
5. **Trust section is text-only.** `TrustPoint` renders icon + text with no
   photographic backing — fine for AC/electrician (less visual), but sofa
   cleaning benefits from at least one real "technician at work" photo
   alongside the trust claims rather than pure icon+text.

This section is a design *direction*, not implementation — actual component
work (BeforeAfterSlider, accent theming) should be scoped as its own follow-up
once real photos exist to populate it (no point building a before/after
slider with no real photos to show).

---

## 10. Phased rollout checklist

**Phase A — data & routing (no visual change yet) — DONE 2026-09-12**
- [x] Add `activeCategories` to `City` type + Islamabad/Gujranwala entries (§3)
- [x] Add `isCategoryActiveInCity` helper, wire into gating logic
      (`app/[city]/page.tsx` now only lists active categories per city +
      shows a "coming soon" note for the rest; `app/[city]/[category]/page.tsx`
      renders `ComingSoonState` instead of a full booking flow for any
      city+category combo that isn't active — prevents claiming AC/
      electrician/plumbing/cleaning coverage in Islamabad/Gujranwala where
      no vendor exists yet)
- [x] Add 3 new `ServiceCategory` entries to `lib/services.ts` (§4) —
      `sofa-carpet-cleaning`, `sofa-cleaning`, `carpet-cleaning`, using the
      Rs. 350–500/seat market benchmark from §6 as placeholder pricing
      (**flagged: swap for real vendor pricing once received on WhatsApp**)
- [x] `sitemap.ts` updated to set per-category priority via
      `isCategoryActiveInCity` instead of the old city-wide-only flag
- [x] `CityCard.tsx` now shows a "🟡 Select Services Live" state for
      partially-active cities instead of a flat Active/Coming Soon binary
- [x] `ServiceCategoryCard.tsx` icons added for the 3 new categories
- [x] `npx tsc --noEmit` passes clean after all changes

**Known follow-ups from this pass (not blocking, tracked here so they're not lost):**
- `generateMetadata` on `[city]/[category]/page.tsx` still emits the "live"
  title/description even for inactive combos (e.g. `/islamabad/ac-repair`)
  even though the page body now correctly shows Coming Soon — low priority
  since these pages are low sitemap-priority (0.3) and `noindex` isn't set,
  but worth a follow-up pass so search snippets don't overpromise.
- Homepage hero badge (`app/page.tsx`) still hardcodes "Currently Active in
  Lahore • Expanding to Islamabad & Karachi" — doesn't yet reflect that
  sofa/carpet cleaning is live in Islamabad/Gujranwala. Scoped to Phase D.

**Phase B — content**
- [ ] Write unique per-city intro/issues/FAQ copy for all 9 pages (§4)
- [ ] Get real price ranges from the vendor for sofa (per-seat) and carpet (per-room) pricing
- [ ] Write FAQ content + wire `FAQSchema` into the category page template (§6, §8)

**Phase C — visuals**
- [x] Collect first 5 real before/after job photos from the vendor (§5, received 2026-09-11)
- [ ] Compress/convert the 5 received photos to WebP (currently raw JPEGs, over size target)
- [ ] Get vendor's OK to publish these specific jobs publicly
- [ ] Collect additional city-specific photos (Islamabad, Gujranwala) as those jobs happen
- [ ] Add hero + before/after images to the actual page components via `next/image`, with the draft alt text from §5 confirmed
- [ ] Remove unused Next.js scaffold SVGs from `public/`

**Phase D — linking & discovery**
- [ ] Update homepage hero badge copy to reflect per-category city status
- [ ] Add cross-links between the 3 new pages (`RelatedServices` block)
- [ ] Add footer links
- [ ] Add `public/llms.txt`
- [ ] Write 1-2 supporting blog posts

**Phase E — verify**
- [ ] Submit new URLs via GSC once live
- [ ] Confirm schema validates (Rich Results Test) for Service + FAQ on all 9 pages

---

## 11. Open items / needs founder input

- Real sofa/carpet pricing (per-seat, per-room, add-ons) from the actual
  signed vendor — §4/§6 use placeholder structure only.
- Confirm the vendor's actual coverage areas within Islamabad and Gujranwala
  (which sectors/towns) to populate `city.areas`-equivalent local detail for
  those two cities' sofa/carpet pages specifically — don't reuse the generic
  Islamabad/Gujranwala `areas` list if the vendor's real coverage is narrower.
- Vendor's real job photos (§5, §10 Phase C) — nothing to place until these arrive.
