# FixKar.pk — Master Architecture & Strategic Planning System

> **Document Status:** Active Master Plan (Planning & Documentation Phase Only)  
> **Target Platform:** FixKar.pk (Pakistan-focused Home, Property, Maintenance, Renovation & Business Services Platform)  
> **Scope:** Long-Term Architecture, Operational Capabilities, Safeguards & Multi-Phase Roadmap  
> **Strict Operational Rule:** No site redesigns, no component rewrites, no route modifications, no schema alterations, and no mass page publishing/indexing shall occur until explicitly approved.

---

## 1. Executive Summary & Master Business Positioning

FixKar.pk is being developed as Pakistan's premier managed service marketplace connecting residential customers and commercial enterprises with verified, skilled professionals and specialized service providers. 

### Core Value Proposition
FixKar.pk is **NOT** a generic directory of unvetted daily-wage laborers, nor is it an anonymous classifieds board. FixKar.pk operates as a **trusted marketplace and managed-service platform** bridging the deep trust and reliability deficit in Pakistan's informal home and commercial services sector.

### Master Service Capabilities
The platform spans:
1. **Home Services & Repairs** (Electrical, Plumbing, AC & HVAC, Carpentry, Painting, Appliance Repair)
2. **Specialized Cleaning** (Deep Cleaning, Sofa Cleaning, Carpet Cleaning, Water Tank Sanitization)
3. **Property & Facility Maintenance** (Residential, Apartments, Commercial Buildings, Retail Outlets)
4. **Renovation & Remodeling** (Full Home, Kitchen, Bathroom, Office, False Ceiling, Tile & Flooring, Partitions)
5. **Specialized & Outdoor Services** (Gardening, Landscaping, Pest Control, Waterproofing, Fumigation)
6. **Smart Infrastructure & Security** (CCTV, Access Control, Biometrics, Smart Home, Networking)
7. **B2B Maintenance Contracts** (Annual Maintenance Contracts, Facility Preventative Care)

### Long-Term Marketplace Flywheel
```
Customer / Business Need
       │
       ▼
FixKar.pk Discovery & Smart Requirement Capture
       │
       ▼
Service Request (Residential Booking / Project Quote / Commercial RFP)
       │
       ▼
Intelligent Matching to Verified & Capable Service Provider
       │
       ▼
Managed Job Execution (Clear Scope, Transparent Pricing, Safety)
       │
       ▼
Job Completion & Customer Quality Sign-Off
       │
       ▼
Verified Review & Customer Feedback Capture
       │
       ▼
Commission / Fee Settlement & Provider Performance Scoring
```

### Operational Reality Rule
**FixKar.pk will never claim nationwide coverage or active service availability in a city, neighborhood, or service vertical unless operational vendor fulfillment capacity actually exists.** Brand messaging may present the national vision, but the conversion and routing engine strictly gates transactions by real vendor coverage.

---

## 2. Comprehensive Codebase Audit (Current State vs. Master Plan)

