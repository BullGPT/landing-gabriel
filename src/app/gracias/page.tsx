import type { Metadata } from "next";
import { site } from "@/config/site";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: `Tu llamada está reservada | ${site.brand}`,
  robots: { index: false, follow: false },
};

const steps = [
  {
    title: "Guarda la llamada en tu calendario",
    body: "Tienes el enlace en la confirmación. Añádelo ahora, no dentro de un rato.",
  },
  {
    title: "Ten a mano dos datos",
    body: "Cuánto capital tienes disponible y en qué franja horaria puedes operar. Son las dos cosas que determinan si esto encaja contigo.",
  },
  {
    title: "Trae tu peor duda",
    body: "La pregunta incómoda, la que te frena de verdad. Es la que más nos interesa contestar.",
  },
];

/** Confirmation de réservation. C'est ici que se déclenchent les pixels. */
export default function GraciasPage() {
  return (
    <div className="pb-15">
      {/* Pixels de conversion (Meta « Schedule », GA4) à poser ici. */}
      <Header />

      <main>
        <section className="mx-auto max-w-[820px] px-5 pt-[clamp(36px,6vw,64px)]">
          <h1 className="m-0 text-[clamp(30px,6vw,46px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
            Tu llamada
            <br />
            <span className="text-brand">está reservada.</span>
          </h1>
          <p className="mt-4.5 max-w-[58ch] text-[16.5px] text-muted">
            Te acabamos de mandar la confirmación por WhatsApp. Tres cosas antes
            de que nos veamos.
          </p>

          <div className="mt-7 flex flex-col gap-3.5">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <span className="font-mono text-[11px] tracking-[0.12em] text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="my-2 text-[19px] font-bold tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="m-0 text-[15.5px] text-muted">{step.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-6.5 max-w-[62ch] text-base text-muted">
            Si te surge algo y no puedes asistir, avísanos por WhatsApp y la
            movemos. Solo hacemos diez llamadas al mes, y hay gente esperando
            hueco.
          </p>

          <p className="mt-8 max-w-[96ch] text-[11.5px] leading-[1.7] text-faint">
            {site.legal.riskWarning}
          </p>
        </section>
      </main>
    </div>
  );
}
