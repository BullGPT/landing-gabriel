import Image from "next/image";
import { site } from "@/config/site";

/** Logo de la marque. Le PNG est détouré, il tient sur n'importe quel fond. */
export function BrandMark() {
  return (
    <Image
      src="/logo-rumbo.png"
      alt={site.brand}
      width={70}
      height={28}
      priority
      className="h-7 w-auto"
    />
  );
}
