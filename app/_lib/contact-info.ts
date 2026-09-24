// Single source for the studio's contact details (contact section, form and footer).

/** WhatsApp number with country code, digits only (México, +52). */
export const WHATSAPP_NUMBER = "525574812146";
export const PHONE_DISPLAY = "55 7481 2146";

// TODO: replace with the studio's real email.
export const EMAIL = "hola@atelierzenith.com";

// TODO: replace with the studio's real profiles.
export const INSTAGRAM = { handle: "@atelierzenith", href: "https://www.instagram.com/atelierzenith" };
export const LINKEDIN_URL = "https://www.linkedin.com/";
export const BEHANCE_URL = "https://www.behance.net/";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
