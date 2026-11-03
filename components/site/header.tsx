"use client";

import Image from "next/image";
import mark from "@/public/brand/mark.png"
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CONTACT, CTA_LABEL, NAV_ITEMS } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

/** Retorna o id da seção que cruza o centro da viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string>(SECTION_IDS[0]);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function Header() {
  const active = useActiveSection();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-(--header-h) transition-[background-color,border-color] duration-500",
        scrolled
          ? "border-b border-line bg-ink/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-360 items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a
          href="#inicio"
          aria-label="Futura Tec, ir para o início"
          className="rounded-sm py-2"
        >
          <Image src={mark} alt="logo" className="size-10 shrink-0" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center px-4 text-sm font-medium transition-colors",
                      isActive ? "text-fg" : "text-fg-2 hover:text-fg",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-4 bottom-1.5 h-px origin-left bg-signal transition-transform duration-500 ease-out-expo",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="default" className="max-sm:hidden">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
              {CTA_LABEL}
              <span className="sr-only"> (abre o WhatsApp em uma nova aba)</span>
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton
              className="w-full max-w-none border-line bg-ink p-0 sm:max-w-md"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navegue pelas seções da página ou solicite um orçamento.
              </SheetDescription>
              <div className="flex h-full flex-col px-6 pt-5 pb-8">
                <div className="flex h-11 items-center">
                  <Image src={mark} alt="logo" className="size-10 shrink-0" />
                </div>
                <nav aria-label="Menu móvel" className="mt-10">
                  <ul>
                    {NAV_ITEMS.map((item) => (
                      <li key={item.href} className="border-b border-line">
                        <SheetClose asChild>
                          <a
                            href={item.href}
                            aria-current={active === item.href.slice(1) ? "location" : undefined}
                            className="flex min-h-16 items-center justify-between font-display text-3xl font-semibold tracking-tight [font-stretch:115%]"
                          >
                            {item.label}
                            {active === item.href.slice(1) && (
                              <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
                            )}
                          </a>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto space-y-4 pt-10">
                  <Button asChild size="xl" className="w-full">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {CTA_LABEL}
                      <span className="sr-only"> (abre o WhatsApp em uma nova aba)</span>
                    </a>
                  </Button>
                  <p className="text-sm text-fg-3">{CONTACT.schedule}</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
