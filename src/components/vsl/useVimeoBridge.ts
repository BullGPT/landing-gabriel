"use client";

import { useEffect, useRef } from "react";
import { playback } from "./progress";

const SDK_URL = "https://player.vimeo.com/api/player.js";

type VimeoPlayer = {
  on(event: string, handler: (data: { seconds: number }) => void): void;
  play(): Promise<void>;
  pause(): Promise<void>;
  getCurrentTime(): Promise<number>;
  setCurrentTime(seconds: number): Promise<number>;
  destroy(): Promise<void>;
};

declare global {
  interface Window {
    Vimeo?: { Player: new (el: HTMLIFrameElement) => VimeoPlayer };
  }
}

/**
 * Instance du lecteur, gardée au niveau du module : le mini-lecteur et la barre
 * mobile doivent piloter la même vidéo que le lecteur principal.
 */
let instance: VimeoPlayer | null = null;
let sdkPromise: Promise<void> | null = null;

function loadSdk(): Promise<void> {
  if (window.Vimeo) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("vimeo sdk failed to load"));
    document.head.appendChild(script);
  });
  return sdkPromise;
}

/** Commandes adressées au lecteur Vimeo, sans effet s'il n'est pas prêt. */
export const vimeo = {
  play: () => void instance?.play().catch(() => {}),
  pause: () => void instance?.pause().catch(() => {}),
  back10: async () => {
    if (!instance) return;
    try {
      const current = await instance.getCurrentTime();
      await instance.setCurrentTime(Math.max(0, current - 10));
    } catch {
      // La position reste inchangée.
    }
  },
};

/**
 * Relie le lecteur Vimeo au store : c'est la vidéo réelle qui donne l'heure,
 * pas un minuteur. Sans cela, le déverrouillage se contournerait en laissant
 * l'onglet ouvert sans regarder.
 *
 * NON TESTÉ tant qu'aucun `vimeoId` n'est configuré — il n'y a pas encore de
 * vidéo à charger. À vérifier le jour où la VSL est en ligne.
 */
export function useVimeoBridge(enabled: boolean) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;

    loadSdk()
      .then(() => {
        if (cancelled || !window.Vimeo) return;
        const player = new window.Vimeo.Player(iframe);
        instance = player;

        player.on("timeupdate", (data) => playback.setTime(data.seconds));
        player.on("play", () => playback.markPlaying(true));
        player.on("pause", () => playback.markPlaying(false));
        player.on("ended", () => playback.markPlaying(false));
      })
      .catch(() => {
        // SDK bloqué : les contrôles restent inertes plutôt que de mentir sur
        // la progression.
      });

    return () => {
      cancelled = true;
      const player = instance;
      instance = null;
      player?.destroy().catch(() => {});
    };
  }, [enabled]);

  return iframeRef;
}
