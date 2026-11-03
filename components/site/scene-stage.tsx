"use client";

import { animate } from "animejs";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  READOUT_LABELS,
  SCENES,
  SCENES_DISCLAIMER,
  type SceneLevels,
  type SceneReadoutKey,
} from "@/content/scenes";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const SCENE_DURATION_MS = 6500;

/** Nome da variável CSS que carrega cada nível da cena. */
const VAR_NAMES = {
  lightCinema: "--l-cinema",
  lightLiving: "--l-living",
  lightSuite: "--l-suite",
  lightTerrace: "--l-terrace",
  curtains: "--curtains",
  screen: "--screen",
  soundCinema: "--s-cinema",
  soundLiving: "--s-living",
  cameras: "--cam",
} as const satisfies Record<keyof SceneLevels, string>;

const LEVEL_KEYS = Object.keys(VAR_NAMES) as (keyof SceneLevels)[];

/** Atraso (ms) de cada grupo, para a cena "ondular" pela casa em vez de mudar de uma vez. */
const GROUP_DELAY: Record<keyof SceneLevels, number> = {
  lightCinema: 0,
  lightLiving: 90,
  lightSuite: 180,
  lightTerrace: 270,
  curtains: 340,
  screen: 120,
  soundCinema: 220,
  soundLiving: 220,
  cameras: 0,
};

function levelsToStyle(levels: SceneLevels): CSSProperties {
  const style: Record<string, number> = {};
  for (const key of LEVEL_KEYS) style[VAR_NAMES[key]] = levels[key];
  return style as CSSProperties;
}

const lv = (key: keyof SceneLevels, gain = 1): CSSProperties => ({
  opacity: gain === 1 ? `var(${VAR_NAMES[key]})` : `calc(var(${VAR_NAMES[key]}) * ${gain})`,
});

const curtainStyle: CSSProperties = {
  transform: "scaleX(calc(0.12 + 0.88 * var(--curtains)))",
  transformBox: "fill-box",
  transformOrigin: "left center",
};

/** Vértices de um cone de luz que parte de (cx, y0) e abre até a largura `w` em y1. */
const cone = (cx: number, y0: number, y1: number, w: number, w0 = 14) =>
  `${cx - w0 / 2},${y0} ${cx + w0 / 2},${y0} ${cx + w / 2},${y1} ${cx - w / 2},${y1}`;

