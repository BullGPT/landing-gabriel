"use client";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "ttclid",
];

const STORAGE_KEY = "lg_attribution";

/**
 * Capture les UTM au premier chargement et les conserve pour la session :
 * le prospect peut recharger la page ou revenir, on garde la source d'origine.
 */
export function captureAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const stored = read();
  if (Object.keys(stored).length > 0) return stored;

  const params = new URLSearchParams(window.location.search);
  const captured: Record<string, string> = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) captured[key] = value.slice(0, 200);
  }
  if (document.referrer) captured.referrer = document.referrer.slice(0, 200);
  captured.landing_page = window.location.pathname;

  write(captured);
  return captured;
}

export function getAttribution(): Record<string, string> {
  return read();
}

function read(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function write(value: Record<string, string>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Mode privé / cookies bloqués : l'attribution est un bonus, pas un blocage.
  }
}
