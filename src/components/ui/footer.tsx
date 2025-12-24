const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-accent rounded-full animate-pulse" />
          <span className="font-space text-sm text-neutral-500">
            All Systems Operational
          </span>
        </div>

        <p className="font-space text-sm text-neutral-600">
          © {currentYear} Deepak Prasad S.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
