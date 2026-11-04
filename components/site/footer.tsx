"use client";

import { BRAND, BRANCHES, CONTACT, NAV_ITEMS } from "@/content/site";
import Image from "next/image";
import logoFull from "@/public/brand/wordmark.png"
import nortea from "@/public/brand/nortea.png"
import { useEffect, useState } from "react";

export function CopyrightYear() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>{year}</span>;
}


export function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-14">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Image src={logoFull} alt="logoFull" className="w-40" />
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-fg-3">
            {BRAND.tagline} em {BRANCHES.map((b) => `${b.city} (${b.state})`).join(" e ")}.
          </p>
        </div>
        <nav aria-label="Rodapé" className="lg:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6">
            {[...NAV_ITEMS, { href: "#faq", label: "Perguntas frequentes" }].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-fg-2 transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="text-sm text-fg-2 lg:col-span-3">
          <li>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center transition-colors hover:text-fg"
            >
              WhatsApp {CONTACT.whatsappDisplay}
              <span className="sr-only"> (abre em uma nova aba)</span>
            </a>
          </li>
          <li>
            <a href={CONTACT.emailUrl} className="inline-flex min-h-11 items-center transition-colors hover:text-fg">
              {CONTACT.email}
            </a>
          </li>
          <li>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center transition-colors hover:text-fg"
            >
              Instagram {CONTACT.instagramHandle}
              <span className="sr-only"> (abre em uma nova aba)</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-10 border-t border-line">
        <div className="wrap flex flex-col items-center justify-center gap-5 pt-6 sm:flex-row sm:justify-between sm:gap-6">
          <p className="text-center text-xs leading-relaxed text-fg-3 sm:text-left">
            © <CopyrightYear /> {BRAND.name}. Todos os direitos reservados.
          </p>

          <a
            href="https://norteadigital.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar o site da Nortea Digital"
            className="inline-flex shrink-0 items-center transition-opacity duration-200 hover:opacity-75"
          >
            <Image
              src={nortea}
              alt="Nortea Digital"
              className="h-auto w-36 object-contain sm:w-40 md:w-44"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
