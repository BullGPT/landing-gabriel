"use client";

import { site } from "@/config/site";
import { controls } from "./controls";
import { formatClock, useProgress } from "./progress";
import { useVimeoBridge } from "./useVimeoBridge";

const HATCH =
  "bg-[repeating-linear-gradient(135deg,#F8FAFF_0_12px,#F5F7FB_12px_24px)]";

/**
 * Lecteur Vimeo avec commandes natives, dont le réglage du volume.
 * Les boutons sous la vidéo conservent les raccourcis pause et retour arrière.
 */
export function VslPlayer() {
  const progress = useProgress();
  const { vimeoId, hash, durationSeconds } = site.vsl;
  const useVimeo = vimeoId !== null;
  const iframeRef = useVimeoBridge(useVimeo && progress.started);

  const percent = Math.min(100, (progress.t / durationSeconds) * 100);

  return (
    <>
      <div className="border border-line bg-white p-2.5">
        <div
          className={`relative flex aspect-video w-full items-center justify-center overflow-hidden ${HATCH}`}
        >
          {useVimeo && progress.started && (
            <iframe
              ref={iframeRef}
              src={vimeoSrc(vimeoId, hash)}
              title="Masterclass Rumbo"
              className="absolute inset-0 h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}

          {!progress.started && (
            <button
              type="button"
              onClick={controls.play}
              aria-label="Reproducir el vídeo"
              className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3.5 border-none bg-transparent"
            >
              <span className="flex h-19 w-19 items-center justify-center rounded-full bg-brand shadow-[0_8px_30px_rgba(43,75,242,.32)]">
                <svg width="24" height="26" viewBox="0 0 24 26" fill="none" aria-hidden>
                  <path d="M4 2l16 11L4 24z" fill="#FFFFFF" />
                </svg>
              </span>
              <span className="px-4 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                {useVimeo ? "Ver la masterclass" : "[ MINIATURA + EMBED VSL 16 MIN ]"}
              </span>
            </button>
          )}

          {!useVimeo && progress.started && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
              <span className="px-4 text-center font-mono text-xs tracking-[0.1em] text-muted">
                [ VÍDEO EN REPRODUCCIÓN · PLACEHOLDER ]
              </span>
              <span className="font-mono text-[26px] font-medium text-ink">
                {formatClock(progress.t)}
              </span>
            </div>
          )}
        </div>

        {/* Indicateur de progression synchronisé avec Vimeo. */}
        <div
          className="mt-2.5 h-[5px] overflow-hidden bg-line"
          role="progressbar"
          aria-label="Progreso del vídeo"
          aria-valuemin={0}
          aria-valuemax={durationSeconds}
          aria-valuenow={Math.floor(progress.t)}
        >
          <div
            className="h-full bg-brand transition-[width] duration-500 ease-linear"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-3 px-0.5 pb-1">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => controls.toggle(progress.playing)}
              className="cursor-pointer border-none bg-brand px-3.5 py-2.5 text-[13px] font-semibold text-white"
            >
              {progress.playing ? "Pausa" : "Reproducir"}
            </button>
            <button
              type="button"
              onClick={controls.back10}
              className="cursor-pointer border border-line bg-white px-3.5 py-2.5 text-[13px] font-medium text-muted"
            >
              −10s
            </button>
          </div>
          <span className="font-mono text-xs text-faint">
            {formatClock(progress.t)} / {formatClock(durationSeconds)}
          </span>
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[11.5px] tracking-[0.08em] text-faint">
        1 vídeo · 16 minutos · acceso inmediato
      </p>
    </>
  );
}

function vimeoSrc(id: string, hash: string | null) {
  const params = new URLSearchParams({
    badge: "0",
    autopause: "0",
    byline: "0",
    portrait: "0",
    title: "0",
    dnt: "1",
    // Affiche les commandes Vimeo, notamment le volume et le plein écran.
    controls: "1",
    autoplay: "1",
  });
  if (hash) params.set("h", hash);
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}
