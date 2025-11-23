import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Movie Recommendation System",
      description:
        "Built an end-to-end movie recommendation system combining content-based and collaborative filtering to personalize suggestions from a large catalog.",
      tech: [
        "Python",
        "Pandas",
        "Scikit-learn",
        "Recommendation Systems",
        "Data Visualization",
      ],
      github: "https://github.com/deepspsd/Movie-Recomendation-System",
      demo: "#",
    },
    {
      title: "AI Voice Assistant using LiveKit",
      description:
        "Developed a real-time AI voice assistant that uses speech recognition, LLMs, and LiveKit for low-latency audio streaming and conversational responses.",
      tech: [
        "Python",
        "LiveKit",
        "OpenAI",
        "WebSockets",
        "FastAPI",
      ],
      github: "https://github.com/deepspsd/AI-Voice-Assistant",
      demo: "#",
    },
    {
      title: "WebShield: Enterprise-Grade Web Security Platform",
      description:
        "Designed a full-stack platform that monitors web applications for vulnerabilities, aggregates security signals, and surfaces actionable insights for teams.",
      tech: [
        "React",
        "Node.js",
        "Express",
        "JWT",
        "PostgreSQL",
        "Docker",
      ],
      github: "https://github.com/deepspsd/webshield.official",
      demo: "#",
    },
    {
      title: "Nexora – AI-Powered Startup Co‑Pilot",
      description:
        "Built Nexora, an AI platform that helps entrepreneurs validate ideas, draft business plans, and outline MVPs and market strategies using LLM-powered workflows.",
      tech: [
        "Next.js",
        "TypeScript",
        "OpenAI",
        "Prisma",
        "PostgreSQL",
      ],
      github: "https://github.com/deepspsd/Nexora",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="h-full py-20 px-4 sm:px-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-accent"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-neutral-900 dark:bg-neutral-950 rounded-lg p-6 border border-neutral-800 hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/20"
            >
              <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
              <p className="text-neutral-400 mb-4 text-sm">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-neutral-800 rounded text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project.github}
                  className={`flex items-center gap-1 text-sm text-neutral-400 ${project.github !== '#' ? 'hover:text-accent transition-colors' : 'opacity-50 cursor-not-allowed'}`}
                  onClick={(e) => project.github === '#' && e.preventDefault()}
                >
                  <Github size={16} />
                  Code
                </a>
                <a
                  href={project.demo}
                  className={`flex items-center gap-1 text-sm text-neutral-400 ${project.demo !== '#' ? 'hover:text-accent transition-colors' : 'opacity-50 cursor-not-allowed'}`}
                  onClick={(e) => project.demo === '#' && e.preventDefault()}
                >
                  <ExternalLink size={16} />
                  Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
