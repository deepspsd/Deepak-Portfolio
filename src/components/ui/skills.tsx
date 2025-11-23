import { motion } from "framer-motion";
import { Brain, Code, Database, Cloud, Wrench, Users } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Brain,
      title: "AI/ML Frameworks",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "XGBoost", "LightGBM"]
    },
    {
      icon: Code,
      title: "Programming",
      skills: ["Python", "JavaScript", "SQL", "R", "C++", "Java"]
    },
    {
      icon: Database,
      title: "Data & NLP",
      skills: ["Pandas", "NumPy", "Hugging Face", "spaCy", "NLTK", "LangChain"]
    },
    {
      icon: Cloud,
      title: "Cloud & MLOps",
      skills: ["AWS SageMaker", "Azure ML", "Docker", "Kubernetes", "MLflow", "DVC"]
    },
    {
      icon: Wrench,
      title: "Tools & Platforms",
      skills: ["Jupyter", "Git", "FastAPI", "Streamlit", "Gradio", "Weights & Biases"]
    },
    {
      icon: Users,
      title: "Professional Skills",
      skills: ["Research", "Problem Solving", "Team Collaboration", "Technical Writing", "Agile", "Mentoring"]
    }
  ];

  return (
    <section id="skills" className="h-full py-20 px-4 sm:px-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-accent"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          Skills & Tools
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-900 dark:bg-neutral-950 rounded-lg p-6 border border-neutral-800 hover:border-accent transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="text-accent" size={24} />
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1 bg-neutral-800 rounded-full text-neutral-300 hover:bg-accent hover:text-black transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
