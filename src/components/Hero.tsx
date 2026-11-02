import { useEffect, useRef, useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { hero, profile } from "@/data/resume";
import { ArrowIcon, DownloadIcon } from "@/components/Icons";

type Img = "sculpt" | "man" | "visit" | "sil";
type Cell =
  | { kind: "ph"; img: Img; crop?: boolean; visit?: boolean }
  | { kind: "solid"; tone: "red" | "yellow" | "blue" | "cream" | "dark"; lab?: [string, string] };

const ph = (img: Img, crop?: boolean, visit?: boolean): Cell => ({
  kind: "ph",
  img,
  crop,
  visit,
});
const solid = (tone: Extract<Cell, { kind: "solid" }>["tone"], lab?: [string, string]): Cell => ({
  kind: "solid",
  tone,
  lab,
});

const COLUMNS: { cls: string; cells: Cell[] }[] = [
  { cls: "x3", cells: [ph("man"), solid("blue", ["04", "Multi-agent LLM"]), solid("dark", ["05", "OpenCV vision"]), ph("sculpt"), solid("yellow", ["02", "Real-time speech"])] },
  { cls: "x2", cells: [solid("yellow", ["02", "Real-time speech"]), ph("sil"), solid("cream", ["03", "FastAPI backends"]), solid("red", ["01", "RAG pipelines"]), ph("visit", false, true)] },
  { cls: "x1", cells: [solid("blue", ["04", "Multi-agent LLM"]), ph("man"), solid("red", ["01", "RAG pipelines"]), ph("sculpt"), solid("cream", ["03", "FastAPI backends"])] },
  { cls: "c1", cells: [solid("red", ["01", "RAG pipelines"]), ph("sculpt", true), ph("man", true), solid("blue", ["04", "Multi-agent LLM"]), ph("visit", false, true)] },
  { cls: "c2", cells: [solid("yellow", ["02", "Real-time speech"]), ph("visit", true, true), solid("dark", ["05", "OpenCV vision"]), ph("sil"), solid("red", ["01", "RAG pipelines"])] },
  { cls: "c3", cells: [solid("blue", ["04", "Multi-agent LLM"]), solid("cream", ["03", "FastAPI backends"]), ph("sil", true), solid("yellow", ["02", "Real-time speech"]), ph("sculpt")] },
];

const CellView = ({ c }: { c: Cell }) => {
  if (c.kind === "ph") {
    const cls = ["cell", "ph", `i-${c.img}`, c.crop ? `f-${c.img}` : "", c.visit ? "visit" : ""].filter(Boolean).join(" ");
    return <div className={cls} />;
  }
  return (
    <div className={`cell solid ${c.tone}`}>
      {c.lab && (
        <span className="lab">
          <small>{c.lab[0]}</small>
          {c.lab[1]}
        </span>
      )}
    </div>
  );
};

const EXPO = "cubic-bezier(0.16,1,0.3,1)";
const QUART = "cubic-bezier(0.25,1,0.5,1)";
const QUINT = "cubic-bezier(0.22,1,0.36,1)";
const HANDOFF = 2.1; // s
const CRUISE = 3.42; // % of column height per second (50% / 14.6s)
const EXTRA = 8; // % quint-out drift

const quintOut = (t: number) => 1 - Math.pow(1 - t, 5);

let played = false;

const Hero = () => {
  const [masking, setMasking] = useState(true);
  const stageRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const html = document.documentElement;
    if (played || !html.classList.contains("intro")) {
      html.classList.remove("intro");
      setMasking(false);
      return;
    }
    played = true;

    const timers: number[] = [];
    const run = () => {
    const $ = <T extends Element>(sel: string, root: ParentNode = document): T[] => Array.from(root.querySelectorAll<T>(sel));
    const anims: Animation[] = [];
    const a = (el: Element | null, kf: Keyframe[], opt: KeyframeAnimationOptions) => {
      if (!el) return;
      anims.push(el.animate(kf, { fill: "both", ...opt }));
    };

    // header slide
    a(document.querySelector(".hdr"), [{ transform: "translateY(calc(-100% - 48px))" }, { transform: "translateY(0)" }], { duration: 950, easing: EXPO });
    $(".ustat, .ulinks > *").forEach((el, i) => a(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: 320 + i * 60, easing: QUART }));
    a(document.querySelector(".brand"), [{ opacity: 0, transform: "translateY(-10px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 800, delay: 420, easing: EXPO });
    $(".mnav li").forEach((el, i) => a(el, [{ opacity: 0, transform: "translateY(-8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 700, delay: 480 + i * 60, easing: EXPO }));
    a(document.querySelector(".tools"), [{ opacity: 0, transform: "translateY(-8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 700, delay: 500, easing: EXPO });
    a(document.querySelector(".cta"), [{ opacity: 0, transform: "translateY(-10px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 800, delay: 560, easing: EXPO });

    // headline lines
    a(document.querySelector(".hero .kicker"), [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 700, delay: 200, easing: EXPO });
    $(".h1 .ln > span").forEach((el, i) => a(el, [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }], { duration: 1000, delay: 300 + i * 85, easing: EXPO }));

    // mosaic columns: custom entrance, then hand off to the CSS marquee
    const cols = $<HTMLElement>(".grid .col").filter((c) => getComputedStyle(c).display !== "none");
    const colAnims: Animation[] = [];
    cols.forEach((col, i) => {
      const up = /\b(c2|x1|x3)\b/.test(col.className); // colUp columns rest at -50%
      const end = up ? -50 : 0;
      const dir = up ? -1 : 1;
      const STEPS = 40;
      const kf: Keyframe[] = [];
      for (let k = 0; k <= STEPS; k++) {
        const t = (k / STEPS) * HANDOFF;
        const off = CRUISE * (HANDOFF - t) + EXTRA * (1 - quintOut(t / HANDOFF));
        kf.push({ transform: `translate3d(0, ${end + dir * off}%, 0)`, offset: k / STEPS });
      }
      const anim = col.animate(kf, { duration: HANDOFF * 1000, easing: "linear", fill: "both" });
      colAnims.push(anim);
      anims.push(anim);
      a(col, [{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 120 + i * 70, easing: QUART });
      anim.finished
        .then(() => {
          col.style.animationPlayState = "running";
          anim.cancel();
        })
        .catch(() => {});
    });

    // hero copy
    a(document.querySelector(".hero p"), [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 900, delay: 820, easing: QUINT });
    $(".acts > *").forEach((el, i) => a(el, [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 800, delay: 940 + i * 80, easing: QUINT }));

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setMasking(false);
      html.classList.remove("intro");
      html.dataset.entrance = "done";
      anims.forEach((an) => {
        if (an.playState !== "idle") an.cancel();
      });
      cols.forEach((col) => (col.style.animationPlayState = ""));
    };
    Promise.all(anims.map((an) => an.finished.catch(() => {}))).then(finish);
    timers.push(window.setTimeout(finish, 4200));
    };

    // wait for the welcome overlay to lift before the hero assembles
    if (html.classList.contains("preload")) {
      let started = false;
      const go = () => {
        if (started) return;
        started = true;
        window.removeEventListener("preload:done", go);
        run();
      };
      window.addEventListener("preload:done", go);
      timers.push(window.setTimeout(go, 4600));
    } else {
      run();
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const goProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector<HTMLElement>("#projects");
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -100 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={stageRef} className="stage" id="top" aria-label="Introduction">
      <div className="canvas">
        <div className="hero">
          <span className="kicker">{hero.kicker}</span>
          <h1 className={`h1${masking ? " masking" : ""}`}>
            {hero.lines.map((l) => (
              <span className="ln" key={l}>
                <span>{l}</span>
              </span>
            ))}
          </h1>
          <p>
            {hero.intro[0]}
            <b>{hero.intro[1]}</b>
            {hero.intro[2]}
          </p>
          <div className="acts">
            <a className="pill" href={profile.resume} download aria-label="Download resume (PDF)" data-magnetic data-magnetic-padding="4">
              Resume
            </a>
            <a className="circ" href={profile.resume} target="_blank" rel="noopener noreferrer" aria-label="Open resume in a new tab" data-magnetic data-magnetic-padding="4">
              <DownloadIcon />
            </a>
            <a className="link" href="#projects" onClick={goProjects}>
              Projects
              <span className="arr32" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>

        <div className="grid" aria-hidden="true">
          {COLUMNS.map((col) => (
            <div className={`col ${col.cls}`} key={col.cls}>
              {col.cells.map((c, i) => (
                <CellView c={c} key={`a${i}`} />
              ))}
              {col.cells.map((c, i) => (
                <CellView c={c} key={`b${i}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
