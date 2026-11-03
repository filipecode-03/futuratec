import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono, Hanken_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/site/motion-provider";
import { BRAND, SEO, SITE_URL } from "@/content/site";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: SEO.title,
  description: SEO.description,
  applicationName: BRAND.name,
  keywords: [...SEO.keywords],
  alternates: SITE_URL ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: BRAND.name,
    title: SEO.title,
    description: SEO.description,
    ...(SITE_URL ? { url: "/" } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${archivo.variable} ${hanken.variable} ${geistMono.variable}`}
    >
      <body>
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-fg px-4 py-3 text-sm font-semibold text-ink transition-transform focus-visible:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
