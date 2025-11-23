import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, Send } from "lucide-react";
import { useForm } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("mldvzkoe"); // Replace with your Formspree ID

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:dp3189756@gmail.com", username: "dp3189756@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/deepak-prasad-678a85270", username: "/deepak-prasad-678a85270" },
    { icon: Github, label: "GitHub", href: "https://github.com/deepspsd", username: "@deepspsd" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/deepakprasads", username: "@deepakprasads" }
  ];

  return (
    <section id="contact" className="h-full py-20 px-4 sm:px-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-accent"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-neutral-400 mb-6" style={{ fontFamily: "'Antic', sans-serif" }}>
              I'm always open to discussing new projects, learning opportunities, collaborations, or internships. 
              Feel free to reach out!
            </p>

            {state.succeeded ? (
              <div className="text-center p-4 bg-neutral-800 border border-accent rounded-lg">
                <p className="text-white">Thanks for your message! I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-neutral-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:border-accent transition-colors text-white backdrop-blur-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:border-accent transition-colors text-white backdrop-blur-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-neutral-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:border-accent transition-colors text-white resize-none backdrop-blur-sm"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-accent text-black font-semibold py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-500 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Connect With Me</h3>
            <div className="space-y-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg hover:border-accent transition-all group backdrop-blur-sm hover:scale-105"
                  >
                    <Icon className="text-accent group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <p className="text-white font-semibold">{link.label}</p>
                      <p className="text-sm text-neutral-400">{link.username}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
