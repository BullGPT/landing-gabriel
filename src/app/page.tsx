import { activeHeroVariant, site } from "@/config/site";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Faq } from "@/components/site/Faq";
import { Reveal } from "@/components/site/Reveal";
import { Stars } from "@/components/site/Eyebrow";
import { OptinForm } from "@/components/site/OptinForm";
import { MethodCards } from "@/components/landing/MethodCards";
import {
  CompatibleWith,
  CtaBand,
  ProblemChange,
  Qualification,
  SocialProof,
  StatBand,
  ToolShowcase,
} from "@/components/landing/Sections";

/** Étape 1 du funnel : capture d'email en échange de la VSL. */
export default function CapturaPage() {
  const hero = activeHeroVariant();

  return (
    <>
      <div className="bg-brand px-4 py-2.5 text-center text-[13px] tracking-[0.04em] text-white">
        NUEVO · MÉTODO IMPORTADO DE EE.UU.
      </div>

      <Header />

      <main>
        <section className="mx-auto max-w-[1120px] px-6 pt-[clamp(40px,6vw,68px)]">
          <div className="hero-grid">
            <div className="hero-t">
              <span className="inline-block rounded-full bg-brand-tint px-3 py-1.5 text-xs font-medium text-brand">
                Análisis con IA · nivel profesional
              </span>
              <h1 className="mt-5 text-[clamp(34px,5.4vw,56px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-pretty">
                {hero.lead} <span className="text-brand">{hero.accent}</span>
              </h1>
              <p className="mt-5 max-w-[60ch] text-[17px] text-muted text-pretty">
                Deja de operar a ciegas. Descubre cómo analizar cualquier gráfico
                en menos de 30 segundos con IA, el mismo sistema que usan miles
                de traders en Estados Unidos y que casi nadie aplica todavía en
                España.
              </p>
            </div>

            <div className="hero-f">
              <OptinForm />
            </div>

            <div className="hero-b">
              <ul className="m-0 flex max-w-[60ch] list-none flex-col gap-4.5 p-0">
                <li className="flex items-start gap-3.5">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    stroke="#2B4FF0"
                    strokeWidth="1.5"
                    className="mt-0.5 flex-none"
                    aria-hidden
                  >
                    <path d="M13 2v4M13 20v4" />
                    <rect x="8" y="6" width="10" height="14" rx="2" fill="#E7ECFF" />
                  </svg>
                  <span>
                    Por qué el 90% de los traders españoles pierde dinero
                    haciendo justo lo contrario
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    stroke="#2B4FF0"
                    strokeWidth="1.5"
                    className="mt-0.5 flex-none"
                    aria-hidden
                  >
                    <path d="M3 22h20" />
                    <rect x="5" y="14" width="4" height="8" fill="#E7ECFF" />
                    <rect x="11" y="9" width="4" height="13" fill="#E7ECFF" />
                    <rect x="17" y="4" width="4" height="18" fill="#2B4FF0" stroke="none" />
                  </svg>
                  <span>
                    El sistema de análisis en 3 pasos que puedes aplicar desde
                    esta misma semana
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    stroke="#2B4FF0"
                    strokeWidth="1.5"
                    className="mt-0.5 flex-none"
                    aria-hidden
                  >
                    <circle cx="6" cy="7" r="3" fill="#E7ECFF" />
                    <circle cx="20" cy="6" r="3" fill="#E7ECFF" />
                    <circle cx="13" cy="19" r="3.5" fill="#2B4FF0" stroke="none" />
                    <path d="M8 9l4 7M18 8l-4 8M9 7h8" />
                  </svg>
                  <span>
                    Cómo usar la IA para eliminar la parte emocional de tus
                    decisiones
                  </span>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-sm text-muted">
                <Stars />
                <span>
                  <strong className="text-ink">{site.proof.rating} sobre 5</strong>{" "}
                  en Trustpilot
                </span>
                <span className="text-faint">
                  Más de {site.proof.studentsCount} traders formados
                </span>
              </div>
            </div>
          </div>
        </section>

        <Reveal className="px-6 pt-[clamp(48px,6vw,72px)]">
          <CompatibleWith />
        </Reveal>

        <Reveal className="px-6 pt-[clamp(72px,9vw,120px)]">
          <ToolShowcase />
        </Reveal>

        <Reveal className="mt-[clamp(72px,9vw,120px)]">
          <StatBand />
        </Reveal>

        <Reveal className="px-6 pt-[clamp(72px,9vw,120px)]">
          <MethodCards />
        </Reveal>

        <Reveal className="px-6 pt-[clamp(72px,9vw,120px)]">
          <ProblemChange />
        </Reveal>

        <Reveal className="mt-[clamp(72px,9vw,120px)]">
          <SocialProof />
        </Reveal>

        <Reveal className="px-6 pt-[clamp(72px,9vw,120px)]">
          <Qualification />
        </Reveal>

        <Reveal className="px-6 pt-[clamp(72px,9vw,120px)]">
          <Faq />
        </Reveal>

        <Reveal className="mt-[clamp(72px,9vw,120px)]">
          <CtaBand
            href="/vsl"
            label="Ver el vídeo ahora"
            note={
              <p className="m-0 text-xs text-white/70">
                1 vídeo · {site.vsl.durationLabel} · acceso inmediato
              </p>
            }
          />
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
