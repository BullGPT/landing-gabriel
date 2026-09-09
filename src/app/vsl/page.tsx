import type { Metadata } from "next";
import { site } from "@/config/site";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Faq } from "@/components/site/Faq";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, Stars } from "@/components/site/Eyebrow";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { VslPlayer } from "@/components/VslPlayer";
import { LimitedSeats, VslCta } from "@/components/site/VslCta";
import { CtaBand } from "@/components/landing/Sections";

export const metadata: Metadata = {
  title: `El vídeo completo | ${site.brand}`,
  description: site.seo.description,
  // Page intermédiaire du funnel : elle n'a rien à faire dans les moteurs.
  robots: { index: false, follow: false },
};

const testimonials = [
  {
    quote:
      "Antes abría operaciones por intuición. Ahora tengo un orden de análisis y sé cuándo quedarme fuera.",
    author: "Javier M.",
    meta: "Valencia · 8 meses operando",
  },
  {
    quote:
      "Lo que más me ha cambiado es el tiempo. Reviso el gráfico en un par de minutos y decido con criterio.",
    author: "Nuria S.",
    meta: "Madrid · 2 años operando",
  },
  {
    quote:
      "No es una sala de señales. Te explican el porqué, y eso es lo que buscaba desde el principio.",
    author: "Álex R.",
    meta: "Sevilla · 1 año operando",
  },
];

const videoTestimonials = [
  { quote: "Pasé de improvisar a tener un proceso que repito cada día.", author: "Carlos D. · Barcelona" },
  { quote: "Lo que más noto es que ya no opero enfadado.", author: "Lucía P. · Bilbao" },
  { quote: "Entendí en una semana lo que llevaba dos años buscando.", author: "Iván G. · Zaragoza" },
];

/** Étape 2 du funnel : la VSL et le CTA vers la candidature. */
export default function VslPage() {
  return (
    <>
      <Header />

      <main>
        <section id="video" className="bg-surface px-6 py-[clamp(44px,6vw,72px)]">
          <div className="mx-auto max-w-[960px] text-center">
            <Eyebrow>El vídeo · {site.vsl.durationLabel}</Eyebrow>
            <h1 className="mt-3.5 text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.06] tracking-[-0.02em] text-pretty">
              Mira el vídeo completo
              <br />
              <span className="text-brand">antes de que lo retiremos.</span>
            </h1>
            <p className="mx-auto mt-4.5 max-w-[56ch] text-[17px] text-muted">
              Dura {site.vsl.durationLabel}. Ve hasta el final, la parte
              importante está en el minuto 11.
            </p>

            <VslPlayer />
            <VslCta />
          </div>
        </section>

        <Reveal className="px-6 pt-[clamp(56px,7vw,96px)]">
          <div className="mx-auto max-w-[1120px]">
            <div className="text-center">
              <Eyebrow>Prueba social</Eyebrow>
              <h2 className="mt-3.5 text-[clamp(28px,4.2vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
                Lo que dicen
                <br />
                <span className="text-brand">quienes ya lo aplican.</span>
              </h2>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3.5 rounded-2xl border border-line bg-white px-5.5 py-4.5 shadow-[0_4px_24px_rgba(11,21,51,.06)]">
              <Stars />
              <span className="font-bold">{site.proof.rating} sobre 5</span>
              <span className="text-sm text-muted">
                {site.proof.reviewsCount} valoraciones verificadas
              </span>
              <span className="font-mono text-[11px] text-placeholder">
                [ WIDGET TRUSTPILOT ]
              </span>
            </div>

            <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              {testimonials.map((item) => (
                <TestimonialCard key={item.author} {...item} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="px-6 pt-[clamp(56px,7vw,96px)]">
          <div className="mx-auto max-w-[1120px]">
            <div className="text-center">
              <Eyebrow>Testimonios en vídeo</Eyebrow>
              <h2 className="mb-8 mt-3.5 text-[clamp(28px,4.2vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
                Tres personas,
                <br />
                <span className="text-brand">el mismo punto de partida.</span>
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              {videoTestimonials.map((item, index) => (
                <div
                  key={item.author}
                  className="overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_4px_24px_rgba(11,21,51,.06)]"
                >
                  {/* Remplacer par l'embed du témoignage vidéo. */}
                  <div className="flex aspect-[16/10] items-center justify-center bg-[repeating-linear-gradient(135deg,#F8FAFF_0_10px,#F4F6FB_10px_20px)] font-mono text-[11px] tracking-[0.08em] text-placeholder">
                    [ EMBED TESTIMONIO {index + 1} ]
                  </div>
                  <div className="p-5.5">
                    <p className="mb-2.5 text-base">“{item.quote}”</p>
                    <span className="text-[13.5px] text-faint">{item.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="px-6 pt-[clamp(56px,7vw,96px)]">
          <Faq />
        </Reveal>

        <Reveal className="mt-[clamp(72px,9vw,120px)]">
          <CtaBand
            href="/solicitud"
            label="Quiero dar el siguiente paso"
            note={<LimitedSeats tone="onBrand" />}
          />
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
