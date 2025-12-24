import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveHeadingProps {
    text: string;
    className?: string;
    delay?: number;
}

const InteractiveHeading: React.FC<InteractiveHeadingProps & { selectedColor?: string }> = ({
    text,
    className,
    delay = 0,
    selectedColor = "rgba(255,255,255,1)"
}) => {
    const [isHovering, setIsHovering] = useState(false);

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
                        transition={{
                            duration: 0.8,
                            delay: delay + i * 0.03,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        className="relative inline-block"
                    >
                        <motion.span
                            animate={isHovering ? {
                                y: Math.random() * 6 - 3,
                                x: Math.random() * 6 - 3,
                                rotate: Math.random() * 8 - 4,
                                color: "rgba(195, 228, 29, 0.9)",
                                textShadow: "0 0 10px rgba(195, 228, 29, 0.5)"
                            } : {
                                y: 0,
                                x: 0,
                                rotate: 0,
                                color: selectedColor,
                                textShadow: "none"
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export default InteractiveHeading;
