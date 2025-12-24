import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import InteractiveHeading from "@/components/ui/InteractiveHeading";

const skills = [
  { name: "Python", category: "Language" },
  { name: "Java", category: "Language" },
  { name: "C++", category: "Language" },
  { name: "C", category: "Language" },
  { name: "HTML", category: "Web Development" },
  { name: "CSS", category: "Web Development" },
  { name: "JavaScript", category: "Web Development" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "PyTorch", category: "AI/ML" },
  { name: "Scikit Learn", category: "AI/ML" },
  { name: "HuggingFace", category: "Open Source LLM's" },
  { name: "AI Tools", category: "AI/ML" },
  { name: "LangChain", category: "AI/ML" },
  { name: "API Integration", category: "AI/ML" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Next.js", category: "Frontend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  { name: "MySQL", category: "Database" },
  { name: "Git", category: "Tools" },
  { name: "Aiven And AWS", category: "Cloud" }, 
];

const Skills = () => {
  return (
    <div className="w-full py-20 lg:py-32 relative overflow-hidden">

      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -z-10" />

      <div className="mb-20 text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <InteractiveHeading
            text="TECHNICAL ARSENAL"
            className="font-syne text-5xl md:text-7xl font-bold tracking-tighter"
            delay={0.1}
          />
        </motion.div>
        <p className="font-space text-neutral-400 uppercase tracking-widest text-sm md:text-base">
          My Weapons of Choice for Digital Conquest
        </p>
      </div>

      <div className="relative z-10 space-y-16">
        {/* Row 1: Left to Right */}
        <Marquee pauseOnHover className="[--duration:40s] [--gap:2rem]">
          {skills.slice(0, Math.ceil(skills.length / 2)).map((skill, i) => (
            <SkillCard key={i} {...skill} />
          ))}
        </Marquee>

        {/* Row 2: Right to Left */}
        <Marquee reverse pauseOnHover className="[--duration:40s] [--gap:2rem]">
          {skills.slice(Math.ceil(skills.length / 2)).map((skill, i) => (
            <SkillCard key={i} {...skill} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

const SkillCard = ({ name, category }: { name: string; category: string }) => {
  return (
    <div className="group relative w-64 h-32 cursor-pointer">
      <div className={cn(
        "absolute inset-0 bg-neutral-900/40 backdrop-blur-md border border-white/5 rounded-2xl transition-all duration-300 group-hover:bg-accent group-hover:scale-105 group-hover:rotate-1"
      )} />

      <div className="relative h-full flex flex-col items-center justify-center z-10 p-4 transition-colors duration-300 group-hover:text-black">
        <span className="font-syne text-2xl font-bold text-white group-hover:text-black">{name}</span>
        <span className="font-space text-xs uppercase tracking-wider text-neutral-500 mt-2 group-hover:text-black/60">{category}</span>
      </div>
    </div>
  )
}

export default Skills;
