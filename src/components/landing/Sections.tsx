import type { ReactNode } from "react";

const CARD = "rounded-2xl border border-line bg-white p-6";
const H2 =
  "m-0 text-[clamp(26px,5.4vw,38px)] font-extrabold leading-[1.1] tracking-[-0.025em]";

/** Bandeau gris pleine largeur, utilisé pour les sections de texte. */
function Band({ children }: { children: ReactNode }) {
  return (
    <section className="mt-[clamp(48px,8vw,88px)] bg-surface px-5 py-[clamp(44px,7vw,80px)]">
      {children}
    </section>
  );
}

export function NotYourFault() {
  return (
    <Band>
      <div className="mx-auto max-w-[760px]">
        <h2 className={`${H2} text-pretty`}>
          No es falta de esfuerzo.
          <br />
          <span className="text-brand">Es que nadie te ha enseñado a decidir.</span>
        </h2>
        <p className="mt-5 text-[16.5px] text-muted">
          Te han dado veinte indicadores y ninguna regla para elegir entre ellos.
          Te han vendido señales, que te dan una operación pero nunca un
          criterio. Y el día que por fin analizas bien, tardas tanto que llegas
          tarde a la entrada.
        </p>
        <p className="mt-3.5 text-[16.5px] text-muted">
          Así que abres una operación porque parece buena, no porque tengas un
          proceso que puedas repetir mañana. Y sin proceso repetible no hay
          rentabilidad, por muy bueno que sea tu análisis puntual.
        </p>
        <p className="mt-6.5 border-l-[3px] border-brand pl-4.5 text-[clamp(19px,3.4vw,23px)] font-bold leading-[1.35] tracking-[-0.015em] text-pretty">
          Ser rentable no consiste en acertar más. Consiste en tener un método
          que aguante el mes malo.
        </p>
      </div>
    </Band>
  );
}

const MONO = "IBM Plex Mono, monospace";
const ART = {
  width: 180,
  height: 96,
  viewBox: "0 0 180 96",
  fill: "none",
  stroke: "#101A3D",
  strokeWidth: 1.4,
} as const;

const methodCards: { art: ReactNode; title: string; body: string }[] = [
  {
    art: (
      <svg {...ART} aria-hidden>
        <path d="M12 84h156" />
        <path d="M34 32v40" />
        <rect x="28" y="40" width="12" height="26" fill="#EDF1FF" />
        <path d="M62 24v52" />
        <rect x="56" y="34" width="12" height="34" fill="#2B4BF2" stroke="none" />
        <path d="M90 42v34" />
        <rect x="84" y="50" width="12" height="20" fill="#EDF1FF" />
        <rect x="48" y="18" width="30" height="60" stroke="#2B4BF2" strokeDasharray="4 4" />
        <rect x="112" y="20" width="58" height="24" rx="6" fill="#FFFFFF" />
        <path d="M120 44l-6 10 12-4" fill="#FFFFFF" />
        <text x="120" y="36" fontFamily={MONO} fontSize="10" fill="#2B4BF2" stroke="none">
          el mapa
        </text>
      </svg>
    ),
    title: "La IA analiza, tú decides",
    body: "Estructura, niveles y contexto en segundos. No le pides que te diga qué hacer, eso sería volver a las señales con otra cara. Le pides el mapa, y decides tú con tus reglas.",
  },
  {
    art: (
      <svg {...ART} aria-hidden>
        <circle cx="48" cy="52" r="28" fill="#FFFFFF" />
        <path d="M48 24v-6M38 18h20M48 52l14-11" />
        <circle cx="48" cy="52" r="3" fill="#2B4BF2" stroke="none" />
        <rect x="96" y="46" width="72" height="12" rx="6" fill="#FFFFFF" />
        <rect x="96" y="46" width="44" height="12" rx="6" fill="#2B4BF2" stroke="none" />
        <text x="96" y="32" fontFamily={MONO} fontSize="13" fill="#2B4BF2" stroke="none">
          40s
        </text>
        <path d="M96 72h44" stroke="#C9D4FF" />
      </svg>
    ),
    title: "Un análisis completo en 40 segundos",
    body: "No es el objetivo, es lo que hace posible el objetivo: operar una hora al día en lugar de cinco, y seguir llegando a tiempo a las entradas.",
  },
  {
    art: (
      <svg {...ART} aria-hidden>
        <rect x="20" y="20" width="60" height="56" rx="8" fill="#FFFFFF" />
        <rect x="32" y="34" width="36" height="28" fill="#2B4BF2" stroke="none" />
        <rect
          x="100"
          y="20"
          width="60"
          height="56"
          rx="8"
          fill="#F5F7FB"
          stroke="#C9D4FF"
          strokeDasharray="4 4"
        />
        <path d="M112 34h36M112 46h24M112 58h30" stroke="#C9D4FF" />
      </svg>
    ),
    title: "Un solo activo, un solo horario",
    body: "La rentabilidad sale de la repetición. Cien operaciones en el mismo mercado te enseñan más que saltar entre veinte.",
  },
  {
    art: (
      <svg {...ART} aria-hidden>
        <circle cx="54" cy="40" r="12" fill="#EDF1FF" />
        <circle cx="90" cy="34" r="12" fill="#EDF1FF" />
        <circle cx="126" cy="44" r="12" fill="#2B4BF2" stroke="none" />
        <path d="M40 76c4-12 14-18 28-18M76 76c4-14 16-20 28-20" />
        <path d="M66 40h12M102 38l12 4" stroke="#C9D4FF" />
      </svg>
    ),
    title: "Un entorno que te corrige",
    body: "Operar solo es lo que más cuentas revienta. En grupo alguien ve el error que llevas repitiendo tres semanas, y te lo dice antes de que te cueste dinero.",
  },
];

