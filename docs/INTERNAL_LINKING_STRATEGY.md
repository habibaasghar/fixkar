# FixKar.pk — Internal Linking Strategy & PageRank Distribution

> **Document Type:** SEO Technical Architecture & Site Structure  
> **Status:** Strategic Blueprint (Planning & Navigation Design)  
> **Goal:** Build an intuitive, crawlable web of topical authority that guides customers effortlessly from broad discovery to specific service booking, while funneling PageRank to high-converting money pages.

---

## 1. Topical Hierarchy & PageRank Flow

Search engines evaluate topic authority through structured, logical site graphs. FixKar.pk organizes internal links across a 5-tier semantic pyramid:

```
                  ┌──────────────────────┐
                  │    1. HOMEPAGE (/)   │
                  └──────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌──────────────────────┐          ┌──────────────────────┐
│  SERVICE HUBS        │          │   LOCATION HUBS      │
│  /services/          │          │   /locations/lahore/ │
└──────────────────────┘          └──────────────────────┘
            │                                 │
            ├────────────────┬────────────────┤
            ▼                ▼                ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
│ CATEGORY PAGES   │ │ MONEY PAGES  │ │ PROJECT PAGES    │
│ /services/ac/    │ │ /lahore/ac/  │ │ /projects/paint/ │
└──────────────────┘ └──────────────┘ └──────────────────┘
            │                                 │
            └────────────────┬────────────────┘
                             ▼
                  ┌──────────────────────┐
                  │ CONVERSION / QUOTE   │
                  │ /request             │
                  └──────────────────────┘
```

---

## 2. The 6 Rules of Intelligent Internal Linking

### Rule 1: Vertical Silo Integrity (Category ➔ Sub-service ➔ Location)
Links should flow naturally down the topical hierarchy:
- A user on `/services` finds links to `/services/ac-cooling/`.
- A user on `/services/ac-cooling/` finds specific sub-services (`/services/ac-cooling/gas-refill/`) and active city options (`/lahore/ac-repair`).
- A user on `/lahore/ac-repair` finds a link back to `/lahore` and `/services/ac-cooling/`.

### Rule 2: Logical Lateral Cross-Linking ("Related Services")
Only cross-link between trades that share real-world customer relevance:
- **Cleaning ↔ Sofa & Carpet Cleaning:** A homeowner booking house cleaning frequently requires sofa/carpet shampooing.
- **Painting ↔ False Ceiling / Gypsum Work:** Ceiling installation is almost universally followed by putty and emulsion painting.
- **Plumbing ↔ Water Tank Cleaning:** Overhead tank inspections regularly uncover float valve and booster pump faults.
- **Forbidden:** Linking unrelated trades (e.g. linking CCTV Installation directly on an AC Gas Refill page without contextual justification).

### Rule 3: High-Ticket Project Upsell Triggers
On standard residential repair pages, provide subtle, natural contextual pathways to high-ticket renovation funnels:
- On `/lahore/plumbing`: *"Planning a full bathroom remodel? Explore our [Turnkey Bathroom Renovation Services](/projects/bathroom-renovation)."*
- On `/lahore/painter`: *"Repainting a commercial plaza or office building? Request our [Commercial Painting & Maintenance Team](/business-services/commercial-painting)."*

### Rule 4: Descriptive, Natural Anchor Text (Zero Spam)
- **Forbidden Anchor Text:**
  - Repeated exact-match spam: *"Best plumber Lahore, cheap plumber Lahore, hire plumber Lahore"*.
  - Meaningless generic text: *"click here"*, *"read more"*, *"this page"*.
- **Approved Anchor Text:** Natural, informative, and grammatically complete:
  - *"View verified electrician rates in Lahore"*
  - *"Learn how our sofa steam cleaning process works"*
  - *"Request an annual maintenance quote for your office"*

### Rule 5: Strict Breadcrumb Implementation
Every leaf page must render structured, clickable breadcrumbs:
- `Home > Lahore > AC Repair & Gas Refill`
- Backed by valid Schema.org `BreadcrumbList` JSON-LD to render rich breadcrumb snippets in Google search results.

### Rule 6: Footer Hygiene & Anti-Duplication
- **Current Defect Found in Codebase:** The existing footer links 10 popular Lahore areas (DHA, Gulberg, Bahria Town, etc.) to the exact same URL (`/lahore/ac-repair`).
- **Remedy:** Footer links must point to authoritative city hubs (`/lahore`, `/islamabad`) and core primary category pages, avoiding keyword-stuffed repetitive anchor links that waste crawl budget.
