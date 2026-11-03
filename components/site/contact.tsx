import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { BRANCHES, CONTACT, branchMapsUrl } from "@/content/site";
import { QuoteLink } from "./quote-link";
import { Reveal } from "./reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";

const channelClass =
  "group flex min-h-14 items-center justify-between gap-4 border-b border-white/25 py-3 text-lg font-medium text-white transition-colors hover:border-white";

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative isolate overflow-clip bg-[radial-gradient(70%_90%_at_0%_100%,#1A3873_0%,transparent_65%),linear-gradient(120deg,#8C2370_0%,#D90D58_100%)] py-24 text-white lg:py-32"
    >
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal effect="wipe">
            <h2
              id="contato-title"
              className="font-display text-[clamp(2.4rem,4.4vw+0.6rem,5rem)] leading-[1.02] font-semibold tracking-[-0.03em] [font-stretch:114%]"
            >
              Qual ambiente você quer transformar?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[48ch] text-lg leading-relaxed text-white/90">
              Conte pelo WhatsApp o que você tem em mente. A mensagem já vem pronta, e o
              atendimento acontece com hora marcada.
            </p>
            <div className="mt-10">
              <QuoteLink variant="light" size="xl" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <ul>
            <li>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={channelClass}
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center">
                    <FontAwesomeIcon icon={faWhatsapp} className="size-5" />
                  </span>
                  <span>
                    <span className="sr-only">WhatsApp: </span>
                    {CONTACT.whatsappDisplay}
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">(abre em uma nova aba)</span>
              </a>
            </li>
            <li>
              <a href={CONTACT.emailUrl} className={channelClass}>
                <span className="flex items-center gap-3">
                  <Mail aria-hidden="true" className="size-5 shrink-0" />
                  <span>
                    <span className="sr-only">E-mail: </span>
                    {CONTACT.email}
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
            <li>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={channelClass}
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center">
                    <FontAwesomeIcon icon={faInstagram} className="size-5" />
                  </span>
                  <span>
                    <span className="sr-only">Instagram: </span>
                    {CONTACT.instagramHandle}
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">(abre em uma nova aba)</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="wrap mt-20 lg:mt-28">
        <div className="grid gap-10 border-t border-white/30 pt-10 sm:grid-cols-2 lg:gap-12">
          {BRANCHES.map((branch, i) => (
            <Reveal key={branch.id} delay={i * 0.08}>
              <address className="not-italic">
                <h3 className="font-display text-2xl font-semibold tracking-tight [font-stretch:112%]">
                  {branch.city} — {branch.state}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/90">
                  {branch.street}
                  <br />
                  {branch.neighborhood}
                </p>
                <a
                  href={branchMapsUrl(branch)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline decoration-white/50 underline-offset-4 hover:decoration-white"
                >
                  Ver {branch.city} no mapa
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only">(abre em uma nova aba)</span>
                </a>
              </address>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-sm text-white/85">{CONTACT.schedule}.</p>
      </div>
    </section>
  );
}
