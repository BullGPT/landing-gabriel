import Link from "next/link";
import { site } from "@/config/site";
import { Eyebrow, Stars } from "@/components/site/Eyebrow";

const HATCH =
  "bg-[repeating-linear-gradient(135deg,#F8FAFF_0_12px,#F4F6FB_12px_24px)]";

/** Bandeau « Compatible con » : plateformes supportées. */
export function CompatibleWith() {
  const platforms = ["TradingView", "Binance", "MetaTrader", "Bybit", "OANDA"];
  return (
    <div className="mx-auto max-w-[1120px] text-center">
      <Eyebrow>Compatible con</Eyebrow>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3.5 text-[17px] font-semibold text-muted opacity-60">
        {platforms.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
    </div>
  );
}

/** Capture d'écran du produit, présentée dans un chrome de navigateur. */
export function ToolShowcase() {
  return (
    <div className="mx-auto max-w-[1120px] text-center">
      <Eyebrow>La herramienta</Eyebrow>
      <h2 className="mt-3.5 text-[clamp(28px,4.2vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
        Un análisis completo en una sola pantalla
        <br />
        <span className="text-brand">sin veinte indicadores encima.</span>
      </h2>

      <div className="mx-auto mt-9 max-w-[1000px] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_4px_24px_rgba(11,21,51,.06)]">
        <div className="flex items-center gap-2 border-b border-line bg-surface px-3.5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-2.5 h-[22px] max-w-[300px] flex-1 rounded-md border border-line bg-white" />
        </div>
        {/* Remplacer par la capture réelle de l'interface. */}
        <div
          className={`flex aspect-video items-center justify-center font-mono text-[11.5px] tracking-[0.08em] text-placeholder ${HATCH}`}
        >
          [ CAPTURA DE INTERFAZ ]
        </div>
      </div>
    </div>
  );
}

/** Bloc statistique sur fond gris. */
export function StatBand() {
  return (
    <div className="bg-surface px-6 py-[clamp(48px,6vw,72px)] text-center">
      <div className="text-[clamp(38px,6vw,48px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-brand">
        {site.proof.statFigure}
      </div>
      <p className="mx-auto mt-3 max-w-[52ch] italic text-muted">
        Traders en Estados Unidos que ya integran herramientas de IA en su
        análisis diario.
      </p>
      <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-placeholder">
        Fuente: {site.proof.statSource}
      </p>
    </div>
  );
}

/** Deux colonnes : le problème du prospect, puis ce qui a changé aux USA. */
export function ProblemChange() {
  return (
    <div className="mx-auto grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10">
      <div>
        <Eyebrow>El problema</Eyebrow>
        <h2 className="mb-4 mt-3.5 text-[clamp(26px,3.4vw,36px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-pretty">
          Si llevas meses operando sin resultados,
          <br />
          <span className="text-brand">no es culpa tuya.</span>
        </h2>
        <p className="mb-3.5 max-w-[60ch] text-[16.5px] text-muted">
          Nadie te ha enseñado a decidir. Te han dado veinte indicadores, tres
          grupos de Telegram y la sensación de que si miras el gráfico el tiempo
          suficiente, algo acabará teniendo sentido. Así que abres una operación
          porque parece buena, no porque tengas un criterio que puedas repetir
          mañana.
        </p>
        <p className="m-0 max-w-[60ch] text-[16.5px] text-muted">
          El problema casi nunca es la falta de esfuerzo. Es la falta de un
          método objetivo que te diga qué mirar, en qué orden y cuándo quedarte
          fuera. Sin eso, cada operación empieza de cero y el resultado depende
          de cómo te sientas ese día.
        </p>
      </div>

      <div>
        <Eyebrow>El cambio</Eyebrow>
        <h2 className="mb-4 mt-3.5 text-[clamp(26px,3.4vw,36px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-pretty">
          Lo que cambió en Estados Unidos
          <br />
          <span className="text-brand">en los últimos 18 meses.</span>
        </h2>
        <p className="mb-3.5 max-w-[60ch] text-[16.5px] text-muted">
          Hasta hace poco, analizar un gráfico con modelos de inteligencia
          artificial era cosa de mesas institucionales. Ahora existen
          herramientas que cualquier particular puede usar desde el móvil para
          leer estructura, volumen y contexto en segundos, y para contrastar su
          propia idea antes de entrar.
        </p>
        <p className="m-0 max-w-[60ch] text-[16.5px] text-muted">
          En Estados Unidos esa adopción ya es normal y se comparte de forma
          abierta. En España el retraso es de aproximadamente año y medio: la
          mayoría sigue operando como en 2019. Esa diferencia de adopción es
          exactamente lo que vas a ver en el vídeo.
        </p>
      </div>
    </div>
  );
}

/** Mur de témoignages en colonnes (masonry CSS). */
export function SocialProof() {
  return (
    <div className="bg-surface px-6 py-[clamp(56px,7vw,96px)]">
      <div className="mx-auto max-w-[1120px]">
        <div className="text-center">
          <Eyebrow>Prueba social</Eyebrow>
          <h2 className="mt-3.5 text-[clamp(28px,4.2vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
            Tenían las mismas dudas
            <br />
            <span className="text-brand">que tú.</span>
          </h2>
        </div>

        <div className="mt-10 [column-gap:20px] [columns:3_300px]">
          <Card>
            <Avatar name="Javier M." handle="@javi_trades" />
            <p className="mt-3.5 text-base">
              Antes abría operaciones por intuición. Ahora tengo un orden de
              análisis y sé cuándo quedarme fuera.
            </p>
          </Card>

          <Card>
            <Stars className="text-[13px]" />
            <p className="mt-3 text-base">
              Lo que más me ha cambiado es el tiempo. Reviso el gráfico en un par
              de minutos y decido con criterio.
            </p>
            <Meta>
              Nuria S. · Madrid · <span className="text-star">Trustpilot</span>
            </Meta>
          </Card>

          <Card>
            <p className="mb-3.5 text-base">
              No es una sala de señales. Te explican el porqué, y eso es lo que
              buscaba desde el principio.
            </p>
            {/* Remplacer par la vraie capture du message d'un élève. */}
            <div
              className={`flex h-[150px] items-center justify-center rounded-xl border border-line font-mono text-[11px] tracking-[0.08em] text-placeholder ${HATCH}`}
            >
              [ CAPTURA DE MENSAJE ]
            </div>
            <Meta>Álex R. · Sevilla</Meta>
          </Card>

          <Card>
            <Stars className="text-[13px]" />
            <p className="mt-3 text-base">
              Entendí en una semana lo que llevaba dos años buscando.
            </p>
            <Meta>
              Iván G. · Zaragoza · <span className="text-star">Trustpilot</span>
            </Meta>
          </Card>

          <Card>
            <Avatar name="Lucía P." handle="@lucia.mercados" />
            <p className="mt-3.5 text-base">
              Lo que más noto es que ya no opero enfadado. Sigo el proceso y se
              acabó.
            </p>
          </Card>

          <div className="mb-5 break-inside-avoid rounded-[20px] bg-brand p-6 text-white">
            <p className="m-0 text-base">
              Pasé de improvisar a tener un proceso que repito cada día.
            </p>
            <div className="mt-3.5 text-[13px] text-white/70">
              Carlos D. · Barcelona
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 break-inside-avoid rounded-[20px] border border-line bg-white p-6">
      {children}
    </div>
  );
}

function Avatar({ name, handle }: { name: string; handle: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[38px] w-[38px] rounded-full bg-brand-tint" />
      <span className="flex flex-col leading-tight">
        <strong className="text-[15px]">{name}</strong>
        <span className="text-[13px] text-faint">{handle}</span>
      </span>
    </div>
  );
}

function Meta({ children }: { children: React.ReactNode }) {
  return <div className="mt-3.5 text-[13px] text-faint">{children}</div>;
}

/** Section de disqualification : pour qui ce n'est pas / c'est. */
export function Qualification() {
  const notFor = [
    "Buscas señales para copiar sin entender qué hay detrás.",
    "Esperas resultados garantizados o dinero rápido sin trabajo.",
  ];
  const forYou = [
    "Ya has operado y sabes lo que es perder por decisiones impulsivas.",
    "Quieres un método claro en lugar de acumular más indicadores.",
    "Puedes dedicar entre 30 y 45 minutos al día a analizar con criterio.",
    "Te interesa entender la herramienta, no que alguien te diga dónde entrar.",
  ];

  return (
    <div className="mx-auto max-w-[1120px]">
      <div className="text-center">
        <Eyebrow>Cualificación</Eyebrow>
        <h2 className="mt-3.5 text-[clamp(28px,4.2vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          Esto no es para
          <br />
          <span className="text-brand">todo el mundo.</span>
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        <div className="rounded-[20px] border border-line bg-white p-7">
          <span className="inline-block rounded-full bg-danger-tint px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-danger">
            NO ES PARA TI SI
          </span>
          <ul className="m-0 mt-5 flex list-none flex-col gap-4 p-0">
            {notFor.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="#E03B3B"
                  strokeWidth="1.5"
                  className="mt-[5px] flex-none"
                  aria-hidden
                >
                  <path d="M3 3l12 12M15 3L3 15" />
                </svg>
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[20px] border border-brand-line bg-white p-7 shadow-[0_4px_24px_rgba(43,79,240,.08)]">
          <span className="inline-block rounded-full bg-brand-tint px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-brand">
            SÍ ES PARA TI SI
          </span>
          <ul className="m-0 mt-5 flex list-none flex-col gap-4 p-0">
            {forYou.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="#2B4FF0"
                  strokeWidth="1.5"
                  className="mt-[5px] flex-none"
                  aria-hidden
                >
                  <path d="M3 9.5l4 4L15 5" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-8 text-center text-[19px] font-bold tracking-[-0.01em]">
        ¿Te reconoces a la derecha? Bienvenido.
      </p>
    </div>
  );
}

/** Bandeau CTA bleu de fin de page. */
export function CtaBand({
  href,
  label,
  note,
}: {
  href: string;
  label: string;
  note: React.ReactNode;
}) {
  return (
    <div className="bg-brand px-6 py-[clamp(56px,7vw,96px)] text-white">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-9">
        <h2 className="m-0 flex-[1_1_420px] text-[clamp(30px,4.6vw,50px)] font-extrabold leading-[1.06] tracking-[-0.02em]">
          La IA ya salió
          <br />
          de Wall Street.
          <br />
          <span className="text-white/70">Elige tu bando.</span>
        </h2>
        <div className="flex-[0_1_340px]">
          <Link
            href={href}
            className="flex h-15 w-full items-center justify-center rounded-xl bg-white text-[15px] font-bold uppercase tracking-[0.06em] text-brand no-underline transition-colors hover:bg-ink hover:text-white hover:no-underline"
          >
            {label}
          </Link>
          <div className="mt-3 text-center">{note}</div>
        </div>
      </div>
    </div>
  );
}
