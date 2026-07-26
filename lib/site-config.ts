export const SITE_NAME = "FixKar.pk";
export const SITE_URL = "https://fixkar.pk";
export const SITE_TAGLINE = "Verified Home Service Professionals in Pakistan";

// TODO: replace with the real WhatsApp Business number once set up
// (see BUSINESS_PLAN.md — dedicated WhatsApp Business account under the brand name).
export const WHATSAPP_NUMBER = "923000000000";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
