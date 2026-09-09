"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { phonePrefixes } from "@/config/questions";
import { getAttribution } from "@/lib/attribution";

const FIELD_CLASS =
  "w-full rounded-xl border border-line bg-white px-3.5 py-[15px] text-base text-ink outline-none transition-colors focus:border-brand";
const LABEL_CLASS =
  "flex flex-col gap-[7px] text-[13.5px] font-medium text-muted";

/**
 * Opt-in de l'étape 1. Enregistre le lead puis envoie vers la VSL :
 * même si le prospect ne va pas au bout du funnel, on a ses coordonnées.
 */
export function OptinForm() {
  const router = useRouter();
  const [prefix, setPrefix] = useState<string>(phonePrefixes[0].value);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = new FormData(event.currentTarget);
    const answers = {
      nombre: String(form.get("nombre") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      telefono: `${prefix} ${String(form.get("telefono") ?? "").trim()}`.trim(),
      consentimiento: form.get("consentimiento") ? "si" : "",
    };

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          stage: "optin",
          answers,
          attribution: getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      // Mémorisé pour l'étape 3 : on ne redemande pas les coordonnées.
      try {
        sessionStorage.setItem("lg_optin", JSON.stringify(answers));
      } catch {
        // Sans sessionStorage, l'étape 3 fonctionne quand même.
      }
      router.push("/vsl");
    } catch {
      setError("No hemos podido enviar tus datos. Inténtalo de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-[20px] border border-brand-line bg-white p-7 shadow-[0_12px_40px_rgba(43,79,240,.12)]">
      <h2 className="m-0 text-[22px] font-bold tracking-[-0.02em]">
        Accede al vídeo gratuito
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
        <label className={LABEL_CLASS}>
          Nombre
          <input
            name="nombre"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className={FIELD_CLASS}
          />
        </label>

        <label className={LABEL_CLASS}>
          Correo electrónico
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@correo.com"
            className={FIELD_CLASS}
          />
        </label>

        <label className={LABEL_CLASS}>
          Teléfono
          <span className="flex gap-2">
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              aria-label="Prefijo del país"
              className="flex-none basis-28 rounded-xl border border-line bg-white px-2 py-[15px] text-base text-ink outline-none focus:border-brand"
            >
              {phonePrefixes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              name="telefono"
              type="tel"
              required
              autoComplete="tel"
              placeholder="600 000 000"
              className={`${FIELD_CLASS} min-w-0 flex-1`}
            />
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-[11px] text-[13.5px] leading-normal text-muted">
          <input
            name="consentimiento"
            type="checkbox"
            required
            className="mt-0.5 h-[18px] w-[18px] flex-none accent-brand"
          />
          <span>
            Acepto recibir información por WhatsApp y llamada, y acepto la{" "}
            <a href="/privacidad">política de privacidad</a>.
          </span>
        </label>

        {error && (
          <p role="alert" className="m-0 text-sm text-danger">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="h-15 w-full cursor-pointer rounded-xl border-none bg-brand text-[15px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_4px_24px_rgba(43,79,240,.24)] transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Ver el vídeo ahora"}
        </button>

        <p className="m-0 text-center text-[12.5px] text-faint">
          Acceso inmediato. Sin coste. Puedes darte de baja cuando quieras.
        </p>
      </form>
    </div>
  );
}
