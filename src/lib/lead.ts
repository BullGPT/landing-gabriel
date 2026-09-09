/**
 * Le funnel enregistre deux fois : à l'opt-in (étape 1) puis à la candidature
 * (étape 3). Un prospect qui abandonne après la VSL reste donc joignable.
 */
export type LeadStage = "optin" | "solicitud";

export type Lead = {
  stage: LeadStage;
  /** Réponses indexées par id de champ / de question. */
  answers: Record<string, string>;
  /** UTM + referrer capturés au premier chargement. */
  attribution: Record<string, string>;
  submittedAt: string;
};
