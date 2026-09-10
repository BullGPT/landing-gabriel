import Image from "next/image";
import { site } from "@/config/site";

/** Logo de la marque. Le PNG est détouré, il tient sur n'importe quel fond. */
export function BrandMark() {
  return (
    <Image
      src="/logo-rumbo.png"
      alt={site.brand}
      width={110}
      height={44}
      priority
      className="h-11 w-auto"
    />
  );
}
