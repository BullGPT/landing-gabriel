"use client";

import { site } from "@/config/site";
import { isUnlocked, useProgress } from "./progress";
import { FORM_ID, PLAYER_ID, scrollToId } from "./scroll";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Barre d'action fixe, mobile uniquement : rappelle en permanence l'état du
 * déverrouillage et ramène au bon endroit.
 */
export function StickyBar() {
  const progress = useProgress();
  const wide = useMediaQuery("(min-width: 900px)");
  const unlocked = isUnlocked(progress);

  if (wide) return null;

  const remaining = Math.max(0, site.vsl.unlockAtSeconds - progress.t);
  const minutes = Math.ceil(remaining / 60);
  const label = unlocked
    ? "Reservar mi llamada"
    : remaining > 0
      ? `Bloqueado · ${minutes} min`
      : "Desbloqueando...";

  return (
    <div className="fixed inset-x-0 bottom-0 z-60 border-t border-line bg-white px-3.5 py-2.5">
      <button
        type="button"
        onClick={() => scrollToId(unlocked ? FORM_ID : PLAYER_ID, 70)}
        aria-live="polite"
        className={`flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border-none text-[15px] font-bold uppercase tracking-[0.05em] ${
          unlocked ? "bg-brand text-white" : "bg-chip text-faint"
        }`}
      >
        {!unlocked && (
          <svg
            width="16"
            height="18"
            viewBox="0 0 40 46"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden
          >
            <path d="M11 20V13a9 9 0 0118 0v7" />
            <rect x="6" y="20" width="28" height="24" rx="5" />
          </svg>
        )}
        <span>{label}</span>
      </button>
    </div>
  );
}
