"use client";

import Script from "next/script";
import { site } from "@/config/site";

/**
 * Variante Typeform de l'étape 3, prévue par la maquette.
 * Activée en passant `application.mode` à "typeform" dans la config.
 * Sans identifiant renseigné, on garde le placeholder du design plutôt que
 * d'afficher un cadre vide.
 */
export function TypeformEmbed() {
  const { typeformId } = site.application;

  if (!typeformId) {
    return (
      <div className="mt-7 flex min-h-[600px] items-center justify-center rounded-[20px] border border-line bg-white px-5 py-10 shadow-[0_4px_24px_rgba(11,21,51,.06)]">
        <span className="text-center font-mono text-[11.5px] tracking-[0.08em] text-placeholder">
          [ EMBED TYPEFORM · CONFIGURAR typeformId ]
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        data-tf-live={typeformId}
        className="mt-7 min-h-[600px] w-full overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_4px_24px_rgba(11,21,51,.06)]"
      />
      <Script src="//embed.typeform.com/next/embed.js" strategy="lazyOnload" />
    </>
  );
}
