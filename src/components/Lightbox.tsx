import { useCallback, useEffect, useState } from "react";
import { ArrowIcon } from "@/components/Icons";

export type Shot = { src: string; name: string };

type Props = {
  title: string;
  slug: string;
  shots: Shot[];
  index: number;
  onClose: () => void;
};

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

/** Full-screen gallery for one project's screenshots. Arrow keys move, Escape closes. */
const Lightbox = ({ title, slug, shots, index, onClose }: Props) => {
  const [i, setI] = useState(index);
  const n = shots.length;
  const go = useCallback((d: number) => setI((v) => (n ? (v + d + n) % n : 0)), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  const shot = shots[i];

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={`${title} screenshots`}>
      <div className="lb-top">
        <div>
          <h3>{title}</h3>
          <small>{n ? `${i + 1} / ${n} · ${shot.name}` : "Screenshots"}</small>
        </div>
        <button type="button" className="lb-x" onClick={onClose} aria-label="Close gallery" autoFocus>
          <CloseIcon />
        </button>
      </div>

      <div className="lb-body" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {n ? (
          <>
            <img key={shot.src} src={shot.src} alt={`${title} — ${shot.name}`} />
            {n > 1 && (
              <>
                <button type="button" className="lb-nav prev" onClick={() => go(-1)} aria-label="Previous screenshot">
                  <ArrowIcon />
                </button>
                <button type="button" className="lb-nav next" onClick={() => go(1)} aria-label="Next screenshot">
                  <ArrowIcon />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="lb-empty">
            <p>No screenshots yet for this project.</p>
            <p>
              Add PNG, JPG or WEBP files to <code>src/assets/projects/{slug}/</code> and they appear here automatically.
            </p>
          </div>
        )}
      </div>

      <div className="lb-strip">
        {shots.map((s, k) => (
          <button key={s.src} type="button" onClick={() => setI(k)} aria-current={k === i ? "true" : undefined} aria-label={`Show ${s.name}`}>
            <img src={s.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lightbox;
