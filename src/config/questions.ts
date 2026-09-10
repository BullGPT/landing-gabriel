/**
 * Questionnaire de réservation, repris tel quel de la maquette.
 * L'ordre du tableau = l'ordre des étapes sur mobile ; sur grand écran toutes
 * les questions sont affichées d'un coup.
 */

export type Question = {
  id: string;
  label: string;
  help?: string;
  /** Choix multiple : plusieurs réponses possibles. */
  multi?: boolean;
  options?: string[];
  /** Réponse libre. */
  text?: boolean;
  /** Bloc de coordonnées (nom, WhatsApp, consentement). */
  contact?: boolean;
};

export const questions: Question[] = [
  {
    id: "q1",
    label: "¿Cuánto tiempo llevas operando?",
    options: [
      "Nunca he operado",
      "Menos de 6 meses",
      "Entre 6 meses y 2 años",
      "Más de 2 años",
    ],
  },
  {
    id: "q2",
    label: "¿Cómo describirías tus resultados hasta ahora?",
    options: [
      "En pérdidas",
      "Más o menos en cero",
      "Gano algunos meses y pierdo otros",
      "Rentable de forma constante",
    ],
  },
  {
    id: "q3",
    label: "¿Qué has probado ya?",
    help: "Puedes elegir varias.",
    multi: true,
    options: [
      "Grupos de señales",
      "Formaciones online",
      "Prop firms",
      "Aprender por mi cuenta",
      "Nada todavía",
    ],
  },
  {
    id: "q4",
    label: "¿Con qué capital cuentas hoy para operar?",
    help: "Dinero que puedes permitirte arriesgar, no tus ahorros totales.",
    options: [
      "Menos de 500 €",
      "Entre 500 € y 2.000 €",
      "Entre 2.000 € y 5.000 €",
      "Más de 5.000 €",
    ],
  },
  {
    id: "q5",
    label: "¿Cuánto tiempo puedes dedicarle al día?",
    options: [
      "Menos de 30 minutos",
      "Entre 30 minutos y 1 hora",
      "Más de 1 hora",
    ],
  },
  {
    id: "q6",
    label:
      "Si en la llamada vemos que esto encaja contigo, ¿estarías en disposición de invertir en tu formación?",
    options: [
      "Sí, si me convence",
      "Sí, pero necesitaría pago fraccionado",
      "No en este momento",
    ],
  },
  {
    id: "q7",
    label: "¿Qué cambiaría en tu vida si el trading empezara a funcionarte?",
    text: true,
  },
  { id: "contact", label: "Tus datos de contacto", contact: true },
];

/**
 * Réponse qui disqualifie : le prospect part vers la page de refus plutôt que
 * vers la confirmation de rendez-vous.
 */
export const DISQUALIFYING = { questionId: "q6", answer: "No en este momento" };

/** Préfixes téléphoniques proposés, repris du design. */
export const phonePrefixes = [
  { value: "+34", label: "🇪🇸 +34" },
  { value: "+52", label: "🇲🇽 +52" },
  { value: "+54", label: "🇦🇷 +54" },
  { value: "+57", label: "🇨🇴 +57" },
  { value: "+56", label: "🇨🇱 +56" },
  { value: "+1", label: "🇺🇸 +1" },
] as const;
