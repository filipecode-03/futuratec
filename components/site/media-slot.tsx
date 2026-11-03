import Image from "next/image";
import { ImageIcon, Video } from "lucide-react";
import { MEDIA, type MediaKey } from "@/content/media";
import { cn } from "@/lib/utils";
import { MediaVideo } from "./media-video";

type MediaSlotProps = {
  id: MediaKey;
  className?: string;
  /** Atributo `sizes` do next/image; descreve a largura renderizada. */
  sizes?: string;
  /** Use apenas em imagens acima da dobra (LCP). */
  priority?: boolean;
};

/**
 * Renderiza a mídia registrada em content/media.ts. Sem `src`, mostra um espaço
 * reservado com o slug, o tipo e a orientação do que deve entrar ali.
 */
export function MediaSlot({
  id,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: MediaSlotProps) {
  const asset = MEDIA[id];
  const Icon = asset.kind === "video" ? Video : ImageIcon;

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-xl bg-ink-3", className)}
      style={{ aspectRatio: asset.ratio }}
      data-media-slot={asset.slug}
    >
      {asset.src && asset.kind === "image" ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : asset.src && asset.kind === "video" ? (
        <MediaVideo asset={asset} />
      ) : (
        <div
          role="img"
          aria-label={`Espaço reservado: ${asset.kind === "video" ? "vídeo" : "imagem"} ${asset.slug}`}
          className="absolute inset-0 flex flex-col justify-between border border-dashed border-line-strong bg-[radial-gradient(120%_90%_at_0%_0%,rgb(26_56_115/0.5),transparent_60%),radial-gradient(90%_80%_at_100%_100%,rgb(140_35_112/0.35),transparent_65%)] p-4 text-left sm:p-5"
        >
          <span className="flex items-center gap-2 font-mono text-[0.7rem] tracking-wider text-fg-2 uppercase">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-signal" />
            {asset.kind === "video" ? "Vídeo necessário" : "Imagem necessária"}
          </span>
          <span className="space-y-2">
            <span className="block font-mono text-xs break-all text-fg">{asset.slug}</span>
            <span className="block max-w-[44ch] text-xs leading-snug text-fg-3 sm:text-sm">
              {asset.brief}
            </span>
            <span className="block font-mono text-[0.7rem] text-fg-3">
              Proporção {asset.ratio.replace("/", ":")}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
