import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

const menuItems = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "SKILLS", href: "#skills" },
    { label: "EDUCATION", href: "#education" },
    { label: "CONTACT", href: "#contact" },
  ];

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    menuItems.forEach((item) => {
      const element = document.getElementById(item.href.substring(1));
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      menuItems.forEach((item) => {
        const element = document.getElementById(item.href.substring(1));
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleNavigation = (href: string) => {
    const targetId = href.startsWith("#") ? href.slice(1) : href;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Header for mobile and theme toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between md:hidden">
          {/* Menu Button */}
          <div className="relative">
            <Button
              ref={buttonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-white/10 dark:hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg ${isDark ? "bg-neutral-900" : "bg-white"} border ${isDark ? "border-neutral-800" : "border-neutral-200"}`}>
                <nav className="py-2">
                  {menuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        handleNavigation(item.href);
                      }}
                      className={`block px-4 py-2 text-sm transition-colors ${activeSection === item.href.substring(1) ? "text-accent font-semibold" : "hover:text-accent"}`}>
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            className="p-2 hover:bg-white/10 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            <div className="relative w-12 h-6 rounded-full bg-neutral-300 dark:bg-neutral-700 transition-colors">
              <motion.div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white`}
                initial={false}
                animate={{ x: isDark ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isDark ? (
                  <Moon size={16} className="text-neutral-900" />
                ) : (
                  <Sun size={16} className="text-yellow-500" />
                )}
              </motion.div>
            </div>
          </Button>
      </header>

      {/* Centered Navigation Bar for Desktop */}
      <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-40 items-center gap-6">
        <div className="rounded-full bg-neutral-900/85 border border-neutral-800/80 px-4 sm:px-6 py-2 shadow-lg shadow-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3 sm:gap-5">
            {menuItems.map((item) => (
              <motion.button
                key={item.label}
                type="button"
                onClick={() => handleNavigation(item.href)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="group relative inline-flex items-center px-1.5 sm:px-2.5 py-1 text-xs sm:text-sm font-medium text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={`Go to ${item.label} section`}
              >
                <span
                  className={`relative block tracking-[0.18em] uppercase transition-colors ${activeSection === item.href.substring(1) ? "text-accent" : "text-neutral-300 group-hover:text-accent"}`}
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {item.label}
                  {activeSection === item.href.substring(1) && (
                    <motion.span 
                      layoutId="underline" 
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-accent" 
                    />
                  )}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
        {/* Theme Toggle for desktop*/}
        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
        <Button
            onClick={toggleTheme}
            className="p-2 hover:bg-white/10 dark:hover:bg-white/10 rounded-full"
            aria-label="Toggle theme"
          >
            <div className="relative w-12 h-6 rounded-full bg-neutral-300 dark:bg-neutral-700 transition-colors">
              <motion.div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white`}
                initial={false}
                animate={{ x: isDark ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isDark ? (
                  <Moon size={16} className="text-neutral-900" />
                ) : (
                  <Sun size={16} className="text-yellow-500" />
                )}
              </motion.div>
            </div>
          </Button>
          </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
