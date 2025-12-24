import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  variant?: Variants;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 0.05,
  animateBy = "words",
  variant,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const defaultContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const defaultItem: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const segments = animateBy === "words" ? text.split(" ") : text.split("");

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant || defaultContainer}
      className={cn("flex flex-wrap", className)}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          variants={defaultItem}
          className="inline-block"
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < segments.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurText;
