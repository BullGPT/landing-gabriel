"use client";

import { useState, useSyncExternalStore } from "react";
import { useMediaQuery } from "@/components/vsl/useMediaQuery";

const STORAGE_KEY = "lg_cookies";

/** Le choix est figé pour la session : rien à quoi s'abonner. */
const subscribe = () => () => {};

function readChoice(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Côté serveur on ne sait rien : on ne rend pas le bandeau avant l'hydratation. */
const serverChoice = () => "pending";

export function CookieBanner() {
  const stored = useSyncExternalStore(subscribe, readChoice, serverChoice);
  const [dismissed, setDismissed] = useState(false);
  const wide = useMediaQuery("(min-width: 900px)");

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
    <div
      className={`fixed z-50 flex flex-wrap items-center gap-2.5 border border-line bg-white px-3.5 py-3 shadow-[0_8px_28px_rgba(16,26,61,.1)] ${
        wide ? "bottom-5 left-5 max-w-[420px]" : "inset-x-3 bottom-36"
      }`}
    >
      <p className="m-0 flex-[1_1_240px] text-[12.5px] text-muted">
        Usamos cookies para medir el rendimiento de nuestras campañas.
      </p>
      <span className="flex flex-none gap-2">
        <button
          type="button"
          onClick={() => decide("rejected")}
          className="cursor-pointer border border-line bg-transparent px-3.5 py-2.5 text-[12.5px] text-muted"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="cursor-pointer border-none bg-brand px-3.5 py-2.5 text-[12.5px] font-semibold text-white"
        >
          Aceptar
        </button>
      </span>
    </div>
  );
}
