import { BRANCHES, BRAND, CONTACT, SEO, SITE_URL } from "@/content/site";
import { FAQ } from "@/content/faq";
import { SOLUTIONS } from "@/content/solutions";
import { WHATSAPP_PHONE_E164 } from "@/lib/whatsapp";

const COUNTRY = "BR";

/**
 * Dados estruturados da empresa. Só entram dados reais do briefing:
 * sem coordenadas, CEP, CNPJ, avaliações ou horários inventados.
 */
export function buildStructuredData() {
  const organizationId = SITE_URL ? `${SITE_URL}/#organizacao` : "#organizacao";

  const branches = BRANCHES.map((branch) => ({
    "@type": "LocalBusiness",
    "@id": `${organizationId}-${branch.id}`,
    name: `${BRAND.name} ${branch.city}`,
    parentOrganization: { "@id": organizationId },
    telephone: `+${WHATSAPP_PHONE_E164}`,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${branch.street}, ${branch.neighborhood}`,
      addressLocality: branch.city,
      addressRegion: branch.state,
      addressCountry: COUNTRY,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: BRAND.name,
        alternateName: BRAND.legalHint,
        ...(SITE_URL ? { url: SITE_URL } : {}),
        description: SEO.description,
        email: CONTACT.email,
        telephone: `+${WHATSAPP_PHONE_E164}`,
        sameAs: [CONTACT.instagramUrl],
        areaServed: BRANCHES.map((branch) => ({
          "@type": "City",
          name: `${branch.city}, ${branch.state}`,
        })),
        knowsAbout: [
          "Automação residencial",
          "Casa inteligente",
          "Home theater",
          "Redes Wi-Fi",
          "CFTV",
          "Cabeamento estruturado",
        ],
        makesOffer: SOLUTIONS.map((solution) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: solution.name },
        })),
      },
      ...branches,
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

/** Serializa para <script type="application/ld+json"> escapando "<". */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
