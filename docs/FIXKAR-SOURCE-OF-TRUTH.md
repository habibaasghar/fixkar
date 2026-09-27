# FixKar.pk — Source of Truth

> **Purpose:** one place for what is actually confirmed about the business —
> vendors, cities, services, live URLs, the lead lifecycle, and decisions
> made vs. still pending. Supersedes `FIXKAR-URL-MAP.md`,
> `FIXKAR-SEO-MONEY-PAGE-ROADMAP.md`, and `FIXKAR_VENDOR_OPERATIONS_V1.md`
> as the primary reference — those files are kept for historical detail
> (marked superseded, not deleted) but this file wins on conflict.
>
> **Evidence labels**, carried over from the 2026-09-19 live-site review:
> `CONFIRMED` (founder-stated fact) · `VERIFIED IN CODE` (I read the source)
> · `VERIFIED LIVE` (checked on the production site) · `PENDING` (open
> question, do not assume an answer) · `DECISION` (a call that's been made
> and should not be re-litigated without new information).

Last updated: 2026-09-19.

---

## 1. Confirmed vendor coverage

| Service | Lahore | Islamabad | Gujranwala | Gujrat |
|---|---|---|---|---|
| Sofa & Carpet Cleaning | ✅ CONFIRMED | ✅ CONFIRMED | ✅ CONFIRMED | Not confirmed |
| Painting | ✅ CONFIRMED | ✅ CONFIRMED | ✅ CONFIRMED | ✅ CONFIRMED (2026-09-19) |
| Ceiling / false ceiling | ✅ CONFIRMED | ✅ CONFIRMED | ✅ CONFIRMED | ✅ CONFIRMED (2026-09-19) |
| AC repair, Electrician, Plumbing, General Cleaning | Live on site, but `vendors.csv` shows every prospect row as `Not Contacted` and is dated 2026-08-16 — **status genuinely unverified**, not proven, not disproven. | Not live | Not live | Not live |

**DECISION:** Ceiling is a new category — no page or `ServiceCategory` entry
exists for it anywhere in the codebase yet. Painting has real coverage in a
4th city (Gujrat) that also doesn't exist in the codebase yet.

**PENDING:** Real current contact status for AC/Electrician/Plumbing/Cleaning
vendors in Lahore. `vendors.csv` should not be treated as current truth
either way until the founder confirms it.

---

## 2. Cities

| City | Code status (`lib/services.ts`) | Should be |
|---|---|---|
| Lahore | `active`, all 8 categories live | Correct as-is |
| Islamabad | `coming_soon`, sofa/carpet cluster overridden active | Add painting + ceiling as active once those pages ship (§7 roadmap) |
| Gujranwala | `coming_soon`, sofa/carpet cluster overridden active | Same as Islamabad |
| Gujrat | **Does not exist in the codebase** | **New city to add** — painting + ceiling confirmed, per §1 |
| Rawalpindi, Karachi | `coming_soon`, zero active categories, 16 thin indexable-until-recently URLs | **PENDING** — founder must decide: remove entirely, or keep noindexed as future placeholders (see Open Questions) |

---

## 3. Services / categories

Existing in `lib/services.ts` today: `ac-repair`, `electrician`, `plumbing`,
`cleaning`, `painter`, `sofa-carpet-cleaning`, `sofa-cleaning`,
`carpet-cleaning`.

**Missing, confirmed needed:** `ceiling` (or a more specific slug — see the
task list's note on researching the right slug before creating it, same
discipline used for the sofa/carpet cluster).

---

## 4. Live URL matrix (condensed — full historical detail in `FIXKAR-URL-MAP.md`)

