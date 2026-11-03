"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Carrega só os recursos de animação de DOM (LazyMotion) e respeita
 * prefers-reduced-motion em todos os componentes `m.*` do site.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
