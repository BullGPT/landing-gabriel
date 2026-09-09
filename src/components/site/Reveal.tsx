"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Révélation au scroll (data-fade du design).
 * Sécurité reprise de la maquette : si l'IntersectionObserver ne déclenche
 * jamais, un timer force l'affichage — une section ne doit jamais rester
 * invisible.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || node.hasAttribute("data-seen")) return;

    const show = () => node.setAttribute("data-seen", "1");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    const failsafe = setTimeout(show, 1600);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <section ref={ref} data-fade className={className}>
      {children}
    </section>
  );
}
