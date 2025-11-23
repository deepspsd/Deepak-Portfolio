import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-full flex items-center justify-center border-t border-neutral-800 py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-400 text-sm">
            © {currentYear} Deepak Prasad S. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="https://github.com/deepspsd" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/deepak-prasad-678a85270" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com/deepakprasads" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent transition-colors">
              <Twitter size={20} />
            </a>
            <a href="mailto:dp3189756@gmail.com" className="text-neutral-400 hover:text-accent transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
