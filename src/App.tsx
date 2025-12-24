import { ReactLenis } from '@studio-freight/react-lenis'
import PortfolioHero from "@/components/ui/portfolio-hero";
import Navbar from "@/components/ui/Navbar";
import Experience from "@/components/ui/experience";
import Skills from "@/components/ui/skills";
import Projects from "@/components/ui/projects";
import Contact from "@/components/ui/contact";
import About from "@/components/ui/about";
import Education from "@/components/ui/education";
import Section from "@/components/ui/Section";
import BackgroundEffects from "@/components/ui/BackgroundEffects";

import { MagneticCursor } from "@/components/ui/magnetic-cursor";

function App() {
  return (
    <ReactLenis root>
      <MagneticCursor
        cursorColor="hsl(76, 78%, 50%)"
        magneticFactor={0.1}
        blendMode="difference"
      >
        <main className="bg-black text-white relative">
          <BackgroundEffects />
          <Navbar />
          <Section id="home">
            <PortfolioHero />
          </Section>
          <Section id="about">
            <About />
          </Section>
          <Section id="education">
            <Education />
          </Section>
          <Section id="skills">
            <Skills />
          </Section>
          <Projects />
          <Experience />
          <Contact />
        </main>
      </MagneticCursor>
    </ReactLenis>
  );
}

export default App;
