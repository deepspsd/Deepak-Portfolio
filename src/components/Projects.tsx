import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import BlurText from "@/components/ui/BlurText";
import GlassFolder, { type FolderFile } from "@/components/ui/glass-folder-cards";
import Lightbox, { type Shot } from "@/components/Lightbox";
import { GithubIcon } from "@/components/Icons";
import { useTheme } from "@/theme";
import { projects as data, type Project } from "@/data/resume";

/** Every image under src/assets/projects/<slug>/ becomes a screenshot of that project. */
const shotModules = import.meta.glob("@/assets/projects/*/*.{png,jpg,jpeg,webp,gif}", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const shotsFor = (slug: string): Shot[] =>
  Object.entries(shotModules)
    .filter(([path]) => path.includes(`/projects/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => ({ src, name: path.split("/").pop()!.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") }));

const Projects = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [xRange, setXRange] = useState(["0px", "0px"]);
  const [gallery, setGallery] = useState<{ project: Project; shots: Shot[]; index: number } | null>(null);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    const updateScrollWidth = () => {
      const currentContentWidth = element.scrollWidth;
      const viewportWidth = window.innerWidth;
      setXRange(currentContentWidth > viewportWidth ? ["0px", `${-(currentContentWidth - viewportWidth + 48)}px`] : ["0px", "0px"]);
    };
    updateScrollWidth();
    const timeout = setTimeout(updateScrollWidth, 100);
    window.addEventListener("resize", updateScrollWidth);
    return () => {
      window.removeEventListener("resize", updateScrollWidth);
      clearTimeout(timeout);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], xRange);

  return (
    <section ref={targetRef} id="projects" className="relative h-[400vh] border-t border-line">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

        <motion.div ref={contentRef} style={{ x }} className="pj-track flex gap-10 px-6 md:px-12 w-max items-center">
          {/* Intro Card */}
          <div className="pj-intro relative flex shrink-0 flex-col justify-between rounded-[2rem] bg-surface p-8 md:p-10 border border-line shadow-2xl">
            <div>
              <span className="font-sans text-sm tracking-widest text-muted uppercase mb-4 block">Selected Works</span>
              <div className="flex flex-col items-start leading-[0.9]">
                <BlurText text="CORE" className="font-display text-5xl md:text-6xl font-black tracking-tighter text-ink" delay={0.1} />
                <BlurText text="PROJECTS." className="font-display text-5xl md:text-6xl font-black tracking-tighter text-accent" delay={0.15} />
              </div>
            </div>
            <div className="flex items-center gap-4 text-muted font-sans uppercase text-xs tracking-widest">
              <div className="w-10 h-[1px] bg-muted" />
              Scroll · Click a folder
            </div>
          </div>

          {data.map((project, i) => (
            <FolderCard key={project.id} project={project} delay={i * 140} onOpenShots={(shots, index) => setGallery({ project, shots, index })} />
          ))}

          <div className="w-[10vw]" />
        </motion.div>
      </div>

      {gallery &&
        createPortal(
          <Lightbox title={gallery.project.title} slug={gallery.project.slug} shots={gallery.shots} index={gallery.index} onClose={() => setGallery(null)} />,
          document.body
        )}
    </section>
  );
};

const FolderCard = ({ project, delay, onOpenShots }: { project: Project; delay: number; onOpenShots: (shots: Shot[], index: number) => void }) => {
  const { theme } = useTheme();
  const shots = useMemo(() => shotsFor(project.slug), [project.slug]);

  const files: FolderFile[] = useMemo(
    () =>
      shots.length
        ? shots.map((s) => ({ name: s.name, meta: "Screenshot", image: s.src }))
        : [
            { name: "Screenshots", meta: "Coming soon", art: "glacier" },
            { name: project.tags[0] ?? "Stack", meta: project.tags.slice(1, 3).join(" · "), art: "verdant" },
            { name: "README", meta: "GitHub" },
          ],
    [shots, project.tags]
  );

  return (
    <article className="pj-card relative shrink-0 rounded-[2rem] bg-surface border border-line shadow-xl">
      <div className="pj-text">
        <div>
          <span className="pj-num">{project.id}</span>
          <h3 className="pj-title text-ink">{project.title}</h3>
          <p className="pj-sub">{project.sub}</p>
          {project.metrics && (
            <div className="pj-metrics">
              {project.metrics.map((m) => (
                <div key={m.l}>
                  <strong className="text-ink">{m.v}</strong>
                  <span>{m.l}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="pj-foot">
          <div className="tags">
            {project.tags.slice(0, 5).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-fg hover:scale-110 transition-transform shrink-0"
            data-magnetic
            data-magnetic-padding="4"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="pj-art">
        <GlassFolder
          label={project.short}
          meta={shots.length ? `${shots.length} screenshot${shots.length === 1 ? "" : "s"}` : "Screenshots"}
          tone={theme}
          art={project.art}
          seed={Number(project.id) * 7 + 3}
          files={files}
          action="more"
          labelPlacement="top-left"
          appearDelay={delay}
          width={300}
          menu={[
            { label: "View all screenshots", onSelect: () => onOpenShots(shots, 0) },
            { label: "Open on GitHub", onSelect: () => window.open(project.github, "_blank", "noopener") },
          ]}
          onFileSelect={(_, i) => onOpenShots(shots, shots.length ? Math.min(i, shots.length - 1) : 0)}
        />
      </div>
    </article>
  );
};

export default Projects;
