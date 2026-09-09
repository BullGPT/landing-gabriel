import type { Metadata } from "next";
import { site } from "@/config/site";
import { Header, ProgressBar } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow } from "@/components/site/Eyebrow";

export const metadata: Metadata = {
  title: `Solicitud recibida | ${site.brand}`,
  robots: { index: false, follow: false },
};

/** Étape 4 : confirmation. C'est ici que se déclenchent les pixels de conversion. */
export default function GraciasPage() {
  return (
    <>
      {/* Pixels de conversion (Meta « Lead », GA4 « generate_lead ») à poser ici. */}
      <Header variant="centered" />
      <ProgressBar percent={100} />

      <main>
        <section className="mx-auto max-w-[820px] px-6 pt-[clamp(44px,6vw,72px)] text-center">
          <svg
            width="88"
            height="88"
            viewBox="0 0 88 88"
            fill="none"
            className="mx-auto block"
            aria-hidden
          >
            <circle cx="44" cy="44" r="42" fill="#E7ECFF" />
            <path
              d="M26 46l12 12 24-26"
              stroke="#2B4FF0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="160"
              style={{ animation: "draw .9s ease-out both" }}
            />
          </svg>

          <h1 className="mt-6.5 text-[clamp(32px,5vw,50px)] font-extrabold leading-[1.06] tracking-[-0.02em] text-pretty">
            Perfecto, hemos recibido
            <br />
            <span className="text-brand">tu solicitud.</span>
          </h1>
          <p className="mx-auto mt-4.5 max-w-[56ch] text-[17px] text-muted text-pretty">
            Revisamos cada formulario a mano. Si encajas, te contactamos por
            WhatsApp en menos de 24 horas.
          </p>
        </section>

        <section className="mx-auto max-w-[1120px] px-6 pt-[clamp(44px,6vw,72px)]">
          <div className="text-center">
            <Eyebrow>Siguientes pasos</Eyebrow>
            <h2 className="mb-8 mt-3.5 text-[clamp(26px,3.6vw,38px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Qué hacer
              <br />
              <span className="text-brand">ahora.</span>
            </h2>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-5">
            <StepCard
              index="01"
              art={
                <svg width="200" height="130" viewBox="0 0 200 130" fill="none" stroke="#0B1533" strokeWidth="1.5" aria-hidden>
                  <rect x="62" y="10" width="76" height="110" rx="12" fill="#FFFFFF" />
                  <path d="M88 20h24" stroke="#C9D4FF" />
                  <rect x="74" y="36" width="52" height="20" rx="6" fill="#2B4FF0" stroke="none" />
                  <path d="M78 70h44M78 84h32" stroke="#C9D4FF" />
                  <circle cx="100" cy="104" r="7" fill="#E7ECFF" />
                </svg>
              }
            >
              Guarda este número en tu móvil:{" "}
              <strong>{site.whatsappNumber}</strong> para no perderte nuestro
              mensaje.
            </StepCard>

            <StepCard
              index="02"
              art={
                <svg width="200" height="130" viewBox="0 0 200 130" fill="none" stroke="#0B1533" strokeWidth="1.5" aria-hidden>
                  <rect x="34" y="30" width="132" height="80" rx="10" fill="#FFFFFF" />
                  <path d="M34 38l66 44 66-44" />
                  <rect x="120" y="18" width="52" height="24" rx="8" fill="#2B4FF0" stroke="none" />
                  <text x="130" y="35" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#FFFFFF" stroke="none">
                    nuevo
                  </text>
                </svg>
              }
            >
              Revisa tu correo, te hemos enviado un recurso de acceso inmediato.
            </StepCard>

            <div className="rounded-[20px] border border-line bg-white p-7 shadow-[0_4px_24px_rgba(11,21,51,.06)]">
              {/* Remplacer par l'embed de la vidéo bonus. */}
              <div className="flex h-40 items-center justify-center rounded-[14px] bg-[repeating-linear-gradient(135deg,#F8FAFF_0_12px,#F4F6FB_12px_24px)]">
                <span className="flex h-13 w-13 items-center justify-center rounded-full bg-brand">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden>
                    <path d="M3 2l11 7-11 7z" fill="#FFFFFF" />
                  </svg>
                </span>
              </div>
              <span className="mt-5 inline-block font-mono text-[11px] tracking-[0.12em] text-brand">
                03
              </span>
              <p className="mt-2 text-[16.5px]">Mira este vídeo mientras esperas.</p>
            </div>
          </div>
        </section>

        <section className="mt-[clamp(56px,7vw,96px)] bg-brand px-6 py-[clamp(48px,6vw,80px)] text-white">
          <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-8">
            <div className="flex-[1_1_420px]">
              <h2 className="m-0 text-[clamp(26px,3.6vw,40px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
                Contenido extra
                <br />
                <span className="text-white/70">mientras esperas.</span>
              </h2>
              <p className="mt-3.5 max-w-[52ch] text-[16.5px] text-white/80">
                Accede al canal privado y a la guía de análisis en 3 pasos.
              </p>
            </div>
            <a
              href="#bonus"
              className="flex h-15 flex-none items-center rounded-xl bg-white px-7 text-[15px] font-bold uppercase tracking-[0.06em] text-brand no-underline transition-colors hover:bg-ink hover:text-white hover:no-underline"
            >
              Ver el bonus
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function StepCard({
  index,
  art,
  children,
}: {
  index: string;
  art: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] border border-line bg-white p-7 shadow-[0_4px_24px_rgba(11,21,51,.06)]">
      <div className="flex h-40 items-center justify-center overflow-hidden rounded-[14px] bg-surface">
        {art}
      </div>
      <span className="mt-5 inline-block font-mono text-[11px] tracking-[0.12em] text-brand">
        {index}
      </span>
      <p className="mt-2 text-[16.5px]">{children}</p>
    </div>
  );
}
