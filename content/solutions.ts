import {
  Cable,
  Cctv,
  Clapperboard,
  DraftingCompass,
  House,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import type { MediaKey } from "./media";

export type Solution = {
  id: string;
  name: string;
  /** Nome curto para a lista lateral. */
  shortName: string;
  icon: LucideIcon;
  lead: string;
  facts: readonly string[];
  media: MediaKey;
};

export const SOLUTIONS: readonly Solution[] = [
  {
    id: "automacao-inteligente",
    name: "Automação inteligente",
    shortName: "Automação",
    icon: House,
    lead: "Iluminação, clima, cortinas, áudio e vídeo reunidos em uma única interface, no celular, no painel ou na voz.",
    facts: [
      "Controle por smartphone ou tablet, inclusive fora de casa quando há internet",
      "Cenas para assistir a filmes, receber convidados, descansar ou sair de casa",
      "Iluminação, climatização, cortinas e persianas, áudio e vídeo integrados",
      "Horários programados e acionamento remoto da iluminação",
      "Aplicativos, painéis, controles inteligentes e comandos de voz",
      "Soluções profissionais, como a Control4",
    ],
    media: "solutionAutomation",
  },
  {
    id: "audio-video-cinema",
    name: "Áudio, vídeo e cinema",
    shortName: "Áudio e cinema",
    icon: Clapperboard,
    lead: "Da sala de cinema ao som que acompanha a casa, com cada equipamento integrado ao resto do projeto.",
    facts: [
      "Projetos de salas de cinema residencial e home theater",
      "Sistemas de áudio e vídeo de alta qualidade",
      "Tecnologias imersivas, como o Dolby Atmos",
      "Integração de televisores, receivers, caixas acústicas, projetores e streaming",
      "Áudio multiroom, independente em cada ambiente ou integrado entre eles",
    ],
    media: "solutionAudioVideo",
  },
  {
    id: "redes-conectividade",
    name: "Redes e conectividade",
    shortName: "Redes",
    icon: Wifi,
    lead: "Wi-Fi e rede cabeada dimensionados para o imóvel, com equipamentos profissionais.",
    facts: [
      "Planejamento e implantação de redes",
      "Cobertura, estabilidade, velocidade e desempenho em cada ambiente",
      "Access points e infraestrutura adequados às necessidades do imóvel",
      "Equipamentos profissionais",
    ],
    media: "solutionNetworks",
  },
  {
    id: "seguranca-eletronica",
    name: "Segurança eletrônica",
    shortName: "Segurança",
    icon: Cctv,
    lead: "Câmeras, gravação e monitoramento para residências e estabelecimentos comerciais.",
    facts: [
      "Câmeras IP",
      "Gravação e monitoramento com NVRs e switches PoE",
      "Acesso e visualização remotos",
      "Proteção de residências e de estabelecimentos comerciais",
    ],
    media: "solutionSecurity",
  },
  {
    id: "infraestrutura-cabeamento",
    name: "Infraestrutura e cabeamento",
    shortName: "Infraestrutura",
    icon: Cable,
    lead: "A base de todos os outros sistemas: cabos e tubulações pensados para o que o imóvel precisa hoje e para o que vier depois.",
    facts: [
      "Planejamento e execução de infraestrutura",
      "Distribuição organizada e dimensionada de cabos de rede",
      "Cabeamento e tubulações para automação, áudio, vídeo, redes e segurança",
      "Preparação para necessidades atuais e futuras do imóvel",
    ],
    media: "solutionInfrastructure",
  },
  {
    id: "consultoria-projetos-integrados",
    name: "Consultoria e projetos integrados",
    shortName: "Consultoria",
    icon: DraftingCompass,
    lead: "Para quem constrói ou reforma: o planejamento tecnológico do imóvel, da infraestrutura à programação.",
    facts: [
      "Planejamento tecnológico de residências e ambientes comerciais",
      "Apoio da infraestrutura à instalação, configuração, programação e integração",
      "Projetos personalizados para cada ambiente",
      "Integração entre diferentes sistemas",
      "Para clientes, arquitetos, engenheiros e construtores",
    ],
    media: "solutionConsulting",
  },
] as const;
