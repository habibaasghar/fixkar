# FixKar.pk — Trust, Verification & Provider Integrity System

> **Document Type:** Safety, Verification & Platform Integrity Standard  
> **Status:** Canonical Policy (Mandatory Operational Standard)  
> **The Zero-Tolerance Truth Invariant:** Never display a verification badge, guarantee, warranty, certification, star rating, testimonial, or time promise on the frontend unless the backend database has an auditable, verified record backing it.

---

## 1. The Trust Deficit in Pakistani Home Services

In Pakistan, the primary psychological barrier preventing homeowners from hiring technicians online is **safety, integrity, and pricing transparency**:
- *Security:* Allowing unknown male tradesmen into family homes.
- *Competence:* Fear of amateur technicians damaging expensive inverter ACs, Italian sanitary ware, or electrical boards.
- *Bypass & Overcharging:* Fear of hidden costs, arbitrary price escalation midway through work, or post-job contractor disappearance.

FixKar.pk differentiates itself through **systematic, auditable verification and accountability mechanisms**.

---

## 2. Multi-Tier Provider Verification Architecture

FixKar.pk establishes a 2-tier provider verification framework integrated directly into the `VendorProfile` and `VendorVerification` database entities:

```
[ Prospective Partner Applies ]
Submits CNIC, Phone, Trade History, Sample Photos
               │
               ▼
┌────────────────────────────────────────────────────────┐
│ TIER 1: VERIFIED FIXER (Basic Operational Clearance)   │
│ - 13-Digit Computerized National Identity Card (CNIC)  │
│ - Color scan of CNIC Front & Back validated            │
│ - Active Pakistani SIM registered in applicant's name  │
│ - 2 Local professional trade references checked        │
│ - In-person or video trade screening interview         │
└────────────────────────────────────────────────────────┘
               │
               ▼ (Requires 50+ completed bookings & 4.7+ rating)
┌────────────────────────────────────────────────────────┐
│ TIER 2: MASTER FIXER (High-Trust Elite Clearance)      │
│ - Character Certificate issued by local Police Station │
│ - Physical home/workshop address audit verified        │
│ - Comprehensive trade certification / master diploma   │
│ - Uniformed & branded FixKar identification badge      │
│ - Priority dispatch on high-ticket residential/B2B jobs│
└────────────────────────────────────────────────────────┘
```

---

## 3. Strict Rules Against Fabricated Social Proof

To build long-term brand equity, FixKar.pk enforces absolute authenticity:

### Rule 3.1 — Zero Fake Reviews or Star Ratings
- **Forbidden:** Seeding fake 5-star ratings or hardcoding *"Usman K. - Highly recommended!"* testimonials in static React components.
- **Enforcement:** Every displayed review must originate from a verified completed `Booking` record linked to an authentic `Review` database row. If a category has 0 reviews, the frontend displays: *"New Category — Backed by FixKar Quality Assurance"*, rather than fabricated star ratings.

### Rule 3.2 — Authentic Before & After Case Studies
- Photographs of completed work (sofa steam extraction, ceiling installation, house painting) must be captured on real partner job sites in Pakistan.
- Uploaded via the `PortfolioItem` model and approved by FixKar operations.

### Rule 3.3 — Transparent Warranty & Guarantee Claims
- **Forbidden:** Stating "100% Free 30-Day Money-Back Warranty" when no formal warranty reserve fund exists.
- **Permitted Claims:** Clearly defined, operationally supported policies:
  - *"Re-work Guarantee: If the repaired issue recurs within 7 days, our technician visits for a re-inspection at zero additional service charge."*

### Rule 3.4 — Truthful Response Time Messaging
- Replace rigid claims like *"Technician at your door in 15 minutes"* with honest, operational promises:
  - *"Same-Day Service Available in Active Areas. Callback within 30 minutes to confirm technician arrival slot."*

---

## 4. Complaint Resolution & Customer Protection Framework

When a job does not meet customer expectations:

1. **Immediate Job Dispute Flagging:**
   - Customer or support agent flags booking via `/api/v1/bookings/[id]/dispute`.
   - Freezes vendor pending wallet payout for that transaction.
2. **Operations Triage:**
   - FixKar support reviews job logs, photos of the work, and customer statement.
3. **Rectification Protocol:**
   - Step 1: Same vendor dispatched for immediate correction at zero charge.
   - Step 2: If vendor is negligent or uncooperative, a Tier-2 Master Fixer is dispatched at FixKar's expense.
   - Step 3: Chronic vendor infractions trigger immediate suspension (`status: SUSPENDED`) and removal from the dispatch queue.
