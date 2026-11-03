import { ArrowDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRANCHES, CONTACT } from "@/content/site";
import { QuoteLink } from "./quote-link";
import { SceneStage } from "./scene-stage";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-clip pt-[calc(var(--header-h)+2rem)] pb-16 lg:pt-[calc(var(--header-h)+2.5rem)] lg:pb-24"
    >
      <div className="wrap grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pt-8 xl:pt-14">
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.4rem,4.6vw+0.4rem,4.75rem)] leading-[1.02] font-semibold tracking-[-0.03em] [font-stretch:114%]"
          >
            <span className="block animate-rise [animation-delay:100ms]">Toque uma cena.</span>
            <span className="block animate-rise text-fg-2 [animation-delay:240ms]">
              A casa inteira responde.
            </span>
          </h1>

          <p className="mt-7 max-w-[46ch] animate-rise text-lg leading-relaxed text-fg-2 [animation-delay:380ms]">
            A Futura Tec planeja, instala, programa e integra automação, áudio e vídeo, redes
            Wi-Fi e câmeras em casas e empresas de Manaus e Boa Vista.
          </p>

          <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:520ms]">
            <QuoteLink size="xl" />
            <Button asChild variant="outline" size="xl">
              <a href="#solucoes">
                Conhecer as soluções
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>

          <ul className="mt-10 flex animate-fade flex-wrap gap-x-8 gap-y-2 text-sm text-fg-3 [animation-delay:800ms]">
            {BRANCHES.map((branch) => (
              <li key={branch.id} className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 text-signal" />
                {branch.city} — {branch.state}
              </li>
            ))}
            <li>{CONTACT.schedule}</li>
          </ul>
        </div>

        <div className="min-w-0 lg:col-span-7 lg:-mr-4 xl:-mr-10">
          <SceneStage />
        </div>
      </div>
    </section>
  );
}
