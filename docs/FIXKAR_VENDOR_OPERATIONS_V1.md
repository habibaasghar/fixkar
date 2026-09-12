# FixKar.pk — Vendor Operations V1 (Master Plan)

> Planning document only. No code, migrations, or pages created by this document.
> Grounded against the actual codebase as of 2026-08-16 (Prisma schema, dispatch
> engine, vendor validators, admin vendor routes, file storage, `/partner/register`).
> Every "MISSING" item below was confirmed absent by direct code search, not inferred.

## Primary objective (reaffirmed)

```
Founder receives vendor list → contacts vendor → collects info → creates vendor
record → verification → profile Active → customer requests service → FixKar
matches active vendor → vendor accepts → booking happens
```

Everything below is scoped to make this loop work end-to-end for the first ~100
bookings — not to build a full marketplace OS.

---

## 1. V1 Vendor Workflow

```
Spreadsheet (vendors.csv, already built) — NEW / CONTACTED / INTERESTED
        │  (admin call, verbal agreement)
        ▼
Admin creates VendorProfile "shell" in FixKar admin panel  ← NEW endpoint needed
   (fullName, phone, city, ≥1 area, ≥1 category — no CNIC yet)
        │
        ▼
Admin collects CNIC number + CNIC front/back (+selfie) via WhatsApp,
uploads them, attaches to vendor  ← NEW endpoint needed
   → VendorVerification row created, status PENDING
        │
        ▼
Admin reviews CNIC vs name/selfie → approve/reject
   (EXISTING: PATCH /admin/vendors/[id]/verify)
        │ approve
        ▼
status VERIFIED → vendor is now dispatch-eligible ("Active" is not a stored
field — see §2 — it's the same condition the dispatch engine already checks)
        │
        ▼
Customer submits request → Lead created → dispatch engine auto-matches →
vendor is ASSIGNED the lead
        │
        ▼
Since real WhatsApp/SMS delivery does NOT exist yet (confirmed: all
notification providers are mock/log-only), V1 acceptance is phone-confirmed:
admin calls the vendor, vendor says yes/no, admin clicks Accept/Reject on the
vendor's behalf  ← NEW endpoint needed
        │ accept
        ▼
Booking created (existing engine, unchanged)
```

## 2. Vendor Lifecycle

Two layers — deliberately kept separate so we don't force pre-contact leads into the database:

**CRM layer (spreadsheet only, no DB row yet):**
`NEW → CONTACTED → INTERESTED` (or terminal `NOT_INTERESTED` / `NO_RESPONSE`)

**Product layer (once a `VendorProfile` row exists):**
`(shell, no verification) → PENDING → VERIFIED / REJECTED → ACTIVE (derived) → SUSPENDED`

| Transition | Who | Trigger | Info required |
|---|---|---|---|
| NEW → CONTACTED → INTERESTED | Admin | Call/WhatsApp outcome | name, phone, category (already in vendors.csv) |
| INTERESTED → shell created | Admin | Verbal agreement | fullName, phone, city, ≥1 area, ≥1 category |
| shell → PENDING | Admin | CNIC + images received via WhatsApp | cnicNumber, cnicFrontUrl, cnicBackUrl |
| PENDING → VERIFIED/REJECTED | Admin | Visual CNIC check | decision + optional notes |
| VERIFIED → ACTIVE | *nobody — automatic* | `VerificationStatus=VERIFIED` AND `deletedAt=null` AND `isOnDuty=true` | — |
| ACTIVE → SUSPENDED | Admin | Policy violation / fee non-payment | optional notes |
| SUSPENDED → ACTIVE | Admin | Issue resolved | — ⚠️ see Known Gap below |

**Important: "Active" is not a field to build.** It's exactly the WHERE clause the
dispatch engine already uses (`dispatch.engine.ts`: `deletedAt: null, isOnDuty:
true, verification.status: VERIFIED`). No new status field needed.

