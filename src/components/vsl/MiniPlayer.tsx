"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { controls } from "./controls";
import { formatClock, useProgress } from "./progress";
import { PLAYER_ID } from "./scroll";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Lecteur réduit qui suit le prospect une fois le lecteur principal sorti de
 * l'écran : le compteur reste visible pendant qu'il lit la page.
 */
export function MiniPlayer() {
  const progress = useProgress();
  const wide = useMediaQuery("(min-width: 900px)");
  const [pastPlayer, setPastPlayer] = useState(false);

  useEffect(() => {
    const target = document.getElementById(PLAYER_ID);
    if (!target) return;

    // L'observer déclenche dès l'attachement : l'état est juste même si la page
    // est rechargée en cours de défilement.
    const observer = new IntersectionObserver(
      ([entry]) => setPastPlayer(entry.boundingClientRect.bottom < 0),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!progress.started || !pastPlayer) return null;

  const percent = Math.min(100, (progress.t / site.vsl.durationSeconds) * 100);

  return (
    <div
      className={
        wide
          ? "fixed bottom-5 right-5 z-55 flex w-[340px] items-center gap-3 border border-line bg-white p-3 shadow-[0_10px_34px_rgba(16,26,61,.12)]"
          : "fixed inset-x-0 bottom-19 z-55 flex items-center gap-2.5 border-t border-line bg-white px-3.5 py-2.5"
      }
    >
      <div className="aspect-video w-24 flex-none bg-[repeating-linear-gradient(135deg,#F8FAFF_0_8px,#F5F7FB_8px_16px)]" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-semibold">
          Método Rumbo · 24 min
        </div>
        <div className="mt-1.5 h-1 overflow-hidden bg-line">
          <div
            className="h-full bg-brand transition-[width] duration-500 ease-linear"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <span className="flex-none font-mono text-xs text-faint">
        {formatClock(progress.t)}
      </span>
      <button
        type="button"
        onClick={() => controls.toggle(progress.playing)}
        className="flex-none cursor-pointer border-none bg-brand px-3 py-2 text-[12.5px] font-semibold text-white"
      >
        {progress.playing ? "Pausa" : "Reproducir"}
      </button>
    </div>
  );
}
