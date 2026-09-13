import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-surface px-5 pb-10 pt-8">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-3.5">
        <div className="text-[13.5px] text-muted">
          © {new Date().getFullYear()} {site.brand}
        </div>
        <p className="m-0 max-w-[96ch] text-[11.5px] leading-[1.7] text-faint">
          {site.legal.riskWarning}
        </p>
      </div>
    </footer>
  );
}
