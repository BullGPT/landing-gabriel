"use client";

import { useMemo, useState } from "react";
import { questions, type Question } from "@/config/questions";
import { getAttribution } from "@/lib/attribution";

type Props = {
  /** Appelé une fois le lead enregistré : la page passe alors au calendrier. */
  onQualified: (answers: Record<string, string>) => void;
};

export function QualificationForm({ onQualified }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const question = questions[step];
  const isLast = step === questions.length - 1;
  const progress = Math.round((step / questions.length) * 100);

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
        body: JSON.stringify({ answers, attribution: getAttribution() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      onQualified(answers);
    } catch {
      setError("No hemos podido enviar tus respuestas. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-current transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mb-2 text-xs uppercase tracking-wider opacity-50">
        Pregunta {step + 1} de {questions.length}
      </p>

      <h2 className="mb-2 text-2xl font-semibold">{question.label}</h2>
      {question.help && (
        <p className="mb-6 text-sm opacity-60">{question.help}</p>
      )}

      <div className="mt-6">
        <QuestionField
          question={question}
          value={value}
          onChange={setValue}
          onEnter={goNext}
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-lg px-4 py-3 text-sm opacity-60 transition hover:opacity-100"
          >
            Atrás
          </button>
        )}
        <button
          type="button"
          onClick={goNext}
          disabled={!canContinue || submitting}
          className="flex-1 rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Enviando..." : isLast ? "Ver horarios disponibles" : "Continuar"}
        </button>
      </div>
    </div>
  );
}

function QuestionField({
  question,
  value,
  onChange,
  onEnter,
}: {
  question: Question;
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
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
              className={`rounded-lg border px-5 py-4 text-left transition ${
                selected
                  ? "border-white bg-white/10"
                  : "border-white/15 hover:border-white/40"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  if (question.kind === "longtext") {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        rows={4}
        className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 outline-none transition focus:border-white"
      />
    );
  }

  return (
    <input
      type={question.kind}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onEnter();
        }
      }}
      placeholder={question.placeholder}
      autoComplete={autoCompleteFor(question)}
      className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 outline-none transition focus:border-white"
    />
  );
}

function autoCompleteFor(question: Question) {
  if (question.kind === "email") return "email";
  if (question.kind === "tel") return "tel";
  if (question.id === "nombre") return "name";
  return "off";
}

/** Retourne un message d'erreur en espagnol, ou null si la réponse est valide. */
function validate(question: Question, value: string): string | null {
  const trimmed = value.trim();

  if (question.kind === "choice") {
    return trimmed ? null : "Elige una opción para continuar.";
  }

  if (!question.required) return null;
  if (!trimmed) return "Este campo es obligatorio.";

  if (question.kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return "Introduce un email válido.";
  }

  if (question.kind === "tel" && trimmed.replace(/\D/g, "").length < 8) {
    return "Introduce un teléfono válido con prefijo.";
  }

  if (
    question.kind === "longtext" &&
    question.minLength &&
    trimmed.length < question.minLength
  ) {
    return `Escribe al menos ${question.minLength} caracteres.`;
  }

  return null;
}
