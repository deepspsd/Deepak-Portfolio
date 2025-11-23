import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import BlurText from "@/components/ui/BlurText";

// Main Portfolio Hero Component
const PortfolioHero: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  
  
  
  
  return (
    <div className="relative h-full w-full overflow-hidden bg-black text-white">
      {/* Intro Overlay */}
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeInOut" }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.p
            initial={{ opacity: 0, y: 12, scale: 0.98, letterSpacing: "0.15em" }}
            animate={{ opacity: 1, y: 0, scale: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg tracking-[0.35em] uppercase text-white"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            WELCOME TO THE PORTFOLIO OF
          </motion.p>
        </motion.div>
      )}
      
      
      {/* Hero Section */}
      <motion.main
        className="relative h-screen flex items-center px-4 sm:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 40 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="space-y-8 md:max-w-xl">
            {/* Name layout */}
            <div className="space-y-2 md:space-y-3">
              <BlurText
                text="DEEPAK"
                delay={40}
                animateBy="letters"
                className="block text-[13vw] leading-none tracking-tight text-accent sm:text-[9vw] md:text-[5.5vw] lg:text-[4.8vw]"
                style={{ fontFamily: "'Fira Code', monospace" }}
              />
              <BlurText
                text="PRASAD S"
                delay={40}
                animateBy="letters"
                className="block text-[13vw] leading-none tracking-tight text-accent sm:text-[9vw] md:text-[5.5vw] lg:text-[4.8vw]"
                style={{ fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Tagline, description and CTAs */}
            <div className="max-w-2xl space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1 text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-300"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                AI Engineer · NLP & GenAI · Internship Seeking
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                className="text-sm sm:text-base md:text-lg text-neutral-400"
                style={{ fontFamily: "'Antic', sans-serif" }}
              >
                I design and build AI systems across NLP, generative models, and full‑stack tooling — from
                recommendation engines and voice assistants to security platforms and startup co‑pilots.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <a
                  href="https://drive.google.com/file/d/1j3p_0s3ZZybahMuLznEw_MLrgOm2qpxQ/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent/90"
                >
                  View Resume
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-5 py-2 text-sm font-medium text-neutral-200 transition-colors hover:border-accent hover:text-accent"
                >
                  Contact Me
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
            className="mt-8 md:mt-0 flex w-full justify-center md:w-auto"
          >
            <div className="relative h-72 w-72 sm:h-96 sm:w-96 md:h-[26rem] md:w-[26rem]">
              <div className="pointer-events-none absolute -inset-10 rounded-[2.25rem] bg-[radial-gradient(circle_at_50%_20%,rgba(195,228,29,0.35),transparent_65%)] blur-3xl" />

              <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-neutral-800/80 bg-[radial-gradient(circle_at_50%_0%,#050509,transparent_55%)] shadow-[0_22px_65px_rgba(0,0,0,0.9)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(195,228,29,0.06),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(124,58,237,0.18),transparent_60%)]" />

                <div className="relative flex h-full w-full items-center justify-center p-2.5 sm:p-3.5">
                  <InteractiveRobotSpline
                    scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default PortfolioHero;
