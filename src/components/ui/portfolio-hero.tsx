import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

import profileImg from "@/assets/profile.jpg";

const PortfolioHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveringText, setIsHoveringText] = useState(false);

  // Mouse position for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);

  // Transform for the image: Move DOWN and SCALE DOWN to morph into About section
  const y2 = useTransform(scrollY, [0, 500], [0, 400]);
  const scaleImg = useTransform(scrollY, [0, 500], [1, 0.6]);
  const opacity = useTransform(scrollY, [0, 400, 600], [1, 1, 0]); // Fade out later

  // Spring smoothing for parallax
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scaleImg, { stiffness: 100, damping: 30 });

  return (
    <div
      className="relative h-screen w-full overflow-hidden text-foreground perspective-1000"
      onMouseMove={handleMouseMove}
      ref={containerRef}
      id="hero-container"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(195, 228, 29, 0.08),
              transparent 80%
            )
          `,
        }}
        animate={{ opacity: 1 }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center pb-32 px-6 sm:px-12 md:px-20 lg:px-32 max-w-[1920px] mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >

          {/* Left Column: Text */}
          <motion.div style={{ y: smoothY1 }} className="flex flex-col gap-6 z-20">
            <div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="flex items-center gap-4 mb-4"
              >
                <span className="h-[2px] w-12 bg-accent shadow-[0_0_10px_#c3e41d]"></span>
                <span className="text-accent tracking-[0.2em] text-sm uppercase font-bold font-syne shadow-accent">Welcome To the personal portfolio of</span>
              </motion.div>

              <div
                className="relative leading-[0.85] cursor-default"
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                <InteractiveText text="DEEPAK" isHovering={isHoveringText} delay={0.1} />
                <div className="-mt-[0.1em]">
                  <InteractiveText text="PRASAD" isHovering={isHoveringText} delay={0.2} />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-[100px] -z-10 mix-blend-screen"
                />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="max-w-lg text-neutral-400 text-lg md:text-xl leading-relaxed font-space mt-2"
            >
              AI Engineering Student | Problem Solver <span className="text-white font-medium">following </span>, <span className="text-white font-medium"></span> 3 steps <span className="text-white font-medium">"Code. Learn. Innovate."</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex flex-wrap items-center gap-6 mt-4"
            >
              <Magnetic strength={60}>
                <a
                  href="#projects"
                  className="group flex items-center gap-3 pl-8 pr-2 text-sm uppercase tracking-widest font-bold text-white hover:text-accent transition-colors"
                >
                  View Works
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                    <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  </div>
                </a>
              </Magnetic>

              <Magnetic strength={40}>
                <a
                  href="https://drive.google.com/file/d/1j3p_0s3ZZybahMuLznEw_MLrgOm2qpxQ/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-xs font-bold font-syne uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-sm"
                >
                  Download Resume
                </a>
              </Magnetic>

              <div className="flex gap-4">
                <Magnetic>
                  <SocialLink href="https://github.com/deepspsd" icon={<Github size={20} />} />
                </Magnetic>
                <Magnetic>
                  <SocialLink href="https://www.linkedin.com/in/deepak-prasad-678a85270" icon={<Linkedin size={20} />} />
                </Magnetic>
                <Magnetic>
                  <SocialLink href="mailto:dp3189756@gmail.com" icon={<Mail size={20} />} />
                </Magnetic>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Element */}
          <motion.div
            style={{ y: smoothY2, scale: smoothScale, opacity }}
            className="hidden lg:block relative h-[85vh] w-full pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="relative h-full w-full z-10 flex items-center justify-center"
            >
              <div className="relative w-[600px] h-[600px]">
                <div className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-[80px] animate-pulse-glow" />
                <div className="absolute inset-16 rounded-full border border-white/10 shadow-[inner_0_0_50px_rgba(255,255,255,0.05)] overflow-hidden bg-black">
                  <img src={profileImg} alt="Deepak Prasad" className="w-full h-full object-cover hover:scale-105 transition-all duration-700" />
                </div>
                {/* Rings */}
                <div className="absolute inset-[-20px] border border-white/5 rounded-full rotate-[15deg] scale-y-50 animate-[spin_25s_linear_infinite]" />
                <div className="absolute inset-[-60px] border border-white/5 rounded-full -rotate-[15deg] scale-y-50 animate-[spin_35s_linear_infinite_reverse]" />

                {/* Floating Particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent/50 rounded-full"
                    animate={{
                      x: [0, Math.random() * 100 - 50, 0],
                      y: [0, Math.random() * 100 - 50, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 5 + Math.random() * 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 via-accent to-transparent"
        />
      </motion.div>
    </div>
  );
};

const InteractiveText = ({ text, isHovering, delay }: { text: string, isHovering: boolean, delay: number }) => {
  return (
    <div className="flex overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block text-[10vw] lg:text-[6vw] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-syne"
        >
          {/* Main Character */}
          <motion.span
            animate={isHovering ? {
              y: Math.random() * 10 - 5,
              x: Math.random() * 10 - 5,
              rotate: Math.random() * 10 - 5,
              color: "rgba(195, 228, 29, 0.8)"
            } : { y: 0, x: 0, rotate: 0, color: "rgba(255,255,255,0.9)" }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-block"
          >
            {char}
          </motion.span>
        </motion.span>
      ))}
    </div>
  )
}

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_25px_rgba(195,228,29,0.3)] hover:scale-110 hover:-translate-y-1"
  >
    {icon}
  </a>
);

export default PortfolioHero;
