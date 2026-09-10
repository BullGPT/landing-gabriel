"use client";

import { site } from "@/config/site";
import { controls } from "./controls";
import { formatClock, useProgress } from "./progress";
import { useVimeoBridge } from "./useVimeoBridge";

const HATCH =
  "bg-[repeating-linear-gradient(135deg,#F8FAFF_0_12px,#F5F7FB_12px_24px)]";

/**
 * Lecteur de la VSL avec contrôles maison.
 * Il n'y a délibérément aucun moyen d'avancer : pause et retour arrière
 * seulement. C'est ce qui donne son sens au déverrouillage du formulaire.
 */
export function VslPlayer() {
  const progress = useProgress();
  const { vimeoId, hash, durationSeconds } = site.vsl;
  const useVimeo = vimeoId !== null;
  const iframeRef = useVimeoBridge(useVimeo);

  const percent = Math.min(100, (progress.t / durationSeconds) * 100);

  return (
    <>
      <div className="rounded-2xl border border-line bg-white p-2.5">
        <div
          className={`relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[10px] ${HATCH}`}
        >
          {useVimeo && progress.started && (
            <iframe
              ref={iframeRef}
              src={vimeoSrc(vimeoId, hash)}
              title="Método IA · 24 min"
              className="absolute inset-0 h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
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
                [ MINIATURA + EMBED VSL 24 MIN ]
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

        {/* Barre non cliquable : on ne peut pas se téléporter à la fin. */}
        <div
          className="mt-2.5 h-[5px] overflow-hidden rounded-full bg-line"
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
              className="cursor-pointer rounded-lg border-none bg-brand px-3.5 py-2.5 text-[13px] font-semibold text-white"
            >
              {progress.playing ? "Pausa" : "Reproducir"}
            </button>
            <button
              type="button"
              onClick={controls.back10}
              className="cursor-pointer rounded-lg border border-line bg-white px-3.5 py-2.5 text-[13px] font-medium text-muted"
            >
              −10s
            </button>
            <button
              type="button"
              disabled
              aria-disabled
              title="No se puede adelantar"
              className="cursor-not-allowed rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[13px] text-disabled"
            >
              +10s
            </button>
          </div>
          <span className="font-mono text-xs text-faint">
            {formatClock(progress.t)} / {formatClock(durationSeconds)}
          </span>
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[11.5px] tracking-[0.08em] text-faint">
        1 vídeo · 24 minutos · acceso inmediato
      </p>
    </>
  );
}

function vimeoSrc(id: string, hash: string | null) {
  const params = new URLSearchParams({
    badge: "0",
    byline: "0",
    portrait: "0",
    title: "0",
    dnt: "1",
    // Chrome Vimeo masqué : la progression passe par nos propres boutons.
    controls: "0",
    autoplay: "1",
  });
  if (hash) params.set("h", hash);
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}
