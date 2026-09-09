/**
 * Questionnaire de qualification (marché espagnol).
 * L'ordre du tableau = l'ordre des étapes. Ajouter/retirer une question
 * ne demande aucune modification du composant de formulaire.
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
      kind: "text" | "email" | "tel";
      label: string;
      help?: string;
      placeholder?: string;
      required?: boolean;
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
      { value: "menos-6m", label: "Menos de 6 meses" },
      { value: "6m-1a", label: "Entre 6 meses y 1 año" },
      { value: "1a-3a", label: "Entre 1 y 3 años" },
      { value: "mas-3a", label: "Más de 3 años" },
    ],
  },
  {
    id: "capital",
    kind: "choice",
    label: "¿Con qué capital operas actualmente?",
    help: "Incluye cuentas de fondeo si las tienes.",
    options: [
      { value: "menos-1k", label: "Menos de 1.000 €", disqualifying: true },
      { value: "1k-5k", label: "Entre 1.000 € y 5.000 €" },
      { value: "5k-25k", label: "Entre 5.000 € y 25.000 €" },
      { value: "mas-25k", label: "Más de 25.000 €" },
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
    id: "inversion",
    kind: "choice",
    label:
      "El programa requiere una inversión. ¿Estás en disposición de invertir en tu formación si encaja contigo?",
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
  {
    id: "nombre",
    kind: "text",
    label: "¿Cómo te llamas?",
    placeholder: "Nombre y apellidos",
    required: true,
  },
  {
    id: "email",
    kind: "email",
    label: "¿A qué email te enviamos la confirmación?",
    placeholder: "tu@email.com",
    required: true,
  },
  {
    id: "telefono",
    kind: "tel",
    label: "¿Y tu teléfono (WhatsApp)?",
    help: "Solo lo usamos para la llamada. Incluye el prefijo del país.",
    placeholder: "+34 600 00 00 00",
    required: true,
  },
];
