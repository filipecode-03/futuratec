/**
 * Cenas da demonstração do hero. Os valores são ILUSTRATIVOS: mostram como uma
 * cena pode coordenar vários sistemas. Cada projeto define as suas.
 */
export type SceneLevels = {
  /** Intensidade da luz em cada ambiente, de 0 (apagada) a 1 (acesa). */
  lightCinema: number;
  lightLiving: number;
  lightSuite: number;
  lightTerrace: number;
  /** 0 = abertas, 1 = fechadas. */
  curtains: number;
  /** Projeção na sala de cinema. */
  screen: number;
  /** Áudio nos ambientes (cinema e área social). */
  soundCinema: number;
  soundLiving: number;
  /** Indicador de câmeras ativas na entrada. */
  cameras: number;
};

export type SceneReadoutKey = "light" | "curtains" | "audio" | "video" | "climate";

export type Scene = {
  id: "cinema" | "receber" | "descansar" | "sair";
  label: string;
  summary: string;
  levels: SceneLevels;
  readout: Record<SceneReadoutKey, string>;
};

export const READOUT_LABELS: Record<SceneReadoutKey, string> = {
  light: "Iluminação",
  curtains: "Cortinas",
  audio: "Áudio",
  video: "Vídeo",
  climate: "Climatização",
};

export const SCENES: readonly Scene[] = [
  {
    id: "cinema",
    label: "Cinema",
    summary: "Luz em penumbra, cortinas fechadas, projeção e som imersivo.",
    levels: {
      lightCinema: 0.16,
      lightLiving: 0.1,
      lightSuite: 0,
      lightTerrace: 0.08,
      curtains: 1,
      screen: 1,
      soundCinema: 1,
      soundLiving: 0,
      cameras: 0,
    },
    readout: {
      light: "Penumbra no cinema",
      curtains: "Fechadas",
      audio: "Som imersivo",
      video: "Projeção ligada",
      climate: "Ajustada à sessão",
    },
  },
  {
    id: "receber",
    label: "Receber",
    summary: "Área social acesa, cortinas abertas e música ambiente.",
    levels: {
      lightCinema: 0,
      lightLiving: 1,
      lightSuite: 0,
      lightTerrace: 0.9,
      curtains: 0,
      screen: 0,
      soundCinema: 0,
      soundLiving: 1,
      cameras: 0,
    },
    readout: {
      light: "Sala e varanda acesas",
      curtains: "Abertas",
      audio: "Música ambiente",
      video: "Desligado",
      climate: "Área social",
    },
  },
  {
    id: "descansar",
    label: "Descansar",
    summary: "Luz baixa na suíte, cortinas fechadas, resto da casa em silêncio.",
    levels: {
      lightCinema: 0,
      lightLiving: 0,
      lightSuite: 0.42,
      lightTerrace: 0,
      curtains: 1,
      screen: 0,
      soundCinema: 0,
      soundLiving: 0,
      cameras: 0,
    },
    readout: {
      light: "Suíte em luz baixa",
      curtains: "Fechadas",
      audio: "Silêncio",
      video: "Desligado",
      climate: "Suíte",
    },
  },
  {
    id: "sair",
    label: "Sair de casa",
    summary: "Tudo desligado com um toque e as câmeras à vista no celular.",
    levels: {
      lightCinema: 0,
      lightLiving: 0,
      lightSuite: 0,
      lightTerrace: 0,
      curtains: 1,
      screen: 0,
      soundCinema: 0,
      soundLiving: 0,
      cameras: 1,
    },
    readout: {
      light: "Tudo apagado",
      curtains: "Fechadas",
      audio: "Desligado",
      video: "Desligado",
      climate: "Desligada",
    },
  },
] as const;

export const SCENES_DISCLAIMER =
  "Exemplo ilustrativo. Cada projeto define as próprias cenas.";