### 2.1 Existing Architecture
- **Framework & Runtime:** Next.js 16.2.11 (App Router), React 19.2.4, TypeScript 5, Node.js.
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`).
- **Data & ORM:** PostgreSQL accessed via Prisma ORM 7.9.1 with `@prisma/adapter-pg` (supports connection pooling with PgBouncer).
- **Backend Architecture:** Structured 3-tier modular architecture in `web/server/`:
  - `app/api/v1/*` (thin route handlers, input validation, HTTP serialization).
  - `server/modules/*` (15 domain modules: `admin`, `auth`, `bookings`, `catalog`, `commission`, `customers`, `dispatch`, `files`, `leads`, `notifications`, `reports`, `reviews`, `settlements`, `vendors`, `wallets`).
  - `server/shared/*` (infrastructure: auth middleware with phone-based identity, RBAC with 6 roles, cache abstraction for Redis/Memory, rate limiter, error handling, audit logging, OpenTelemetry).
- **Static & Dynamic Routing Tree:**
  - Static marketing routes: `/`, `/services`, `/about`, `/contact`, `/faq`, `/how-it-works`, `/partner`, `/partner/register`, `/privacy`, `/request`, `/terms`, `/thank-you`, `/trust-safety`, `/blog`, `/blog/[slug]`.
  - Dynamic geo/category routes: `/[city]`, `/[city]/[category]`.

### 2.2 Existing Service Coverage
- **In Code (`web/lib/services.ts`):** 8 categories defined:
  1. `ac-repair` (AC Repair & Gas Refill)
  2. `electrician` (Electrician Services)
  3. `plumbing` (Plumbing Services)
  4. `cleaning` (Deep Cleaning Services)
  5. `painter` (House Painting Services)
  6. `sofa-carpet-cleaning` (Sofa & Carpet Cleaning Services)
  7. `sofa-cleaning` (Sofa Cleaning Services)
  8. `carpet-cleaning` (Carpet Cleaning Services)
- **In Database Seed (`web/prisma/seed.mjs`):** 5 categories (`ac-repair`, `electrician`, `plumbing`, `cleaning`, `painter`). Missing the sofa/carpet cluster and the confirmed ceiling category.
- **In Actual Vendor Reality (`web/docs/FIXKAR-SOURCE-OF-TRUTH.md`):**
  - Confirmed vendors exist for **Sofa & Carpet Cleaning** (Lahore, Islamabad, Gujranwala).
  - Confirmed vendor exists for **Painting** (Lahore, Islamabad, Gujranwala, Gujrat).
  - Confirmed vendor exists for **Ceiling / False Ceiling** (Lahore, Islamabad, Gujranwala, Gujrat).
  - Unverified vendor contacts for AC, Electrician, Plumbing, General Cleaning in Lahore (`vendors.csv` lists prospects as "Not Contacted").

### 2.3 Existing City Coverage
- **In Code (`web/lib/services.ts`):** 5 cities:
  1. `lahore` (Status: `active` — renders all 8 categories as active)
  2. `islamabad` (Status: `coming_soon`, with `activeCategories: ["sofa-carpet-cleaning", "sofa-cleaning", "carpet-cleaning"]`)
  3. `gujranwala` (Status: `coming_soon`, with `activeCategories: ["sofa-carpet-cleaning", "sofa-cleaning", "carpet-cleaning"]`)
  4. `rawalpindi` (Status: `coming_soon`, 0 active categories)
  5. `karachi` (Status: `coming_soon`, 0 active categories)
- **Missing from Code:** `gujrat` (confirmed coverage for painting and ceiling).
- **Out-of-Scope Pre-allocations:** Rawalpindi and Karachi exist as placeholder routes that currently render empty `ComingSoonState` pages.

### 2.4 Existing SEO Implementation
- **Sitemap (`web/app/sitemap.ts`):** Programmatic sitemap filtering out non-active city/category combinations (prevents indexing thin coming-soon combinations).
- **Robots (`web/app/robots.ts`):** Disallows `/api/`, `/admin/`, allows all public pages, references sitemap.
- **Structured Data Components (`components/seo/`):**
  - `ServiceSchema.tsx` (Schema.org `Service` markup)
  - `FAQSchema.tsx` (Schema.org `FAQPage` markup)
  - `LocalBusinessSchema.tsx` (Schema.org `HomeAndConstructionBusiness`)
  - `OrganizationSchema.tsx`
  - `Breadcrumbs.tsx`
- **Known SEO Deficiencies:**
  - `BRAND_URL` is set to `https://fixkar.pk`, whereas the live domain serves `www.fixkar.pk` (causing canonical mismatch/redirect hops).
  - Static marketing routes (`/about`, `/contact`, `/faq`, etc.) lack explicit `alternates.canonical` tags.
  - `/blog/[slug]` lacks static validation or `notFound()` gating (returns 200 with identical placeholder text for any arbitrary URL slug).
  - Category naming mixes singular and plural nouns (`painter` vs. `electrician` vs. `plumbing`).

### 2.5 Existing UI & Design System
- **Component Kit:** Tailored, clean components in `components/ui/` (`Button`, `Input`, `Select`, `Card`, `Modal`, `Drawer`, `Badge`, `ComingSoonState`, `SuccessState`, `AccordionItem`).
- **Layouts:** `Container.tsx`, `Section.tsx`, `PageHeader.tsx`.
- **Primary Color:** Professional Blue / Indigo palette with neutral grays and emerald/green WhatsApp accent.
- **Shortcomings:**
  - Lacks localized visual assets and Pakistani architectural/home imagery.
  - LeadForm is over-simplified (3 fields: Name, Phone, Area) with no service selector or property scope questions.
  - Hardcoded false claims on live UI: "CNIC Verified", "within 15 minutes", "7-Day Warranty" which are not currently backed by automated operational infrastructure.

### 2.6 Existing Backend & Provider Functionality
- **Database Schema (`prisma/schema.prisma`):** Enterprise-grade schema supporting Users, Roles, CustomerProfiles, VendorProfiles, VerificationTiers, Wallets, Double-entry Ledger, Settlements, Notifications, Reviews, and Disputes.
- **Provider Registration:**
  - Backend route `/api/v1/partner/register` supports multipart upload for CNIC front/back, selfie, and skill tagging.
  - Frontend page `/partner/register` does not call this backend route; it mocks submission locally.
- **Dispatch Engine:** `DispatchService.assignNextVendor` automatically assigns leads on creation. Because real verified vendor rows are not yet seeded, leads fall through to `UNASSIGNED`. Operational decision requires disabling auto-dispatch in favor of founder/admin-controlled triage.

---

## 3. Gap Analysis & Architecture Assessment Matrix

| Architecture Domain | Existing State | Proposed / Master Target | Gap / Missing Elements | Operational Risk | Recommendation |
|---|---|---|---|---|---|
| **Service Taxonomy** | 8 categories hardcoded in `lib/services.ts`; 5 in DB seed | 11 Master Categories with 150+ granular sub-services | Ceiling category missing; 9 major categories completely absent | Demand for unfulfilled services, or bloated thin pages if generated prematurely | Maintain comprehensive taxonomy in documentation; gate code activation strictly by verified vendor supply |
| **B2B / Commercial** | Generic single lead flow; no commercial representation | Dedicated B2B Maintenance & Facility Architecture | No commercial quote flow, no AMC contracts, no facility workflows | High-value commercial clients bounced by residential 3-field form | Create dedicated `/business-services/` architecture and B2B quote capture funnel |
| **Projects & Contracts** | Simple "handyman dispatch" lead model | High-value project bidding and estimation workflow | No project scope capture (area, timeline, budget, blueprints) | Inability to quote large renovations or commercial fit-outs | Implement dedicated `/projects/` flow with detailed multi-step RFP forms |
| **City Coverage** | 5 cities in code (2 partial active, 2 placeholder, 1 full) | Phased roll-out across 9 Tier-1 cities, then 10 Tier-2 cities | Gujrat missing despite vendor coverage; Karachi/Rawalpindi thin shells | Thin-content algorithmic penalties; customer dissatisfaction | Implement strict City Operational Lifecycle (`Planned` → `Vendor Recruitment` → `Available`) |
| **SEO & Programmatic** | Good static schema; dynamic money pages limited to 8 | Strictly governed programmatic SEO with unique local content | Pre-generation validation scripts missing; `/blog/[slug]` unbounded | Duplicate content, near-duplicate city pages, cannibalization | Deploy CLI safety validator; enforce 14 duplicate content protection rules |
| **URL Architecture** | Flat `/[city]/[category]` | Scalable hierarchy: `/services/`, `/business-services/`, `/projects/`, `/locations/` | Mixed category naming; canonical domain misconfiguration | Broken backlinks, redirect loops if changed recklessly | Keep current URLs stable; plan hierarchical structure without modifying live routes |
| **Conversion Funnels** | 3-field LeadForm + direct WhatsApp click | Segmented funnels: Emergency, Standard Residential, Project, B2B | No service/city selector on `/request`; no scope capture | Low lead qualification, high admin follow-up friction | Rebuild `LeadForm` with progressive 2-step capture (contact first, scope second) |
| **Trust & Verification** | Hardcoded marketing trust badges | Verified provider tiers backed by database and operational checks | Unverified CNIC claims; missing customer reviews and case studies | Legal/reputational risk from false claims; lower conversion | Align marketing copy with verified operational reality; collect real case studies |
| **Provider Operations** | Disconnected frontend form; auto-dispatch with 0 vendors | Admin-triaged lead matching, vendor dashboard, wallet settlements | Disconnected register page; unseeded vendor database | Leads lost in `UNASSIGNED` limbo with no notifications | Wire `/partner/register` to API; build simple Admin Lead Management dashboard |

---

## 4. Master Phased Implementation Roadmap

```
PHASE 0: Master Architecture & Planning (Current Phase — Documentation Only)
    ├── Complete Audit & Strategy Documentation (16 Master Docs)
    └── Zero-dependency Programmatic SEO Safety Validator Script

PHASE 1: Codebase Safety & SEO Hygiene (Site-Facing Fixes)
    ├── Standardize Canonical URL domain (resolve www vs bare domain)
    ├── Gate /blog/[slug] with strict slug validation and notFound()
    ├── Align trust copy across pages with confirmed operational facts
    └── Ensure all static marketing pages export explicit canonical metadata

PHASE 2: Conversion & Lead Capture Modernization
    ├── Rebuild LeadForm into progressive 2-step qualification component
    ├── Add Dynamic Service and City/Area selectors to /request
    ├── Implement Service-specific scope capture (Rooms, Area, Issue Type)
    └── Wire /partner/register to production /api/v1/partner/register endpoint

PHASE 3: Catalog Expansion (Supply-Gated)
    ├── Add Ceiling / False Ceiling category across Lahore, Islamabad, Gujranwala, Gujrat
    ├── Activate Painting money pages for Gujrat, Islamabad, and Gujranwala
    ├── Update prisma/seed.mjs to reflect confirmed catalog and geo entities
    └── Collect and integrate authentic vendor job photography

PHASE 4: Admin Triage & Operations Dashboard
    ├── Disable automated dispatch; route leads to Admin Triage Queue
    ├── Implement minimal secure Admin Lead Viewer (`/admin/leads`)
    ├── Integrate WhatsApp Business webhook or one-click provider dispatch
    └── Seed active vendor profiles with real CNIC verification records

PHASE 5: High-Value Projects & B2B Expansion
    ├── Deploy /projects/ architecture and "Request a Project Quote" flow
    ├── Deploy /business-services/ and "Request a Business Quote" flow
    └── Integrate commercial lead tracking and AMC contract records
```

---

## 5. Architectural Invariants & Non-Negotiables

1. **Supply-First Expansion:** A category or city shall never be indexed or set to active status without verified vendor fulfillment capability.
2. **Zero Route Churn:** Existing indexed URLs (`/lahore/ac-repair`, `/services`, etc.) must remain stable. Any structural URL changes require exhaustive 301 redirect mappings.
3. **Double-Entry Ledger Integrity:** Financial balances in the `Wallet` model must always be altered through atomic `LedgerTransaction` records with balanced entries.
4. **Content Originality:** No automated script or generative model may produce city-swapped or service-swapped duplicate content. Every indexable page must offer unique editorial value, distinct local context, and authentic pricing guidance.
5. **Operational Truthfulness:** Every trust signal (CNIC check, warranty, response time, ratings) displayed to users must be 100% true and auditable in the database.
