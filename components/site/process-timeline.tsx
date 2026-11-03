"use client";

import * as m from "motion/react-m";
import { useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { PROCESS } from "@/content/projects";

/** Etapas de um projeto. A linha lateral se preenche conforme a rolagem. */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[0.9rem] w-px bg-line-strong"
      />
      <m.span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[0.9rem] w-px origin-top bg-signal"
        style={{ scaleY: progress }}
      />
      {PROCESS.map((step, i) => (
        <li key={step.title} className="relative pb-10 pl-14 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 grid size-7.5 place-items-center rounded-full border border-line-strong bg-ink font-mono text-xs text-fg tabular-nums"
          >
            {i + 1}
          </span>
          <h4 className="font-display text-xl leading-tight font-semibold tracking-tight [font-stretch:108%]">
            <span className="sr-only">Etapa {i + 1}: </span>
            {step.title}
          </h4>
          <p className="mt-2 max-w-[52ch] text-base leading-relaxed text-fg-2">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
