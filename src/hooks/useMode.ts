import { useEffect, useState } from "react";

export const MODES = ["desk", "mob", "mob-l", "tab", "tab-l", "tab-p"] as const;
export type Mode = (typeof MODES)[number];

const REF_W = 1280;
const REF_H = 800;

function readMode(): Mode {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--mode").trim();
  return (MODES as readonly string[]).includes(v) ? (v as Mode) : "mob";
}

/** Mirrors the CSS-owned --mode onto <html> classes and computes the desktop stage scale. */
export function fit(): Mode {
  const html = document.documentElement;
  const mode = readMode();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  html.classList.remove(...MODES, "tab", "mob", "side", "tall", "ex1", "ex2", "ex3");
  html.classList.add(mode);
  if (mode.startsWith("tab")) html.classList.add("tab");
  if (mode.startsWith("mob")) html.classList.add("mob");
  if (mode === "mob-l" || mode === "tab-l") html.classList.add("side");

  if (mode === "desk") {
    const s = vw / vh > REF_W / REF_H ? vh / REF_H : vw / REF_W;
    const W = vw / s;
    const H = vh / s;
    html.style.setProperty("--s", String(s));
    html.style.setProperty("--W", String(W));
    html.style.setProperty("--H", String(H));
    if (H > 845) html.classList.add("tall");
    const extra = Math.max(0, Math.min(3, Math.floor((W - 1294) / 218.33)));
    if (extra >= 1) html.classList.add("ex1");
    if (extra >= 2) html.classList.add("ex2");
    if (extra >= 3) html.classList.add("ex3");
  } else {
    html.style.setProperty("--s", "1");
    html.style.setProperty("--W", String(vw));
    html.style.setProperty("--H", String(vh));
  }
  return mode;
}

export function useMode(): Mode {
  const [mode, setMode] = useState<Mode>(() => (typeof window === "undefined" ? "mob" : fit()));

  useEffect(() => {
    const run = () => setMode(fit());
    run();
    window.addEventListener("resize", run);
    window.addEventListener("orientationchange", run);
    return () => {
      window.removeEventListener("resize", run);
      window.removeEventListener("orientationchange", run);
    };
  }, []);

  return mode;
}
