"use client";

import * as m from "motion/react-m";
import type { HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  /** "rise": sobe e aparece. "wipe": revela de baixo para cima, para títulos grandes. */
  effect?: "rise" | "wipe";
  delay?: number;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Revela o conteúdo quando entra na viewport. Sem JavaScript o conteúdo
 * permanece visível (ver `[data-reveal]` em globals.css). `prefers-reduced-motion`
 * é tratado pelo MotionConfig do layout.
 */
export function Reveal({
  effect = "rise",
  delay = 0,
  children,
  ...props
}: RevealProps) {
  const hidden =
    effect === "wipe"
      ? { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" }
      : { opacity: 0, y: 24 };
  const shown =
    effect === "wipe"
      ? { opacity: 1, y: 0, clipPath: "inset(0 0 -20% 0)" }
      : { opacity: 1, y: 0 };

  return (
    <m.div
      data-reveal=""
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
      {...props}
    >
      {children}
    </m.div>
  );
}
