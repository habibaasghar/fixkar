export const BRAND_NAME = "FixKar.pk";
export const BRAND_TAGLINE = "Verified Home Service Professionals in Pakistan";
export const BRAND_URL = "https://fixkar.pk";
export const DEFAULT_WHATSAPP_NUMBER = "923000000000";
export const DEFAULT_OG_IMAGE = `${BRAND_URL}/og-image.jpg`;

export const VERIFICATION_TIERS = {
  tier1: {
    label: "CNIC Verified",
    description: "CNIC document, phone identity, and references background checked.",
  },
  tier2: {
    label: "Master Fixer",
    description: "Police Character Certificate + Physical home/shop audit verified.",
  },
} as const;

export const EMERGENCY_SERVICES = [
  { slug: "ac-repair", label: "Emergency AC Repair" },
  { slug: "electrician", label: "Short Circuit / Wiring Fault" },
  { slug: "plumbing", label: "Urgent Water Leakage / Pipe Burst" },
] as const;