**Known gap to fix during implementation (not now):** `adminRestore` currently
only clears `deletedAt` — it does **not** reset `VendorVerification.status`
back from `SUSPENDED`. Today, restoring a suspended vendor leaves them
`deletedAt=null` but still `VerificationStatus=SUSPENDED`, which the dispatch
engine's `status: VERIFIED` filter will still correctly exclude — so it's not
a safety bug (a restored-but-still-flagged vendor won't get leads), but it
means "restore" alone doesn't fully reactivate; admin must also re-verify.
Flag this for whoever implements — either restore should also reset status to
`VERIFIED`, or the admin UI should surface this clearly ("Restored — still
requires re-verification").

**CRM vs VendorProfile split:** `NEW/CONTACTED/INTERESTED/NOT_INTERESTED/
NO_RESPONSE` live only in `vendors.csv` (already built, has Status/CallDate/
Notes columns that map directly). Nothing DB-side until a shell is created —
this avoids inventing a `VendorLead` model for what a spreadsheet already does
at this volume (~30 vendors).

## 3. Vendor Data Specification

Reviewed the actual schema — **no new Prisma models needed.** Field-by-field:

| Field | Exists? | Required/Optional | Visibility |
|---|---|---|---|
| **A. Identity** | | | |
| Full name | ✅ `fullName` | REQUIRED | PUBLIC |
| Business name | ✅ `businessName` | OPTIONAL | PUBLIC |
| Phone | ✅ `User.phone` (unique) | REQUIRED | **PRIVATE** — not shown on public profile; revealed only through platform-mediated contact (Lead/Booking), preserving the fee-collection model already decided in BUSINESS_PLAN.md |
| WhatsApp | same as phone | — | same as phone |
| Profile photo | ✅ `profilePhotoUrl` | OPTIONAL | PUBLIC |
| **B. Business** | | | |
| Category(ies) | ✅ `categories[]` (M:N) | REQUIRED (≥1) | PUBLIC — ⚠️ no "primary vs additional" distinction exists in schema; V1 treats all listed categories as equal, don't add a primary flag unless actually needed |
| Experience | ✅ `experienceYears` (default 1) | OPTIONAL | PUBLIC |
| Bio / tagline | ✅ `bio`, `tagline` | OPTIONAL | PUBLIC |
| Languages | ✅ `languagesSpoken[]` | OPTIONAL | PUBLIC |
| Skills | ✅ `skills[]` | OPTIONAL | PUBLIC |
| **C. Location** | | | |
| City | ✅ `cityId` | REQUIRED | PUBLIC |
| Areas served | ✅ `areas[]` (M:N) | REQUIRED (≥1, needed for dispatch matching) | PUBLIC |
| Street address | ❌ **does not exist anywhere** on VendorProfile or VendorVerification | not needed for V1 — areas served is what dispatch/display use; if admin wants it for own reference, put it in the CRM spreadsheet Notes, not a schema field | ADMIN-ONLY (if kept at all) |
| **D. Operations** | | | |
| Working days/hours | ✅ exists (`VendorAvailability`) | OPTIONAL | PUBLIC (display only) — ⚠️ **not enforced by dispatch engine today**, informational in V1 |
| Emergency availability | ✅ `isEmergencyAvailable` | OPTIONAL | PUBLIC — same caveat, not a dispatch filter yet |
| Active/inactive | ✅ `isOnDuty` | defaults true | — this is the vendor's own duty toggle; in V1 admin sets it, defaults on |
| **E. Verification** | | | |
| CNIC number | ✅ `cnicNumber` | REQUIRED for verification | **PRIVATE/ADMIN-ONLY**, never public |
| CNIC images | ✅ front/back required, selfie optional in schema — recommend treating selfie as required in practice for V1 trust | REQUIRED (front/back), recommended (selfie) | **ADMIN-ONLY**, signed URLs only, 5-min expiry (already built) |
| Address/reference info | ❌ no structured field | store as free text in `VendorVerification.notes` | ADMIN-ONLY |
| Verification status | ✅ enum | system-managed | ADMIN-ONLY (drives eligibility) |
| Verification notes | ✅ `notes` | ADMIN-ONLY | ADMIN-ONLY |
| **F. Marketing** | | | |
| Portfolio images | ✅ `PortfolioItem[]` | OPTIONAL | PUBLIC |
| Profile slug | ✅ `slug` (unique) | REQUIRED, auto-generated | PUBLIC (used in URL) |
| Public description | = bio | — | PUBLIC |

## 4. Duplicate Prevention

| Check | Rule | Why |
|---|---|---|
| Same phone | **BLOCK** | `User.phone` already has a DB `@unique` constraint — this is free, already enforced. New-vendor creation must look up by phone first and, if a `VendorProfile` already exists, redirect admin to edit the existing one instead of erroring blindly. |
| Same CNIC number | **BLOCK** (app-level check, manual for V1) | `cnicNumber` has **no unique constraint in the DB today**. At ~30 vendors, admin can eyeball/search before approving. Recommend: the "add verification" step queries existing `VendorVerification.cnicNumber` and warns/blocks if found before allowing the admin to submit. DB-level `@unique` is a V2 addition once volume grows. |
| Same business name, same city | **WARN, don't block** | Generic names ("AC Service Center") legitimately repeat across different real businesses — show similar existing vendors, let admin decide. |
| Same person, additional category | **ALLOW — but as an edit, not a new record** | e.g. an electrician who also does AC repair should get a second category added to their *existing* profile (categories are already many-to-many), not a second VendorProfile. |

## 5. Verification Model

```
PENDING → (optional, skippable in V1: UNDER_REVIEW) → VERIFIED / REJECTED → (SUSPENDED separately, from Active)
```

**What "VERIFIED" means in V1 — state this exactly, nowhere else:**
> The vendor submitted a CNIC number and photos of their CNIC (front, back,
> and a selfie), and a FixKar admin visually confirmed the name and photo on
> the CNIC match the person who applied.

**What it explicitly does NOT mean:** no police background check, no skill
test, no insurance, no in-person visit. Public badge copy must say **"ID
Verified"**, never "Background Checked," "Certified," or "Insured" — those
would be false claims given what's actually performed. This mirrors the
BUSINESS_PLAN.md caution about only claiming a "15-day warranty" style thing
if actually offered — same principle applies here.

`UNDER_REVIEW` exists as an enum value but there's no endpoint that sets it
today (`verify` only does approve/reject from `PENDING`). **V1 simplicity
check: do we need it to onboard vendors?** No — admin reviews and decides
immediately. Leave `UNDER_REVIEW` unused in V1; wire it up in V2 only if a
review queue with multiple admins actually needs a "someone's already on
this" marker.

## 6. Admin Workflow (minimum to operate vendors)

| Capability | Status |
|---|---|
| Search/list vendors, see status + verification + missing info | ✅ exists (`GET /admin/vendors`) — needs a frontend page |
| View vendor full detail incl. documents | ✅ exists (`GET /admin/vendors/[id]`, `/documents`) — needs a frontend page |
| **Create vendor** | ❌ **missing** — no admin create endpoint exists anywhere; only the public (currently broken) registration flow creates a `VendorProfile` |
| **Edit vendor profile** (name, bio, areas, categories, photo) | ❌ **missing** — only the vendor's own authenticated `PATCH /vendors/me` can do this; no admin equivalent |
| **Attach/update verification info** (CNIC + images) on a shell | ❌ **missing** — today CNIC submission is bundled into public registration only |
| Approve / reject verification | ✅ exists |
| Suspend / restore | ✅ exists (restore caveat noted in §2) |
| Add portfolio images | ✅ backend exists (vendor-side); admin equivalent not needed if admin can just edit via the new edit endpoint |

Admin list view should surface (per your spec): vendor status, verification
status, missing info (compute client-side: no CNIC yet? no areas? no
categories?), last contact date (from spreadsheet, not DB — see §9), last
updated (`updatedAt`, exists), booking count (`bookings` relation, exists).

## 7. Vendor Self-Service — V1 boundary

| Feature | Priority |
|---|---|
| OTP login | **V1-LATER** — backend (Supabase Auth) already exists but is unverified live; not needed to onboard the first vendors since admin does everything |
| View/edit own profile, availability | **V1-LATER** |
| Upload portfolio | **V1-LATER** |
| View assigned leads, accept/reject | **V2** — blocked on real notification delivery (see below); until then, vendor won't know a lead exists to log in and check |

**Why V1 skips vendor self-service entirely:** notification delivery
(WhatsApp/SMS/push) is **mock/log-only in code today** — a vendor would never
actually be notified a lead exists. Building a self-service accept/reject UI
before real notification delivery exists is building a screen nobody will
open. V1 instead uses the phone-confirmed loop in §1 (admin calls, admin
clicks accept/reject on the vendor's behalf via a new endpoint). Real
WhatsApp/SMS + vendor self-service should ship together, in V2, once volume
justifies the engineering.

## 8. Lead Eligibility

**Already implemented exactly as proposed, confirmed by reading `dispatch.engine.ts`:**
vendor must be `deletedAt=null`, `isOnDuty=true`, same `cityId`, serves the
`areaId`, has the `categoryId`, `VerificationStatus=VERIFIED`, not on
vacation. Highest `averageRating` among matches wins (default rating 5.0, so
new vendors aren't penalized). **Not currently checked:** working
hours/emergency-availability flag, rating threshold (rating is a tie-breaker
only, not a gate) — leave as-is for V1, don't add filters that would just
shrink an already-small vendor pool.

| Scenario | Current behavior |
|---|---|
| No vendor matches | Lead stays `UNASSIGNED`. **No retry is scheduled automatically.** |
| Vendor rejects | Immediately re-attempts matching (excluding that vendor); if none left, lead → `EXPIRED`. |
| Vendor doesn't respond | A 5-minute timeout job exists (`expire-stale-leads`) but **no cron/scheduler is wired up** — it only runs if an admin manually triggers it via `POST /admin/jobs/expire-stale-leads/run`. Today an unanswered lead stays `ASSIGNED` forever unless an admin intervenes. |

**V1 operational implication:** since V1 uses phone-confirmed acceptance
anyway (§1/§7), the admin is already in the loop for every lead — so the
missing cron isn't a launch-blocker; the admin naturally acts as the timeout
mechanism by calling the vendor promptly. Automate this in V2.

## 9. Vendor Onboarding from Spreadsheet

**Decision: B — admin manual creation, not CSV import.** At ~30 vendors,
building a CSV parser/import endpoint (which doesn't exist today at all — no
CSV/bulk code anywhere in the codebase) is more engineering than the problem
justifies. Each vendor requires a phone call anyway before they can be
onboarded (need verbal agreement + CNIC), so bulk-import wouldn't save real
work. Revisit CSV import in V2 only if acquisition scales to hundreds at once.

```
vendors.csv (already built, this project) → phone call → mark Status →
if Interested: Admin panel "Create Vendor" form (uses vendors.csv row as
reference) → shell created → CNIC collected → verify → Active
```

## 10. Vendor Contact Tracking

**Decision: reuse `vendors.csv`, do not build a CRM model.** It already has
exactly the fields asked for: `CallDate` (first/last contact — extend to two
columns if needed), `Status` (response status/interested), `Notes`,
implicitly onboarding stage via `Status`. Once a shell is created in the app,
add the vendor's new profile ID back into the `Notes` column so the
spreadsheet row points at its DB record. No new database model — this is
exactly the kind of separate-CRM-product the brief says not to build.

## 11. Public Vendor Profile

Route: `/vendor/[slug]` (does not exist yet — 0 frontend pages consume the
existing `GET /api/v1/vendors/[id]` endpoint).

**Show:** business/person name, profile photo, categories, areas served,
experience, languages, portfolio, rating (once real reviews exist — note
`Review` has no customer-facing create endpoint yet either, flagged in the
prior audit), "ID Verified" badge **only when `VerificationStatus=VERIFIED`**,
a "Request this service" CTA that creates a Lead through the platform (not a
raw phone number/direct WhatsApp link — preserves the fee model), availability
summary (informational only, from §3 caveat).

**Never show:** CNIC, address, verification notes, internal IDs, raw phone
number, private documents. All already enforced by simply not selecting those
fields in whatever query backs this page — no new access-control logic
needed, just don't fetch/serialize them.

**Open technical question (verify during implementation, not now):** does
`GET /api/v1/vendors/[id]` accept the `slug` or only the DB `id`? If only
`id`, the new page needs a slug→id resolution step server-side.

## 12. Required Frontend Pages

| Route | Type | Status |
|---|---|---|
| `/admin/login` (or reuse OTP) | Admin | **NEW** — 0 admin pages exist today |
| `/admin/dashboard` | Admin | **NEW** (thin wrapper — `GET /admin/dashboard` API already exists) |
| `/admin/vendors` | Admin | **NEW** — list/search/status |
| `/admin/vendors/new` | Admin | **NEW** — create shell |
| `/admin/vendors/[id]` | Admin | **NEW** — edit, attach verification, approve/reject/suspend/restore, view documents |
| `/admin/leads` | Admin | **NEW** — list leads, phone-confirm accept/reject |
| `/vendor/[slug]` | Public | **NEW** — public profile (§11) |
| `/partner/register` | Public | **MODIFY** — currently fake-submits; fix field names/types, add city/area selects, add file inputs, wire the actual `fetch` call |

No vendor-portal pages in V1 (§7).

## 13. Required Backend Endpoints (new, beyond the existing 106)

| Endpoint | Purpose | Reuses |
|---|---|---|
| `POST /api/v1/admin/vendors` | Create vendor shell (no CNIC required at this step) | `VendorRepository` create logic, minus the verification-bundling that public `registerVendor` does |
| `POST /api/v1/admin/vendors/[id]/verification` | Attach CNIC number + image URLs (images uploaded first via existing `POST /files/upload`) | `FileService` (existing), creates `VendorVerification` row |
| `PATCH /api/v1/admin/vendors/[id]` | Admin edits profile fields (name, bio, areas, categories, photo) | Same `updateVendorProfileSchema` already used by `PATCH /vendors/me`, just admin-gated instead of self-only |
| `POST /api/v1/admin/leads/[id]/confirm-acceptance` | Admin marks a lead accepted on vendor's behalf after a phone call → creates Booking | Same logic as `POST /vendors/me/leads/[id]/accept`, admin-gated instead of vendor-self |

That's 4 new endpoints. Everything else needed already exists.

## 14. Existing Code Reuse Map

| Component | Verdict |
|---|---|
| Dispatch engine, lead lifecycle, booking creation | **KEEP as-is** — fits V1 exactly, no changes needed |
| `VendorProfile`/`VendorVerification`/`VendorAvailability`/`PortfolioItem`/`VendorDocument` models | **KEEP as-is** — no schema changes required (§15) |
| `verify`/`suspend`/`restore` admin endpoints | **KEEP**, but note the restore↔verification-status gap (§2) |
| `updateVendorProfileSchema`, `registerVendorSchema` (zod validators) | **REUSE** — new admin create/edit endpoints should reuse or lightly extend these, not invent parallel ones |
| `FileService` (signed URLs, bucket config) | **REUSE as-is** for admin-side CNIC upload |
| `/partner/register` page | **MODIFY** (§12) |
| Admin permission system (`ROLE_PERMISSIONS`) | **REUSE** — new admin endpoints slot into the existing `PERMISSIONS.ADMIN_VENDOR_MANAGE` pattern, no new permission model needed |
| Notification system (mock providers) | **MISSING real implementation** — not part of V1 scope, but the reason vendor self-service is deferred (§7) |
| CSV import | **MISSING, and deliberately not building it** (§9) |

## 15. Database Changes Required

**None.** Every field needed for V1 already exists in `prisma/schema.prisma`.
`VendorVerification` is already an optional 1:1 relation, which is exactly
what makes "shell without CNIC yet" possible with zero migration.

Two **non-blocking, V2** suggestions only:
1. `@unique` constraint on `VendorVerification.cnicNumber` once vendor volume
   makes manual duplicate-checking unreliable.
2. Consider a scheduler/cron for `expire-stale-leads` (infra config, not a
   schema change).

## 16. V1 vs V2 Feature Boundary

| V1 (needed for first 100 bookings) | V2 (defer) |
|---|---|
| Admin auth-gated panel | Vendor self-service OTP login + dashboard |
| Admin: create/edit vendor, attach verification, approve/reject/suspend/restore | Real WhatsApp/SMS/push notification providers |
| Admin: vendor list/search with status | CSV bulk import |
| Admin: leads list + phone-confirmed accept | Automated cron for stale-lead expiry |
| Fixed `/partner/register` (self-serve intake) | Working-hours/emergency-availability as dispatch filters |
| Public vendor profile page | Rating-threshold dispatch gating |
| Duplicate check: phone (DB-enforced) + manual CNIC check | DB-unique CNIC constraint |
| Spreadsheet-based CRM (already built) | Formal `UNDER_REVIEW` workflow step |
| "ID Verified" badge only | "Primary vs additional category" distinction |

## 17. Implementation Order

1. Admin auth-gated shell (frontend route protection using existing OTP+role backend)
2. Admin vendor CRUD (`/admin/vendors*` pages + the 3 new vendor endpoints) — unlocks turning tomorrow's calls into real records
3. Admin leads page + `confirm-acceptance` endpoint — completes the end-to-end loop (shell → verified → matched → booked)
4. Fix `/partner/register` — reduces admin's manual data-entry going forward
5. Public vendor profile `/vendor/[slug]` — SEO/marketing value, least urgent operationally
6. (V2, once §16-right-column items are actually needed) vendor self-service + real notifications

Steps 1–3 are the entire operational loop from §1. Everything after is
supporting or growth work — sequence accordingly, don't parallelize into 4/5
before 1–3 are working end-to-end.
