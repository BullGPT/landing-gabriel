"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/config/site";

/**
 * CTA de la page VSL. En mode "delayed", il n'apparaît qu'après le délai
 * configuré — le prospect doit avoir vu le pitch avant de pouvoir avancer.
 */
export function VslCta() {
  const { ctaMode, ctaDelaySeconds } = site.vsl;
  const [visible, setVisible] = useState(ctaMode === "always");

  useEffect(() => {
    if (ctaMode !== "delayed") return;
    const timer = setTimeout(() => setVisible(true), ctaDelaySeconds * 1000);
    return () => clearTimeout(timer);
  }, [ctaMode, ctaDelaySeconds]);

  if (!visible) {
    return (
      <p className="mt-6.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-placeholder">
        El acceso se abre durante el vídeo. Sigue mirando.
      </p>
    );
  }

  return (
    <div className="mt-6.5 [animation:fadeUp_.5s_ease_both]">
      <Link
        href="/solicitud"
        className="mx-auto flex h-15 w-full max-w-[420px] items-center justify-center rounded-xl bg-brand text-[15px] font-bold uppercase tracking-[0.06em] text-white no-underline shadow-[0_4px_24px_rgba(43,79,240,.24)] transition-colors hover:bg-brand-dark hover:text-white hover:no-underline"
      >
        Quiero dar el siguiente paso
      </Link>
      <div className="mt-3.5">
        <LimitedSeats />
      </div>
    </div>
  );
}

export function LimitedSeats({ tone = "light" }: { tone?: "light" | "onBrand" }) {
  return (
    <span
      className={`inline-block rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.1em] ${
        tone === "onBrand" ? "bg-white/16 text-white" : "bg-chip text-muted"
      }`}
    >
      PLAZAS LIMITADAS · REVISIÓN MANUAL
    </span>
  );
}
