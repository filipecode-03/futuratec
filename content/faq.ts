export type FaqItem = { id: string; question: string; answer: string };

export const FAQ: readonly FaqItem[] = [
  {
    id: "casa-construida",
    question: "É possível automatizar uma casa que já está construída?",
    answer:
      "Sim. A automação pode ser implementada em imóveis em construção ou já concluídos, com tecnologias e formas de instalação adequadas às características de cada ambiente.",
  },
  {
    id: "fornece-instala",
    question: "A Futura Tec fornece e instala os equipamentos?",
    answer:
      "Sim. A empresa atua desde o planejamento e a especificação até a infraestrutura, o fornecimento, a instalação, a configuração, a programação e a integração.",
  },
  {
    id: "sem-internet",
    question: "Os equipamentos funcionam sem internet?",
    answer:
      "Várias funções continuam operando sem internet, dependendo da tecnologia. A conexão é necessária principalmente para controle remoto, serviços em nuvem e algumas funcionalidades específicas.",
  },
  {
    id: "controle-celular",
    question: "É possível controlar os equipamentos pelo celular?",
    answer:
      "Sim. Iluminação, climatização, cortinas, áudio, vídeo, câmeras e outros recursos podem ser controlados por aplicativos e integrados a interruptores, controles e assistentes de voz, conforme o projeto.",
  },
  {
    id: "wifi-cabeamento",
    question: "A empresa trabalha com redes Wi-Fi e cabeamento estruturado?",
    answer:
      "Sim. A Futura Tec projeta e implanta redes Wi-Fi, access points, cabeamento estruturado e infraestrutura de rede.",
  },
  {
    id: "som-home-theater",
    question: "É possível instalar som ambiente ou home theater?",
    answer:
      "Sim. A empresa desenvolve sonorização, áudio multiroom e cinema residencial, integrados aos demais equipamentos.",
  },
  {
    id: "cameras-cftv",
    question: "A empresa trabalha com câmeras e CFTV?",
    answer:
      "Sim. São oferecidas câmeras IP, gravadores e soluções de monitoramento remoto.",
  },
  {
    id: "um-servico",
    question: "Posso contratar apenas um serviço?",
    answer:
      "Sim. Você pode contratar uma solução específica ou um projeto completo, com vários sistemas integrados.",
  },
  {
    id: "so-residencias",
    question: "A Futura Tec atende somente residências?",
    answer:
      "Não. A empresa também desenvolve projetos para ambientes comerciais e corporativos.",
  },
  {
    id: "suporte",
    question: "A empresa oferece suporte após a instalação?",
    answer:
      "Sim. A Futura Tec oferece acompanhamento, suporte técnico e assistência para configurações e ajustes dos sistemas instalados.",
  },
] as const;
