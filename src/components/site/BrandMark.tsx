import { site } from "@/config/site";

/** Logo + nom de marque, repris à l'identique du design. */
export function BrandMark({ tone = "ink" }: { tone?: "ink" | "light" }) {
  return (
    <span
      className={`flex items-center gap-2.5 text-[18px] font-bold tracking-[-0.02em] ${
        tone === "light" ? "text-white" : "text-ink"
      }`}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect width="22" height="22" rx="6" fill="#2B4FF0" />
        <path d="M6 15l3.5-4 2.5 2.5L16 7" stroke="#FFFFFF" strokeWidth="1.8" />
      </svg>
      {site.brand}
    </span>
  );
}
