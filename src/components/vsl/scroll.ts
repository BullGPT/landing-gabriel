/** Amène un élément sous l'en-tête plutôt que collé au bord du viewport. */
export function scrollToId(id: string, offset: number) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - offset,
    behavior: "smooth",
  });
}

export const FORM_ID = "reserva";
export const PLAYER_ID = "video";
