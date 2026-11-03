"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import type { MediaAsset } from "@/content/media";

/** Vídeo com controles próprios e rotulados. Começa pausado e sem som. */
export function MediaVideo({ asset }: { asset: MediaAsset }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  function togglePlay() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  return (
    <div className="absolute inset-0">
      <video
        ref={ref}
        className="size-full object-cover"
        src={asset.src}
        poster={asset.poster}
        aria-label={asset.alt}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
          className="grid size-11 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
        >
          {playing ? <Pause aria-hidden="true" className="size-5" /> : <Play aria-hidden="true" className="size-5" />}
        </button>
        <button
          type="button"
          onClick={() => setMuted((value) => !value)}
          aria-label={muted ? "Ativar o som do vídeo" : "Silenciar o vídeo"}
          aria-pressed={!muted}
          className="grid size-11 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
        >
          {muted ? <VolumeX aria-hidden="true" className="size-5" /> : <Volume2 aria-hidden="true" className="size-5" />}
        </button>
      </div>
    </div>
  );
}
