import { brandImageAlt, brandImageSize, renderBrandImage } from "@/lib/brand-image";

export const alt = brandImageAlt;
export const size = brandImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderBrandImage();
}
