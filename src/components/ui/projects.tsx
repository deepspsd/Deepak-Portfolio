import { motion, useTransform, useScroll, useMotionValue } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/ui/Magnetic";
import BlurText from "./BlurText";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  isAccent?: boolean;
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: "01",
      title: "Movie Rec. System",
      description:
        "End-to-end recommendation engine providing personalized suggestions via content-based & collaborative filtering.",
      tech: ["Python", "React", "Scikit-learn","Next.js","ML"],
      github: "https://github.com/deepspsd/Movie-Recomendation-System",
      demo: "#",
      image: "linear-gradient(to bottom right, #2C5364, #203A43, #0F2027)",
    },
    {
      id: "02",
      title: "AI Voice Assistant",
      description:
        "Real-time voice AI with LiveKit & OpenAI. Features low-latency streaming and natural conversational abilities.",
      tech: ["Python", "LiveKit", "Gemini API"],
      github: "https://github.com/deepspsd/AI-Voice-Assistant",
      demo: "#",
      image: "linear-gradient(to bottom right, #4c1d95, #2e1065)",
    },
    {
      id: "03",
      title: "WebShield Platform",
      description:
        "Enterprise-grade security platform for vulnerability monitoring and signal aggregation.",
      tech: ["HTML", "CSS", "JS", "Python", "MYSQL", "API", "Docker"],
      github: "https://github.com/deepspsd/webshield.official",
      demo: "#",
      image: "linear-gradient(to bottom right, #000000, #434343)",
    },
    {
      id: "04",
      title: "Nexora Co-Pilot",
      description:
        "AI startup co-pilot for idea validation, business planning, and market strategy generation.",
      tech: ["Hugging Face", "React", "Next.js", "Groq", "Python","Agentic AI", "API"],
      github: "https://github.com/deepspsd/Nexora",
      demo: "#",
      image: "linear-gradient(to bottom right, #C3E41D, #1a1a1a)",
      isAccent: true,
    },
  ];

  const targetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [xRange, setXRange] = useState(["0px", "0px"]);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const updateScrollWidth = () => {
      const currentContentWidth = element.scrollWidth;
      const viewportWidth = window.innerWidth;

      if (currentContentWidth > viewportWidth) {
        const finalX = -(currentContentWidth - viewportWidth + 48); // 48px padding
        setXRange(["0px", `${finalX}px`]);
      } else {
        setXRange(["0px", "0px"]);
      }
    };

    updateScrollWidth();
    const timeout = setTimeout(updateScrollWidth, 100);
    window.addEventListener("resize", updateScrollWidth);

    return () => {
      window.removeEventListener("resize", updateScrollWidth);
      clearTimeout(timeout);
    };
  }, [projects.length]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], xRange);

  return (
    <section ref={targetRef} id="projects" className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden z-10">

        {/* Background Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          ref={contentRef}
          style={{ x }}
          className="flex gap-8 md:gap-12 px-6 md:px-12 w-max items-center"
        >
          {/* Intro Card */}
          <div className="relative flex h-[60vh] w-[85vw] md:w-[25vw] shrink-0 flex-col justify-between rounded-[2rem] bg-neutral-900/50 p-8 md:p-12 border border-white/10 backdrop-blur-md shadow-2xl">
            <div>
              <span className="font-space text-sm tracking-widest text-neutral-500 uppercase mb-4 block">Selected Works</span>
              <div className="flex flex-col items-start leading-[0.9]">
                <BlurText
                  text="CORE"
                  className="font-syne text-5xl md:text-7xl font-black tracking-tighter"
                  delay={0.1}
                />
                <BlurText
                  text="PROJECTS."
                  className="font-syne text-5xl md:text-7xl font-black tracking-tighter text-accent"
                  delay={0.15}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-neutral-400 font-space uppercase text-sm tracking-widest">
              <div className="w-12 h-[1px] bg-neutral-600" />
              Scroll to Explore
            </div>
          </div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}

          {/* End Spacer */}
          <div className="w-[10vw]" />
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
    const cursorX = event.clientX - left;
    const cursorY = event.clientY - top;

    const centerX = width / 2;
    const centerY = height / 2;

    x.set((cursorX - centerX) / width);
    y.set((cursorY - centerY) / height);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className="relative h-[65vh] w-[85vw] md:w-[45vw] shrink-0"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative h-full w-full overflow-hidden rounded-[2rem] bg-neutral-900 border border-white/10 transition-colors duration-500 hover:border-accent/40 shadow-xl"
      >
        {/* Project Image / Background */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: project.image }}
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
        </div>

        {/* Content Overlay */}
        <div className="relative flex h-full flex-col justify-between p-8 md:p-12 z-20">
          <div className="flex justify-between items-start transform translate-y-0 text-white">
            <span className="font-syne text-6xl md:text-8xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
              {project.id}
            </span>

            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              <Magnetic>
                <a
                  href={project.github}
                  target="_blank"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors border border-white/10"
                >
                  <Github size={20} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={project.demo}
                  target="_blank"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-black hover:scale-110 transition-transform"
                >
                  <ArrowUpRight size={20} />
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-[10px] md:text-xs font-medium text-white/90 backdrop-blur-sm uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>

            <h3 className={cn("font-syne text-4xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-accent transition-colors duration-300", project.isAccent && "text-accent")}>
              {project.title}
            </h3>

            <p className="font-space text-neutral-200 text-lg max-w-md leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
