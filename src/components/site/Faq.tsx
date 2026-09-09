"use client";

import { useState } from "react";
import { faqs } from "@/config/faqs";
import { Eyebrow } from "./Eyebrow";

/** Accordéon FAQ : une seule entrée ouverte à la fois, comme dans le design. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faq" className="mx-auto max-w-[820px]">
      <div className="text-center">
        <Eyebrow>Dudas</Eyebrow>
        <h2 className="mb-8 mt-3.5 text-[clamp(28px,4.2vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          Todo lo que quieres saber
          <br />
          <span className="text-brand">antes de dar el paso.</span>
        </h2>
      </div>

      <div className="border-t border-line">
        {faqs.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.q} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-[22px] text-left text-[17.5px] font-semibold tracking-[-0.01em] text-ink"
              >
                <span>{item.q}</span>
                <span
                  className="flex flex-none transition-transform duration-200"
                  style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
                >
                  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
                    <path d="M1 1l6 6 6-6" stroke="#2B4FF0" strokeWidth="1.6" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <p className="m-0 max-w-[66ch] pb-6 text-[16.5px] text-muted">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