| Status | Meaning | Examples |
|---|---|---|
| LIVE, real content | Real vendor, dedicated page | `/lahore/*` (all 8), `/islamabad\|gujranwala/sofa-carpet-cleaning\|sofa-cleaning\|carpet-cleaning` |
| LIVE, thin/misleading | Generic `ComingSoonState`, but real vendor coverage now exists behind it | `/islamabad/painter`, `/gujranwala/painter` — **turning away demand that can be fulfilled**, see roadmap Task 4 |
| LIVE, thin, out of scope | Generic `ComingSoonState`, no vendor, not in current business scope | Rawalpindi ×8, Karachi ×8, Islamabad/Gujranwala ×5 each (non-sofa categories) |
| NOT JUSTIFIED YET | No URL exists | `/{city}/ceiling` (all cities) — create once content is ready, don't pre-create empty shells |

`VERIFIED LIVE` (2026-09-19): `sitemap.xml` had 56 URLs, `lastmod`
2026-09-12, ~26 of them the thin/out-of-scope rows above, indexable
(`priority 0.3`, no `noindex`). Fixed in code (commit `cde0836`,
2026-09-19) — **not yet deployed to production**, see roadmap Task 1.

---

## 5. Lead lifecycle (as built, `VERIFIED IN CODE`)

```
Customer fills LeadForm (Name, Phone, Area only — no Service field, see
Known Issues §6.1)
        │
        ▼
POST /api/leads → LeadService.createLead
   → resolves city/area/category, lazily creates CustomerProfile by phone,
     generates a human reference code (FK-####)
        │
        ▼
DispatchService.assignNextVendor(lead.id) — runs automatically, immediately,
same request. No founder step in between.
        │
        ▼
If a matching VendorProfile exists (deletedAt=null, isOnDuty=true,
verification.status=VERIFIED, city+category match): lead → ASSIGNED
If not: lead stays UNASSIGNED, nothing retries it (no cron/scheduler exists)
```

**DECISION (founder, 2026-09-19 audit thread):** automated dispatch should
be disabled for now — the founder stays in control of assignment. This is
now part of roadmap Task 7, not yet implemented.

**Known fact, not yet re-verified this session:** almost certainly zero real
`VendorProfile` rows exist in the database (`prisma/seed.mjs` only seeds
City/Area/ServiceCategory, no vendors) — so today, every lead falls through
to UNASSIGNED regardless of the dispatch-engine question above.

---

## 6. Known issues (code-verified, 2026-09-19)

### 6.1 — Lead form captures nothing usable
`components/domain/LeadForm.tsx` has exactly 3 fields (Name, Phone, Area).
No service selector — service is a hardcoded prop from whichever page
renders the form. On `/request` specifically
(`app/request/page.tsx:18`, `const activeCity = cities[0]`), the form
**always** shows Lahore's area list and **always** submits
`service: "general-request"`, regardless of the customer's real city or
need. The "within 15 minutes" promise is hardcoded into the form's own
success message (`LeadForm.tsx:47`), not just marketing copy.

### 6.2 — Painter pages misrepresent real coverage + a copy bug
`app/[city]/[category]/page.tsx:64` renders:
```
<ComingSoonState cityName={`${city.name} (${category.shortName})`} />
```
which is the literal source of the live "coming to Islamabad (Painter)"
text. The same component's waitlist form (`ComingSoonState.tsx:25-29`)
promises "Rs. 500 off your first booking" but only calls
`alert(...)` — it is not wired to any backend, discount system, or lead
record.

### 6.3 — Canonical/sitemap/robots point at the wrong domain
`BRAND_URL = "https://fixkar.pk"` (`lib/constants.ts:3`) feeds every
canonical tag, the sitemap, OG URLs, and `robots.ts`'s `host` field. The
live site serves `www.fixkar.pk` and 301s the bare domain to it — so every
canonical currently points at a redirecting URL. One-constant fix once the
canonical domain is confirmed (assume `www`, matching what's actually
served, unless told otherwise).

### 6.4 — Cleaning cluster is a nav-level cannibalization, not just content
The Phase 2 fix (commit `619eab4`) removed cross-references from
`/lahore/cleaning`'s own body copy, but `app/page.tsx:77` and
`components/layout/Footer.tsx:32` both do `categories.map(...)` over all 8
categories unconditionally — so `cleaning`, `sofa-carpet-cleaning`,
`sofa-cleaning`, and `carpet-cleaning` still render as 4 equal-weight
navigation entries sitewide.

