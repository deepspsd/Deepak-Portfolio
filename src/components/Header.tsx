import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { useTheme } from "@/theme";
import { nav, profile } from "@/data/resume";
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon, MoonIcon, SunIcon, XIcon } from "@/components/Icons";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const headerRef = useRef<HTMLElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const openedByKeyboard = useRef(false);
  const lenis = useLenis();
  const { theme, toggle } = useTheme();

  const go = useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      setOpen(false);
      const el = document.querySelector<HTMLElement>(href);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -100 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    },
    [lenis]
  );

  // scrolled state → header compacts
  useEffect(() => {
    const onScroll = () => document.documentElement.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section
  useEffect(() => {
    const sections = nav.map((n) => document.querySelector<HTMLElement>(n.href)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(`#${en.target.id}`);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive("");
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // menu: escape, outside click, focus first item on keyboard open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    if (openedByKeyboard.current) firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <div className="hdr-wrap">
      <header ref={headerRef} className="hdr" data-open={open ? "" : undefined}>
        {/* utility strip */}
        <div className="util">
          <div className="ustat">
            <span className="dot" aria-hidden="true" />
            <span>Available for AI/ML roles</span>
            <span className="sep" aria-hidden="true" />
            <span>{profile.location}</span>
          </div>
          <div className="ulinks">
            <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}>
              <MailIcon />
              <span>{profile.email}</span>
            </a>
            <button type="button" className="tbtn" onClick={toggle} aria-label={themeLabel} title={themeLabel} data-magnetic data-magnetic-padding="4">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        {/* main row */}
        <div className="main">
          <a className="brand" href="#top" onClick={go("#top")} aria-label={`${profile.name} — back to top`}>
            <span className="name">{profile.brand}</span>
            <span className="tagline">{profile.tagline}</span>
          </a>

          <nav className="mnav" aria-label="Main navigation">
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={go(n.href)} aria-current={active === n.href ? "true" : undefined}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="right">
            <div className="cta">
              <a className="pill" href={profile.resume} download aria-label="Download resume (PDF)" data-magnetic data-magnetic-padding="4">
                Resume
              </a>
              <button type="button" className="circ" onClick={toggle} aria-label={themeLabel} title={themeLabel} data-magnetic data-magnetic-padding="4">
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>

            <div className="tools">
              <button type="button" className="tbtn round" onClick={toggle} aria-label={themeLabel} title={themeLabel}>
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                type="button"
                className="menu-btn"
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label="Menu"
                onClick={(e) => {
                  openedByKeyboard.current = e.detail === 0;
                  setOpen((o) => !o);
                }}
              >
                <span className="burger" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="mlabel">Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* expandable panel (phone / tablet) */}
        <div className="panel" id="site-menu">
          <ul>
            {nav.map((n, i) => (
              <li key={n.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={n.href} onClick={go(n.href)} ref={i === 0 ? firstLinkRef : undefined}>
                  {n.label}
                  <small>0{i + 1}</small>
                </a>
              </li>
            ))}
          </ul>
          <div className="pmeta">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon /> LinkedIn
            </a>
            <a href={profile.x} target="_blank" rel="noopener noreferrer">
              <XIcon /> X
            </a>
            <a href={`mailto:${profile.email}`}>
              <MailIcon /> {profile.email}
            </a>
            <a href={profile.resume} download>
              <DownloadIcon /> Resume (PDF)
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
