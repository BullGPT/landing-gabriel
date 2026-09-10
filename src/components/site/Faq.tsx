"use client";

import { useState } from "react";
import { faqs } from "@/config/faqs";

/** Accordéon FAQ : une seule entrée ouverte à la fois, comme dans le design. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-5 text-left text-[17px] font-semibold tracking-[-0.01em] text-ink"
            >
              <span>{item.q}</span>
              <span
                className="flex flex-none transition-transform duration-200"
                style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
              >
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
                  <path d="M1 1l6 6 6-6" stroke="#2B4BF2" strokeWidth="1.6" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <p className="m-0 max-w-[66ch] pb-5.5 text-base text-muted">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
