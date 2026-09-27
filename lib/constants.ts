export const BRAND_NAME = "FixKar.pk";
export const BRAND_TAGLINE = "Home Service Partners in Pakistan";
export const BRAND_URL = "https://fixkar.pk";
export const DEFAULT_WHATSAPP_NUMBER = "923064222367";
export const DEFAULT_OG_IMAGE = `${BRAND_URL}/og-image.jpg`;

export const VERIFICATION_TIERS = {
  tier1: {
    label: "Vetted Partner",
    description: "Personally introduced to our team and checked before we connect you with a job.",
  },
} as const;

export const EMERGENCY_SERVICES = [
  { slug: "ac-repair", label: "Emergency AC Repair" },
  { slug: "electrician", label: "Short Circuit / Wiring Fault" },
  { slug: "plumbing", label: "Urgent Water Leakage / Pipe Burst" },
] as const;
