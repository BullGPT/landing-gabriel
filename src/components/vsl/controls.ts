"use client";

import { site } from "@/config/site";
import { playback } from "./progress";
import { vimeo } from "./useVimeoBridge";

const hasVimeo = () => site.vsl.vimeoId !== null;

/**
 * Commandes de lecture, quelle que soit la source.
 * Tant qu'aucune vidéo n'est configurée, l'horloge est simulée pour que la page
 * soit testable ; dès qu'un `vimeoId` est renseigné, tout passe par Vimeo.
 */
export const controls = {
  play() {
    if (hasVimeo()) {
      // `started` fait apparaître l'iframe ; le SDK prend le relais ensuite.
      playback.markPlaying(true);
      vimeo.play();
    } else {
      playback.play();
    }
  },
  pause() {
    if (hasVimeo()) vimeo.pause();
    else playback.pause();
  },
  toggle(playing: boolean) {
    if (playing) controls.pause();
    else controls.play();
  },
  back10() {
    if (hasVimeo()) void vimeo.back10();
    else playback.back10();
  },
};
