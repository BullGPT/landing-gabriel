import Link from "next/link";
import { BrandMark } from "./BrandMark";

type Props = {
  /** "centered" : étapes 3 et 4, où l'on retire toute sortie du funnel. */
  variant?: "default" | "centered";
};

export function Header({ variant = "default" }: Props) {
  return (
    <header className="border-b border-line">
      <div
        className={`mx-auto flex max-w-[1120px] items-center px-6 py-4 ${
          variant === "centered" ? "justify-center" : "justify-between"
        }`}
      >
        <Link href="/" className="no-underline hover:no-underline">
          <BrandMark />
        </Link>
        {variant === "default" && (
          <a
            href="#login"
            className="text-[14.5px] font-medium text-muted no-underline"
          >
            Iniciar sesión
          </a>
        )}
      </div>
    </header>
  );
}

/** Barre de progression des étapes 3 (75 %) et 4 (100 %). */
export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-[3px] bg-chip">
      <div className="h-full bg-brand" style={{ width: `${percent}%` }} />
    </div>
  );
}
