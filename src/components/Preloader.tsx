import { useEffect, useRef, useState } from "react";
import { preloader } from "@/data/resume";

const EXPO = "cubic-bezier(0.16,1,0.3,1)";
const QUINT = "cubic-bezier(0.22,1,0.36,1)";
const LIFT_AT = 1750; // ms: overlay starts sliding away; hero entrance starts right after

/**
 * Welcome overlay shown on every load (skipped under prefers-reduced-motion).
 * Lines rise, a progress bar fills, then the sheet lifts off and hands over to the hero entrance.
 */
const Preloader = () => {
  const [show, setShow] = useState(() => document.documentElement.classList.contains("preload"));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;
    const el = ref.current;
    if (!el) return;
    const html = document.documentElement;
    const anims: Animation[] = [];
    const a = (node: Element | null, kf: Keyframe[], opt: KeyframeAnimationOptions) => {
      if (node) anims.push(node.animate(kf, { fill: "both", ...opt }));
    };

    a(el.querySelector(".pl-blob-wrap"), [{ opacity: 0, transform: "translateY(40px) scale(0.6)" }, { opacity: 1, transform: "none" }], { duration: 900, delay: 120, easing: "cubic-bezier(0.34,1.56,0.64,1)" });
    a(el.querySelector(".pl-kick"), [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 600, delay: 150, easing: EXPO });
    el.querySelectorAll(".pl-line > span").forEach((line, i) =>
      a(line, [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }], { duration: 900, delay: 280 + i * 110, easing: EXPO })
    );
    a(el.querySelector(".pl-bar i"), [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 1450, delay: 200, easing: QUINT });
    a(el.querySelector(".pl-in"), [{ opacity: 1 }, { opacity: 0 }], { duration: 360, delay: LIFT_AT - 80, easing: "ease" });

    // ---- splash ending: jump, slam, spread over the screen, then drain away ----
    const wrap = el.querySelector<HTMLElement>(".pl-blob-wrap");
    const blob = el.querySelector<HTMLElement>(".pl-blob");
    const timers: number[] = [];
    if (wrap && blob) {
      // freeze the idle bounce at the moment of the jump so the jump starts from a known pose
      timers.push(
        window.setTimeout(() => {
          blob.style.animation = "none";
          blob.style.transform = "none";
        }, LIFT_AT)
      );
      a(wrap, [{ transform: "translateY(0)" }, { transform: "translateY(-140px) scale(0.92, 1.1)" }], { duration: 280, delay: LIFT_AT, easing: "cubic-bezier(0.3,0,0.6,1)" });
      timers.push(window.setTimeout(() => blob.classList.add("splat"), LIFT_AT + 300));
      a(
        blob,
        [
          { transform: "translateY(0) scale(1)" },
          { transform: "translateY(150px) scale(1.3, 0.72)", offset: 0.38 },
          { transform: "translateY(150px) scale(40)" },
        ],
        { duration: 680, delay: LIFT_AT + 280, easing: "cubic-bezier(0.7,0,0.25,1)" }
      );
      // droplets fly out from the point of impact
      timers.push(
        window.setTimeout(() => {
          const r = blob.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height * 0.9;
          for (let i = 0; i < 10; i++) {
            const d = document.createElement("i");
            d.className = "pl-drop";
            const size = 10 + Math.random() * 22;
            d.style.cssText = `left:${cx - size / 2}px;top:${cy - size / 2}px;width:${size}px;height:${size}px`;
            el.appendChild(d);
            const ang = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5;
            const dist = 220 + Math.random() * 320;
            d.animate(
              [
                { transform: "translate(0,0) scale(1)", opacity: 1 },
                { transform: `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist - 120}px) scale(0.3)`, opacity: 0 },
              ],
              { duration: 720, easing: "cubic-bezier(0.2,0.8,0.3,1)", fill: "forwards" }
            );
          }
        }, LIFT_AT + 520)
      );
    }
    const DRAIN_AT = LIFT_AT + 1000;
    timers.push(
      window.setTimeout(() => {
        el.classList.add("filled");
        html.classList.remove("preload");
        window.dispatchEvent(new Event("preload:done"));
      }, DRAIN_AT)
    );
    const drain = el.animate([{ clipPath: "circle(142% at 50% 55%)" }, { clipPath: "circle(0% at 50% 55%)" }], { duration: 850, delay: DRAIN_AT + 40, easing: EXPO, fill: "both" });
    anims.push(drain);
    drain.finished.then(() => setShow(false)).catch(() => {});

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      anims.forEach((an) => an.cancel());
      el.querySelectorAll(".pl-drop").forEach((d) => d.remove());
    };
  }, [show]);

  if (!show) return null;

  return (
    <div ref={ref} className="pl" aria-hidden="true">
      <div className="pl-in">
        <span className="pl-kick">{preloader.kicker}</span>
        <h2 className="pl-title">
          {preloader.lines.map((l, i) => (
            <span className="pl-line" key={l}>
              <span>{i === preloader.lines.length - 1 ? <em>{l}</em> : l}</span>
            </span>
          ))}
        </h2>
        <span className="pl-bar">
          <i />
        </span>
      </div>
      <div className="pl-blob-wrap">
        <span className="pl-blob-shadow" />
        <span className="pl-blob">
          <i className="pl-eye l" />
          <i className="pl-eye r" />
          <i className="pl-mouth" />
          <i className="pl-gloss" />
        </span>
      </div>
    </div>
  );
};

export default Preloader;
