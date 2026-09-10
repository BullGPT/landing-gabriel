"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DISQUALIFYING,
  phonePrefixes,
  questions,
  type Question,
} from "@/config/questions";
import { getAttribution } from "@/lib/attribution";
import { useMediaQuery } from "./useMediaQuery";

/** Réponses : une chaîne, ou une liste pour les questions à choix multiple. */
type Answers = Record<string, string | string[]>;

type Contact = {
  nombre: string;
  prefijo: string;
  telefono: string;
  consentimiento: boolean;
};

const EMPTY_CONTACT: Contact = {
  nombre: "",
  prefijo: phonePrefixes[0].value,
  telefono: "",
  consentimiento: false,
};

const INPUT_CLASS =
  "w-full rounded-[10px] border border-line bg-white px-3.5 py-[15px] text-base text-ink outline-none transition-colors focus:border-brand";

/**
 * Formulaire de réservation.
 * Sur grand écran toutes les questions sont visibles d'un coup ; sur mobile
 * elles défilent une par une avec une barre de progression.
 */
export function BookingForm({ justUnlocked }: { justUnlocked: boolean }) {
  const router = useRouter();
  const wide = useMediaQuery("(min-width: 900px)");

  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const total = questions.length;
  const current = Math.min(step, total - 1);
  const visible = wide ? questions : [questions[current]];
  const isLastStep = current === total - 1;
  const submits = wide || isLastStep;

  function pick(question: Question, option: string) {
    setError(null);
    setAnswers((prev) => {
      if (!question.multi) return { ...prev, [question.id]: option };
      const currentValue = (prev[question.id] as string[]) ?? [];
      const next = currentValue.includes(option)
        ? currentValue.filter((v) => v !== option)
        : [...currentValue, option];
      return { ...prev, [question.id]: next };
    });
  }

  async function handleNext() {
    const problem = validate(submits ? questions : visible, answers, contact);
    if (problem) {
      setError(problem);
      return;
    }
    if (!submits) {
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
          answers: serialize(answers, contact),
          attribution: getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));

      const disqualified =
        answers[DISQUALIFYING.questionId] === DISQUALIFYING.answer;
      router.push(disqualified ? "/no-match" : "/gracias");
    } catch {
      setError("No hemos podido enviar tus respuestas. Inténtalo de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-white px-[clamp(20px,4vw,28px)] py-[clamp(22px,4vw,30px)]">
      {justUnlocked && (
        <div className="mb-5 flex items-center gap-3 rounded-[10px] bg-brand-tint px-3.5 py-3 [animation:fadeUp_.45s_ease_both]">
          <svg
            width="24"
            height="26"
            viewBox="0 0 40 46"
            fill="none"
            stroke="#2B4BF2"
            strokeWidth="2"
            aria-hidden
            className="[animation:unlockPop_.6s_ease_both]"
          >
            <path d="M11 20V13a9 9 0 0118-1" />
            <rect x="6" y="20" width="28" height="24" rx="5" fill="#FFFFFF" />
            <circle cx="20" cy="31" r="3" fill="#2B4BF2" stroke="none" />
          </svg>
          <span className="font-bold text-brand">
            Desbloqueado. Elige tu hueco.
          </span>
        </div>
      )}

      <h2 className="m-0 text-[clamp(24px,4.8vw,32px)] font-extrabold leading-[1.1] tracking-[-0.02em]">
        Cinco preguntas
        <br />
        <span className="text-brand">antes de elegir hueco.</span>
      </h2>
      <p className="mt-3.5 max-w-[58ch] text-base text-muted">
        Nos sirven para llegar a la llamada sabiendo dónde se te rompe el proceso
        hoy. Y para no hacerte perder media hora si esto no es para ti.
      </p>

      {!wide && (
        <div className="mt-5.5">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.1em] text-faint">
            <span>
              Pregunta {current + 1} de {total}
            </span>
            <span>{Math.round(((current + 1) / total) * 100)}%</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-brand transition-[width] duration-300"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-6.5 flex flex-col gap-7">
        {visible.map((question, index) => (
          <div key={question.id}>
            <div className="font-mono text-[11px] tracking-[0.12em] text-brand">
              {question.contact
                ? "DATOS"
                : String(
                    (wide ? index : current) + 1,
                  ).padStart(2, "0")}
            </div>
            <label className="mt-2 block text-lg font-semibold tracking-[-0.01em] text-pretty">
              {question.label}
            </label>
            {question.help && (
              <p className="mt-1.5 text-sm text-faint">{question.help}</p>
            )}

            {question.options && (
              <div className="mt-3.5 flex flex-col gap-2.5">
                {question.options.map((option) => {
                  const on = isSelected(answers[question.id], option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => pick(question, option)}
                      aria-pressed={on}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-[10px] border px-4 py-[15px] text-left text-base text-ink ${
                        on
                          ? "border-brand bg-brand-tint font-semibold"
                          : "border-line bg-white font-normal"
                      }`}
                    >
                      <span
                        className={`h-[18px] w-[18px] flex-none border ${
                          question.multi ? "rounded-[5px]" : "rounded-full"
                        } ${
                          on
                            ? "border-brand bg-brand shadow-[inset_0_0_0_3px_#FFFFFF]"
                            : "border-brand-line bg-white"
                        }`}
                      />
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {question.text && (
              <textarea
                rows={2}
                value={(answers[question.id] as string) ?? ""}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.id]: e.target.value,
                  }))
                }
                placeholder="Escríbelo en una o dos líneas"
                className={`${INPUT_CLASS} mt-3.5 resize-y`}
              />
            )}

            {question.contact && (
              <div className="mt-3.5 flex flex-col gap-3.5">
                <label className="flex flex-col gap-[7px] text-[13.5px] font-medium text-muted">
                  Nombre
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    value={contact.nombre}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, nombre: e.target.value }))
                    }
                    className={INPUT_CLASS}
                  />
                </label>

                <label className="flex flex-col gap-[7px] text-[13.5px] font-medium text-muted">
                  WhatsApp
                  <span className="flex gap-2">
                    <select
                      aria-label="Prefijo del país"
                      value={contact.prefijo}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, prefijo: e.target.value }))
                      }
                      className="flex-none basis-28 rounded-[10px] border border-line bg-white px-2 py-[15px] text-base text-ink outline-none focus:border-brand"
                    >
                      {phonePrefixes.map((prefix) => (
                        <option key={prefix.value} value={prefix.value}>
                          {prefix.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="600 000 000"
                      value={contact.telefono}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, telefono: e.target.value }))
                      }
                      className={`${INPUT_CLASS} min-w-0 flex-1`}
                    />
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-[11px] text-[13.5px] leading-normal text-muted">
                  <input
                    type="checkbox"
                    checked={contact.consentimiento}
                    onChange={(e) =>
                      setContact((c) => ({
                        ...c,
                        consentimiento: e.target.checked,
                      }))
                    }
                    className="mt-0.5 h-[18px] w-[18px] flex-none accent-brand"
                  />
                  <span>
                    Acepto que me contactéis por WhatsApp y llamada, y acepto la{" "}
                    <a href="/privacidad">política de privacidad</a>.
                  </span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-5 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-7 flex gap-2.5">
        {!wide && current > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="h-14 flex-none cursor-pointer rounded-[10px] border border-line bg-white px-5 text-sm font-semibold text-muted"
          >
            Atrás
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={submitting}
          className="h-14 flex-1 cursor-pointer rounded-[10px] border-none bg-brand text-[15px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Enviando..."
            : submits
              ? "Ver huecos disponibles"
              : "Siguiente"}
        </button>
      </div>
    </div>
  );
}

function isSelected(value: string | string[] | undefined, option: string) {
  return Array.isArray(value) ? value.includes(option) : value === option;
}

/**
 * La maquette laisse passer un formulaire vide ; en production un lead sans
 * réponses n'est pas exploitable, donc on vérifie avant d'envoyer.
 */
function validate(
  toCheck: Question[],
  answers: Answers,
  contact: Contact,
): string | null {
  for (const question of toCheck) {
    if (question.contact) {
      if (!contact.nombre.trim()) return "Escribe tu nombre.";
      if (contact.telefono.replace(/\D/g, "").length < 8) {
        return "Escribe un número de WhatsApp válido.";
      }
      if (!contact.consentimiento) {
        return "Necesitamos tu consentimiento para poder contactarte.";
      }
      continue;
    }
    if (question.text) continue; // Réponse libre : facultative.

    const value = answers[question.id];
    const empty = Array.isArray(value) ? value.length === 0 : !value;
    if (empty) return "Responde a esta pregunta para continuar.";
  }
  return null;
}

function serialize(answers: Answers, contact: Contact): Record<string, string> {
  const out: Record<string, string> = {};
  for (const question of questions) {
    const value = answers[question.id];
    if (Array.isArray(value)) out[question.id] = value.join(" · ");
    else if (value) out[question.id] = value;
  }
  out.nombre = contact.nombre.trim();
  out.telefono = `${contact.prefijo} ${contact.telefono.trim()}`.trim();
  out.consentimiento = contact.consentimiento ? "si" : "";
  return out;
}