### 6.5 — No real trust signals
No reviews, ratings, testimonials, or case studies anywhere on the site.
The 5 real vendor before/after photos that do exist are wired only into the
sofa/carpet pages — painting (the page with the most traffic potential once
Islamabad/Gujranwala/Gujrat ship) has no real work imagery.

---

## 7. Trust claims — what's actually true (founder-confirmed, 2026-09-19; response time & warranty confirmed 2026-09-28)

| Claim currently live | Status |
|---|---|
| "NADRA CNIC verification" | **CONFIRMED FALSE** — no formal CNIC/NADRA check happens today. **Fixed 2026-09-28** — replaced site-wide with "vetted vendor partner" framing (personal introduction + confirmed trade/pricing, not a formal document-verification pipeline). |
| "15-Minute Dispatch" | **CONFIRMED (2026-09-28):** founder personally calls/WhatsApps within roughly 30-60 minutes. No automated dispatch exists. **Fixed** — replaced "15 minutes" with "typically within the hour" across the site. |
| "7-Day Fixer Warranty" | **CONFIRMED (2026-09-28):** there is no fixed platform-wide warranty. Any workmanship warranty is provided by the vendor partner for that job, and terms vary by vendor/category. **Fixed** — replaced with "warranty is provided by the vendor partner, ask when you get your quote" framing site-wide, including removing an unconfirmed "property damage protection cover" claim from `/trust-safety`. |
| "Pay Directly After Service" | Not challenged — treat as still accurate unless told otherwise. |

**Rule going forward:** do not publish any trust/guarantee claim without an
explicit `CONFIRMED` entry in this table.

**2026-09-28 remediation:** a full site-wide pass replaced every instance of
the false/unconfirmed claims above (homepage, about, FAQ, terms, trust-safety,
privacy, how-it-works, partner pages, blog, `lib/services.ts` per-category
copy, `lib/constants.ts`, `Footer.tsx`, `LeadForm.tsx`, `SuccessState.tsx`,
`ServiceCategoryCard.tsx`, `OrganizationSchema.tsx`) with honest "vetted
vendor partner" / "quote relay" language matching the real broker operating
model (see root `BUSINESS_PLAN.md` → "Operating model clarification").
`lib/constants.ts`'s `VERIFICATION_TIERS` was simplified from a fictional
two-tier NADRA/police-certificate system to a single honest "Vetted Partner"
tier (it was unused in any render, so this was a definition-only change).

---

## 8. Open questions (blocking, do not guess)

1. Real response time — what actually happens after a lead comes in today
   (who calls, typical time-to-first-contact)? Needed before Task 2 copy can
   be finalized.
2. Is any warranty actually offered today, in any form? Needed for the same
   reason.
3. Rawalpindi/Karachi — remove from the codebase entirely, or keep
   noindexed as future placeholders?
4. Canonical domain — confirm `www.fixkar.pk` is the one to standardize on
   (matches what's actually served; `BRAND_URL` currently says otherwise).
5. Deployment mechanism — how does a commit on `main` actually reach
   production? (Needed to close out Task 1.)
6. AI-generated hero/parallax imagery (`FIXKAR-IMAGE-PLAN.md`) — go ahead,
   or wait for more real vendor photos first?
7. Commission model for the eventual backend (percentage / flat / per
   closed job) — not urgent until Task 7/8 territory.

---

## 9. Decisions already made (do not re-litigate without new information)

- URL architecture stays `/{city}/{service}`, flat, no locality segment, no
  inverted `/services/{service}/{city}` — confirmed correct multiple times,
  see `FIXKAR-URL-MAP.md` §3/§7 for the full original reasoning.
- Automated dispatch should be disabled; founder stays in control of
  assignment (§5 above).
- Real vendor photos take priority over AI-generated imagery wherever both
  are an option.
- No more than the 2 documents described in `FIXKAR-EXECUTION-ROADMAP.md`'s
  intro — do not spin up additional strategy docs per-service/per-city.
