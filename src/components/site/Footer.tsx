import { site } from "@/config/site";
import { BrandMark } from "./BrandMark";

const columns = [
  {
    title: "Producto",
    links: [
      { href: "/vsl", label: "El vídeo gratuito" },
      { href: "/#metodo", label: "El método" },
      { href: "/#faq", label: "Preguntas frecuentes" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/aviso-legal", label: "Aviso legal" },
      { href: "/privacidad", label: "Política de privacidad" },
      { href: "/cookies", label: "Política de cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink px-6 pb-26 pt-[clamp(44px,6vw,72px)] text-[15px] leading-relaxed text-white">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8">
          <div>
            <BrandMark tone="light" />
            <p className="mt-3.5 max-w-[32ch] text-sm text-white/60">
              Formación en análisis de mercados asistido por inteligencia
              artificial.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50">
                {column.title}
              </div>
              <div className="mt-3.5 flex flex-col gap-2.5 text-[14.5px]">
                {column.links.map((link) => (
                  <a key={link.href} href={link.href} className="text-white">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50">
              Contacto
            </div>
            <div className="mt-3.5 flex flex-col gap-2.5 text-[14.5px]">
              <a href="#contacto" className="text-white">
                Soporte
              </a>
              <a href="#whatsapp" className="text-white">
                WhatsApp
              </a>
              <span className="text-white/60">{site.domain}</span>
            </div>
          </div>
        </div>

        <div className="my-9 mb-5.5 h-px bg-white/12" />

        <p className="m-0 max-w-[96ch] text-[11px] leading-[1.7] text-white/60">
          {site.legal.riskWarning}
        </p>
        <p className="mt-2.5 text-[11px] text-white/60">
          {site.legal.metaDisclaimer} © {new Date().getFullYear()} {site.brand}
        </p>
      </div>
    </footer>
  );
}
