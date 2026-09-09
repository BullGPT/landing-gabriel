export type Lead = {
  /** Réponses du questionnaire, indexées par question.id */
  answers: Record<string, string>;
  /** Paramètres UTM + referrer capturés au chargement de la page */
  attribution: Record<string, string>;
  submittedAt: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };
