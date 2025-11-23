import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      year: "2023 - Present",
      role: "AI Engineering Student",
      company: "Sri Venkateshwara College Of Engineering",
      description:
        "Pursuing a Bachelor of Engineering in Artificial Intelligence with a strong focus on NLP, generative AI and end-to-end ML systems.",
      achievements: [
        "Built multiple ML and deep learning projects as part of coursework and self-learning",
        "Actively involved in AI/ML clubs, hackathons and tech communities",
        "Consistently improving fundamentals in Python, data structures and algorithms"
      ]
    },
    {
      year: "2024 - Present",
      role: "AI / ML Projects & Freelance Work",
      company: "Personal & Open-Source Projects",
      description:
        "Working on real-world projects like recommendation systems, voice assistants and AI-powered platforms to apply concepts beyond the classroom.",
      achievements: [
        "Implemented a movie recommendation system combining content-based and collaborative filtering",
        "Built an AI voice assistant using LLMs and real-time audio streaming",
        "Created and maintained GitHub repositories showcasing production-ready AI/ML code"
      ]
    },
    {
      year: "Currently Seeking",
      role: "AI / ML Internships",
      company: "Open to Opportunities",
      description:
        "Actively looking for internship opportunities in AI/ML where I can contribute to real products, learn from experienced engineers and work with modern LLM/MLOps stacks.",
      achievements: [
        "Open to relocation or remote opportunities for the right role",
        "Interested in NLP, generative AI, computer vision and end-to-end ML pipelines",
        "Ready to bring strong fundamentals, fast learning and a builder mindset to a team"
      ]
    }
  ];

  return (
    <section id="experience" className="h-full py-20 px-4 sm:px-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-accent"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-800"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative mb-12 ${
                index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 bg-neutral-900 border-2 border-accent rounded-full flex items-center justify-center -translate-x-[11px] md:-translate-x-1/2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>

              <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}>
                <motion.div 
                  className="bg-neutral-900/50 dark:bg-neutral-950/50 rounded-lg p-6 border border-neutral-800 backdrop-blur-sm hover:border-accent transition-all hover:scale-105"
                  whileHover={{ boxShadow: "0 0 20px rgba(195, 228, 29, 0.1)" }}
                >
                  <span className="text-accent font-semibold text-sm">{exp.year}</span>
                  <h3 className="text-2xl font-bold text-white mt-2">{exp.role}</h3>
                  <p className="text-neutral-400 mb-3">{exp.company}</p>
                  <p className="text-neutral-300 mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-neutral-400 flex items-start gap-2">
                        <Briefcase className="text-accent w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
