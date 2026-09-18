import { FORM_ID, PLAYER_ID } from "./scroll";
import { VslPlayer } from "./VslPlayer";
import { KlosersBooking } from "./KlosersBooking";

/** Lecteur + formulaire : le bloc central de la page. */
export function Funnel() {
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
        <KlosersBooking />
      </section>
    </>
  );
}
