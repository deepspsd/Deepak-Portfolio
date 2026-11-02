import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme";

interface InteractiveHeadingProps {
    text: string;
    className?: string;
    delay?: number;
}

const InteractiveHeading: React.FC<InteractiveHeadingProps> = ({ text, className, delay = 0 }) => {
    const [isHovering, setIsHovering] = useState(false);
    const { theme } = useTheme();
    const restColor = theme === "dark" ? "rgba(244,244,240,1)" : "rgba(15,15,14,1)";
    const hotColor = theme === "dark" ? "rgba(195,228,29,0.9)" : "rgba(239,93,68,0.95)";
    const glow = theme === "dark" ? "0 0 10px rgba(195,228,29,0.5)" : "0 0 10px rgba(239,93,68,0.35)";

    return (
        <div
            className={cn("relative inline-block cursor-default select-none", className)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="flex overflow-hidden flex-wrap justify-center">
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                        className="relative inline-block"
                    >
                        <motion.span
                            animate={isHovering ? {
                                y: Math.random() * 6 - 3,
                                x: Math.random() * 6 - 3,
                                rotate: Math.random() * 8 - 4,
                                color: hotColor,
                                textShadow: glow
                            } : {
                                y: 0,
                                x: 0,
                                rotate: 0,
                                color: restColor,
                                textShadow: "none"
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="inline-block"
                        >
                            {char === " " ? " " : char}
                        </motion.span>
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export default InteractiveHeading;
