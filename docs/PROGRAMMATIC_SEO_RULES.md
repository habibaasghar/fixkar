# FixKar.pk — Programmatic SEO Safety & Validation Rules

> **Document Type:** Automated SEO Pipeline Governance  
> **Status:** Mandatory Technical Workflow  
> **Philosophy:** Programmatic SEO is an acceleration tool, never an autonomous publisher. Every automated page generation pipeline must be gated by algorithmic uniqueness checks, supply audits, and explicit human sign-off.

---

## 1. The Staged Generation & Publication Pipeline

To prevent accidental search index contamination, FixKar.pk enforces a strictly staged 4-step programmatic page publishing pipeline:

```
[ Step 1: Candidate Generation ]
Input: Service Taxonomy + Active Vendor Matrix + Keyword Data
Output: Candidate JSON Datasets (Stored in staging/candidates/)
             │
             ▼
[ Step 2: Algorithmic Safety Validation ]
Run: python scripts/seo_safety_validator.py
Validates: Titles, Metas, H1s, Content Similarity, Vendor Coverage, Canonical URLs
             │
             ▼
[ Step 3: Human Review & Audit Report ]
Output: Markdown Validation Report (Zero errors, similarity < 30%)
Action: Engineering & SEO Lead manual sign-off
             │
             ▼
[ Step 4: Gated Publication ]
Only approved slugs committed to lib/services.ts or production catalog.
Never publish without Steps 1–3 complete.
```

---

## 2. Mandatory Validation Criteria

Before any candidate batch of programmatic pages can be approved, the automated safety validator must confirm 100% compliance across 8 checks:

1. **Title Uniqueness:** No two URLs on the domain may share an identical `<title>` tag.
2. **Meta Description Uniqueness:** No two URLs may share an identical meta description.
3. **Single H1 Tag & Uniqueness:** Exactly one `<h1>` per page, distinct across all pages.
4. **Near-Duplicate Content Detection (Jaccard / Levenshtein / Difflib):**
   - Body text similarity across any two pages must be **strictly below 30%**.
   - If two city pages for the same service score > 30% similarity, both are rejected until localized content is injected.
5. **Search Intent Collision Check:** Ensure no two candidates target overlapping search queries (e.g., preventing parallel generation of `/ac-repair` and `/ac-fixing`).
6. **Active Vendor / Supply Verification:** Verify that the city/category pair has at least 1 active, verified vendor row in the database or confirmed CRM sheet. Pages with zero vendor fulfillment capacity are automatically tagged `noindex` or dropped.
7. **Canonical URL Integrity:** Canonical must be absolute, lowercase, hyphenated, and self-referential without trailing slashes.
8. **Internal Link Reachability:** Every generated candidate must have a natural parent hub, breadcrumbs, and at least 2 relevant sibling links.

---

## 3. Human Approval Gate

**Automated deployment scripts are prohibited from committing or publishing new indexable routes directly to production.**

- The pipeline generates a **Review Report** (`docs/reports/SEO_CANDIDATE_AUDIT_[DATE].md`).
- A human editor must inspect:
  1. Authentic local relevance of descriptions.
  2. Accuracy of pricing estimates against current Pakistani market rates.
  3. Real phone and WhatsApp routing for the designated vendor.
- Only upon human sign-off is the candidate batch merged into the production router.

---

## 4. Built-in Python Validation Utility

FixKar.pk includes a zero-dependency, standard-library Python utility:  
`scripts/seo_safety_validator.py`

### Capabilities
- **Duplicate Title & Meta Detection:** Flags duplicate or near-duplicate snippets.
- **Content Similarity Matrix:** Evaluates cross-page text similarity using `difflib.SequenceMatcher`.
- **URL Collision Detection:** Catches slug clashes and casing irregularities.
- **Service/City Matrix Audit:** Verifies candidate pages against active vendor coverage.
- **Missing Metadata Alerts:** Identifies empty descriptions, missing canonicals, or broken JSON-LD schemas.

### Command Line Usage
```bash
# Validate candidate page dataset
python scripts/seo_safety_validator.py --candidates data/candidates.json --vendors vendors.csv

# Audit existing production routes in lib/services.ts
python scripts/seo_safety_validator.py --audit-existing
```
