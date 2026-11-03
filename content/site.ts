import { WHATSAPP_PHONE_DISPLAY, buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * URL pública do site. Defina NEXT_PUBLIC_SITE_URL (ex.: https://exemplo.com.br)
 * quando o domínio existir. Sem ela, canonical, sitemap e dados estruturados
 * omitem a URL absoluta em vez de inventar um domínio.
 */
export const SITE_URL: string | undefined = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;
  try {
    return new URL(raw).origin;
  } catch {
    return undefined;
  }
})();

export const BRAND = {
  name: "Futura Tec",
  legalHint: "Futura Tecnologia",
  tagline: "Tecnologia e automação residencial",
  locale: "pt-BR",
} as const;

export const CONTACT = {
  whatsappDisplay: WHATSAPP_PHONE_DISPLAY,
  whatsappUrl: buildWhatsAppUrl(),
  email: "futura@futura.ws",
  emailUrl: "mailto:futura@futura.ws",
  instagramHandle: "@futura.ws",
  instagramUrl: "https://www.instagram.com/futura.ws/",
  schedule: "Atendimento com hora marcada",
} as const;

export type Branch = {
  id: "boa-vista" | "manaus";
  city: string;
  state: "RR" | "AM";
  street: string;
  neighborhood: string;
};

export const BRANCHES: readonly Branch[] = [
  {
    id: "boa-vista",
    city: "Boa Vista",
    state: "RR",
    street: "Av. Ville Roy, 3279",
    neighborhood: "Caçari",
  },
  {
    id: "manaus",
    city: "Manaus",
    state: "AM",
    street: "Rua Nova Prata, 79",
    neighborhood: "Nossa Senhora das Graças",
  },
] as const;

export function branchAddress(branch: Branch): string {
  return `${branch.street}, ${branch.neighborhood}, ${branch.city} - ${branch.state}`;
}

export function branchMapsUrl(branch: Branch): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    branchAddress(branch),
  )}`;
}

export type NavItem = { href: `#${string}`; label: string };

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "#inicio", label: "Início" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
] as const;

export const CTA_LABEL = "Solicitar orçamento";

export const SEO = {
  title: "Futura Tec | Automação residencial em Manaus e Boa Vista",
  description:
    "Automação residencial, home theater, redes Wi-Fi e CFTV em Manaus e Boa Vista. A Futura Tec planeja, instala, programa e integra a casa inteligente.",
  keywords: [
    "automação residencial em Boa Vista",
    "automação residencial em Manaus",
    "casa inteligente",
    "home theater",
    "redes Wi-Fi",
    "CFTV",
    "Control4",
  ],
} as const;
