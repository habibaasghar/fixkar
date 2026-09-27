# FixKar.pk — Pakistan City Expansion & Coverage Strategy

> **Document Type:** Geographic Expansion & Operational Staging Policy  
> **Status:** Canonical Master Reference (Planning & Strategy Only)  
> **Strict Anti-Thin-Content Rule:** No city or service landing page shall be indexed in search engines simply because the city appears on an expansion target list. Service pages are activated only upon verification of actual local vendor fulfillment capacity.

---

## 1. National Strategic Positioning vs. Local Operational Reality

FixKar.pk is strategically positioned as **Pakistan's National Home & Property Services Platform**. However, service fulfillment is an intensely physical, local reality. 

A customer booking an emergency plumber in Faisalabad or an AC technician in Rawalpindi expects a qualified, background-checked professional to arrive at their doorstep within the promised timeframe. Claiming availability without verified local vendor supply burns brand equity, generates customer frustration, and creates fatal churn.

Therefore, FixKar.pk enforces a two-tier architectural separation:
1. **Brand Layer (Macro):** Communicates the national vision, overarching trust standards, enterprise contracting capabilities, and partner recruitment across Pakistan.
2. **Fulfillment Layer (Micro):** Programmatically gates transactional lead forms, SEO indexation, and money pages to verified active geographic clusters.

---

## 2. City Expansion Tiers

### Tier 1 — Initial Core Target Cities (Primary Growth Engines)
These metropolitan hubs represent the highest household income, highest digital penetration, and densest property development across Pakistan:

1. **Lahore** *(Current Operations Base — High Density: DHA, Gulberg, Bahria Town, Johar Town, Model Town, Cantt)*
2. **Islamabad** *(High purchasing power, structured sectors: F, G, E, DHA 2, Bahria Town)*
3. **Rawalpindi** *(Twin-city synergy: Saddar, Satellite Town, Bahria Town, Chaklala, Gulraiz)*
4. **Karachi** *(Mega-market: DHA, Clifton, PECHS, Gulshan-e-Iqbal, Nazimabad, Malir Cantt)*
5. **Faisalabad** *(Industrial capital: Madina Town, People's Colony, D Ground, Canal Road)*
6. **Gujranwala** *(Active industrial cluster: DC Colony, Wapda Town, Model Town, Master City)*
7. **Sialkot** *(Export hub, high disposable income: Cantt, Model Town, Sambrial Road)*
8. **Multan** *(Southern Punjab center: Cantt, Bosan Road, Gulgasht, DHA Multan)*
9. **Peshawar** *(KPK economic capital: Hayatabad, University Town, Peshawar Cantt)*

### Tier 2 — Second Expansion Group (Regional Centers & Emerging Markets)
Emerging urban centers targeted for phase-two rollout once Tier 1 operations are stabilized:

10. **Hyderabad** (Qasimabad, Latifabad, Auto Bhan)
11. **Quetta** (Cantonment, Jinnah Town, Samungli)
12. **Bahawalpur** (Model Town, Cheema Town, DHA Bahawalpur)
13. **Sargodha** (University Road, Satellite Town)
14. **Abbottabad** (Jinnahabad, Mandian, Kakul Road)
15. **Gujrat** *(Confirmed immediate vendor coverage for Painting & False Ceiling)*
16. **Sheikhupura** (Housing Colony, Lahore Road)
17. **Sahiwal** (Farid Town, Fateh Sher Colony)
18. **Wah Cantt** (Model Town, Officers Colony)
19. **Jhelum** (Cantt, Citi Housing)

---

## 3. Operational City Lifecycle States

Every city and neighborhood entity in the FixKar.pk platform database exists in exactly one of five strictly defined lifecycle states:

```
┌──────────────┐     Vendor Onboarding     ┌────────────────────┐
│   PLANNED    │ ────────────────────────> │ VENDOR RECRUITMENT │
└──────────────┘                           └────────────────────┘
                                                     │
                                                     │ Supply Vetted & Audited
                                                     ▼
┌──────────────┐    Capacity Overload      ┌────────────────────┐
│ TEMPORARILY  │ <──────────────────────── │     AVAILABLE      │
│ UNAVAILABLE  │ ────────────────────────> │      (ACTIVE)      │
└──────────────┘      Supply Restored      └────────────────────┘
       ▲
       │ Long-term Market Assessment
┌──────────────────────┐
│ EXPANSION CANDIDATE  │
└──────────────────────┘
```

### Lifecycle State Definitions & System Behaviors

| Status Key | Definition | Frontend UI Behavior | SEO / Indexing Rule | Lead Form Behavior |
|---|---|---|---|---|
| `PLANNED` | City identified for future research; no active vendor outreach has begun. | Not visible on public city lists; unlinked. | **Strictly noindex / 404** (No route generated). | Blocked. |
| `EXPANSION_CANDIDATE` | City undergoing demographic & search volume feasibility study. | Displayed only on general "Where We Plan to Launch" waitlist page. | **noindex**; non-crawlable. | Captures "Notify Me When Live" email/phone only. |
| `VENDOR_RECRUITMENT` | Actively acquiring, vetting, and interviewing local contractors. | Shown on `/partner` and recruitment campaigns as "Now Onboarding Fixers". | **noindex** on consumer search; indexable on `/partner/[city]` recruitment pages. | Consumer booking disabled; redirects to partner application. |
| `AVAILABLE` (Active) | Minimum 2+ verified, audited providers active in target categories with SLAs signed. | Rendered as active; accessible in navigation, search, and booking funnels. | **Fully Indexable** (`index, follow`), listed in `sitemap.xml`. | Fully interactive `LeadForm` with real dispatch. |
| `TEMPORARILY_UNAVAILABLE` | Local supply temporarily offline (e.g. seasonal shortages, provider suspensions). | Banner: *"High demand in [City] — bookings temporarily paused to maintain service quality."* | Preserves canonical; sets `noindex` if outage exceeds 30 days. | Captures queue requests for scheduled callbacks. |

---

## 4. Per-Category Granular City Activation

A city is **NOT** a binary all-or-nothing switch. FixKar.pk uses category-level activation within each city:

### Case Study: The Sofa & Carpet Cleaning and Painting Reality
- **Islamabad & Gujranwala:**
  - Status at City Level: `coming_soon` (General electrical, plumbing, AC are not yet verified).
  - Status for `sofa-carpet-cleaning`: **`active`** (Fully verified operational partner with equipment ready).
  - Status for `painter` & `ceiling`: **`active`** (Confirmed master contractor covers Islamabad, Gujranwala, and Gujrat).
  - Resulting Frontend State: The city hub displays available categories prominently with active booking buttons, while pending categories display clean "Launching Soon in [City]" notices with waitlist options.
- **Gujrat:**
  - Added directly to active status for `painter` and `ceiling` without publishing dummy pages for unfulfilled categories.

---

## 5. Anti-Thin-Location Rules

1. **No Neighborhood Indexing Without Physical Vendor Dispatch:**
   - Do not generate separate indexable pages for 50 micro-localities in a city (e.g., `/lahore/dha-phase-1/ac-repair`, `/lahore/dha-phase-2/ac-repair`) until unique localized content, reviews, and specific coverage boundaries are established.
2. **Unified City Hubs:**
   - Serve neighborhood coverage as an interactive section (`AreaCoverageList`) within the verified city page rather than spawning 100 thin door-way pages.
3. **Automated Sitemap Audit:**
   - Every build runs `cityHasAnyActiveCategory(city)` and `isCategoryActiveInCity(city, category)` filters before admitting any URL into `sitemap.xml`.
