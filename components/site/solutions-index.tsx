"use client";

import { useEffect, useState } from "react";
import { SOLUTIONS } from "@/content/solutions";
import { cn } from "@/lib/utils";

/** Índice fixo das seis soluções; destaca a que está na tela. */
export function SolutionsIndex() {
  const [active, setActive] = useState<string>(SOLUTIONS[0].id);

  useEffect(() => {
    const elements = SOLUTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Soluções" className="hidden lg:block">
      <ul className="border-t border-line">
        {SOLUTIONS.map((solution) => {
          const isActive = active === solution.id;
          const Icon = solution.icon;
          return (
            <li key={solution.id} className="border-b border-line">
              <a
                href={`#${solution.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group flex min-h-14 items-center gap-3 py-3 font-display text-lg font-semibold tracking-tight transition-colors [font-stretch:108%]",
                  isActive ? "text-fg" : "text-fg-3 hover:text-fg",
                )}
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={cn(
                    "size-5 shrink-0 transition-colors",
                    isActive ? "text-signal" : "text-fg-3 group-hover:text-fg-2",
                  )}
                />
                <span className="flex-1">{solution.shortName}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px bg-signal transition-[width] duration-500 ease-out-expo",
                    isActive ? "w-8" : "w-0",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
