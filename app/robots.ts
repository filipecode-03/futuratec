import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/** Defina NEXT_PUBLIC_SITE_URL para publicar a URL do sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(SITE_URL ? { sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL } : {}),
  };
}
