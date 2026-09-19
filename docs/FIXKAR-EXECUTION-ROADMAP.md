# FixKar.pk — Execution Roadmap

> Working task list, most current first. See `FIXKAR-SOURCE-OF-TRUTH.md` for
> the facts behind these tasks (confirmed vendors/cities, known code issues,
> open questions). One task per batch: before starting a task, state exactly
> which files will change and why; after finishing, stop and show the diff.
> Do not start a task whose Open Question (in the source-of-truth doc) is
> still unanswered.

---

## Status legend
✅ Done and committed · 🟡 Done, not yet deployed · 🔲 Not started · ⏳ Blocked

## Task list

| # | Task | Status | Blocked on | Files / area |
|---|---|---|---|---|
| 1 | Review + commit the pending working-tree diff (noindex thin pages, sitemap clean-up, tap targets, mobile WhatsApp button) | 🟡 Committed `cde0836`/`397ffb6` 2026-09-19, **not deployed** | Source-of-truth Q5 (deploy mechanism) | 8 files, see roadmap doc Phase 3 log |
| 2 | Replace unverifiable trust claims with true ones | ⏳ | Source-of-truth Q1/Q2 (real response time, real warranty status) — CNIC claim can be fixed now (confirmed false), the rest cannot | homepage, `/trust-safety`, `/how-it-works`, money-page trust badges, `LeadForm.tsx:47` |
| 3 | Rebuild the lead form: add Service + City selects, then service-specific scope fields | 🔲 | None — ready to start once scoped | `components/domain/LeadForm.tsx`, `app/api/leads/route.ts`, `server/modules/leads/lead.service.ts`, `app/request/page.tsx` |
| 4 | Ship painting money pages for Islamabad, Gujranwala, **and Gujrat** (vendor confirmed 2026-09-19 — not in original scope) | 🔲 | Real local content per city (not a find-replace clone — same discipline as the sofa/carpet cluster) | `lib/services.ts` (add Gujrat city), `app/[city]/painter` content |
| 5 | Add ceiling / false-ceiling category + Lahore, Islamabad, Gujranwala, **and Gujrat** pages (all 4 confirmed 2026-09-19) | 🔲 | Right slug/URL research (residential vs. commercial scope — see original brief's Phase 16 concerns) | `lib/services.ts`, `prisma/seed.mjs`, new category content |
| 6 | Fix www/non-www canonical + sitemap host; add per-page OG tags; drop legacy `meta-keywords` | 🔲 | Source-of-truth Q4 (confirm `www` is canonical) | `lib/constants.ts` (`BRAND_URL`), `generateMetadata` across money pages, `app/sitemap.ts`, `app/robots.ts` |
| 7 | Admin MVP: `/admin/leads` list + detail; disable automated dispatch | 🔲 | None — founder approved this direction 2026-09-19 | Per `FIXKAR_VENDOR_OPERATIONS_V1.md` (superseded doc, still valid for implementation detail): reuse existing endpoints, add the 4 planned admin endpoints |
| 8 | Seed real vendor rows; fix `prisma/seed.mjs` (missing sofa/carpet + painting/ceiling categories, stale Gujranwala `COMING_SOON`, missing Gujrat) | 🔲 | Task 4/5 landing first (need final category/city slugs to seed against) | `prisma/seed.mjs` |
| 9 | Collect real photos of painting and ceiling work from vendors | 🔲 | Founder task, not code | `public/images/` |
| 10 | GA4 events: form submit, WhatsApp click, call click, per city/service | 🔲 | None | analytics setup |

---

## Sequencing rule

Tasks 1–6 (site-facing fixes) before Tasks 7–8 (backend/admin). Task 9 runs
in parallel whenever the founder has photos ready — not a blocker for
anything else. Task 10 can happen any time after Task 3 (need real form
fields to measure against).

## Task 3 — lead form field plan (ready to build once approved)

Keep step 1 to 3 fields max (Service, City, Phone) so the form still
converts fast; ask scope questions on a second step after the phone number
is captured — a partial lead is still a usable lead.

- **Painting:** property type (house/flat/office/commercial) · interior /
  exterior / both · new paint or repaint · rooms or approx. covered area
  (marla/sq ft) · whole house vs. specific rooms · preferred timeframe ·
  photos (optional) · budget range (optional)
- **Ceiling / false ceiling:** property type · whole house / specific rooms
  / commercial · rooms or approx. area · ceiling type (gypsum / POP / PVC /
  unsure) · existing ceiling removal needed · preferred timeframe · photos
  (optional)
- **Sofa / carpet cleaning:** seat count or carpet area · fabric type
  (optional) · preferred date · area
- **AC / plumbing / electrical:** issue description · unit count + type (AC)
  · repair vs. installation vs. service · preferred time slot

## Implementation log

### 2026-09-19 — Task 1 + doc consolidation
- Reviewed and committed the pending 8-file working-tree diff (see
  `FIXKAR-SEO-MONEY-PAGE-ROADMAP.md`'s Phase 3 log for the detailed
  breakdown) — `npx tsc --noEmit`, `npm run build`, `npm run lint` all
  clean. Commits `cde0836`, `397ffb6`.
- Live-site review (external, 2026-09-19) cross-checked against actual code
  this session — all P0/P1 findings confirmed in code except P1-2 (OG tags,
  not re-checked) and P0-5 (no social proof, confirmed by inference from
  known image inventory rather than re-checked live).
- Founder confirmed: no CNIC/NADRA check happens today; ceiling contractor
  covers all 3 cities; Gujrat has confirmed painting + ceiling coverage
  (new city, not in codebase yet).
- Created this file and `FIXKAR-SOURCE-OF-TRUTH.md`; marked
  `FIXKAR-URL-MAP.md`, `FIXKAR-SEO-MONEY-PAGE-ROADMAP.md`, and
  `FIXKAR_VENDOR_OPERATIONS_V1.md` as superseded (kept, not deleted).

**Next up:** Task 3 (lead form rebuild) can start now. Task 2 is partially
blocked (CNIC claim fixable now, response-time/warranty claims are not).
