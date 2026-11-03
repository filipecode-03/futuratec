import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/content/faq";
import { QuoteLink } from "./quote-link";
import { Reveal } from "./reveal";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative border-t border-line py-24 lg:py-32"
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <Reveal effect="wipe">
              <h2 id="faq-title" className="section-title">
                Perguntas frequentes
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-fg-2">
                Ficou com outra dúvida sobre o seu projeto? Pergunte direto pelo WhatsApp.
              </p>
              <div className="mt-8">
                <QuoteLink variant="outline" label="Tirar uma dúvida" context="dúvida sobre o meu projeto" />
              </div>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible>
            {FAQ.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
