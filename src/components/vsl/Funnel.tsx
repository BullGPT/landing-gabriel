"use client";

import { useEffect } from "react";
import { isUnlocked, useProgress } from "./progress";
import { FORM_ID, PLAYER_ID, scrollToId } from "./scroll";
import { VslPlayer } from "./VslPlayer";
import { LockedPanel } from "./LockedPanel";
import { BookingForm } from "./BookingForm";

/** Lecteur + formulaire : le bloc central de la page. */
export function Funnel() {
  const progress = useProgress();
  const unlocked = isUnlocked(progress);

  // Au franchissement du seuil, on emmène le prospect au formulaire :
  // il vient de gagner l'accès, il ne doit pas avoir à le chercher.
  useEffect(() => {
    if (progress.justUnlocked) {
      const timer = setTimeout(() => scrollToId(FORM_ID, 80), 260);
      return () => clearTimeout(timer);
    }
  }, [progress.justUnlocked]);

  return (
    <>
      <section
        id={PLAYER_ID}
        className="mx-auto max-w-[900px] px-5 pt-6 scroll-mt-20"
      >
        <VslPlayer />
      </section>

      <section
        id={FORM_ID}
        className="mx-auto max-w-[900px] px-5 pt-6.5 scroll-mt-20"
      >
        {unlocked ? (
          <BookingForm justUnlocked={progress.justUnlocked} />
        ) : (
          <LockedPanel elapsed={progress.t} />
        )}
      </section>
    </>
  );
}
