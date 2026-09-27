# FixKar.pk — Conversion Architecture & Funnel Systems

> **Document Type:** User Flow & Conversion Rate Optimization (CRO) Blueprint  
> **Status:** Strategic Architecture (Planning Only)  
> **Rule:** Align Call-to-Action (CTA) language and form friction directly with user intent. Never overload a page with competing CTAs.

---

## 1. The Master Customer Lifecycle & Conversion Journey

Every successful transaction on FixKar.pk follows an 11-step structured lifecycle:

```
[1. Discover Service]
User lands on category page, city hub, or direct search intent
       │
       ▼
[2. Service Selection]
User identifies specific problem (e.g. AC Gas Refill, Water Leakage)
       │
       ▼
[3. Location Gating]
Selects City & Neighborhood (Verifies operational fulfillment)
       │
       ▼
[4. Requirement Scoping]
Selects scope variables (Unit count, room area, issue severity)
       │
       ▼
[5. Primary Conversion Trigger]
Submits Lead Form ("Get a Quote" / "Book a Service") or clicks "WhatsApp Us"
       │
       ▼
[6. Platform Ingestion & Reference Generation]
FixKar creates Lead with unique tracking reference (e.g. FK-4821)
       │
       ▼
[7. Founder-Mediated Quote Relay]
FixKar (broker) contacts a vendor partner who covers that service/city,
gets their rate for this specific job, and relays a quotation to the customer
       │
       ▼
[8. Customer Confirmation & Handoff]
Customer confirms the quote. FixKar connects customer and vendor directly
(in some cases sharing the customer's number with the vendor after
confirmation) so they can finalize scheduling/terms between themselves
       │
       ▼
[9. Managed Job Execution]
Service delivered adhering to safety and quality standards
       │
       ▼
[10. Customer Sign-off & Direct Settlement]
Customer tests work, approves completion, pays directly (Cash/JazzCash/EasyPaisa)
       │
       ▼
[11. Manual Status Follow-up & Retention]
Founder follows up with customer and/or vendor for a completion update and
feedback (not yet automated — see BUSINESS_PLAN.md operating model note)
```

---

## 2. Four Dedicated Conversion Funnels by Intent Archetype

Different services require radically different intake funnels. FixKar.pk operates 4 distinct funnels:

### Funnel A: The Emergency / Rapid Repair Funnel
* **Applicable Services:** Burst pipes, power short-circuits, AC breakdown in peak summer heat.
* **Customer State:** High stress, urgent need for immediate assistance.
* **Primary CTA:** **"WhatsApp Us for Urgent Dispatch"** *(Direct click-to-chat with pre-filled message).*
* **Secondary CTA:** Fast 2-field form: Mobile Number + Area.
* **Friction Level:** Minimum (Zero unnecessary dropdowns or multi-step questions).

### Funnel B: The Standard Residential Maintenance Funnel
* **Applicable Services:** Deep cleaning, sofa & carpet shampoo, switchboard replacement, fan repair, routine plumbing.
* **Customer State:** Methodical planning, seeking transparent pricing and verified trust.
* **Primary CTA:** **"Book a Service"** or **"Get a Fixed-Rate Quote"**.
* **Form Flow:**
  - Step 1: Customer Name + Mobile Number.
  - Step 2: City & Area + Preferred Date/Time Slot.
  - Step 3: Specific Scope (e.g., 5-seater sofa vs. 7-seater; 1.5 ton AC).
* **Friction Level:** Balanced (Captures sufficient context without causing drop-off).

### Funnel C: The High-Ticket Turnkey Project Funnel
* **Applicable Services:** Full home renovation, bathroom remodel, kitchen cabinetry, false ceiling, tile flooring.
* **Customer State:** High investment, careful research, multi-week evaluation.
* **Primary CTA:** **"Request a Project Quote"** *(or "Book a Free Site Inspection")*.
* **Form Flow:** Multi-step project wizard (Property type, covered area in Marlas/Sq Ft, budget range, blueprint/photo uploads).
* **Friction Level:** High qualification (Filters out non-serious price shoppers).

### Funnel D: The Commercial B2B Funnel
* **Applicable Services:** Office maintenance, commercial cleaning, corporate facility AMCs.
* **Customer State:** Corporate procurement, NTN requirements, SLA-focused.
* **Primary CTA:** **"Request a Business Quote"**.
* **Form Flow:** Company Name, Facility Type, Covered Area, Official Email, Billing Details.
* **Friction Level:** Professional B2B RFP.

---

## 3. Strict CTA Hierarchy & Page Placement Rules

To avoid decision paralysis, each page type enforces a strict CTA budget:

| Page Type | Primary Dominant CTA | Secondary Utility CTA | Prohibited Elements |
|---|---|---|---|
| **Service Money Page** (`/[city]/[category]`) | `Book [Service] via WhatsApp` (Above fold) | `Request a Callback` (`LeadForm` below fold) | Do NOT add "Become a Partner" or "Request Business Quote" in hero. |
| **City Hub Page** (`/[city]`) | Category grid navigation (`Select a Service`) | Direct WhatsApp Assistance | No hardcoded single-service booking forms. |
| **Project Money Page** (`/projects/*`) | `Request a Project Quote` | `Book a Site Inspection` | No 15-minute emergency booking claims. |
| **B2B Commercial Page** (`/business-services/*`) | `Request a Business Quote` | `Schedule a Facility Audit` | No retail handyman booking language. |
| **Partner Acquisition** (`/partner`) | `Apply as a FixKar Partner` | `Chat with Onboarding Team` | No customer booking inputs. |

---

## 4. Anti-Friction Conversion Guarantees

1. **Zero Upfront Payment Barrier:** Reiterate clearly near every booking button: *"Pay directly to the technician only after the job is completed to your satisfaction."*
2. **Transparent Diagnostic Disclosure:** When exact pricing cannot be determined before inspection (e.g., hidden electrical wiring fault), state the fixed inspection/visit fee upfront (e.g., *"Rs. 500 inspection fee, waived if you proceed with the repair"*).
3. **Instant Mobile Feedback:** All form submissions must immediately return a human-friendly Reference Code (`FK-XXXX`) and clear expectations on next steps.
