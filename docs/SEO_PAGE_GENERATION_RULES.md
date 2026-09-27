# FixKar.pk — SEO Page Generation Rules & Quality Standards

> **Document Type:** Search Engine Optimization & Programmatic Governance  
> **Status:** Canonical Policy (Mandatory for All Future Pages)  
> **Golden Principle:** Every indexable URL must satisfy a distinct, legitimate search intent with genuinely unique editorial value. Never produce programmatic doorway pages.

---

## 1. The 15 Mandatory Elements of Every FixKar.pk SEO Page

Before any page is allowed into the search engine index or the production sitemap, it must satisfy all 15 core criteria:

1. **One Clearly Defined Search Intent:** Must resolve exactly one intent archetype: *Transactional* (e.g. "book plumber in lahore"), *Commercial Investigation* (e.g. "ac gas refill price lahore"), or *High-Ticket Project* (e.g. "kitchen renovation contractors islamabad").
2. **One Primary Keyword / Core Topic:** Target a specific, validated high-volume keyword without keyword dilution.
3. **Curated Secondary Keywords:** 3–5 semantically related LSI keywords integrated naturally into body headings and copy.
4. **Unique Meta Title:** Written to human editorial standards, strictly under 60 characters, containing the primary keyword, geographic modifier, and FixKar brand:
   - *Format:* `[Primary Service] in [City] | [Unique Value/Feature] - FixKar.pk`
5. **Unique Meta Description:** Compelling, action-oriented snippet between 140–155 characters featuring specific pricing guidance, trust signal, and CTA.
6. **Unique, Single H1 Tag:** Exactly one semantic `<h1>` matching the user's primary search intent without unnatural stuffing.
7. **Unique Editorial Introduction:** A hand-crafted or rigorously vetted opening paragraph (minimum 80 words) describing the local problem space, regional nuances (e.g., hard water in Lahore, humidity in Karachi, load-shedding surges).
8. **Detailed Service Explanation:** Clear narrative of what the trade entails, tools used, and technical standards adhered to.
9. **Explicit Service Scope ("What's Included & What's Not"):** Bulleted checklist eliminating customer ambiguity and preventing contractor billing disputes.
10. **Locally Relevant FAQs:** Minimum 4–6 substantive, non-repetitive FAQ items addressing pricing, scheduling, parts procurement, and safety.
11. **Contextual Internal Linking:** Relevant links to sibling categories, parent hubs, regional service areas, and project funnels.
12. **Valid Structured Data (JSON-LD):** Correct implementation of `Service`, `LocalBusiness`, `FAQPage`, and `BreadcrumbList` schemas.
13. **High-Converting Primary Call-to-Action:** Distinct, prominent conversion trigger aligned with the page intent (`Book via WhatsApp`, `Request a Fast Callback`, `Request a Project Quote`).
14. **Absolute Canonical URL:** Self-referential, standardized canonical tag matching the verified production domain without redirect hops.
15. **Breadcrumb Navigation:** Visible, accessible breadcrumb hierarchy assisting both human navigation and search engine crawling.

---

## 2. The Strict Anti-Template Rules

### Rule 2.1 — The Anti-City-Swap Mandate
**NEVER** generate location pages by running a string substitution script that replaces:
> `"Lahore"` ➔ `"Karachi"` or `"Islamabad"`

while retaining identical introductory paragraphs, identical FAQs, identical common issues, and identical descriptions.

*Why:* Search engines evaluate token n-grams and document similarity. When 10 city pages share 90%+ text similarity, algorithmic quality filters (Helpful Content System / Panda) classify them as programmatic doorway pages, demoting or deindexing the entire domain.

### Rule 2.2 — The Anti-Synonym-Swap Mandate
**NEVER** generate parallel indexable pages for search synonyms that share identical intent:
- Do **NOT** create both: `/lahore/ac-repair` AND `/lahore/ac-service`
- Do **NOT** create both: `/lahore/electrician` AND `/lahore/electrical-services`
- Do **NOT** create both: `/lahore/plumber` AND `/lahore/plumbing-services`

*Remedy:* Consolidate synonyms onto the authoritative canonical page. Target secondary keywords via H2 sub-sections and FAQ schema.

### Rule 2.3 — Zero Thin Location Pages
Do **NOT** spawn micro-neighborhood URLs (e.g., `/lahore/johar-town/plumber`, `/lahore/model-town/plumber`) unless:
1. FixKar has dedicated, active vendor crews stationed physically in that neighborhood.
2. The page features authentic localized imagery, neighborhood landmark references, neighborhood-specific reviews, and distinct neighborhood pricing/logistics.

If localized content does not exist, serve the verified city-level page (`/lahore/plumbing`) and handle neighborhood filtering client-side.

---

## 3. Editorial Quality & Localization Standards

Every indexable service page must reflect real, tangible Pakistani living conditions:

* **Plumbing:** Address regional water characteristics (e.g., saline/brackish water in parts of Karachi causing rapid valve erosion; high sediment/hard water in Lahore causing geyser scaling).
* **Electrical:** Address local power realities (UPS changeover switches, phase reversal, neutral leakage, generator safety ATS interlocks).
* **AC & Cooling:** Address local climate (severe dry heat in Multan vs. humid coastal atmosphere in Karachi vs. extreme dust storms in Lahore).
* **Painting:** Address severe monsoon seepage, dampness rising from foundations (*seam* / *kallam*), and exterior weather-sheet durability.

Pages demonstrating authentic trade and geographic knowledge naturally outrank thin programmatic scraper directories.

---

## 4. Metadata & Content Audit Checklist

Before setting any page to `robots: { index: true }`:

- [ ] Does the page serve an active city with at least 1 verified operational vendor?
- [ ] Is the title tag under 60 characters with zero keyword repetition?
- [ ] Is the meta description under 155 characters with a compelling value proposition?
- [ ] Is the text similarity score against all existing pages under 30%?
- [ ] Are all FAQs unique to this trade and region?
- [ ] Does the pricing table provide realistic Pakistani Rupee (PKR) market ranges?
- [ ] Is the canonical URL absolute and pointing to the authoritative domain?
- [ ] Are all breadcrumb links functional and returning HTTP 200?
- [ ] Does the page feature a prominent, frictionless conversion form or WhatsApp CTA?
