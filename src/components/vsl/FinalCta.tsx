"use client";

import { isUnlocked, useProgress } from "./progress";
import { FORM_ID, PLAYER_ID, scrollToId } from "./scroll";

/**
 * Bouton du bandeau final. Tant que la vidéo n'est pas assez avancée, il
 * ramène au lecteur au lieu de promettre un accès qui n'existe pas encore.
 */
export function FinalCta() {
  const unlocked = isUnlocked(useProgress());

  return (
    <button
      type="button"
      onClick={() => scrollToId(unlocked ? FORM_ID : PLAYER_ID, 70)}
      className={`mt-7 inline-flex h-15 w-full max-w-[360px] cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border-none text-[15px] font-bold uppercase tracking-[0.06em] ${
        unlocked ? "bg-white text-brand" : "bg-white/22 text-white"
      }`}
    >
      {unlocked ? "Reservar mi llamada" : "Bloqueado · volver al vídeo"}
    </button>
  );
}
