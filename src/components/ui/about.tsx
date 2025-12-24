import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import InteractiveHeading from "@/components/ui/InteractiveHeading";
import profileImg from "@/assets/image.png";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={containerRef} className="relative w-full py-20 lg:py-40 overflow-hidden text-foreground">
      <div className="max-w-7xl mx-auto px-6 grid gap-16 lg:grid-cols-12 items-center">

        {/* Left Column: Typography */}
        <div className="lg:col-span-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="relative inline-block">
              <span className="absolute -left-6 -top-10 font-syne text-[6rem] text-neutral-800/20 select-none -z-10 leading-none">01</span>
              <InteractiveHeading
                text="ABOUT ME"
                className="font-syne text-4xl md:text-6xl font-black leading-[0.9] text-white tracking-tighter"
                delay={0.05}
              />
            </div>
          </motion.div>

          <div className="space-y-8 text-lg md:text-2xl font-light text-neutral-400 font-space leading-relaxed max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              I am an <span className="text-white font-medium">AI Engineering student</span> driven by the conviction that code is a <span className="italic text-accent">creative medium</span>. My work sits at the intersection of Generative AI, NLP, and intuitive Design.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              From architecting secure platforms to training recommendation engines, I enjoy unwrapping complex problems and repackaging them into <span className="text-white underline decoration-accent decoration-2 underline-offset-4">simple, elegant solutions</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <div className="h-[1px] w-full bg-neutral-800 mb-8" />
              <div className="flex gap-12 font-syne text-sm uppercase tracking-widest text-white">
                <div>
                  <span className="block text-neutral-500 mb-2">Location</span>
                  Bengaluru, Karnataka
                </div>
                <div>
                  <span className="block text-neutral-500 mb-2">Experience</span>
                  Fresher
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Visual / Stats with Tilt Effect */}
        <motion.div style={{ y }} className="lg:col-span-5 relative z-10 w-full perspective-1000">
          <div className="grid grid-cols-2 gap-4 w-full">
            {/* Photo Card */}
            <TiltCard
              image={profileImg}
              className="col-span-1 row-span-2 h-full min-h-[300px]"
              delay={0.1}
              initialScale={1.1} // Start slightly larger/different to catch the eye
              initialY={-50}     // Enter from top
            />

            {/* Stats */}
            <TiltCard number="05+" label="Projects" delay={0.3} className="aspect-square" />
            <TiltCard number="02+" label="Years Code" delay={0.4} className="aspect-square" />

            {/* Wide Stat */}
            <TiltCard
              number="20+"
              label="Git Repositories"
              delay={0.5}
              accent
              className="col-span-2"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-neutral-800/20 to-transparent blur-3xl -z-10" />
        </motion.div>
      </div>
    </div>
  );
};

interface TiltCardProps {
  number?: string;
  label?: string;
  image?: string;
  accent?: boolean;
  delay?: number;
  className?: string;
  initialScale?: number;
  initialY?: number;
}

const TiltCard = ({ number, label, image, accent = false, delay = 0, className, initialScale = 0.9, initialY = 0 }: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct * 20);
    y.set(yPct * 20);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const transform = useMotionTemplate`rotateX(${mouseY}deg) rotateY(${-mouseX}deg)`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale, y: initialY }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "backOut" }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform
      }}
      className={cn(
        "relative flex flex-col justify-center p-6 rounded-2xl border backdrop-blur-xl transition-all duration-500 group overflow-hidden",
        accent
          ? "bg-accent text-black border-accent"
          : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20",
        image ? "p-0" : "",
        className
      )}
    >
      {image ? (
        <>
          <div className="absolute inset-0 z-0">
            <img src={image} alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          </div>
          <div style={{ transform: "translateZ(30px)" }} className="relative z-10 mt-auto p-6">
            <span className="font-syne font-bold text-white text-xl">Deepak Prasad</span>
            <span className="block font-space text-xs text-neutral-400 uppercase tracking-widest mt-1">AI Engineer</span>
          </div>
        </>
      ) : (
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
          <span className={cn(
            "font-syne text-4xl md:text-5xl font-bold tracking-tighter block",
            accent ? "text-black" : "text-white"
          )}>{number}</span>
          <span className={cn(
            "font-space text-[10px] uppercase tracking-[0.2em] mt-3 block opacity-80",
            accent ? "text-black" : "text-neutral-400 group-hover:text-white transition-colors"
          )}>{label}</span>
        </div>
      )}

      {/* Glossy Effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{
          background: "linear-gradient(125deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.01) 40%, transparent 100%)"
        }}
      />
    </motion.div>
  );
};

export default About;
