import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Faq } from "@/components/site/Faq";
import { Funnel } from "@/components/vsl/Funnel";
import { MiniPlayer } from "@/components/vsl/MiniPlayer";
import { StickyBar } from "@/components/vsl/StickyBar";
import { FinalCta } from "@/components/vsl/FinalCta";
import {
  CallExplainer,
  MethodCards,
  NotYourFault,
  Qualification,
  SocialProofSlots,
  UsaGap,
} from "@/components/landing/Sections";

export default function LandingPage() {
  return (
    // Marge basse : la barre d'action fixe ne doit pas masquer le footer.
    <div className="pb-24">
      <div className="bg-brand px-4 py-2.5 text-center text-[13px] tracking-[0.04em] text-white">
        NUEVO · MÉTODO IMPORTADO DE EE.UU.
      </div>

      <Header />

      <main>
        <section className="mx-auto max-w-[900px] px-5 pt-[clamp(28px,5vw,52px)] text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Tu acceso está listo
          </div>
          <h1 className="mt-3.5 text-[clamp(32px,7vw,52px)] font-extrabold leading-[1.06] tracking-[-0.025em] text-pretty">
            Vive del trading con inteligencia artificial,
            <br />
            <span className="text-brand">una hora al día.</span>
          </h1>
          <p className="mx-auto mt-4.5 max-w-[60ch] text-[16.5px] text-muted text-pretty">
            Dentro del vídeo está el método completo que usan los traders
            americanos para operar con criterio propio: sin años estudiando
            análisis técnico, sin copiar las señales de nadie y sin pasar el día
            delante de una pantalla. Dura 24 minutos. Ponlo con sonido y míralo
            entero.
          </p>
        </section>

        <Funnel />

        <NotYourFault />
        <MethodCards />
        <UsaGap />
        <SocialProofSlots />
        <CallExplainer />
        <Qualification />

        <section className="px-5 pt-[clamp(44px,7vw,80px)]">
          <div className="mx-auto max-w-[820px]">
            <h2 className="m-0 mb-6.5 text-[clamp(26px,5.4vw,38px)] font-extrabold leading-[1.1] tracking-[-0.025em]">
              Todo lo que quieres saber
              <br />
              <span className="text-brand">antes de dar el paso.</span>
            </h2>
            <Faq />
          </div>
        </section>

        <section className="mt-[clamp(48px,8vw,88px)] bg-brand px-5 py-[clamp(48px,7vw,88px)] text-white">
          <div className="mx-auto max-w-[820px] text-center">
            <h2 className="m-0 text-[clamp(28px,6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
              La IA ya salió de Wall Street.
            </h2>
            <p className="mx-auto mt-4.5 max-w-[56ch] text-[16.5px] text-white/80">
              La pregunta ya no es si vas a operar con ella. Es si vas a hacerlo
              antes o después que el resto del mercado español.
            </p>
            <FinalCta />
            <p className="mt-3.5 text-[13px] text-white/70">
              Diez plazas al mes · Respuesta en menos de 24 horas
            </p>
          </div>
        </section>
      </main>

      <Footer />

      <MiniPlayer />
      <StickyBar />
    </div>
  );
}
