"use client";

import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "lg_cookies";

/** Le choix est figé pour la session : rien à quoi s'abonner. */
const subscribe = () => () => {};

function readChoice(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // Navigation privée : on considère qu'aucun choix n'a été fait.
    return null;
  }
}

/** Côté serveur on ne sait rien : on ne rend pas le bandeau avant l'hydratation. */
const serverChoice = () => "pending";

/**
 * Bandeau cookies du design. Le choix est mémorisé pour ne pas réapparaître
 * à chaque étape du funnel.
 */
export function CookieBanner() {
  const stored = useSyncExternalStore(subscribe, readChoice, serverChoice);
  const [dismissed, setDismissed] = useState(false);

  function decide(choice: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Sans stockage, on masque au moins pour la page en cours.
    }
    setDismissed(true);
  }

  if (dismissed || stored !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-70 border-t border-line bg-white px-4 py-3.5 shadow-[0_-4px_24px_rgba(11,21,51,.06)]">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3.5">
        <p className="m-0 max-w-[62ch] text-[13.5px] text-muted">
          Usamos cookies propias y de terceros para medir el rendimiento de
          nuestras campañas. Puedes aceptarlas o rechazarlas.
        </p>
        <span className="flex flex-1 justify-end gap-2.5 sm:flex-none">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="max-w-[150px] flex-1 cursor-pointer rounded-[10px] border border-line bg-transparent px-4 py-3 text-[13.5px] font-medium text-muted"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="max-w-[150px] flex-1 cursor-pointer rounded-[10px] border-none bg-brand px-4 py-3 text-[13.5px] font-semibold text-white"
          >
            Aceptar
          </button>
        </span>
      </div>
    </div>
  );
}
