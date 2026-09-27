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
 ├── CONSUMER SERVICES HUB (/services/)
 │    ├── /services/ac-cooling/
 │    ├── /services/electrical/
 │    ├── /services/plumbing/
 │    ├── /services/cleaning/
 │    ├── /services/painting/
 │    ├── /services/gardening/
 │    ├── /services/carpentry/
 │    ├── /services/renovation/
 │    ├── /services/pest-control/
 │    ├── /services/appliance-repair/
 │    └── /services/security-smart-home/
 │
 ├── B2B COMMERCIAL PORTFOLIO (/business-services/)
 │    ├── /business-services/office-cleaning/
 │    ├── /business-services/commercial-ac-maintenance/
 │    ├── /business-services/facility-maintenance/
 │    └── /business-services/annual-maintenance-contracts/
 │
 ├── HIGH-VALUE PROJECTS (/projects/)
 │    ├── /projects/complete-home-renovation/
 │    ├── /projects/kitchen-renovation/
 │    ├── /projects/bathroom-renovation/
 │    ├── /projects/false-ceiling/
 │    └── /projects/commercial-fit-out/
 │
 ├── GEOGRAPHIC HUBS (/locations/)
 │    ├── /locations/lahore/
 │    ├── /locations/islamabad/
 │    ├── /locations/rawalpindi/
 │    ├── /locations/karachi/
 │    └── /locations/gujranwala/
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
- `/services` (Current launch hub listing 5 core trades in Lahore)

### Migration Safeguards
- **DO NOT TOUCH EXISTING ROUTES NOW:** The existing flat structure is live, tested, and indexed in Google for active categories.
- When the proposed hierarchical structure is eventually scheduled for implementation (Phase 5+):
  - Strict 1-to-1 `301 permanent redirects` must be authored in `next.config.ts`.
  - Zero broken links, zero 404 spikes, zero lost search equity.
  - The canonical tags must transition cleanly without intermediary redirect hops.
