import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { IconSignal, IconSitemap, IconTeam } from "./CardIcons";

const CARD = "border border-line bg-white p-6";
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

const methodCards: {
  image: string;
  icon: ReactNode;
  title: string;
  body: string;
}[] = [
  {
    image: "/cards/ia-analiza.png",
    icon: <IconSignal />,
    title: "La IA analiza, tú decides",
    body: "Estructura, niveles y contexto en segundos. No le pides que te diga qué hacer, eso sería volver a las señales con otra cara. Le pides el mapa, y decides tú con tus reglas.",
  },
  {
    image: "/cards/entorno-corrige.png",
    icon: <IconTeam />,
    title: "Un entorno que te corrige",
    body: "Operar solo es lo que más cuentas revienta. En grupo alguien ve el error que llevas repitiendo tres semanas, y te lo dice antes de que te cueste dinero.",
  },
  {
    image: "/cards/un-solo-activo.png",
    icon: <IconSitemap />,
    title: "Un solo activo, un solo horario",
    body: "La rentabilidad sale de la repetición. Cien operaciones en el mismo mercado te enseñan más que saltar entre veinte.",
  },
];

export function MethodCards() {
  return (
    <section className="px-5 pt-[clamp(44px,7vw,80px)]">
      <div className="mx-auto max-w-[1000px]">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          El método Rumbo
        </div>
        <h2 className={`${H2} mt-3.5 text-pretty`}>
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
              {/* Vignette en 16:9, le format natif des illustrations, et
                  `contain` pour n'en rien couper. Le fond sombre absorbe
                  l'éventuel filet laissé sur les côtés. */}
              <div className="relative aspect-video overflow-hidden bg-ink">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 320px, calc(100vw - 72px)"
                  className="object-contain"
                />
              </div>
              <h3 className="mb-2 mt-4.5 flex items-start gap-2.5 text-[19px] font-bold tracking-[-0.01em]">
                <span className="mt-0.5 flex-none">{card.icon}</span>
                <span>{card.title}</span>
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
/**
 * Témoignage vidéo, tourné au format vertical (9:16).
 * `loading="lazy"` compte ici : l'iframe est loin sous la ligne de flottaison,
 * et un lecteur Vimeo pèse lourd. Il ne se charge qu'à l'approche.
 */
function VideoTestimonial() {
  const params = new URLSearchParams({
    badge: "0",
    autopause: "0",
    player_id: "0",
    app_id: "58479",
    // Habillage masqué côté URL en plus des réglages Vimeo : si quelqu'un
    // les rouvre un jour dans le tableau de bord, le lecteur reste nu.
    title: "0",
    byline: "0",
    portrait: "0",
    // Coupe le pistage Vimeo : la page cible l'Espagne et affiche un bandeau cookies.
    dnt: "1",
  });

  return (
    <div className="mx-auto mt-7 w-full max-w-[320px] border border-line bg-white p-2.5">
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink">
        <iframe
          src={`https://player.vimeo.com/video/1225758409?${params.toString()}`}
          title="Testimonio de un alumno"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}

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

        <VideoTestimonial />

        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {slots.map((slot) => (
            <div
              key={slot.title}
              className="flex min-h-45 flex-col justify-center gap-2 border border-dashed border-brand-line bg-surface p-6"
            >
              <span className="font-mono text-[11px] tracking-[0.1em] text-brand">
                POR RELLENAR
              </span>
              <span className="font-bold">{slot.title}</span>
              <span className="text-[14.5px] text-muted">{slot.body}</span>
            </div>
          ))}

          <div className="flex min-h-45 flex-col justify-center gap-2 border border-dashed border-white/50 bg-brand p-6 text-white">
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

const founders = [
  {
    photo: "/fundadores/gabriel.jpg",
    name: "Gabriel",
    role: "Trader con IA",
    body: "Opera los mercados con inteligencia artificial y gestiona más de 200.000 € de capital financiado.",
  },
  {
    photo: "/fundadores/lucas.jpg",
    name: "Lucas",
    role: "Fundador de BullGPT",
    body: "Creador de BullGPT, la IA número 1 para operar en los mercados.",
  },
];

export function Founders() {
  return (
    <section className="px-5 pt-[clamp(44px,7vw,80px)]">
      <div className="mx-auto max-w-[820px]">
        <h2 className={H2}>
          Quién está detrás
          <br />
          <span className="text-brand">de {site.brand}.</span>
        </h2>

        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {founders.map((person) => (
            <div key={person.name} className={`${CARD} text-center`}>
              <Image
                src={person.photo}
                alt={person.name}
                width={112}
                height={112}
                className="mx-auto h-28 w-28 rounded-full object-cover"
              />
              <h3 className="mt-4 text-[19px] font-bold tracking-[-0.01em]">
                {person.name}
              </h3>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-brand">
                {person.role}
              </div>
              <p className="m-0 mt-3 text-[15.5px] text-muted">{person.body}</p>
            </div>
          ))}
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
    body: "Si el método Rumbo encaja con tu caso, te explicamos exactamente cómo funciona el programa. Si no encaja, te lo decimos igual y la llamada se acaba ahí.",
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
            <span className="inline-block bg-danger-tint px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-danger">
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

          <div className="border border-brand-line bg-white p-6">
            <span className="inline-block bg-brand-tint px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-brand">
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