export function SceneStage() {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(true);
  const rootRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<SceneLevels>({ ...SCENES[0].levels });
  const mounted = useRef(false);
  const inView = useInView(stageRef, { margin: "0px 0px -20% 0px" });

  const scene = SCENES[index];
  const autoplay = playing && !reduceMotion;

  /* Anima os níveis da cena com anime.js e escreve nas variáveis CSS do SVG. */
  useEffect(() => {
    const svg = rootRef.current;
    if (!svg) return;
    const target = SCENES[index].levels;

    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (reduceMotion) {
      stateRef.current = { ...target };
      for (const key of LEVEL_KEYS) svg.style.setProperty(VAR_NAMES[key], String(target[key]));
      return;
    }

    const animations = LEVEL_KEYS.map((key) =>
      animate(stateRef.current, {
        [key]: target[key],
        duration: key === "curtains" ? 1500 : 1100,
        delay: GROUP_DELAY[key],
        ease: "outExpo",
        onUpdate: () => {
          svg.style.setProperty(VAR_NAMES[key], String(stateRef.current[key]));
        },
      }),
    );

    return () => {
      animations.forEach((animation) => animation.pause());
    };
  }, [index, reduceMotion]);

  const next = useCallback(() => setIndex((value) => (value + 1) % SCENES.length), []);

  const choose = (i: number) => {
    setIndex(i);
    setPlaying(false);
  };

  return (
    <div ref={stageRef} className="relative">
      <div className="relative animate-fade [animation-delay:200ms]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 -top-10 -bottom-4 bg-[radial-gradient(55%_60%_at_65%_35%,rgb(26_56_115/0.55),transparent_70%),radial-gradient(40%_45%_at_25%_80%,rgb(140_35_112/0.28),transparent_70%)]"
        />
        <svg
          ref={rootRef}
          viewBox="0 0 1000 620"
          role="img"
          aria-label="Corte esquemático de uma casa de dois pavimentos com cinema, sala de estar, suíte e varanda. A iluminação, as cortinas, o som e a projeção mudam conforme a cena escolhida."
          className="relative block h-auto w-full animate-[reveal-x_1.8s_var(--ease-out-quart)_0.15s_both] text-white"
          style={levelsToStyle(SCENES[0].levels)}
        >
          <defs>
            <linearGradient id="g-cone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe3c2" stopOpacity="0.5" />
              <stop offset="1" stopColor="#ffe3c2" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="g-wash" cx="0.5" cy="0" r="0.9">
              <stop offset="0" stopColor="#ffd9ac" stopOpacity="0.32" />
              <stop offset="1" stopColor="#ffd9ac" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g-bulb" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ffe3c2" stopOpacity="0.85" />
              <stop offset="1" stopColor="#ffe3c2" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="g-screen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F20C49" />
              <stop offset="1" stopColor="#8C2370" />
            </linearGradient>
            <linearGradient id="g-beam" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0" stopColor="#F20C49" stopOpacity="0.5" />
              <stop offset="1" stopColor="#8C2370" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="g-cam" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4d7bd8" stopOpacity="0.55" />
              <stop offset="1" stopColor="#1A3873" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Luz de cada ambiente (atrás da estrutura) */}
          <g>
            <rect x="92" y="336" width="326" height="218" fill="url(#g-wash)" style={lv("lightCinema")} />
            <rect x="422" y="336" width="316" height="218" fill="url(#g-wash)" style={lv("lightLiving", 1.1)} />
            <rect x="92" y="128" width="356" height="194" fill="url(#g-wash)" style={lv("lightSuite", 0.8)} />
            <rect x="452" y="128" width="456" height="194" fill="url(#g-wash)" style={lv("lightTerrace", 0.7)} />
            <polygon points={cone(180, 340, 554, 150)} fill="url(#g-cone)" style={lv("lightCinema")} />
            <polygon points={cone(320, 340, 554, 130)} fill="url(#g-cone)" style={lv("lightCinema")} />
            <polygon points={cone(545, 392, 554, 150)} fill="url(#g-cone)" style={lv("lightLiving")} />
            <polygon points={cone(625, 392, 554, 150)} fill="url(#g-cone)" style={lv("lightLiving")} />
            <polygon points={cone(240, 130, 322, 190)} fill="url(#g-cone)" style={lv("lightSuite", 0.9)} />
            <ellipse cx="352" cy="272" rx="70" ry="52" fill="url(#g-bulb)" style={lv("lightSuite", 0.9)} />
            <circle cx="575" cy="176" r="62" fill="url(#g-bulb)" style={lv("lightTerrace")} />
            <circle cx="690" cy="176" r="62" fill="url(#g-bulb)" style={lv("lightTerrace")} />
            <circle cx="805" cy="176" r="62" fill="url(#g-bulb)" style={lv("lightTerrace")} />
          </g>

          {/* Projeção e câmera */}
          <polygon points="334,352 106,374 106,482" fill="url(#g-beam)" style={lv("screen", 0.9)} />
          <rect x="100" y="372" width="6" height="110" fill="url(#g-screen)" style={lv("screen")} />
          <polygon points="876,360 756,556 906,556" fill="url(#g-cam)" style={lv("cameras")} />

          {/* Estrutura */}
          <g
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.62"
            strokeWidth="1.1"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="**:[vector-effect:non-scaling-stroke]"
          >
            <rect x="70" y="112" width="860" height="14" />
            <rect x="90" y="324" width="820" height="10" />
            <rect x="60" y="556" width="880" height="8" />
            <path d="M90 126V324 M90 334V556 M910 334V556" />
            <path d="M420 334V556 M740 334V556 M450 126V324" />
            <path d="M910 268V324 M450 268H910 M530 268V324 M610 268V324 M690 268V324 M770 268V324 M850 268V324" strokeOpacity="0.35" />
          </g>

          {/* Mobiliário e equipamentos */}
          <g
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.34"
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="**:[vector-effect:non-scaling-stroke]"
          >
            {/* Cinema: tela, projetor, poltronas, caixas */}
            <rect x="100" y="372" width="6" height="110" strokeOpacity="0.6" />
            <rect x="330" y="342" width="46" height="16" rx="3" strokeOpacity="0.6" />
            <path d="M262 556V526H306V556 M306 526L318 472H332L322 526" />
            <path d="M338 556V526H382V556 M382 526L394 472H408L398 526" />
            <rect x="110" y="500" width="14" height="56" />
            <rect x="404" y="352" width="10" height="26" />
            {/* Estar: janela, sofá, luminárias, caixas de teto */}
            <rect x="470" y="378" width="190" height="130" />
            <path d="M470 443H660 M565 378V508" strokeOpacity="0.2" />
            <path d="M488 556V520C488 512 494 506 502 506H618C626 506 632 512 632 520V556 M488 530H632" />
            <path d="M545 334V392 M625 334V392" />
            <path d="M531 392A14 14 0 0 1 559 392Z M611 392A14 14 0 0 1 639 392Z" strokeOpacity="0.7" />
            <rect x="446" y="336" width="10" height="8" />
            <rect x="706" y="336" width="10" height="8" />
            <path d="M690 556V470 M676 470H704" />
            {/* Entrada: porta e câmera */}
            <rect x="792" y="440" width="58" height="116" />
            <path d="M840 500V510" />
            <path d="M866 346H892L896 358H862Z" strokeOpacity="0.7" />
            {/* Suíte: cama, criado-mudo, abajur, janela */}
            <rect x="112" y="250" width="10" height="74" />
            <rect x="122" y="296" width="212" height="28" />
            <rect x="130" y="284" width="38" height="12" rx="4" />
            <rect x="338" y="292" width="34" height="32" />
            <path d="M352 292V282 M342 282L346 268H358L362 282Z" strokeOpacity="0.7" />
            <rect x="378" y="176" width="60" height="112" />
            <path d="M240 126V140" />
            <circle cx="240" cy="146" r="6" strokeOpacity="0.7" />
            {/* Varanda: lâmpadas, sofá externo, vaso */}
            <path d="M575 126V168 M690 126V168 M805 126V168" />
            <circle cx="575" cy="174" r="5" strokeOpacity="0.7" />
            <circle cx="690" cy="174" r="5" strokeOpacity="0.7" />
            <circle cx="805" cy="174" r="5" strokeOpacity="0.7" />
            <rect x="786" y="296" width="110" height="28" />
            <path d="M786 296V270 M896 296V270" />
            <path d="M474 324V300H500V324 M487 300V282 M478 290L487 282L496 290" />
          </g>

          {/* Cortinas */}
          <rect x="470" y="378" width="190" height="130" fill="#8C2370" fillOpacity="0.6" stroke="#F20C49" strokeOpacity="0.5" style={curtainStyle} />
          <rect x="378" y="176" width="60" height="112" fill="#8C2370" fillOpacity="0.6" stroke="#F20C49" strokeOpacity="0.5" style={curtainStyle} />

          {/* Luminárias acesas (pontos) */}
          <g fill="#ffe3c2">
            <circle cx="180" cy="342" r="3.5" style={lv("lightCinema")} />
            <circle cx="320" cy="342" r="0" />
            <circle cx="545" cy="392" r="3" style={lv("lightLiving")} />
            <circle cx="625" cy="392" r="3" style={lv("lightLiving")} />
            <circle cx="240" cy="146" r="4" style={lv("lightSuite")} />
            <circle cx="352" cy="278" r="3" style={lv("lightSuite")} />
            <circle cx="575" cy="174" r="4" style={lv("lightTerrace")} />
            <circle cx="690" cy="174" r="4" style={lv("lightTerrace")} />
            <circle cx="805" cy="174" r="4" style={lv("lightTerrace")} />
          </g>

          {/* Som: barras que pulsam ao lado de cada fonte */}
          <g fill="#F20C49" className="[&_rect]:origin-bottom [&_rect]:transform-fill">
            <g style={{ opacity: "var(--s-cinema)" }}>
              <rect x="132" y="520" width="3" height="30" rx="1.5" className="animate-wave" />
              <rect x="140" y="510" width="3" height="40" rx="1.5" className="animate-wave [animation-delay:-0.5s]" />
              <rect x="148" y="524" width="3" height="26" rx="1.5" className="animate-wave [animation-delay:-1s]" />
            </g>
            <g style={{ opacity: "var(--s-living)" }}>
              <rect x="718" y="350" width="3" height="18" rx="1.5" className="animate-wave" />
              <rect x="726" y="346" width="3" height="26" rx="1.5" className="animate-wave [animation-delay:-0.6s]" />
              <rect x="734" y="352" width="3" height="14" rx="1.5" className="animate-wave [animation-delay:-1.1s]" />
              <rect x="428" y="350" width="3" height="18" rx="1.5" className="animate-wave [animation-delay:-0.3s]" />
              <rect x="436" y="346" width="3" height="26" rx="1.5" className="animate-wave [animation-delay:-0.9s]" />
            </g>
          </g>

          {/* Câmera ativa */}
          <g style={{ opacity: "var(--cam)" }}>
            <circle
              cx="868"
              cy="352"
              r="3"
              fill="#F20C49"
              className="origin-center animate-ping-slow transform-fill"
            />
            <circle cx="868" cy="352" r="3" fill="#F20C49" />
          </g>

          {/* Legendas do corte */}
          <g
            className="font-mono max-sm:hidden"
            fill="currentColor"
            fillOpacity="0.5"
            fontSize="11"
            letterSpacing="1.6"
          >
            <text x="104" y="358">CINEMA</text>
            <text x="434" y="358">ESTAR</text>
            <text x="754" y="358">ENTRADA</text>
            <text x="104" y="150">SUÍTE</text>
            <text x="464" y="150">VARANDA</text>
            <text x="60" y="598" fillOpacity="0.34">CORTE ESQUEMÁTICO · SEM ESCALA</text>
          </g>
        </svg>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-10">
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs tracking-wider text-fg-3 uppercase">
              Escolha uma cena
            </p>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={autoplay ? "Pausar troca automática de cenas" : "Retomar troca automática de cenas"}
              className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-white/5"
            >
              {autoplay ? (
                <Pause aria-hidden="true" className="size-4" />
              ) : (
                <Play aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>
          <div role="group" aria-label="Cenas da casa" className="mt-3 grid grid-cols-2 gap-x-6 sm:grid-cols-4 lg:grid-cols-2">
            {SCENES.map((item, i) => {
              const active = i === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(i)}
                  className={cn(
                    "group relative min-h-14 py-3 text-left font-display text-lg font-semibold tracking-tight transition-colors font-stretch-[112%] lg:text-base xl:text-lg",
                    active ? "text-fg" : "text-fg-3 hover:text-fg",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-1.5 rounded-full transition-colors",
                        active ? "bg-signal" : "bg-fg-3/50",
                      )}
                    />
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px bg-line-strong"
                  />
                  {active && (
                    <span
                      aria-hidden="true"
                      key={`${item.id}-${autoplay && inView ? "run" : "idle"}`}
                      onAnimationEnd={autoplay ? next : undefined}
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-signal"
                      style={
                        autoplay
                          ? {
                              animation: `scene-progress ${SCENE_DURATION_MS}ms linear forwards`,
                              animationPlayState: inView ? "running" : "paused",
                            }
                          : undefined
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div aria-live={autoplay ? "off" : "polite"} className="mt-5 min-h-12 max-w-[46ch]">
            <m.p
              key={scene.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-base leading-relaxed text-fg-2"
            >
              {scene.summary}
            </m.p>
          </div>
        </div>

        <dl className="self-start border-t border-line">
          {(Object.keys(READOUT_LABELS) as SceneReadoutKey[]).map((key) => (
            <div
              key={key}
              className="flex items-baseline justify-between gap-4 border-b border-line py-3"
            >
              <dt className="text-sm text-fg-3">{READOUT_LABELS[key]}</dt>
              <m.dd
                key={`${key}-${scene.readout[key]}`}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-right font-mono text-[0.8rem] text-fg tabular-nums"
              >
                {scene.readout[key]}
              </m.dd>
            </div>
          ))}
          <p className="pt-3 text-xs text-fg-3">{SCENES_DISCLAIMER}</p>
        </dl>
      </div>
    </div>
  );
}
