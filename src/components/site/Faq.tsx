"use client";

import { useId, useState } from "react";
import { faqs } from "@/config/faqs";

/** Accordéon FAQ : une seule entrée ouverte à la fois, comme dans le design. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-t border-line">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.q} className="border-b border-line">
            <button
              type="button"
              id={buttonId}
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-5 text-left text-[17px] font-semibold tracking-[-0.01em] text-ink"
            >
              <span>{item.q}</span>
              <span
                className="flex flex-none transition-transform duration-300 ease-out"
                style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
              >
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
                  <path d="M1 1l6 6 6-6" stroke="#2B4BF2" strokeWidth="1.6" />
                </svg>
              </span>
            </button>

            {/*
              La réponse reste montée et c'est sa hauteur qui s'anime.
              `grid-template-rows` de 0fr à 1fr est le seul moyen de faire
              glisser une hauteur automatique sans mesurer le contenu en JS
              ni inventer un max-height arbitraire qui casserait le rythme.
            */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="m-0 max-w-[66ch] pb-5.5 text-base text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
