import { ABOUT, DIFFERENTIALS, HISTORY, IDENTITY } from "@/content/company";
import { MediaSlot } from "./media-slot";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="relative border-t border-line bg-ink-2 py-24 lg:py-32"
    >
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal effect="wipe" className="lg:col-span-7">
            <h2 id="sobre-title" className="section-title">
              Desde o início dos anos 2000, tecnologia para casas e empresas
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <p className="text-lg leading-relaxed text-fg-2">{ABOUT.definition}</p>
          </Reveal>
        </div>

        {/* Linha do tempo */}
        <ol className="mt-20 grid gap-0 border-t border-line-strong lg:mt-28 lg:grid-cols-4">
          {HISTORY.map((entry, i) => (
            <li key={entry.when} className="relative pt-8 pb-10 lg:pr-8 lg:pb-0">
              <span
                aria-hidden="true"
                className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-signal ring-4 ring-ink-2"
              />
              <Reveal delay={i * 0.08}>
                <h3 className="font-display text-xl font-semibold tracking-tight [font-stretch:110%]">
                  {entry.when}
                </h3>
                <p className="mt-3 max-w-[34ch] text-base leading-relaxed text-fg-2">
                  {entry.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Objetivo e equipe */}
        <div className="mt-24 grid items-center gap-12 lg:mt-36 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <MediaSlot id="aboutTeam" sizes="(min-width: 1024px) 40vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal effect="wipe">
              <p className="font-display text-[clamp(1.75rem,2.4vw+0.8rem,3rem)] leading-[1.12] font-semibold tracking-[-0.02em] [font-stretch:112%]">
                {IDENTITY.purpose}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-fg-2">{ABOUT.goal}</p>
            </Reveal>
          </div>
        </div>

        {/* Diferenciais */}
        <div className="mt-28 grid gap-10 lg:mt-40 lg:grid-cols-12 lg:gap-12">
          <Reveal effect="wipe" className="lg:col-span-4">
            <h3 className="font-display text-[clamp(1.6rem,2vw+0.9rem,2.5rem)] leading-[1.08] font-semibold tracking-[-0.02em] [font-stretch:114%]">
              O que diferencia a Futura Tec
            </h3>
          </Reveal>
          <ul className="grid border-t border-line sm:grid-cols-2 lg:col-span-8">
            {DIFFERENTIALS.map((item, i) => (
              <li
                key={item.title}
                className="border-b border-line py-6 sm:odd:pr-8 sm:even:pl-8 sm:even:border-l"
              >
                <Reveal delay={(i % 2) * 0.06}>
                  <h4 className="font-display text-lg font-semibold tracking-tight [font-stretch:108%]">
                    {item.title}
                  </h4>
                  <p className="mt-2 max-w-[40ch] text-[0.95rem] leading-relaxed text-fg-2">
                    {item.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* Missão, visão, valores */}
        <div className="mt-28 grid gap-12 border-t border-line pt-16 lg:mt-40 lg:grid-cols-12 lg:gap-12 lg:pt-20">
          <Reveal className="lg:col-span-4">
            <h3 className="font-display text-xl font-semibold tracking-tight [font-stretch:110%]">
              Missão
            </h3>
            <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-fg-2">
              {IDENTITY.mission}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-4">
            <h3 className="font-display text-xl font-semibold tracking-tight [font-stretch:110%]">
              Visão
            </h3>
            <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-fg-2">
              {IDENTITY.vision}
            </p>
          </Reveal>
          <Reveal delay={0.16} className="lg:col-span-4">
            <h3 className="font-display text-xl font-semibold tracking-tight [font-stretch:110%]">
              Valores
            </h3>
            <ul className="mt-3 space-y-1.5 text-base text-fg-2">
              {IDENTITY.values.map((value) => (
                <li key={value} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-signal" />
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
