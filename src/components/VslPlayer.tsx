import { site } from "@/config/site";

/**
 * Cadre vidéo de la page VSL.
 * Tant que `site.vsl.vimeoId` est null, on affiche le placeholder 16:9 du
 * design : la mise en page est déjà juste avant que la vidéo soit tournée.
 */
export function VslPlayer() {
  const { vimeoId, hash } = site.vsl;

  return (
    <div className="mt-[30px] rounded-[20px] border border-line bg-white p-3 shadow-[0_4px_24px_rgba(11,21,51,.06)]">
      <div className="aspect-video w-full overflow-hidden rounded-[14px]">
        {vimeoId ? <VimeoFrame id={vimeoId} hash={hash} /> : <Placeholder />}
      </div>
    </div>
  );
}

function VimeoFrame({ id, hash }: { id: string; hash: string | null }) {
  const params = new URLSearchParams({
    badge: "0",
    byline: "0",
    portrait: "0",
    title: "0",
    dnt: "1",
  });
  if (hash) params.set("h", hash);

  return (
    <iframe
      src={`https://player.vimeo.com/video/${id}?${params.toString()}`}
      title="Vídeo de presentación del método"
      className="h-full w-full border-0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  );
}

function Placeholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#F8FAFF_0_12px,#F4F6FB_12px_24px)]">
      <div className="flex flex-col items-center gap-3.5">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand shadow-[0_4px_24px_rgba(43,79,240,.3)]">
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden>
            <path d="M3 2l14 9-14 9z" fill="#FFFFFF" />
          </svg>
        </span>
        <span className="px-4 text-center font-mono text-[11.5px] tracking-[0.08em] text-placeholder">
          [ EMBED VSL 16:9 · VIMEO ]
        </span>
      </div>
    </div>
  );
}
