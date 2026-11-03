/**
 * Todas as mídias do site, em um só lugar.
 *
 * COMO PREENCHER: coloque o arquivo em /public/media e informe o caminho em `src`
 * (ex.: src: "/media/sala-cinema.jpg"). Enquanto `src` estiver vazio, a página mostra
 * um espaço marcado com o `slug`, o tipo e as proporções ideais.
 * Imagens passam por next/image (AVIF/WebP automático). Vídeos aceitam `poster`.
 */
export type MediaKind = "image" | "video";

export type MediaAsset = {
  /** Identificador exibido no espaço reservado. */
  slug: string;
  kind: MediaKind;
  /** Razão largura/altura usada para reservar espaço e evitar salto de layout. */
  ratio: `${number}/${number}`;
  /** O que a mídia deve mostrar. Aparece no espaço reservado. */
  brief: string;
  /** Texto alternativo útil (imagens) ou descrição (vídeos). */
  alt: string;
  src?: string;
  poster?: string;
  /** Largura e altura intrínsecas do arquivo final, quando conhecidas. */
  width?: number;
  height?: number;
};

const media = <K extends string>(items: Record<K, MediaAsset>) => items;

export const MEDIA = media({
  brandReel: {
    slug: "VIDEO-APRESENTACAO-FUTURA-TEC",
    kind: "video",
    ratio: "16/9",
    brief:
      "Vídeo curto (30 a 60 s) de projetos reais: sala de cinema, automação em uso, rack e instalação. Sem áudio obrigatório, em loop.",
    alt: "Apresentação em vídeo de projetos da Futura Tec em residências e ambientes comerciais.",
  },
  solutionAutomation: {
    slug: "IMG-SOLUCAO-AUTOMACAO",
    kind: "image",
    ratio: "4/3",
    brief:
      "Smartphone ou painel de parede controlando cenas em uma sala real, com iluminação acesa.",
    alt: "Painel de automação em uma sala residencial controlando a iluminação do ambiente.",
    src: "/media/solucao-automacao.png",
  },
  solutionAudioVideo: {
    slug: "IMG-SOLUCAO-AUDIO-VIDEO-CINEMA",
    kind: "image",
    ratio: "4/3",
    brief: "Sala de cinema residencial pronta, tela ou projetor e caixas acústicas visíveis.",
    alt: "Sala de cinema residencial com tela, caixas acústicas e iluminação baixa.",
    src: "/media/solucao-audio-video-cinema.png",
  },
  solutionNetworks: {
    slug: "IMG-SOLUCAO-REDES",
    kind: "image",
    ratio: "4/3",
    brief: "Access point instalado em teto ou parede, ou rack de rede organizado.",
    alt: "Access point Wi-Fi profissional instalado no teto de um ambiente.",
    src: "/media/solucao-redes.png",
  },
  solutionSecurity: {
    slug: "IMG-SOLUCAO-SEGURANCA",
    kind: "image",
    ratio: "4/3",
    brief: "Câmera IP instalada na fachada ou NVR com imagens na tela.",
    alt: "Câmera IP instalada na fachada de uma residência.",
    src: "/media/solucao-seguranca.png",
  },
  solutionInfrastructure: {
    slug: "IMG-SOLUCAO-INFRAESTRUTURA",
    kind: "image",
    ratio: "4/3",
    brief: "Cabeamento estruturado organizado em rack ou eletrodutos antes do fechamento da parede.",
    alt: "Cabeamento estruturado organizado em um rack de rede.",
    src: "/media/solucao-infraestrutura.png",
  },
  solutionConsulting: {
    slug: "IMG-SOLUCAO-CONSULTORIA",
    kind: "image",
    ratio: "4/3",
    brief: "Equipe em reunião de projeto com planta ou tablet, em obra ou escritório.",
    alt: "Equipe da Futura Tec analisando a planta de um projeto de tecnologia.",
    src: "/media/solucao-consultoria.png",
  },
  galleryCinema: {
    slug: "IMG-AMBIENTE-CINEMA",
    kind: "image",
    ratio: "3/4",
    brief: "Sala de cinema residencial, foto vertical em ambiente escuro.",
    alt: "Sala de cinema residencial com poltronas e tela em ambiente escuro.",
    src: "/media/ambiente-cinema.png",
  },
  galleryLiving: {
    slug: "IMG-AMBIENTE-SALA-ESTAR",
    kind: "image",
    ratio: "4/3",
    brief: "Sala de estar integrada com iluminação em cena e TV ou projetor.",
    alt: "Sala de estar com iluminação automatizada e televisão integrada.",
    src: "/media/solucao-sala-estar.png"
  },
  galleryOutdoor: {
    slug: "IMG-AMBIENTE-AREA-GOURMET",
    kind: "image",
    ratio: "3/4",
    brief: "Área gourmet ou varanda com som ambiente e iluminação à noite.",
    alt: "Área gourmet iluminada à noite com sonorização ambiente.",
    src: "/media/ambiente-area-gourmet.png"
  },
  galleryFacade: {
    slug: "IMG-AMBIENTE-FACHADA-CAMERAS",
    kind: "image",
    ratio: "4/3",
    brief: "Fachada residencial ou comercial com câmeras IP visíveis.",
    alt: "Fachada de um imóvel com câmeras IP instaladas.",
    src: "/media/ambiente-fachada.png"
  },
  galleryRack: {
    slug: "IMG-AMBIENTE-RACK",
    kind: "image",
    ratio: "3/4",
    brief: "Rack técnico organizado, com switches PoE, NVR e identificação de cabos.",
    alt: "Rack técnico com switches, gravador de vídeo e cabos identificados.",
    src: "/media/ambiente-rack.png"
  },
  galleryBedroom: {
    slug: "IMG-AMBIENTE-SUITE",
    kind: "image",
    ratio: "4/3",
    brief: "Suíte com cortinas motorizadas e iluminação suave.",
    alt: "Suíte com cortinas automatizadas e iluminação suave.",
    src: "/media/ambiente-suite.png",
  },
  aboutTeam: {
    slug: "IMG-SOBRE-EQUIPE-OU-OBRA",
    kind: "image",
    ratio: "4/5",
    brief: "Equipe técnica da Futura Tec trabalhando em instalação ou programação.",
    alt: "Técnico da Futura Tec configurando um sistema de automação.",
    src: "/media/sobre-equipe-ou-obra.png",
  },
  contactBranch: {
    slug: "IMG-CONTATO-UNIDADE",
    kind: "image",
    ratio: "16/9",
    brief: "Fachada ou interior da unidade de atendimento (Manaus ou Boa Vista).",
    alt: "Ambiente de atendimento da Futura Tec.",
  },
});

export type MediaKey = keyof typeof MEDIA;
