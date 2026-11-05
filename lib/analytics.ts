/** IDs vêm do ambiente; sem eles nenhum script de rastreamento é carregado. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || undefined;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || undefined;

export const ANALYTICS_ENABLED = Boolean(GA_ID || META_PIXEL_ID);

export const CONSENT_KEY = "futuratec:consent";
export type Consent = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Registra o clique de conversão (pedido de orçamento no WhatsApp) nas duas plataformas. */
export function trackWhatsAppClick(label: string): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "generate_lead", { method: "whatsapp", link_text: label });
  window.fbq?.("track", "Contact", { content_name: label });
}

/** Identifica links que abrem o WhatsApp (botões de orçamento e canal de contato). */
export function isWhatsAppLink(href: string | null | undefined): boolean {
  if (!href) return false;
  try {
    return new URL(href).hostname === "wa.me";
  } catch {
    return false;
  }
}
