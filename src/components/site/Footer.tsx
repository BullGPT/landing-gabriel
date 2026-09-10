import { site } from "@/config/site";

const links = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/cookies", label: "Política de cookies" },
];

export function Footer() {
  return (
    <footer className="bg-surface px-5 pb-10 pt-8">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-3.5">
        <div className="flex flex-wrap gap-x-5.5 gap-y-2.5 text-[13.5px] text-muted">
          <span>
            © {new Date().getFullYear()} {site.brand}
          </span>
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-muted">
              {link.label}
            </a>
          ))}
        </div>
        <p className="m-0 max-w-[96ch] text-[11.5px] leading-[1.7] text-faint">
          {site.legal.riskWarning}
        </p>
      </div>
    </footer>
  );
}
