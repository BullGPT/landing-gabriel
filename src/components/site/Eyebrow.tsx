/** Surtitre monospace utilisé au-dessus de chaque titre de section. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
      {children}
    </div>
  );
}

/** Notation cinq étoiles du design. */
export function Stars({ className = "" }: { className?: string }) {
  return (
    <span
      className={`tracking-[2px] text-star ${className}`}
      aria-label="5 sobre 5"
    >
      ★★★★★
    </span>
  );
}
