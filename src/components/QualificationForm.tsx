"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { questions, type Question } from "@/config/questions";
import { getAttribution } from "@/lib/attribution";

/**
 * Questionnaire de l'étape 3, une question par écran.
 * Les coordonnées viennent de l'opt-in (sessionStorage) et sont renvoyées
 * avec la candidature pour que Gabriel ait une fiche complète.
 */
export function QualificationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const question = questions[step];
  const isLast = step === questions.length - 1;
  const value = answers[question.id] ?? "";
  const canContinue = useMemo(
    () => validate(question, value) === null,
    [question, value],
  );

  function setValue(next: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: next }));
    setError(null);
  }

  async function goNext() {
    const problem = validate(question, value);
    if (problem) {
      setError(problem);
      return;
    }
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          stage: "solicitud",
          answers: { ...readOptin(), ...answers },
          attribution: getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/gracias");
    } catch {
      setError("No hemos podido enviar tus respuestas. Inténtalo de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-7 rounded-[20px] border border-line bg-white p-7 shadow-[0_4px_24px_rgba(11,21,51,.06)] sm:p-10">
      <div className="mb-7 h-1 w-full overflow-hidden rounded-full bg-chip">
        <div
          className="h-full rounded-full bg-brand transition-all duration-300"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>

      <p className="m-0 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
        Pregunta {step + 1} de {questions.length}
      </p>

      <h2 className="mb-0 mt-3 text-[clamp(20px,2.6vw,26px)] font-bold leading-tight tracking-[-0.01em] text-pretty">
        {question.label}
      </h2>
      {question.help && (
        <p className="mt-2 text-[15px] text-muted">{question.help}</p>
      )}

      <div className="mt-6">
        <Field question={question} value={value} onChange={setValue} />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="cursor-pointer rounded-xl border border-line bg-transparent px-5 py-3.5 text-sm font-medium text-muted"
          >
            Atrás
          </button>
        )}
        <button
          type="button"
          onClick={goNext}
          disabled={!canContinue || submitting}
          className="h-15 flex-1 cursor-pointer rounded-xl border-none bg-brand text-[15px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_4px_24px_rgba(43,79,240,.24)] transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Enviando..." : isLast ? "Enviar solicitud" : "Continuar"}
        </button>
      </div>
    </div>
  );
}

function Field({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string;
  onChange: (v: string) => void;
}) {
  if (question.kind === "choice") {
    return (
      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
              className={`cursor-pointer rounded-xl border px-5 py-4 text-left text-[16px] transition-colors ${
                selected
                  ? "border-brand bg-brand-tint text-ink"
                  : "border-line bg-white text-ink hover:border-brand-line"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      rows={4}
      className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-base text-ink outline-none transition-colors focus:border-brand"
    />
  );
}

function readOptin(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem("lg_optin");
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

/** Retourne un message d'erreur en espagnol, ou null si la réponse est valide. */
function validate(question: Question, value: string): string | null {
  const trimmed = value.trim();

  if (question.kind === "choice") {
    return trimmed ? null : "Elige una opción para continuar.";
  }
  if (!question.required) return null;
  if (!trimmed) return "Este campo es obligatorio.";
  if (question.minLength && trimmed.length < question.minLength) {
    return `Escribe al menos ${question.minLength} caracteres.`;
  }
  return null;
}
