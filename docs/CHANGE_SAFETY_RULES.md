# FixKar.pk — Codebase Protection & Change Safety Rules

> **Document Type:** Engineering Governance & Safety Protocol  
> **Status:** Mandatory Operational Constraint for All Developers & AI Agents  
> **Core Tenet:** Treat FixKar.pk as an active production system. Never break working functionality, never casually alter schemas, and never rewrite components without explicit authorization.

---

## 1. Mandatory Pre-Change Inspection Checklist

Before modifying a single line of code in any subsequent phase, developers and agents must execute a rigorous 9-point codebase inspection:

1. **Inspect Existing Routes:** Check `app/` route tree and `sitemap.ts` to identify every URL currently exposed or indexed.
2. **Inspect Existing Components:** Check `components/ui/`, `components/layout/`, and `components/domain/` to understand existing component contracts and prop interfaces.
3. **Inspect Database & Schema:** Check `prisma/schema.prisma` and current migrations before proposing any model or field changes.
4. **Inspect Existing APIs:** Check `app/api/**` and `server/modules/**` to ensure endpoint contracts (query params, request bodies, error schemas) remain backwards-compatible.
5. **Inspect Existing Forms:** Verify what payload `LeadForm` or `/partner/register` transmits and how validation handles it.
6. **Inspect Current SEO Metadata:** Review `generateMetadata` exports, canonical URLs, and structured data schemas.
7. **Inspect Existing Service Pages:** Verify how `lib/services.ts` properties (`priceRanges`, `commonIssues`, `faqs`) are consumed by dynamic page templates.
8. **Inspect Current Analytics:** Check GA4/OpenTelemetry events in `instrumentation.ts` and UI event handlers.
9. **Inspect Integrations:** Verify Supabase Storage, PostgreSQL pooled adapters, Redis cache abstractions, and WhatsApp link helpers.

---

## 2. The 10 Golden Safety Rules

### Rule 1: Preserve Working Functionality
Never break a live, working user journey. If a customer can book AC repair in Lahore or request sofa cleaning in Islamabad today, that flow must continue working uninterrupted after any deployment.

### Rule 2: No Arbitrary Component Rewrites
Do not rewrite existing UI components (e.g. `Button.tsx`, `Card.tsx`, `LeadForm.tsx`, `ServiceCategoryCard.tsx`) simply to match a new aesthetic trend. Enhance existing components incrementally via backwards-compatible props and variants.

### Rule 3: Never Delete Existing Routes Casually
Never remove or rename a route (e.g., `/lahore/ac-repair` or `/services`). Deleting URLs causes 404 errors, drops search engine ranking equity, and breaks user bookmarks.

### Rule 4: No Unapproved Database Schema Alterations
Do not alter `prisma/schema.prisma` without explicit architectural review and customer sign-off. Schema changes risk database migration lockups, data loss, and API regressions.

### Rule 5: Prefer Incremental Evolution Over Big-Bang Refactoring
Ship changes in small, isolated, independently testable increments. Avoid mega-PRs that touch 40 files simultaneously across frontend, backend, and database layers.

### Rule 6: Reuse Existing Modules & Infrastructure
Always inspect `server/modules/`, `server/shared/`, and `lib/` before writing new code. Reuse existing auth middleware, error handlers (`withErrorHandler`), validation schemas, and rate limiters.

### Rule 7: Avoid Unnecessary External Dependencies
Do not add heavy NPM packages for tasks solvable with native Web APIs, standard Next.js features, or zero-dependency standard utilities. Every added dependency increases attack surface and maintenance burden.

### Rule 8: Keep All Changes Isolated and Reversible
Every commit must be cleanly reversible (`git revert`). Feature flags and environment gates should be utilized for non-trivial features.

### Rule 9: Explain Before Changing
Before initiating any non-trivial implementation task, state clearly:
- Exactly which files will be modified.
- Why the change is necessary.
- What testing or validation will verify backwards compatibility.

### Rule 10: Never Silently Replace Business Logic
Never alter financial calculations, commission logic, dispatch matching algorithms, or notification dispatching without explicit documentation and audit trails.

---

## 3. Pull Request & Deployment Gate Checklist

Before merging any code to `main`:
- [ ] `npx tsc --noEmit` runs with 0 errors.
- [ ] `npm run build` succeeds cleanly.
- [ ] `npm run lint` passes without warnings.
- [ ] No regression in Core Web Vitals (LCP, CLS, INP).
- [ ] Canonical URLs remain identical and valid.
- [ ] WhatsApp CTAs preserve functional link encoding.
