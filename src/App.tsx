import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider, useTheme } from "@/theme";
import { useMode } from "@/hooks/useMode";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const LIGHT_CURSOR = "#0697ab"; // reads as coral on paper through the difference blend
const DARK_CURSOR = "hsl(76, 78%, 50%)";

function Site() {
  useMode();
  const { theme } = useTheme();

  return (
    <MagneticCursor cursorColor={theme === "dark" ? DARK_CURSOR : LIGHT_CURSOR} magneticFactor={0.1} blendMode="difference">
      <Preloader />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <SpeedInsights />
      <Analytics />
    </MagneticCursor>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Site />
    </ThemeProvider>
  );
}
