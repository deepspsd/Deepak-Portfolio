import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";
import Section from "@/components/ui/Section";
import InteractiveHeading from "@/components/ui/InteractiveHeading";
import { skills as groups } from "@/data/resume";

const skills = groups.flatMap((g) => g.items.map((name) => ({ name, category: g.group })));
const half = Math.ceil(skills.length / 2);

const Skills = () => (
  <Section id="skills" className="relative overflow-hidden border-t border-line">
    <div className="w-full py-10 lg:py-16 relative">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -z-10" />

      <div className="mb-20 text-center relative z-10 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block">
          <InteractiveHeading text="TECHNICAL ARSENAL" className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase" delay={0.1} />
        </motion.div>
        <p className="font-sans text-muted uppercase tracking-widest text-sm md:text-base mt-4">
          Modelling, retrieval, serving and shipping
        </p>
      </div>

      <div className="relative z-10 space-y-10 md:space-y-16">
        <Marquee pauseOnHover className="[--duration:40s] [--gap:2rem]">
          {skills.slice(0, half).map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s] [--gap:2rem]">
          {skills.slice(half).map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </Marquee>
      </div>
    </div>
  </Section>
);

const SkillCard = ({ name, category }: { name: string; category: string }) => (
  <div className="group relative w-64 h-32">
    <div className="absolute inset-0 bg-surface border border-line rounded-2xl shadow-sm transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:scale-105 group-hover:rotate-1" />
    <div className="relative h-full flex flex-col items-center justify-center z-10 p-4 text-center transition-colors duration-300">
      <span className="font-display text-2xl font-bold tracking-tight text-ink group-hover:text-accent-fg transition-colors">{name}</span>
      <span className="font-sans text-xs uppercase tracking-wider text-muted mt-2 group-hover:text-accent-fg/70 transition-colors">{category}</span>
    </div>
  </div>
);

export default Skills;
