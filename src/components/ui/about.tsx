import { motion } from "framer-motion";

const About = () => {
  const techStack = [
    "Python", "TensorFlow", "PyTorch", "Scikit-learn",
    "Hugging Face", "LangChain", "API's", "LLMs",
    "Computer Vision", "NLP", "Deep Learning", "MLOps"
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-accent" style={{ fontFamily: "'Fira Code', monospace" }}>
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg mb-6 text-neutral-400" style={{ fontFamily: "'Antic', sans-serif" }}>
                I&apos;m an AI Engineering student focused on NLP, generative AI, and end‑to‑end ML systems. I enjoy turning
                ideas into working products — from recommendation engines and voice assistants to platforms that make
                the web more secure.
              </p>
              <p className="text-lg mb-6 text-neutral-400" style={{ fontFamily: "'Antic', sans-serif" }}>
                Right now, I&apos;m actively looking for AI/ML internship opportunities where I can contribute to real products,
                work with experienced engineers, and deepen my understanding of modern LLM and MLOps stacks.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-accent">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-neutral-800 dark:bg-neutral-900 rounded-lg text-sm hover:bg-accent hover:text-black transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
