import { site } from "@/config/site";

/** Klosers gère les coordonnées, le choix du créneau et la confirmation. */
export function KlosersBooking() {
  return (
    <div className="overflow-hidden border border-line bg-white">
      {/* Hauteur ajustée au formulaire ; le calendrier conserve son défilement natif. */}
      <iframe
        name="rumbo-booking"
        src={site.booking.url}
        title="Formulario y calendario para reservar tu llamada con Rumbo"
        className="block h-[875px] w-full border-0 min-[360px]:h-[815px] min-[480px]:h-[740px] sm:h-[720px] lg:h-[700px]"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <p className="m-0 border-t border-line px-4 py-2 text-center text-xs text-muted">
        <a href={site.booking.url} target="_blank" rel="noopener noreferrer">
          ¿No carga? Abrir el calendario
        </a>
      </p>
    </div>
  );
}
