import { Funnel } from "@/components/Funnel";

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-12 sm:py-20">
      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] opacity-50">
          Programa de acompañamiento 1 a 1
        </p>
        <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
          Deja de operar a ciegas y construye un método que funcione
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-lg opacity-70">
          Mira el vídeo hasta el final y descubre cómo trabajamos con traders
          que ya operan pero no consiguen resultados constantes.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-5xl">
        <Funnel />
      </section>
    </main>
  );
}
