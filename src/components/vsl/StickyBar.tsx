"use client";

import { FORM_ID, scrollToId } from "./scroll";
import { useMediaQuery } from "./useMediaQuery";

/** Accès permanent à la réservation sur mobile. */
export function StickyBar() {
  const wide = useMediaQuery("(min-width: 900px)");
  if (wide) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-60 border-t border-line bg-white px-3.5 py-2.5">
      <button
        type="button"
        onClick={() => scrollToId(FORM_ID, 70)}
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 border-none bg-brand text-white text-[15px] font-bold uppercase tracking-[0.05em]"
      >
        Reservar mi llamada
      </button>
    </div>
  );
}
