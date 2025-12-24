import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from '@studio-freight/react-lenis';
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -50% 0px", threshold: 0.1 }
    );

    menuItems.forEach((item) => {
      const el = document.getElementById(item.href.substring(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(id, { offset: 0 });
      setIsMenuOpen(false);
    } else {
      const el = document.getElementById(id.substring(1));
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <>
      {/* Desktop Floating Nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300",
          isScrolled ? "scale-95 top-4" : "scale-100"
        )}
      >
        <div className="flex items-center gap-1 p-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] ring-1 ring-white/5">
          {menuItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "relative px-5 py-2.5 rounded-full text-xs font-semibold font-syne tracking-wide transition-all duration-300",
                  isActive ? "text-black" : "text-neutral-400 hover:text-white"
                )}
                data-magnetic
                data-magnetic-padding="4"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-accent rounded-full -z-10 shadow-[0_0_20px_rgba(195,228,29,0.35)]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10 uppercase">{item.label}</span>
              </button>
            )
          })}
        </div>
      </motion.nav>

      {/* Mobile Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center md:hidden bg-background/80 backdrop-blur-md border-b border-white/5"
      >
        <span className="font-syne font-bold text-xl text-white tracking-tighter">DP.</span>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative group z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-95 transition-all text-white"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-6 text-center">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: "backOut" }}
                  onClick={() => scrollTo(item.href)}
                  className="relative group font-syne text-5xl font-bold text-transparent text-stroke hover:text-accent hover:text-stroke-0 transition-all duration-300 uppercase"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                >
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-2">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-[120px]"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
