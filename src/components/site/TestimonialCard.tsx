import { Stars } from "./Eyebrow";

/** Composant « Tarjeta Testimonio » du design. */
export function TestimonialCard({
  quote,
  author,
  meta,
}: {
  quote: string;
  author: string;
  meta: string;
}) {
  return (
    <div className="flex h-full flex-col gap-3.5 rounded-[20px] border border-line bg-white p-7 shadow-[0_4px_24px_rgba(11,21,51,.06)]">
      <Stars className="text-[13px]" />
      <p className="m-0 flex-1 text-[16.5px] text-pretty">{quote}</p>
      <div className="flex items-center gap-3">
        <span className="h-[38px] w-[38px] flex-none rounded-full bg-brand-tint" />
        <span className="flex flex-col leading-[1.35]">
          <strong className="text-[15px] font-bold">{author}</strong>
          <span className="text-[13px] text-faint">{meta}</span>
        </span>
      </div>
    </div>
  );
}
