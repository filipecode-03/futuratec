import { ImageResponse } from "next/og";
import { SEO } from "@/content/site";

export const brandImageSize = { width: 1200, height: 630 } as const;

/** Mark provisório (F recortado) com o gradiente da marca. */
function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F20C49" />
          <stop offset="1" stopColor="#8C2370" />
        </linearGradient>
      </defs>
      <path d="M3 2h18v5H9v4h9v5H9v6H3z" fill="url(#g)" />
    </svg>
  );
}

/** Imagem Open Graph / Twitter: composição com a marca, sem foto. */
export function renderBrandImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(60% 80% at 100% 0%, rgba(26,56,115,0.9), rgba(13,13,13,0) 70%), radial-gradient(50% 70% at 0% 100%, rgba(140,35,112,0.65), rgba(13,13,13,0) 70%), #0D0D0D",
          color: "#F4F0F2",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Mark size={56} />
          <div style={{ display: "flex", fontSize: 38, fontWeight: 700, letterSpacing: 2 }}>
            FUTURA&nbsp;<span style={{ color: "#BDB7BE" }}>TEC</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            Toque uma cena. A casa inteira responde.
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#BDB7BE" }}>
            Automação residencial em Manaus e Boa Vista
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 240, background: "#D90D58" }} />
      </div>
    ),
    brandImageSize,
  );
}

export const brandImageAlt = SEO.title;
