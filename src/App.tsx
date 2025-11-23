import PortfolioHero from "@/components/ui/portfolio-hero";
import About from "@/components/ui/about";
import Projects from "@/components/ui/projects";
import Skills from "@/components/ui/skills";
import Education from "@/components/ui/education";
import Experience from "@/components/ui/experience";
import Contact from "@/components/ui/contact";
import Footer from "@/components/ui/footer";
import Section from "@/components/ui/Section";
import Navbar from "@/components/ui/Navbar";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import profileImg from "@/assets/profile.jpg";

function App() {
  const images = [
    {
      src: profileImg,
      alt: "Modern architecture building",
    },
    {
      src: profileImg,
      alt: "Urban cityscape at sunset",
    },
    {
      src: profileImg,
      alt: "Abstract geometric pattern",
    },
    {
      src: profileImg,
      alt: "Mountain landscape",
    },
    {
      src: profileImg,
      alt: "Minimalist design elements",
    },
    {
      src: profileImg,
      alt: "Ocean waves and beach",
    },
    {
      src: profileImg,
      alt: "Forest trees and sunlight",
    },
  ];

  return (
    <main className="bg-black text-white">
      <Navbar />
      <Section id="home" className="h-screen">
        <PortfolioHero />
      </Section>

      <ZoomParallax images={images} />

      <Section id="about">
        <About />
      </Section>
      
      <Section id="experience">
        <Experience />
      </Section>
      
      <Section id="projects">
        <Projects />
      </Section>
      
      <Section id="skills">
        <Skills />
      </Section>
      
      <Section id="education">
        <Education />
      </Section>
      
      <Section id="contact">
        <Contact />
      </Section>
      
      <Footer />
    </main>
  );
}

export default App;
