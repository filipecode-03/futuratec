import type { MediaKey } from "./media";

export type TimelineEntry = { when: string; text: string };

/** História editada a partir do texto institucional. Todos os fatos foram preservados. */
export const HISTORY: readonly TimelineEntry[] = [
  {
    when: "Início dos anos 2000",
    text: "Nasce a Futura Tec, com o propósito de oferecer soluções tecnológicas e inovadoras para residências e ambientes comerciais.",
  },
  {
    when: "2010",
    text: "A empresa passa a atuar em automação residencial, acompanhando a evolução da tecnologia e consolidando experiência em projetos inteligentes e integrados.",
  },
  {
    when: "Ao longo da trajetória",
    text: "A atuação se amplia para sonorização, home theaters, redes Wi-Fi e CFTV.",
  },
  {
    when: "Hoje",
    text: "A Futura Tec planeja, desenvolve e executa soluções completas, integrando tecnologia, funcionalidade e sofisticação.",
  },
];

export const ABOUT = {
  statement:
    "Ambientes mais inteligentes, conectados, seguros e confortáveis.",
  definition:
    "A Futura Tec é especializada em soluções tecnológicas integradas para residências e ambientes comerciais. Os projetos conectam automação residencial, sonorização, home theater, redes Wi-Fi e CFTV, do planejamento da infraestrutura à instalação, configuração, programação e integração dos equipamentos.",
  goal: "O objetivo é transformar ambientes convencionais em espaços inteligentes, conectados e seguros, com conforto, praticidade e controle por meio da tecnologia.",
  media: "aboutTeam" satisfies MediaKey,
} as const;

export type Differential = { title: string; text: string };

export const DIFFERENTIALS: readonly Differential[] = [
  {
    title: "Experiência desde os anos 2000",
    text: "Atuação desde o início dos anos 2000 e especialização em automação residencial desde 2010.",
  },
  {
    title: "Solução completa",
    text: "Da infraestrutura de rede e cabeamento à automação, ao áudio, ao vídeo e à segurança.",
  },
  {
    title: "Sistemas que se entendem",
    text: "Equipamentos e sistemas diferentes integrados em experiências intuitivas e funcionais.",
  },
  {
    title: "Projeto sob medida",
    text: "Soluções personalizadas para cada ambiente e cada necessidade.",
  },
  {
    title: "Conhecimento técnico",
    text: "Planejamento, infraestrutura, cabeamento, instalação, configuração e programação.",
  },
  {
    title: "Fabricantes reconhecidos",
    text: "Trabalho com soluções e fabricantes reconhecidos.",
  },
  {
    title: "Compromisso com o resultado",
    text: "Qualidade, confiabilidade, desempenho e evolução tecnológica.",
  },
];

export const IDENTITY = {
  mission:
    "Transformar ambientes por meio da tecnologia, oferecendo soluções integradas que proporcionem conforto, segurança, conectividade, praticidade e sofisticação.",
  vision:
    "Ser reconhecida como referência em soluções tecnológicas integradas, destacando-se pela excelência técnica, inovação e qualidade dos projetos.",
  purpose:
    "Conectar pessoas, ambientes e tecnologia, criando experiências mais inteligentes, seguras e confortáveis.",
  values: [
    "Excelência e qualidade",
    "Compromisso com o cliente",
    "Inovação e evolução constante",
    "Transparência e responsabilidade",
    "Conhecimento técnico",
    "Integração e funcionalidade",
    "Respeito e comprometimento",
  ],
} as const;
