import { BrandMark } from "./BrandMark";

/**
 * En-tête minimal : aucun lien sortant.
 * Toute la page n'a qu'un seul objectif, on n'offre pas de porte de sortie.
 */
export function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[1120px] items-center px-5 py-3.5">
        <BrandMark />
      </div>
    </header>
  );
}
