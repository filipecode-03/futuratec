import { SOLUTIONS } from "@/content/solutions";
import { cn } from "@/lib/utils";
import { MediaSlot } from "./media-slot";
import { QuoteLink } from "./quote-link";
import { Reveal } from "./reveal";
import { SolutionsIndex } from "./solutions-index";

export function Solutions() {
  return (
    <section
      id="solucoes"
      aria-labelledby="solucoes-title"
      className="relative border-t border-line bg-ink-2 py-24 lg:py-32"
    >
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <Reveal effect="wipe">
              <h2 id="solucoes-title" className="section-title">
                Seis soluções, um projeto integrado
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-fg-2">
                Contrate uma solução específica ou o conjunto. Quando todas entram, a
                infraestrutura é planejada uma vez e os sistemas passam a funcionar juntos.
              </p>
            </Reveal>
            <div className="mt-10">
              <SolutionsIndex />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {SOLUTIONS.map((solution, i) => (
            <article
              key={solution.id}
              id={solution.id}
              aria-labelledby={`${solution.id}-title`}
              className="scroll-mt-[calc(var(--header-h)+1rem)] border-t border-line py-12 first:border-t-0 first:pt-0 lg:py-16 lg:first:pt-0"
            >
              <div className="grid gap-8 xl:grid-cols-2 xl:gap-10">
                <div className={cn("flex flex-col", i % 2 === 1 && "xl:order-2")}>
                  <Reveal>
                    <h3
                      id={`${solution.id}-title`}
                      className="font-display text-[clamp(1.6rem,1.6vw+1rem,2.25rem)] leading-[1.1] font-semibold tracking-[-0.02em] [font-stretch:112%]"
                    >
                      {solution.name}
                    </h3>
                    <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-fg-2">
                      {solution.lead}
                    </p>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <ul className="mt-6 space-y-3">
                      {solution.facts.map((fact) => (
                        <li key={fact} className="flex gap-3 text-[0.95rem] leading-snug text-fg">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-px w-4 shrink-0 bg-signal"
                          />
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <div className="mt-8">
                    <QuoteLink
                      context={solution.name}
                      variant="outline"
                      label={`Orçar ${solution.shortName.toLowerCase()}`}
                    />
                  </div>
                </div>
                <Reveal delay={0.05} className="self-start">
                  <MediaSlot
                    id={solution.media}
                    sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 55vw, 100vw"
                  />
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
