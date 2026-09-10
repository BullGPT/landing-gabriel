import { site } from "@/config/site";

/**
 * Panneau affiché tant que la vidéo n'a pas atteint le seuil : squelette de
 * formulaire flouté et cadenas, avec le temps restant.
 */
export function LockedPanel({ elapsed }: { elapsed: number }) {
  const { unlockAtSeconds } = site.vsl;
  const percent = Math.min(100, (elapsed / unlockAtSeconds) * 100);
  const remaining = Math.max(0, unlockAtSeconds - elapsed);
  const minutes = Math.ceil(remaining / 60);

  return (
    <div
      aria-live="polite"
      className="relative overflow-hidden border border-line bg-white"
    >
      <div
        aria-hidden
        className="pointer-events-none flex select-none flex-col gap-3.5 px-6 py-7 opacity-50 blur-[6px]"
      >
        <div className="h-3.5 w-45 bg-line" />
        <div className="h-13 border border-line bg-surface" />
        <div className="h-13 border border-line bg-surface" />
        <div className="h-13 border border-line bg-surface" />
        <div className="h-13 bg-brand-line" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/82 px-5.5 py-7 text-center">
        <svg
          width="40"
          height="46"
          viewBox="0 0 40 46"
          fill="none"
          stroke="#2B4BF2"
          strokeWidth="2"
          role="img"
          aria-label="Bloqueado"
        >
          <path d="M11 20V13a9 9 0 0118 0v7" />
          <rect x="6" y="20" width="28" height="24" rx="5" fill="#EDF1FF" />
          <circle cx="20" cy="31" r="3" fill="#2B4BF2" stroke="none" />
          <path d="M20 34v4" />
        </svg>

        <h2 className="mt-4 text-[clamp(21px,4.4vw,26px)] font-extrabold tracking-[-0.02em]">
          Reserva de llamada bloqueada
        </h2>
        <p className="mt-2.5 max-w-[44ch] text-[15.5px] text-muted">
          Se desbloquea cuando termines el vídeo. Solo hablamos con gente que ya
          conoce el método.
        </p>

        <div className="mt-5 h-1.5 w-full max-w-[420px] overflow-hidden bg-line">
          <div
            className="h-full bg-brand transition-[width] duration-500 ease-linear"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-xs tracking-[0.08em] text-brand">
          {remaining > 0 ? `Se desbloquea en ${minutes} min` : "Desbloqueando..."}
        </p>
      </div>
    </div>
  );
}
