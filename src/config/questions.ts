/**
 * Questionnaire de l'étape 3 (« Último paso antes de tu sesión »).
 * Les coordonnées (nom, email, téléphone) sont déjà collectées à l'opt-in de
 * l'étape 1 : on ne les redemande pas ici.
 * L'ordre du tableau = l'ordre des étapes.
 */

export type Question =
  | {
      id: string;
      kind: "choice";
      label: string;
      help?: string;
      options: { value: string; label: string; disqualifying?: boolean }[];
    }
  | {
      id: string;
      kind: "longtext";
      label: string;
      help?: string;
      placeholder?: string;
      required?: boolean;
      minLength?: number;
    };

export const questions: Question[] = [
  {
    id: "experiencia",
    kind: "choice",
    label: "¿Cuánto tiempo llevas operando?",
    options: [
      { value: "nunca", label: "Todavía no he operado nunca" },
      { value: "menos-6m", label: "Menos de 6 meses" },
      { value: "6m-2a", label: "Entre 6 meses y 2 años" },
      { value: "mas-2a", label: "Más de 2 años" },
    ],
  },
  {
    id: "situacion",
    kind: "choice",
    label: "¿Qué describe mejor tu situación hoy?",
    options: [
      { value: "empezando", label: "Estoy empezando, aún no tengo método" },
      { value: "irregular", label: "Tengo resultados, pero son irregulares" },
      { value: "rentable", label: "Soy rentable y quiero escalar" },
    ],
  },
  {
    id: "tiempo",
    kind: "choice",
    label: "¿Cuánto tiempo puedes dedicar al análisis cada día?",
    help: "El método requiere entre 30 y 45 minutos diarios.",
    options: [
      { value: "menos-30", label: "Menos de 30 minutos", disqualifying: true },
      { value: "30-45", label: "Entre 30 y 45 minutos" },
      { value: "mas-45", label: "Más de 45 minutos" },
    ],
  },
  {
    id: "inversion",
    kind: "choice",
    label:
      "La formación requiere una inversión. ¿Estás en disposición de invertir si encaja contigo?",
    options: [
      { value: "si", label: "Sí, si veo que encaja" },
      { value: "quizas", label: "Depende de la cantidad" },
      { value: "no", label: "No, ahora mismo no", disqualifying: true },
    ],
  },
  {
    id: "objetivo",
    kind: "longtext",
    label: "¿Qué quieres conseguir en los próximos 6 meses?",
    placeholder: "Cuéntanos brevemente tu objetivo y qué te está frenando.",
    required: true,
    minLength: 20,
  },
];

/** Préfixes téléphoniques proposés à l'opt-in, repris du design. */
export const phonePrefixes = [
  { value: "+34", label: "🇪🇸 +34" },
  { value: "+52", label: "🇲🇽 +52" },
  { value: "+54", label: "🇦🇷 +54" },
  { value: "+56", label: "🇨🇱 +56" },
  { value: "+57", label: "🇨🇴 +57" },
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+351", label: "🇵🇹 +351" },
  { value: "+33", label: "🇫🇷 +33" },
] as const;
