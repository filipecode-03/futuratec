import type { MediaKey } from "./media";

export type ProcessStep = { title: string; text: string };

/** Sequência de um projeto, montada a partir do que a empresa faz (planejamento a suporte). */
export const PROCESS: readonly ProcessStep[] = [
  {
    title: "Planejamento e especificação",
    text: "Os sistemas são pensados e especificados ambiente por ambiente, antes de qualquer cabo ser puxado.",
  },
  {
    title: "Infraestrutura",
    text: "Cabeamento, tubulações e rede dimensionados para o que o imóvel precisa hoje e para o que vier depois, em obra ou em imóvel pronto.",
  },
  {
    title: "Fornecimento e instalação",
    text: "A Futura Tec fornece e instala os equipamentos, ou apenas a solução que você contratou.",
  },
  {
    title: "Configuração e programação",
    text: "Dispositivos configurados e programados: cenas, horários, controles e acessos.",
  },
  {
    title: "Integração",
    text: "Iluminação, áudio, vídeo, redes e segurança passam a funcionar em conjunto, em uma experiência simples de usar.",
  },
  {
    title: "Acompanhamento e suporte",
    text: "Suporte técnico e assistência para configurações e ajustes depois da instalação.",
  },
];

export type Audience = {
  id: string;
  name: string;
  text: string;
  /** Texto usado na mensagem de WhatsApp. */
  context: string;
};

export const AUDIENCES: readonly Audience[] = [
  {
    id: "casas-apartamentos",
    name: "Casas e apartamentos",
    text: "Automação, cinema, Wi-Fi e câmeras planejados para o seu jeito de morar, em imóvel novo ou já construído.",
    context: "automação para minha casa ou apartamento",
  },
  {
    id: "arquitetos-construtoras",
    name: "Arquitetos, engenheiros e construtoras",
    text: "Planejamento tecnológico desde a infraestrutura, com projeto personalizado e integração entre os sistemas.",
    context: "projeto de arquitetura, engenharia ou construção",
  },
  {
    id: "condominios-empresas",
    name: "Condomínios, empresas e comércio",
    text: "Projetos para ambientes comerciais e corporativos: redes, câmeras, áudio e vídeo integrados.",
    context: "projeto para condomínio, empresa ou estabelecimento comercial",
  },
];

export type GalleryItem = {
  media: MediaKey;
  title: string;
  systems: string;
};

/** Ambientes que a empresa projeta. As mídias reais entram em content/media.ts. */
export const GALLERY: readonly GalleryItem[] = [
  { media: "galleryCinema", title: "Sala de cinema", systems: "Áudio, vídeo e iluminação em cena" },
  { media: "galleryLiving", title: "Sala de estar", systems: "Automação, som ambiente e TV integrada" },
  { media: "galleryOutdoor", title: "Área gourmet", systems: "Sonorização e iluminação externa" },
  { media: "galleryFacade", title: "Fachada", systems: "Câmeras IP e monitoramento remoto" },
  { media: "galleryRack", title: "Rack técnico", systems: "Rede, switches PoE e gravação" },
  { media: "galleryBedroom", title: "Suíte", systems: "Cortinas e iluminação programadas" },
];
