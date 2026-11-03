import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * Sitemap de página única. Sem NEXT_PUBLIC_SITE_URL ele sai vazio, porque
 * sitemaps exigem URLs absolutas e nenhum domínio foi definido.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
