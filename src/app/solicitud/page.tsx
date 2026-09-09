import type { Metadata } from "next";
import { site } from "@/config/site";
import { Header, ProgressBar } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { QualificationForm } from "@/components/QualificationForm";
import { TypeformEmbed } from "@/components/site/TypeformEmbed";

export const metadata: Metadata = {
  title: `Último paso | ${site.brand}`,
  robots: { index: false, follow: false },
};

const reassurance = [
  {
    title: "Sin compromiso",
    body: "Solo queremos saber si esto encaja contigo.",
    art: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="#0B1533" strokeWidth="1.5" aria-hidden>
        <rect x="8" y="6" width="36" height="40" rx="6" fill="#F4F6FB" />
        <path d="M17 20l4 4 8-9" stroke="#2B4FF0" />
        <path d="M17 32h18" stroke="#C9D4FF" />
      </svg>
    ),
  },
  {
    title: "Respuesta en menos de 24 horas",
    body: "Revisamos cada formulario a mano.",
    art: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="#0B1533" strokeWidth="1.5" aria-hidden>
        <circle cx="26" cy="26" r="18" fill="#F4F6FB" />
        <path d="M26 15v11h9" stroke="#2B4FF0" />
      </svg>
    ),
  },
  {
    title: "Plazas limitadas por semana",
    body: "Cerramos cuando se completan.",
    art: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="#0B1533" strokeWidth="1.5" aria-hidden>
        <rect x="8" y="10" width="36" height="32" rx="6" fill="#F4F6FB" />
        <rect x="14" y="18" width="10" height="16" fill="#2B4FF0" stroke="none" />
        <path d="M28 22h10M28 30h10" stroke="#C9D4FF" />
      </svg>
    ),
  },
];

/** Étape 3 du funnel : la candidature. */
export default function SolicitudPage() {
  return (
    <>
      <Header variant="centered" />
      <ProgressBar percent={75} />

      <main>
        <section className="mx-auto max-w-[1120px] px-6 pb-[clamp(56px,7vw,96px)] pt-[clamp(36px,5vw,64px)]">
          <div className="flex flex-wrap-reverse items-start gap-10">
            <aside className="wide-only sticky top-24 flex-[0_1_260px] flex-col gap-4">
              {reassurance.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-line bg-white p-5"
                >
                  {item.art}
                  <div className="mt-3 text-base font-bold">{item.title}</div>
                  <p className="mt-1.5 text-[14.5px] text-muted">{item.body}</p>
                </div>
              ))}
            </aside>

            <div className="min-w-[280px] flex-[1_1_560px]">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand">
                Paso 3 de 4
              </div>
              <h1 className="mt-3.5 text-[clamp(32px,4.6vw,48px)] font-extrabold leading-[1.06] tracking-[-0.02em]">
                Último paso
                <br />
                <span className="text-brand">antes de tu sesión.</span>
              </h1>
              <p className="mt-4.5 max-w-[60ch] text-[17px] text-muted text-pretty">
                Rellena el formulario para que podamos entender tu situación y
                decirte si esto encaja contigo. Tarda menos de 2 minutos.
              </p>

              {site.application.mode === "typeform" ? (
                <TypeformEmbed />
              ) : (
                <QualificationForm />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
