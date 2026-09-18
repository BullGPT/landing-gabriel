"use client";

import { FORM_ID, scrollToId } from "./scroll";

export function FinalCta() {
  return (
    <button
      type="button"
      onClick={() => scrollToId(FORM_ID, 70)}
      className="mt-7 inline-flex h-15 w-full max-w-[360px] cursor-pointer items-center justify-center gap-2.5 border-none bg-white text-brand text-[15px] font-bold uppercase tracking-[0.06em]"
    >
      Reservar mi llamada
    </button>
  );
}
