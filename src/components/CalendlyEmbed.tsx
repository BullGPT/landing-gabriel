"use client";

import { useEffect, useRef } from "react";
import { site } from "@/config/site";

type Props = {
  /** Pré-remplit le formulaire Calendly avec ce qu'on sait déjà du prospect. */
  prefill?: { name?: string; email?: string };
};

export function CalendlyEmbed({ prefill }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const { url, hideDetails } = site.calendly;

  useEffect(() => {
    if (!url) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [url]);

  if (!url) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-xl border border-dashed border-white/20 p-8 text-center">
        <p className="text-sm opacity-60">
          Calendario pendiente de configurar
          <br />
          <span className="opacity-70">(NEXT_PUBLIC_CALENDLY_URL)</span>
        </p>
      </div>
    );
  }

  const params = new URLSearchParams();
  if (hideDetails) {
    params.set("hide_landing_page_details", "1");
    params.set("hide_gdpr_banner", "1");
  }
  if (prefill?.name) params.set("name", prefill.name);
  if (prefill?.email) params.set("email", prefill.email);

  const separator = url.includes("?") ? "&" : "?";

  return (
    <div
      ref={container}
      className="calendly-inline-widget min-h-[700px] w-full"
      data-url={`${url}${separator}${params.toString()}`}
    />
  );
}
