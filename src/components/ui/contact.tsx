import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import Section from "@/components/ui/Section";
import Magnetic from "@/components/ui/Magnetic";
import BlurText from "./BlurText";

const Contact = () => {
  return (
    <Section id="contact" className="min-h-screen flex items-center relative overflow-hidden py-20 lg:py-0">

      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full max-w-7xl mx-auto px-6 relative z-10">

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <BlurText
              text="LET'S CONNECT"
              className="font-syne text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter"
              delay={0.1}
            />
            <p className="font-space text-xl text-neutral-400 max-w-lg leading-relaxed">
              Have a project in mind, or just want to chat? I'm currently <span className="text-accent">available</span> for freelance work and internship opportunities.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer w-max">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-accent group-hover:text-black transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <span className="block text-xs text-neutral-500 uppercase tracking-wider font-space">Email</span>
                <span className="text-lg text-white group-hover:text-accent transition-colors font-syne">dp3189756@gmail.com</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer w-max">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-accent group-hover:text-black transition-colors">
                <MapPin size={20} />
              </div>
              <div>
                <span className="block text-xs text-neutral-500 uppercase tracking-wider font-space">Location</span>
                <span className="text-lg text-white group-hover:text-accent transition-colors font-syne">Bengaluru, India</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <span className="font-space text-neutral-500 uppercase tracking-widest text-sm mb-4 block">Socials</span>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/deepspsd" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/deepak-prasad-678a85270" },
                { icon: Twitter, href: "https://x.com/DeepakAppuSV" }
              ].map((item, i) => (
                <Magnetic key={i}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                  >
                    <item.icon size={24} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl blur-2xl -z-10 opacity-20" />
          <form className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl space-y-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput label="Name" />
              <FloatingInput label="Email" type="email" />
            </div>

            <FloatingInput label="Subject" />
            <FloatingTextarea label="Message" />

            <button type="submit" className="w-full bg-accent text-neutral-950 font-syne font-bold text-lg py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-[0_4px_14px_0_rgba(195,228,29,0.5)]">
              Send Message
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>

      <footer className="absolute bottom-6 left-0 right-0 text-center z-10">
        <p className="text-neutral-600 font-space text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} Deepak Prasad. All rights reserved.
        </p>
      </footer>
    </Section>
  );
};

const FloatingInput = ({ label, type = "text" }: { label: string, type?: string }) => (
  <div className="relative group">
    <input
      type={type}
      placeholder=" "
      className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pt-6 text-white placeholder-transparent focus:outline-none focus:border-accent focus:bg-white/10 transition-all outline-none"
    />
    <label className="absolute left-4 top-1 text-xs font-space text-neutral-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent cursor-text">
      {label}
    </label>
  </div>
);

const FloatingTextarea = ({ label }: { label: string }) => (
  <div className="relative group">
    <textarea
      rows={4}
      placeholder=" "
      className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pt-6 text-white placeholder-transparent focus:outline-none focus:border-accent focus:bg-white/10 transition-all outline-none resize-none"
    />
    <label className="absolute left-4 top-1 text-xs font-space text-neutral-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent cursor-text">
      {label}
    </label>
  </div>
);

export default Contact;
