export const SITE_NAME = "FixKar.pk";
export const SITE_URL = "https://fixkar.pk";
export const SITE_TAGLINE = "Verified Home Service Professionals in Pakistan";

export const WHATSAPP_NUMBER = "923064222367";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
