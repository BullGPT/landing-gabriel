/**
 * Point de configuration unique de la landing.
 * Les valeurs restées entre crochets sont les placeholders de la maquette :
 * elles doivent être remplies avant la mise en ligne.
 */

export const site = {
  brand: "Rumbo",
  locale: "es-ES",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  seo: {
    title: "Vive del trading con inteligencia artificial | Rumbo",
    description:
      "El método Rumbo al completo: el sistema que usan los traders americanos para operar con criterio propio, una hora al día. Vídeo de 24 minutos, acceso inmediato.",
    ogImage: "/og.jpg",
  },

  vsl: {
    /** ID numérique Vimeo. Tant qu'il est null, le lecteur tourne en simulation. */
    vimeoId: null as string | null,
    /** Token des vidéos non répertoriées (vimeo.com/ID/HASH). */
    hash: null as string | null,
    /** Durée réelle de la vidéo, en secondes (24:00). */
    durationSeconds: 1440,
    /** Seuil de déverrouillage du formulaire, en secondes (22:30). */
    unlockAtSeconds: 1350,
    /**
     * Accélère l'horloge UNIQUEMENT pour tester la page sans attendre 22 min.
     * Doit valoir 1 en production. Pilotable par NEXT_PUBLIC_PREVIEW_SPEED.
     */
    previewSpeed: Number(process.env.NEXT_PUBLIC_PREVIEW_SPEED ?? 1),
  },

  /** Offre proposée aux prospects non qualifiés, sur la page de refus. */
  midTicketName: "[NOMBRE DEL MID TICKET]",

  legal: {
    riskWarning:
      "El trading conlleva riesgo de pérdida. Esta formación no constituye asesoramiento financiero ni recomendación de inversión. Los resultados dependen de cada persona y no están garantizados.",
  },
} as const;
