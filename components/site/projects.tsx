import { AUDIENCES } from "@/content/projects";
import { GalleryCarousel } from "./gallery-carousel";
import { MediaSlot } from "./media-slot";
import { ProcessTimeline } from "./process-timeline";
import { QuoteLink } from "./quote-link";
import { Reveal } from "./reveal";

export function Projects() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="relative border-t border-line py-24 lg:py-32"
    >
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <Reveal effect="wipe">
                <h2 id="projetos-title" className="section-title">
                  Do planejamento ao suporte, em uma só equipe
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-fg-2">
                  A Futura Tec acompanha o projeto inteiro, da infraestrutura à programação e à
                  integração, em imóveis em construção ou já concluídos.
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-10">
                <MediaSlot
                  id="brandReel"
                  sizes="(min-width: 1024px) 22rem, 80vw"
                  className="mx-auto max-w-88 lg:mx-0"
                />
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <ProcessTimeline />
          </div>
        </div>

        <div className="mt-28 lg:mt-36">
          <Reveal effect="wipe">
            <h3 className="font-display text-[clamp(1.6rem,2vw+0.9rem,2.5rem)] leading-[1.08] font-semibold tracking-[-0.02em] [font-stretch:114%]">
              Ambientes que a Futura Tec projeta
            </h3>
          </Reveal>
          <div className="mt-10">
            <GalleryCarousel />
          </div>
        </div>

        <div className="mt-28 lg:mt-36">
          <Reveal effect="wipe">
            <h3 className="font-display text-[clamp(1.6rem,2vw+0.9rem,2.5rem)] leading-[1.08] font-semibold tracking-[-0.02em] [font-stretch:114%]">
              Para quem trabalhamos
            </h3>
          </Reveal>
          <ul className="mt-10 grid border-t border-line lg:grid-cols-3">
            {AUDIENCES.map((audience, i) => (
              <li
                key={audience.id}
                className="flex flex-col border-b border-line py-8 lg:border-b-0 lg:py-10 lg:not-first:border-l lg:not-first:pl-8 lg:not-last:pr-8"
              >
                <Reveal delay={i * 0.08} className="flex h-full flex-col">
                  <h4 className="font-display text-2xl leading-tight font-semibold tracking-tight [font-stretch:110%]">
                    {audience.name}
                  </h4>
                  <p className="mt-3 max-w-[40ch] flex-1 text-base leading-relaxed text-fg-2">
                    {audience.text}
                  </p>
                  <div className="mt-6">
                    <QuoteLink
                      context={audience.context}
                      variant="link"
                      size="default"
                      label="Falar sobre o meu projeto"
                      className="px-0"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
