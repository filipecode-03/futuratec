"use client";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { GALLERY } from "@/content/projects";
import { MediaSlot } from "./media-slot";

/**
 * Carrossel com rolagem nativa e encaixe (scroll-snap): funciona com toque,
 * roda do mouse, teclado (setas com o trilho focado) e os botões rotulados.
 */
export function GalleryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState({ ratio: 0, start: true, end: false });

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress({
      ratio: max > 0 ? track.scrollLeft / max : 0,
      start: track.scrollLeft <= 4,
      end: track.scrollLeft >= max - 4,
    });
  }, []);

  useEffect(() => {
    update();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, [update]);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>("[data-slide]");
    if (!track || !slide) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (slide.offsetWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Ambientes que a Futura Tec projeta"
    >
      <div className="mb-6 flex items-end justify-between gap-6">
        <div
          className="relative h-px w-full max-w-xs bg-line-strong"
          aria-hidden="true"
        >
          <span
            className="absolute top-0 left-0 h-px w-1/3 bg-signal"
            style={{ transform: `translateX(${progress.ratio * 200}%)` }}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => scrollByCard(-1)}
            disabled={progress.start}
            aria-label="Ver ambientes anteriores"
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => scrollByCard(1)}
            disabled={progress.end}
            aria-label="Ver próximos ambientes"
          >
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={update}
        tabIndex={0}
        aria-label="Lista de ambientes, role para o lado"
        className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal sm:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {GALLERY.map((item, i) => (
          <figure
            key={item.media}
            data-slide=""
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${GALLERY.length}`}
            className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[30%]"
          >
            <MediaSlot id={item.media} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 78vw" />
            <figcaption className="mt-4">
              <span className="block font-display text-lg font-semibold tracking-tight [font-stretch:108%]">
                {item.title}
              </span>
              <span className="mt-1 block text-sm text-fg-3">{item.systems}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
