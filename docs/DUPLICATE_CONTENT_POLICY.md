# FixKar.pk — Duplicate Content Protection Policy

> **Document Type:** Search Integrity & Anti-Spam Governance Policy  
> **Status:** Mandatory Production Constraint  
> **Enforcement:** Programmatic Pre-Commit Checks, Linting & Build Gating

---

## The 14 Inviolable Rules of Content Uniqueness

To protect FixKar.pk from algorithmic search penalties, crawl budget waste, and user trust erosion, all developers, content strategists, and automated workflows must strictly adhere to the following 14 rules:

### Rule 1: No Copied Service Descriptions
Service overview copy, scope summaries, and procedural descriptions must never be copied verbatim from one service to another. Every trade (e.g., AC Repair vs. Refrigerator Repair vs. Washing Machine Repair) possesses distinct mechanical workflows, failure modes, tools, and pricing dynamics.

### Rule 2: No Copy/Paste City Pages
City pages (e.g., `/lahore/painter`, `/islamabad/painter`, `/gujranwala/painter`) must not share identical paragraph structures, identical problem descriptions, or identical pricing notes. Each location page must feature authentic regional factors, local supplier availability, housing typologies, and city-specific contractor profiles.

### Rule 3: No Duplicated FAQs Across Every Page
A general FAQ (e.g., *"How do I pay?"* or *"Do you offer warranties?"*) must never be pasted verbatim across 50 different service pages. FAQs on a service page must answer trade-specific, intent-specific questions (e.g., *"What is the difference between R22 and R410A gas refill?"* or *"How long does sofa shampoo drying take in winter?"*).

### Rule 4: No Keyword-Stuffed Paragraphs
Never cram repeated variations of keywords (e.g., *"If you are looking for the best electrician in Lahore, our Lahore electricians provide top Lahore electrical services in Lahore"*). Content must read naturally, authoritatively, and professionally to a human homeowner.

### Rule 5: No Spun Paragraphs with City or Service Substitutions
Never use automated text-spinning tools, regex scripts, or template loops that substitute placeholder tags like `{{city}}` or `{{service}}` across boilerplates. Algorithmic quality analyzers detect n-gram patterns and structural templates with high precision.

### Rule 6: No Automatically Indexed Low-Value Combinations
Never publish programmatic cross-products of `[Category] × [City] × [Locality]` without supply verification. Combinations lacking verified vendor coverage must return HTTP 404 or render explicit `noindex` tags to prevent indexing thin placeholder shells.

### Rule 7: No Duplicate URLs
The platform must maintain strict URL normalization:
- Enforce lowercase URLs at all times.
- Strip trailing slashes consistently (or enforce single canonical slash policy).
- Ensure query parameters (`?ref=`, `?utm_source=`, `?sort=`) never create separate indexable variants.

### Rule 8: One Canonical URL Per Search Intent
Every unique customer search query must map to exactly one authoritative, indexable canonical URL. Secondary variations must point their `rel="canonical"` link to this single primary source of truth.

### Rule 9: Search Intent Evaluation Before Creating Similar Pages
Before introducing a new URL slug for a related service (e.g., `/sofa-cleaning` vs. `/couch-cleaning` vs. `/upholstery-cleaning`), analyze SERP overlap. If Google serves identical search results for these terms, they must be consolidated onto one comprehensive page rather than splintered across thin duplicates.

### Rule 10: Existing Valuable Pages Must Be Preserved or Redirected Carefully
Never rename or modify existing indexed URLs that have built authority, organic rankings, or backlinks. If a URL restructure is unavoidable, implement permanent `301 Moved Permanently` redirects immediately in `next.config.ts`.

### Rule 11: Do Not Delete an Existing Indexed URL Without SEO Evaluation
Prior to deprecating any page:
- Inspect Google Search Console traffic and historical impressions.
- Check backlink profile.
- If traffic exists, redirect (301) to the closest relevant category or city hub.
- Only return HTTP 410 (Gone) or 404 if the page has zero traffic and zero relevance.

### Rule 12: Intentional Use of Redirects and Canonicals
- Use `301 Redirects` for permanently moved or consolidated URLs.
- Use `rel="canonical"` on self-referential pages and parameter variations.
- Never chain redirects (e.g., A ➔ B ➔ C). Ensure all redirects point directly to the final 200 OK canonical destination.

### Rule 13: Zero Tolerance for AI-Generated Filler Content
Do not publish generic, hallucinated AI prose ("In today's fast-paced world, maintaining a clean home is paramount..."). Content must be technical, practical, localized, concise, and focused on solving the customer's immediate property maintenance problem.

### Rule 14: Truthful Representation of Operational Capabilities
All copy must describe actual FixKar.pk business workflows, genuine trade practices, and verified vendor availability. Never publish fabricated guarantees, fake customer testimonials, fictitious technician counts, or non-existent warranties.
