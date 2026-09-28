# FixKar.pk — URL Architecture & Hierarchy Design

> **Document Type:** Information Architecture & Routing Blueprint  
> **Status:** PLANNING ONLY — STRICTLY NON-EXECUTABLE IN CURRENT PHASE  
> **Rule:** DO NOT change, delete, or rewrite any existing routes in the codebase. All existing URLs (`/lahore/ac-repair`, `/services`, etc.) must remain 100% operational and undisturbed.

---

## 1. Architectural Objectives & Design Principles

FixKar.pk requires an information architecture capable of scaling across:
- 11 Master Categories
- 150+ Specific Service Units
- 20+ Pakistani Cities
- Residential, B2B Commercial, and High-Ticket Turnkey Project customer types

### Guiding URL Standards
1. **Strictly Lowercase:** All paths must be lowercase (e.g., `/services/ac-cooling/`, never `/Services/AC-Cooling/`).
2. **Hyphen Separated:** Words separated solely by hyphens (`-`). No underscores or camelCase.
3. **Semantic & Human-Readable:** URLs must clearly indicate to users and search bots what content exists on the page.
4. **Free of Database IDs & Query Strings:** No `/services/category?id=124` or `/service/cat_4821`. Clean, static path segments only.
5. **Shallow Depth:** Keep directory nesting to a maximum of 3 levels to maintain maximum PageRank distribution and crawling efficiency.
6. **Immutable & Stable:** Once an indexable URL is published, it becomes a permanent business asset. Never rename on a whim.

---

## 2. Master URL Hierarchy (Proposed Future Model)

```
ROOT (/)
 │
 ├── CONSUMER SERVICES HUB (/services/) — LIVE, rebuilt Phase 2 (2026-09-28)
 │    ├── /services/ac-cooling/            [candidate — group has 1 live category today]
 │    ├── /services/electrical/            [candidate — group has 1 live category today]
 │    ├── /services/plumbing/              [candidate — group has 1 live category today]
 │    ├── /services/cleaning/              [candidate — group has 4 live categories today]
 │    ├── /services/painting/              [candidate — group has 1 live category today]
 │    ├── /services/gardening/             [candidate — NOT live, no vendor coverage yet]
 │    ├── /services/carpentry/             [candidate — NOT live, no vendor coverage yet]
 │    ├── /services/renovation/            [candidate — NOT live, no vendor coverage yet]
 │    ├── /services/pest-control/          [candidate — NOT live, no vendor coverage yet]
 │    ├── /services/appliance-repair/      [candidate — NOT live, no vendor coverage yet]
 │    └── /services/security-smart-home/   [candidate — NOT live, no vendor coverage yet]
 │
 ├── B2B COMMERCIAL PORTFOLIO (/business-services/) — NOT built. Entry CTA
 │    on /services/ currently routes to /request until this exists.
 │    ├── /business-services/office-cleaning/
 │    ├── /business-services/commercial-ac-maintenance/
 │    ├── /business-services/facility-maintenance/
 │    └── /business-services/annual-maintenance-contracts/
 │
 ├── HIGH-VALUE PROJECTS (/projects/) — NOT built. Entry CTA on /services/
 │    currently routes to /request until this exists.
 │    ├── /projects/complete-home-renovation/
 │    ├── /projects/kitchen-renovation/
 │    ├── /projects/bathroom-renovation/
 │    ├── /projects/false-ceiling/
 │    └── /projects/commercial-fit-out/
 │
 ├── GEOGRAPHIC HUBS — NO separate /locations/ hierarchy.
 │    `/[city]/` (e.g. `/lahore`, `/islamabad`) already IS the city hub and is
 │    live/indexed today. A parallel `/locations/lahore/` would be a second
 │    URL competing for the same search intent as the existing `/lahore` —
 │    a direct duplicate-content risk (see DUPLICATE_CONTENT_POLICY.md).
 │    Correction (2026-09-28): the `/locations/*` hierarchy from the original
 │    draft of this doc is removed. Do not resurrect it. If a locations
 │    *index* page (a directory of all cities) is ever wanted, it must link
 │    to the existing `/[city]/` URLs, not mint new ones.
 │
 └── BRAND & LEGAL
      ├── /how-it-works/
      ├── /trust-safety/
      ├── /about/
      ├── /contact/
      ├── /faq/
      ├── /partner/
      │    └── /partner/register/
      ├── /privacy/
      └── /terms/
```

**What "candidate" means above:** none of the 11 `/services/[group]/` URLs
exist yet and none are approved for implementation. This phase (Phase 2)
only rebuilt the `/services/` hub itself — see `SERVICE_ARCHITECTURE.md` and
`SERVICE_PAGE_ROADMAP.md` for the per-category status and the SEO quality
gate each must pass before a URL is finalized and built.

---

## 3. Individual Service URL Planning (Post-Keyword Research)

Individual service URLs (e.g., specific gas refilling vs. PCB repair) are **NOT** finalized in this document. 

### Phased Category-by-Category Workflow
Individual sub-service slugs will be finalized category-by-category only after:
1. Screaming Frog & Ahrefs competitive audits on Pakistani search volume.
2. Search intent evaluation to ensure searchers differentiate between related queries.
3. Confirmation of actual vendor supply in target launch cities.

---

## 4. Coexistence & Backwards Compatibility with Current Routing

### Existing Live URLs
Today, FixKar.pk operates with a flat geo-service schema:
- `/[city]/` (e.g., `/lahore`, `/islamabad`)
- `/[city]/[category]/` (e.g., `/lahore/ac-repair`, `/lahore/electrician`, `/lahore/sofa-carpet-cleaning`)
- `/services` (Phase 2, 2026-09-28: rebuilt as the master services hub —
  11-category taxonomy discovery with search, problem-based pathways, and
  Business/Projects entry points — see `SERVICE_ARCHITECTURE.md`. Links out
  to the real `/[city]/[category]` pages; does not itself list category
  URLs that don't exist.)

### Migration Safeguards
- **DO NOT TOUCH EXISTING ROUTES NOW:** The existing flat structure is live, tested, and indexed in Google for active categories.
- When the proposed hierarchical structure is eventually scheduled for implementation (Phase 5+):
  - Strict 1-to-1 `301 permanent redirects` must be authored in `next.config.ts`.
  - Zero broken links, zero 404 spikes, zero lost search equity.
  - The canonical tags must transition cleanly without intermediary redirect hops.
