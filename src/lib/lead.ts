/** Candidature envoyée à la fin du questionnaire. */
export type Lead = {
  /** Réponses indexées par id de question, plus les coordonnées. */
  answers: Record<string, string>;
  /** UTM + referrer capturés au premier chargement. */
  attribution: Record<string, string>;
  /**
   * Suite donnée au prospect : rendez-vous ou offre d'entrée.
   * Calculé côté serveur pour qu'il corresponde toujours aux réponses reçues.
   */
  outcome: "llamada" | "no-match";
  submittedAt: string;
};
