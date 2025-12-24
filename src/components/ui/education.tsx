import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import InteractiveHeading from "@/components/ui/InteractiveHeading";

const Education = () => {
  const containerRef = useRef<HTMLElement>(null);

  const education = [
    {
      degree: "Bachelor of Engineering in Artificial Intelligence",
      institution: "Sri Venkateshwara College Of Engineering",
      location: "Bengaluru, India",
      year: "2023 - Present",
      cgpa: "7.5",
      highlights: [
        "Specialization in Artificial Intelligence and Machine Learning",
        "Deep Learning, NLP, Computer Vision, Data Structures",
        "Active member of Entrepreneurship club and coding society"
      ]
    }
  ];

  const certifications = [
    "100 Days of Code : The Complete Python Pro Bootcamp",
    "Complete Data Science, Machine Learning, DL, NLP Bootcamp"
  ];


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="education" className="min-h-screen py-32 px-6 relative overflow-hidden bg-background">
      {/* Vibrant Animated Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div style={{ opacity, y }} className="mb-24 text-center">
          <InteractiveHeading
            text="ACADEMIC JOURNEY"
            className="font-syne text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
            delay={0.1}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-space text-neutral-400 uppercase tracking-widest text-sm max-w-lg mx-auto"
          >
            Foundation of Knowledge & Continuous Learning
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Education Column */}
          <div className="lg:col-span-2 space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="font-syne text-3xl font-bold text-white flex items-center gap-3 mb-8"
            >
              <GraduationCap className="text-accent" />
              Formal Education
            </motion.h3>

            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-accent/30 hover:bg-white/5 transition-all duration-500 overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-colors" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h4 className="text-3xl font-bold text-white font-syne mb-2 group-hover:text-accent transition-colors">{edu.degree}</h4>
                      <p className="text-neutral-400 font-space text-lg">{edu.institution}</p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1 font-space text-xs text-neutral-500 uppercase tracking-wider">
                      <span className="flex items-center gap-2"><Calendar size={12} className="text-accent" /> {edu.year}</span>
                      <span className="flex items-center gap-2"><MapPin size={12} className="text-accent" /> {edu.location}</span>
                      <span className="text-accent font-bold mt-1 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">CGPA: {edu.cgpa}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {edu.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3 text-neutral-300 text-sm group/item">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover/item:bg-accent transition-colors shadow-[0_0_8px_currentColor]" />
                        <span className="leading-relaxed font-light">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Certs & Achievements */}
          <div className="space-y-12">

            {/* Certifications */}
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="font-syne text-2xl font-bold text-white flex items-center gap-3 mb-6"
              >
                <Award className="text-accent" />
                Certifications
              </motion.h3>

              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="p-5 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all cursor-default group"
                  >
                    <p className="text-sm text-neutral-300 leading-snug group-hover:text-white transition-colors">{cert}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
