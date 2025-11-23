import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Engineering in Artificial Intelligence",
      institution: "Sri Venkateshwara College Of Engineering",
      year: "2023 - Present",
      cgpa: "7.5",
      highlights: [
        "Specialization in Artificial Intelligence and Machine Learning",
        "Relevant coursework: Deep Learning, NLP, Computer Vision, Data Structures",
        "Active member of AI/ML club and coding society"
      ]
    }
  ];

  const certifications = [
    "100 Days of Code: The Complete Python Pro Bootcamp",
    "Complete Data Science,Machine Learning,DL,NLP Bootcamp"
  ];

  const achievements = [
    {
      title: "Hackathon Winner - AI Innovation Challenge 2024",
      description: "Built an AI-powered solution for real-time problem solving"
    },
    {
      title: "Research Paper - College Symposium",
      description: "Presented work on sentiment analysis using transformers"
    }
  ];

  return (
    <section id="education" className="h-full py-20 px-4 sm:px-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-accent"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          Education
        </motion.h2>

        {/* Degrees */}
        <div className="mb-16">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-neutral-900/50 dark:bg-neutral-950/50 rounded-lg p-6 border border-neutral-800 backdrop-blur-sm hover:border-accent transition-all mb-6 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <GraduationCap className="text-accent mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">{edu.degree}</h3>
                  <p className="text-accent font-semibold">{edu.institution}</p>
                  <p className="text-neutral-400 text-sm mb-3">{edu.year} • CGPA: {edu.cgpa}</p>
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                        <BookOpen className="text-accent w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-neutral-900/50 dark:bg-neutral-950/50 rounded-lg p-6 border border-neutral-800 backdrop-blur-sm hover:border-accent transition-all hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-accent" size={24} />
              <h3 className="text-2xl font-bold text-white">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <li key={i} className="text-neutral-300 flex items-start gap-2 transition-transform hover:translate-x-1">
                  <Award className="text-accent w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-neutral-900/50 dark:bg-neutral-950/50 rounded-lg p-6 border border-neutral-800 backdrop-blur-sm hover:border-accent transition-all hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-accent" size={24} />
              <h3 className="text-2xl font-bold text-white">Achievements</h3>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, i) => (
                <div key={i}>
                  <p className="text-white font-semibold mb-1">{achievement.title}</p>
                  <p className="text-sm text-neutral-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
