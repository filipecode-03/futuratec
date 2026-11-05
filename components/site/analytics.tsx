"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  ANALYTICS_ENABLED,
  CONSENT_KEY,
  GA_ID,
  META_PIXEL_ID,
  isWhatsAppLink,
  trackWhatsAppClick,
  type Consent,
} from "@/lib/analytics";

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

/**
 * Google Analytics 4 + Meta Pixel, carregados só depois do consentimento (LGPD).
 * Renderiza nada se nenhum ID estiver configurado.
 */
export function Analytics() {
  const stored = useSyncExternalStore<Consent | null | "loading">(subscribe, readConsent, () => "loading");
  const [chosen, setChosen] = useState<Consent | null>(null);
  const ready = stored !== "loading";
  const consent: Consent | null = chosen ?? (stored === "loading" ? null : stored);

  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      if (link && isWhatsAppLink(link.getAttribute("href"))) {
        trackWhatsAppClick(link.textContent?.trim().slice(0, 80) || "whatsapp");
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  if (!ANALYTICS_ENABLED || !ready) return null;

  const decide = (value: Consent) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* armazenamento indisponível: vale só nesta visita */
    }
    setChosen(value);
  };

  return (
    <>
      {consent === "granted" && GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}
      {consent === "granted" && META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}

      {consent === null ? (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto flex max-w-2xl flex-col gap-4 rounded-lg border border-white/15 bg-ink p-5 text-sm text-fg shadow-2xl sm:flex-row sm:items-center"
        >
          <p className="flex-1 leading-relaxed">
            Usamos cookies de medição (Google Analytics e Meta) para entender como o site é usado
            e melhorar nossos anúncios. Você pode recusar sem perder nenhuma função do site.
          </p>
          <div className="flex shrink-0 gap-2">
            <Button type="button" variant="outline" onClick={() => decide("denied")}>
              Recusar
            </Button>
            <Button type="button" onClick={() => decide("granted")}>
              Aceitar
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
