"use client";

import { useEffect, useRef, useState } from "react";
import { VslPlayer } from "./VslPlayer";
import { QualificationForm } from "./QualificationForm";
import { CalendlyEmbed } from "./CalendlyEmbed";
import { captureAttribution } from "@/lib/attribution";
import { site } from "@/config/site";

type Stage = "vsl" | "form" | "calendar";

/**
 * Machine d'états du funnel : VSL → questionnaire → calendrier.
 * Une seule page, pas de navigation : on ne perd personne entre deux étapes.
 */
export function Funnel() {
  const [stage, setStage] = useState<Stage>("vsl");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [ctaVisible, setCtaVisible] = useState(site.vsl.ctaDelaySeconds === 0);
  const stageAnchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    if (ctaVisible) return;
    const timer = setTimeout(
      () => setCtaVisible(true),
      site.vsl.ctaDelaySeconds * 1000,
    );
    return () => clearTimeout(timer);
  }, [ctaVisible]);

  useEffect(() => {
    if (stage !== "vsl") {
      stageAnchor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [stage]);

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-4xl">
        <VslPlayer />
      </div>

      <div ref={stageAnchor} className="mt-12 scroll-mt-8">
        {stage === "vsl" && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setStage("form")}
              disabled={!ctaVisible}
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Solicitar mi llamada gratuita
            </button>
            <p className="mt-4 text-sm opacity-50">
              Plazas limitadas · Sin compromiso
            </p>
          </div>
        )}

        {stage === "form" && (
          <QualificationForm
            onQualified={(submitted) => {
              setAnswers(submitted);
              setStage("calendar");
            }}
          />
        )}

        {stage === "calendar" && (
          <div className="mx-auto w-full max-w-3xl">
            <h2 className="mb-2 text-center text-2xl font-semibold">
              Último paso: elige tu horario
            </h2>
            <p className="mb-8 text-center text-sm opacity-60">
              Reserva el momento que mejor te venga. La llamada dura 30 minutos.
            </p>
            <CalendlyEmbed
              prefill={{ name: answers.nombre, email: answers.email }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
