/**
 * Point de configuration unique de la landing.
 * Les valeurs entre crochets ([MARCA], [CIFRA]...) sont les placeholders
 * laissés tels quels dans la maquette : ils doivent être remplis avant la mise
 * en ligne. Ils sont regroupés ici pour qu'aucun ne soit oublié dans le JSX.
 */

export const site = {
  brand: "[MARCA]",
  domain: "[DOMINIO]",
  /** Numéro WhatsApp affiché sur la page de remerciement. */
  whatsappNumber: "[NÚMERO]",
  locale: "es-ES",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  seo: {
    title:
      "El método de análisis con IA que usan los traders americanos | [MARCA]",
    description:
      "Descubre cómo analizar cualquier gráfico en menos de 30 segundos con inteligencia artificial, el sistema que usan miles de traders en Estados Unidos.",
    ogImage: "/og.jpg",
  },

  /** Preuve sociale affichée dans le hero et sur la page VSL. */
  proof: {
    rating: "4,7",
    reviewsCount: "[X]",
    studentsCount: "[X]",
    /** Bloc statistique de la landing. */
    statFigure: "[CIFRA]",
    statSource: "[FUENTE]",
  },

  vsl: {
    /** Durée annoncée dans les titres et le compteur. */
    durationLabel: "17 minutos",
    /** ID numérique Vimeo. Tant qu'il est null, le placeholder est affiché. */
    vimeoId: null as string | null,
    /** Token des vidéos non répertoriées (vimeo.com/ID/HASH). */
    hash: null as string | null,
    /**
     * "always" : le CTA est visible dès l'arrivée.
     * "delayed" : il apparaît après `ctaDelaySeconds` (gate classique de VSL).
     * Reprend la prop `vslCta` du design.
     */
    ctaMode: "always" as "always" | "delayed",
    ctaDelaySeconds: 8,
  },

  /**
   * Étape 3 du funnel.
   * "internal" : le questionnaire React de ce repo, branché sur /api/lead.
   * "typeform" : l'embed Typeform prévu par la maquette (renseigner typeformId).
   */
  application: {
    mode: "internal" as "internal" | "typeform",
    typeformId: "",
  },

  legal: {
    riskWarning:
      "Aviso de riesgo: operar en los mercados financieros conlleva riesgo de pérdida. Los resultados pasados no garantizan resultados futuros. Este contenido es formativo y no constituye asesoramiento financiero.",
    metaDisclaimer:
      "Este sitio no está afiliado a Meta Platforms, Inc. ni respaldado por ella.",
  },
} as const;

/**
 * Variante de titre du hero (split test A/B/C/D repris du design).
 * Se pilote par variable d'environnement pour tester sans redéployer le code.
 */
export const heroVariants = {
  A: {
    lead: "El método que los traders americanos usan",
    accent: "para ser rentables con la inteligencia artificial",
  },
  B: {
    lead: "Analiza cualquier gráfico en 30 segundos",
    accent: "con el sistema de IA que llegó de Estados Unidos",
  },
  C: {
    lead: "Miles de traders en EE.UU. ya operan con IA.",
    accent: "En España casi nadie lo aplica todavía",
  },
  D: {
    lead: "Deja de operar a ciegas:",
    accent: "el método de análisis con IA que usan los traders americanos",
  },
} as const;

export type HeroVariantKey = keyof typeof heroVariants;

export function activeHeroVariant() {
  const key = (process.env.NEXT_PUBLIC_HERO_VARIANT ?? "A") as HeroVariantKey;
  return heroVariants[key] ?? heroVariants.A;
}
