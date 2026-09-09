"use client";

import { site } from "@/config/site";

/**
 * Player Vimeo de la VSL. Tant que `site.vsl.vimeoId` est null, on affiche
 * un placeholder au bon ratio pour que la mise en page soit déjà juste.
 */
export function VslPlayer() {
  const { vimeoId, hash, posterAlt } = site.vsl;

  if (!vimeoId) {
    return (
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5"
        role="img"
        aria-label={posterAlt}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-sm opacity-60">Vídeo pendiente de subir</p>
        </div>
      </div>
    );
  }

  const params = new URLSearchParams({
    badge: "0",
    byline: "0",
    portrait: "0",
    title: "0",
    dnt: "1",
  });
  if (hash) params.set("h", hash);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?${params.toString()}`}
        title={posterAlt}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
