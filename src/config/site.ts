/**
 * Point de configuration unique de la landing.
 * Tout ce que Gabriel doit pouvoir changer sans toucher au code est ici.
 */

export const site = {
  brand: "Gabriel",
  locale: "es-ES",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  seo: {
    title: "Formación de trading 1 a 1 | Gabriel",
    description:
      "Programa de acompañamiento personalizado para traders que quieren pasar de resultados irregulares a un método rentable y consistente.",
    ogImage: "/og.jpg",
  },

  /**
   * VSL. `vimeoId` est l'ID numérique de la vidéo Vimeo (ex: 76979871).
   * `hash` est le token des vidéos non répertoriées (vimeo.com/ID/HASH).
   * Tant que vimeoId est null, un placeholder est affiché.
   */
  vsl: {
    vimeoId: null as string | null,
    hash: null as string | null,
    /** Secondes avant l'apparition du CTA. 0 = visible tout de suite. */
    ctaDelaySeconds: 0,
    posterAlt: "Vídeo de presentación del programa",
  },

  /** URL Calendly (ou autre calendrier embeddable). */
  calendly: {
    url: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
    /** Masque les bandeaux Calendly pour un rendu intégré. */
    hideDetails: true,
  },
} as const;