export function MethodCards() {
  return (
    <section className="px-5 pt-[clamp(44px,7vw,80px)]">
      <div className="mx-auto max-w-[1000px]">
        <h2 className={`${H2} text-pretty`}>
          El trabajo que te llevaba tres años aprender,
          <br />
          <span className="text-brand">ahora lo hace la máquina.</span>
        </h2>
        <p className="mt-4.5 max-w-[62ch] text-[16.5px] text-muted">
          Lo que queda en tus manos es la decisión y el riesgo. Que resulta que
          es, exactamente, la parte que sí se aprende en semanas.
        </p>

        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {methodCards.map((card) => (
            <div key={card.title} className={CARD}>
              <div className="flex h-30 items-center justify-center rounded-xl bg-surface">
                {card.art}
              </div>
              <h3 className="mb-2 mt-4.5 text-[19px] font-bold tracking-[-0.01em]">
                {card.title}
              </h3>
              <p className="m-0 text-[15.5px] text-muted">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UsaGap() {
  return (
    <Band>
      <div className="mx-auto max-w-[760px]">
        <h2 className={`${H2} text-pretty`}>
          En Estados Unidos esto ya es normal.
          <br />
          <span className="text-brand">
            En España casi nadie lo aplica todavía.
          </span>
        </h2>
        <p className="mt-5 text-[16.5px] text-muted">
          Hasta hace dos años, analizar un gráfico con modelos de inteligencia
          artificial era cosa de mesas institucionales. Hoy cualquier particular
          tiene esa capacidad en una pestaña del navegador, y en el mercado
          americano la adopción ya está hecha.
        </p>
        <p className="mt-3.5 text-[16.5px] text-muted">
          España va con año y medio de retraso. Esa diferencia de tiempo es
          exactamente tu ventaja, y no va a durar.
        </p>
      </div>
    </Band>
  );
}

/**
 * Emplacements de preuve sociale, laissés vides à dessein dans la maquette :
 * il n'y a pas de faux témoignage, chaque carte indique ce qu'il faut fournir.
 */
export function SocialProofSlots() {
  const slots = [
    {
      title: "Testimonio en texto",
      body: "Cita real + nombre y ciudad del alumno.",
    },
    {
      title: "Captura de mensaje",
      body: "Captura real de WhatsApp o del grupo.",
    },
  ];

  return (
    <section className="px-5 pt-[clamp(44px,7vw,80px)]">
      <div className="mx-auto max-w-[1000px]">
        <h2 className={H2}>
          Tenían las mismas dudas
          <br />
          <span className="text-brand">que tú.</span>
        </h2>

        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {slots.map((slot) => (
            <div
              key={slot.title}
              className="flex min-h-45 flex-col justify-center gap-2 rounded-2xl border border-dashed border-brand-line bg-surface p-6"
            >
              <span className="font-mono text-[11px] tracking-[0.1em] text-brand">
                POR RELLENAR
              </span>
              <span className="font-bold">{slot.title}</span>
              <span className="text-[14.5px] text-muted">{slot.body}</span>
            </div>
          ))}

          <div className="flex min-h-45 flex-col justify-center gap-2 rounded-2xl border border-dashed border-white/50 bg-brand p-6 text-white">
            <span className="font-mono text-[11px] tracking-[0.1em] text-white/80">
              POR RELLENAR
            </span>
            <span className="font-bold">Cita destacada</span>
            <span className="text-[14.5px] text-white/80">
              La frase más fuerte, en tarjeta azul.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const callSteps = [
  {
    title: "Miramos por qué no eres rentable hoy",
    body: "Capital, tiempo disponible, qué has probado y en qué punto se te rompe el proceso. Sin esos datos no podemos decirte nada útil.",
  },
  {
    title: "Te decimos si encajas o no",
    body: "Si el sistema encaja con tu caso, te explicamos exactamente cómo funciona el programa. Si no encaja, te lo decimos igual y la llamada se acaba ahí.",
  },
  {
    title: "Sales con un diagnóstico, decidas lo que decidas",
    body: "Aunque no acabemos trabajando juntos, sales sabiendo qué es lo primero que tienes que corregir.",
  },
];

export function CallExplainer() {
  return (
    <Band>
      <div className="mx-auto max-w-[820px]">
        <h2 className={H2}>
          No es una llamada de ventas.
          <br />
          <span className="text-brand">Es una llamada de cualificación.</span>
        </h2>

        <div className="mt-7 flex flex-col gap-3.5">
          {callSteps.map((step, index) => (
            <div key={step.title} className={CARD}>
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

        <p className="mt-6.5 text-center text-[16.5px] font-semibold text-pretty">
          No presionamos a nadie, sencillamente porque no cogemos a todo el
          mundo: abrimos diez plazas al mes.
        </p>
      </div>
    </Band>
  );
}

const notFor = [
  "Buscas señales para copiar sin entender qué hay detrás.",
  "Esperas resultados garantizados o dinero rápido sin trabajo.",
  "No puedes dedicar al menos una hora al día, siempre en la misma franja.",
  "Quieres empezar con un dinero que no te puedes permitir perder.",
];

const forYou = [
  "Ya has operado y sabes lo que es perder por una decisión impulsiva.",
  "Estás cansado de que el resultado dependa de la suerte del mes.",
  "Puedes dedicar una hora al día a operar con método.",
  "Quieres entender la herramienta, no que alguien te diga dónde entrar.",
];

export function Qualification() {
  return (
    <section className="px-5 pt-[clamp(44px,7vw,80px)]">
      <div className="mx-auto max-w-[1000px]">
        <h2 className={H2}>
          Esto no es para
          <br />
          <span className="text-brand">todo el mundo.</span>
        </h2>

        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          <div className={CARD}>
            <span className="inline-block rounded-full bg-danger-tint px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-danger">
              NO ES PARA TI SI
            </span>
            <ul className="m-0 mt-4.5 flex list-none flex-col gap-3.5 p-0">
              {notFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="#D9382C"
                    strokeWidth="1.6"
                    className="mt-[5px] flex-none"
                    aria-hidden
                  >
                    <path d="M3 3l12 12M15 3L3 15" />
                  </svg>
                  <span className="text-[15.5px] text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-line bg-white p-6">
            <span className="inline-block rounded-full bg-brand-tint px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-brand">
              SÍ ES PARA TI SI
            </span>
            <ul className="m-0 mt-4.5 flex list-none flex-col gap-3.5 p-0">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="#2B4BF2"
                    strokeWidth="1.6"
                    className="mt-[5px] flex-none"
                    aria-hidden
                  >
                    <path d="M3 9.5l4 4L15 5" />
                  </svg>
                  <span className="text-[15.5px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6.5 text-center text-[17px] font-bold tracking-[-0.01em]">
          ¿Te reconoces a la derecha? Reserva tu llamada.
        </p>
      </div>
    </section>
  );
}
