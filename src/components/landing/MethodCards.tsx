import type { ReactNode } from "react";
import { Eyebrow } from "@/components/site/Eyebrow";

const SVG_PROPS = {
  width: 250,
  height: 150,
  viewBox: "0 0 250 150",
  fill: "none",
  stroke: "#0B1533",
  strokeWidth: 1.5,
} as const;

const MONO = "IBM Plex Mono, monospace";

const cards: { art: ReactNode; title: string; body: string }[] = [
  {
    art: (
      <svg {...SVG_PROPS} aria-hidden>
        <path d="M18 130h214" />
        <path d="M44 52v58" />
        <rect x="37" y="62" width="14" height="36" fill="#E7ECFF" />
        <path d="M80 40v78" />
        <rect x="73" y="54" width="14" height="48" fill="#2B4FF0" stroke="none" />
        <path d="M116 60v56" />
        <rect x="109" y="70" width="14" height="34" fill="#E7ECFF" />
        <path d="M152 46v70" />
        <rect x="145" y="58" width="14" height="44" fill="#E7ECFF" />
        <path d="M188 66v52" />
        <rect x="181" y="76" width="14" height="28" fill="#E7ECFF" />
        <rect x="64" y="34" width="34" height="82" stroke="#2B4FF0" strokeDasharray="5 4" />
        <rect x="104" y="12" width="120" height="28" rx="8" fill="#FFFFFF" />
        <path d="M110 40l-8 12 16-5" fill="#FFFFFF" />
        <text x="116" y="31" fontFamily={MONO} fontSize="12" fill="#2B4FF0" stroke="none">
          setup válido
        </text>
      </svg>
    ),
    title: "Lee la estructura, no el ruido",
    body: "La IA señala la zona que importa y explica por qué, en lugar de darte veinte indicadores sueltos.",
  },
  {
    art: (
      <svg {...SVG_PROPS} aria-hidden>
        <circle cx="70" cy="84" r="36" fill="#FFFFFF" />
        <path d="M70 48v-8M58 40h24M70 84l18-14" />
        <circle cx="70" cy="84" r="4" fill="#2B4FF0" stroke="none" />
        <rect x="132" y="76" width="98" height="16" rx="8" fill="#FFFFFF" />
        <rect x="132" y="76" width="60" height="16" rx="8" fill="#2B4FF0" stroke="none" />
        <text x="132" y="56" fontFamily={MONO} fontSize="16" fill="#2B4FF0" stroke="none">
          30s
        </text>
        <path d="M132 108h62M132 122h38" stroke="#C9D4FF" />
      </svg>
    ),
    title: "Menos de 30 segundos por gráfico",
    body: "Un proceso pensado para decidir rápido y con criterio, no para pasar la tarde delante de la pantalla.",
  },
  {
    art: (
      <svg {...SVG_PROPS} aria-hidden>
        <path d="M62 40v72" />
        <rect x="55" y="52" width="14" height="46" fill="#E03B3B" stroke="none" opacity=".85" />
        <path d="M96 26h30l22 22v30l-22 22H96L74 78V48z" fill="#FFFFFF" />
        <text
          x="88"
          y="86"
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontSize="19"
          fontWeight="700"
          fill="#E03B3B"
          stroke="none"
        >
          STOP
        </text>
        <path
          d="M170 118c0-12 6-16 6-24V78a6 6 0 0112 0v14M188 88V72a6 6 0 0112 0v22M200 90a6 6 0 0112 0v20c0 14-9 22-22 22h-8c-11 0-20-8-20-18"
          fill="#E7ECFF"
        />
      </svg>
    ),
    title: "Saber cuándo no operar",
    body: "La mayor parte del resultado viene de las operaciones que decides no abrir.",
  },
  {
    art: (
      <svg {...SVG_PROPS} aria-hidden>
        <circle cx="125" cy="75" r="16" fill="#2B4FF0" stroke="none" />
        <path d="M60 34h44M60 116h44M146 34h44M146 116h44" stroke="#C9D4FF" />
        <rect x="14" y="20" width="86" height="28" rx="7" fill="#FFFFFF" />
        <text x="26" y="39" fontFamily={MONO} fontSize="11" fill="#0B1533" stroke="none">
          CRIPTO
        </text>
        <rect x="14" y="102" width="86" height="28" rx="7" fill="#FFFFFF" />
        <text x="30" y="121" fontFamily={MONO} fontSize="11" fill="#0B1533" stroke="none">
          FOREX
        </text>
        <rect x="150" y="20" width="90" height="28" rx="7" fill="#FFFFFF" />
        <text x="160" y="39" fontFamily={MONO} fontSize="11" fill="#0B1533" stroke="none">
          ÍNDICES
        </text>
        <rect x="150" y="102" width="96" height="28" rx="7" fill="#FFFFFF" />
        <text x="156" y="121" fontFamily={MONO} fontSize="9.5" fill="#0B1533" stroke="none">
          MATERIAS PRIMAS
        </text>
        <path d="M104 48l14 14M104 108l14-16M146 48l-14 14M146 108l-14-16" stroke="#C9D4FF" />
      </svg>
    ),
    title: "El mismo marco en cualquier mercado",
    body: "Cripto, forex, índices o materias primas: cambia el activo, no el método.",
  },
  {
    art: (
      <svg {...SVG_PROPS} aria-hidden>
        <rect x="14" y="24" width="100" height="102" rx="10" fill="#FFFFFF" />
        <rect x="26" y="40" width="62" height="14" rx="7" fill="#E6E9F2" stroke="none" />
        <rect x="40" y="62" width="62" height="14" rx="7" fill="#E6E9F2" stroke="none" />
        <rect x="26" y="84" width="52" height="14" rx="7" fill="#E6E9F2" stroke="none" />
        <path d="M20 30l88 90M108 30l-88 90" stroke="#E03B3B" />
        <rect x="136" y="24" width="100" height="102" rx="10" fill="#FFFFFF" />
        <path d="M150 52l7 7 12-13M150 80l7 7 12-13M150 108l7 7 12-13" stroke="#2B4FF0" />
        <path d="M180 55h44M180 83h44M180 111h34" stroke="#C9D4FF" />
      </svg>
    ),
    title: "Fuera los grupos de señales",
    body: "Cambias el ruido de Telegram por una lista de verificación que ejecutas tú.",
  },
  {
    art: (
      <svg {...SVG_PROPS} aria-hidden>
        <rect x="76" y="12" width="96" height="126" rx="14" fill="#FFFFFF" />
        <path d="M112 22h24" stroke="#C9D4FF" />
        <path d="M90 108l16-22 14 12 20-30 22 20" stroke="#2B4FF0" />
        <path d="M90 120h68" stroke="#E6E9F2" />
        <rect x="140" y="30" width="96" height="34" rx="9" fill="#2B4FF0" stroke="none" />
        <text x="152" y="52" fontFamily={MONO} fontSize="11" fill="#FFFFFF" stroke="none">
          señal lista
        </text>
      </svg>
    ),
    title: "Todo desde el móvil",
    body: "Analiza y decide sin estar sentado delante de tres pantallas.",
  },
];

export function MethodCards() {
  return (
    <div id="metodo" className="mx-auto max-w-[1120px]">
      <div className="text-center">
        <Eyebrow>El método</Eyebrow>
        <h2 className="mt-3.5 text-[clamp(28px,4.2vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          Así funciona
          <br />
          <span className="text-brand">la IA que analiza como un profesional.</span>
        </h2>
      </div>

      <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-[20px] border border-line bg-white p-7 shadow-[0_4px_24px_rgba(11,21,51,.06)]"
          >
            <div className="flex h-[180px] items-center justify-center overflow-hidden rounded-[14px] bg-surface">
              {card.art}
            </div>
            <h3 className="mb-2 mt-6 text-xl font-bold tracking-[-0.01em]">
              {card.title}
            </h3>
            <p className="m-0 text-base text-muted">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
