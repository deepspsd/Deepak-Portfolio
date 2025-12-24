import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className }) => {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden py-20 lg:py-32",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
