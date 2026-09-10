"use client";

import { useSyncExternalStore } from "react";

/**
 * Lit une media query sans passer par un état synchronisé dans un effet.
 * Le rendu serveur répond toujours `false` : la mise en page part du cas
 * mobile, puis s'ajuste à l'hydratation.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
