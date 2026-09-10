"use client";

import { useEffect, useSyncExternalStore } from "react";
import { site } from "@/config/site";

/**
 * Progression de la VSL, tenue hors de React.
 *
 * Pourquoi un store externe plutôt qu'un useState : la progression est lue par
 * quatre composants distincts (lecteur, mini-lecteur, barre mobile, panneau
 * verrouillé) et restaurée depuis localStorage. Un store externe lu par
 * useSyncExternalStore évite de faire remonter l'état et de restaurer le
 * localStorage dans un effet, ce qui déclencherait des rendus en cascade.
 */

const STORAGE_KEY = "vsl_progress_v1";

export type Progress = {
  /** Position de lecture, en secondes. */
  t: number;
  playing: boolean;
  /** La vidéo a été lancée au moins une fois (masque la miniature). */
  started: boolean;
  /** Passe à true au franchissement du seuil, et n'en redescend pas. */
  justUnlocked: boolean;
};

const INITIAL: Progress = {
  t: 0,
  playing: false,
  started: false,
  justUnlocked: false,
};

let state: Progress = INITIAL;
let restored = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function set(patch: Partial<Progress>) {
  state = { ...state, ...patch };
  persist();
  emit();
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ t: state.t }));
  } catch {
    // Navigation privée : la progression vaut alors pour l'onglet en cours.
  }
}

/**
 * Restaure la progression au premier accès côté client. Le prospect qui
 * recharge la page ne repart pas de zéro — sinon le mur de 22 minutes
 * deviendrait infranchissable au moindre rafraîchissement.
 */
function restore() {
  if (restored) return;
  restored = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { t?: unknown };
    if (typeof parsed.t === "number" && parsed.t > 0) {
      const t = Math.min(parsed.t, site.vsl.durationSeconds);
      state = { ...INITIAL, t, started: true };
    }
  } catch {
    // Valeur illisible : on repart de l'état initial.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  restore();
  return state;
}

function getServerSnapshot() {
  return INITIAL;
}

export const playback = {
  play() {
    set({ playing: true, started: true });
  },
  pause() {
    set({ playing: false });
  },
  toggle() {
    if (state.playing) playback.pause();
    else playback.play();
  },
  /** Retour de 10 s. Avancer est volontairement impossible. */
  back10() {
    set({ t: Math.max(0, state.t - 10) });
  },
  /** Position imposée de l'extérieur (pont Vimeo). */
  setTime(seconds: number) {
    advanceTo(seconds);
  },
  /**
   * Reflète l'état réel du lecteur Vimeo. À la différence de play(), n'entraîne
   * pas le minuteur de simulation : c'est la vidéo qui mène.
   */
  markPlaying(playing: boolean) {
    set({ playing, started: state.started || playing });
  },
  reset() {
    state = INITIAL;
    persist();
    emit();
  },
};

/**
 * Déplace l'horloge et détecte le franchissement du seuil de déverrouillage.
 * La montée du drapeau ici, plutôt que dans un effet React, garantit qu'elle
 * n'est faite qu'une fois.
 */
function advanceTo(seconds: number) {
  const { durationSeconds, unlockAtSeconds } = site.vsl;
  const t = Math.min(durationSeconds, Math.max(0, seconds));
  const crossed = state.t < unlockAtSeconds && t >= unlockAtSeconds;

  set({
    t,
    justUnlocked: state.justUnlocked || crossed,
    playing: t >= durationSeconds ? false : state.playing,
  });
}

/** Lit la progression et fait tourner l'horloge tant que la lecture est active. */
export function useProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const simulated = site.vsl.vimeoId === null;

  useEffect(() => {
    // Avec une vraie vidéo, c'est le lecteur Vimeo qui donne l'heure.
    if (!simulated || !progress.playing) return;
    const speed = Math.max(1, site.vsl.previewSpeed);
    const id = setInterval(() => advanceTo(state.t + speed), 1000);
    return () => clearInterval(id);
  }, [simulated, progress.playing]);

  return progress;
}

export function isUnlocked(progress: Progress) {
  return progress.t >= site.vsl.unlockAtSeconds;
}

/** Formate en m:ss, comme la maquette. */
export function formatClock(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}
