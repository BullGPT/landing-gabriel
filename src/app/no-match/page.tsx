import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Todavía no es tu momento | ${site.brand}`,
  robots: { index: false, follow: false },
};

/**
 * Prospect non qualifié. On le redirige vers l'offre d'entrée au lieu de lui
 * faire réserver un appel qui ne servirait ni à lui ni à Gabriel.
 */
export default function NoMatchPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="max-w-[620px] rounded-2xl border border-line bg-white p-[clamp(26px,5vw,40px)]">
        <h1 className="m-0 text-[clamp(26px,5vw,36px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-pretty">
          Todavía no es tu momento para el acompañamiento,
          <br />
          <span className="text-brand">y no pasa nada.</span>
        </h1>
        <p className="mt-5 text-[16.5px] text-muted">
          El programa completo incluye seguimiento directo, y eso solo tiene
          sentido si estás en condiciones de aprovecharlo. Mientras tanto, puedes
          empezar por tu cuenta con {site.midTicketName}: es el mismo método, sin
          el acompañamiento. Cuando estés listo, hablamos.
        </p>
        <p className="mt-6.5 text-[11.5px] text-faint">{site.legal.riskWarning}</p>
      </div>
    </main>
  );
}
