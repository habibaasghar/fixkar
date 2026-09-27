# FixKar.pk — Provider & Vendor Platform Blueprint

> **Document Type:** Partner Architecture & Marketplace Operations Plan  
> **Status:** Strategic Blueprint (Planning & Schema Alignment)  
> **Objective:** Transition FixKar.pk from an ad-hoc phone directory into a managed supply-side operations engine capable of onboarding, verifying, matching, and settling thousands of tradesmen across Pakistan.

---

## 1. Provider Domain Model & Entity Attributes

The core provider entity (`VendorProfile` in `prisma/schema.prisma`) represents an individual tradesman, contractor, or commercial service agency.

### Master Attribute Specification

| Attribute Group | Database Fields | Description |
|---|---|---|
| **Identity & Contact** | `fullName`, `businessName`, `slug`, `phone`, `user.email` | Official CNIC name, brand display name, unique URL slug, authenticated phone identity. |
| **Regional Coverage** | `cityId` (`City`), `areas` (`Area[]`) | Home base city and explicit array of serviceable neighborhoods (e.g. DHA, Gulberg, Johar Town). |
| **Catalog Assignment** | `categories` (`ServiceCategory[]`), `skills` (`String[]`) | Approved trades (e.g., AC Repair, Plumbing) and specific granular skill tags (e.g., Inverter PCB, PPRC Welding). |
| **Experience & Credentials** | `experienceYears`, `bio`, `tagline`, `languagesSpoken` | Professional background, years in trade, Urdu/English/Punjabi/Pashto fluency. |
| **Verification & Documents** | `verificationTier`, `verification` (`VendorVerification`), `documents` | Tier 1 (CNIC) or Tier 2 (Police Character Certificate), photo uploads of government IDs. |
| **Operational Availability**| `isOnDuty`, `availability` (`VendorAvailability`) | Real-time duty toggle, working hours (`09:00 - 18:00`), working days (0–6), emergency status, vacation mode. |
| **Financial Ledger** | `wallet` (`Wallet`), `settlements` (`Settlement[]`) | Available balance, pending earnings, double-entry `LedgerEntry` trail, bank settlement history. |
| **Performance Metrics** | `averageRating`, `totalReviews`, `commissionRules` | Dynamically calculated average rating, completed job count, dispute logs, category commission rates. |

---

## 2. Provider Lifecycle States & Transitions

Every provider moves through 6 strictly monitored lifecycle stages:

```
┌─────────────────────────────────┐
│          1. APPLICATION         │ Partner submits registration form + CNIC photos
└─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│     2. PENDING VERIFICATION     │ Operations checks CNIC validity & calls trade references
└─────────────────────────────────┘
                 │
                 ▼ (Approved)
┌─────────────────────────────────┐
│           3. VERIFIED           │ Orientation completed; credentials verified
└─────────────────────────────────┘
                 │
                 ▼ (Goes On-Duty)
┌─────────────────────────────────┐
│            4. ACTIVE            │ Eligible for lead dispatch & customer matching
└─────────────────────────────────┘
           │             │
           │ (Infraction)│ (Voluntary Pause)
           ▼             ▼
┌──────────────────┐ ┌──────────────────┐
│   5. SUSPENDED   │ │   6. INACTIVE    │
│ Quality/Bypass   │ │ Vacation / Off   │
└──────────────────┘ └──────────────────┘
```

### State Definitions
1. **`APPLICATION`:** Initial lead record created via `/partner/register`. Files uploaded to private bucket; no dispatch eligibility.
2. **`PENDING_VERIFICATION`:** Document review in progress. Trade reference checks active.
3. **`VERIFIED`:** Background checks passed. Agreement signed. Ready for scheduling.
4. **`ACTIVE`:** Verified, `isOnDuty = true`, vacation mode off, zero unresolved disputes. Actively receives dispatch requests.
5. **`SUSPENDED`:** Terminated or frozen due to customer safety complaints, chronic no-shows, or repeated off-platform fee evasion.
6. **`INACTIVE`:** Partner paused operations voluntarily, moved cities, or is on vacation.

---

## 3. Multi-Factor Intelligent Matching Engine

When a customer submits a `Lead` (e.g. AC Repair in DHA Lahore), `DispatchService` ranks candidate providers using a 7-factor weighted scoring algorithm:

$$\text{MatchScore} = S_{\text{loc}} + S_{\text{cat}} + S_{\text{duty}} + S_{\text{tier}} + S_{\text{perf}} - S_{\text{load}}$$

### Matching Factors
1. **Geographic Proximity ($S_{\text{loc}}$):** Provider's designated `areas` must include the customer's neighborhood.
2. **Trade & Skill Capability ($S_{\text{cat}}$):** Must have active approved relationship with the target `ServiceCategory`.
3. **Availability & Duty State ($S_{\text{duty}}$):** Must have `isOnDuty == true`, `isVacationMode == false`, and current time within `workingHours`.
4. **Verification Tier ($S_{\text{tier}}$):** Tier-2 Master Fixers receive priority weighting for high-value jobs.
5. **Historical Performance ($S_{\text{perf}}$):** Providers with $\ge 4.8$ rating and high on-time completion rates score highest.
6. **Current Active Job Load ($S_{\text{load}}$):** Deducts points if provider currently has 2+ in-progress jobs to avoid delay.
7. **Commission Account Standing:** Provider's wallet must not have overdue platform commissions exceeding policy limits.

---

## 4. Financial Architecture & Commission Discipline

FixKar.pk employs a **double-entry, audit-proof financial ledger** (`prisma/schema.prisma`):

* **Transaction Fee Model:** Client pays vendor directly post-service in cash or mobile money. Platform collects a flat fee (minimum PKR 500) per completed booking.
* **Wallet Structures (`Wallet`):**
  - `availableBalance`: Spendable credit for lead fees.
  - `pendingBalance`: Unsettled earnings from digital/corporate bookings.
  - `settlementBalance`: Funds locked in an active payout batch.
* **Anti-Bypass Strategy:**
  - Written Vendor Agreement signed prior to dispatch.
  - Post-job automated customer QA call: validates job completion, actual price charged, and service quality.
  - High compliance incentive: High-performing verified vendors receive 5x higher lead allocation and access to lucrative commercial B2B contracts.
