import { motion, useScroll, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";
import Section from "@/components/ui/Section";
import InteractiveHeading from "@/components/ui/InteractiveHeading";

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const experiences = [
    {
      year: "2024 - Present",
      role: "AI Engineering Student",
      company: "SVCE",
      description: "Building a strong foundation in Generative AI, NLP, and Deep Learning. Actively building projects and contributing to open source.",
      tech: ["Python", "PyTorch", "LangChain", "Next.js"],
      active: true,
    },
    {
      year: "2024",
      role: "Freelance Developer",
      company: "Self-Employed",
      description: "Delivered custom web and AI solutions including a RAG-based chatbot and a high-performance portfolio site.",
      tech: ["React", "Node.js", "OpenAI API", "Tailwind"],
      active: true,
    },
    {
      year: "Future",
      role: "Aspiring AI Engineer",
      company: "Open to Work",
      description: "Fresher ready to tackle challenging problems in AI/ML and Full Stack Engineering. Eager to learn and ship production code.",
      tech: ["AI Agents", "System Design", "Scalability"],
      active: false,
    },
  ];

  return (
    <Section id="experience" className="min-h-screen relative z-10">
      <div ref={containerRef} className="mx-auto max-w-6xl px-6 relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 flex flex-col items-center text-center"
        >
          <InteractiveHeading
            text="CAREER PATH"
            className="font-syne text-5xl md:text-7xl font-bold text-white mb-6"
            delay={0.1}
          />
          <p className="font-space text-neutral-400 uppercase tracking-widest max-w-sm mx-auto">
            My journey through the digital landscape
          </p>
        </motion.div>

        <div className="relative space-y-24">
          {/* Main Timeline Track */}
          <div className="absolute left-4 md:left-[50%] top-0 bottom-0 w-[1px] bg-white/10" />

          {/* Glowing Progress Line */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-4 md:left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent to-transparent origin-top shadow-[0_0_15px_#c3e41d]"
          />

          {experiences.map((exp, index) => (
            <TimelineItem key={index} data={exp} index={index} />
          ))}
        </div>
      </div>

      {/* Optimized Background Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
    </Section>
  );
};

const TimelineItem = ({ data, index }: { data: any, index: number }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);

  // Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Center Point */}
      <div className="absolute left-4 md:left-[50%] -translate-x-1/2 w-4 h-4 bg-black border-2 border-accent rounded-full z-10 box-content shadow-[0_0_10px_rgba(195,228,29,0.5)] transition-transform duration-300 hover:scale-150" />

      {/* Content Side */}
      <div className="md:w-1/2 pl-12 md:pl-0 md:px-12">
        <div className={`flex flex-col gap-4 ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
          <span className="font-space text-accent text-sm tracking-[0.2em] font-bold">
            {data.year}
          </span>

          <div
            onMouseMove={handleMouseMove}
            className="group relative p-8 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-colors w-full overflow-hidden"
          >
            {/* Spotlight Gradient */}
            <motion.div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    350px circle at ${mouseX}px ${mouseY}px,
                    rgba(195, 228, 29, 0.06),
                    transparent 80%
                  )
                `,
              }}
            />

            <h3 className="relative z-10 font-syne text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
              {data.role}
            </h3>
            <p className="relative z-10 font-space text-lg text-neutral-400 mb-4 font-medium">
              {data.company}
            </p>
            <p className="relative z-10 text-neutral-300 leading-relaxed text-sm mb-6">
              {data.description}
            </p>

            <div className={`relative z-10 flex flex-wrap gap-2 ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
              {data.tech.map((t: string) => (
                <span key={t} className="px-3 py-1 text-[10px] uppercase tracking-wider rounded-full border border-white/10 bg-black/20 text-neutral-400 group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 transition-all">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Empty Side for layout balance */}
      <div className="md:w-1/2 hidden md:block" />

    </motion.div>
  )
}

export default Experience;
