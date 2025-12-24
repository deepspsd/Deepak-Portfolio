
import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const BackgroundEffects = () => {
    // Mouse position for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth smooth spring animation for the spotlight
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
            {/* 1. Grain / Noise Overlay */}
            {/* Using the existing CSS class defined in index.css */}
            <div className="noise-overlay opacity-[0.05] mix-blend-overlay" />

            {/* 2. Global Spotlight (Follows Mouse) */}
            <motion.div
                className="absolute -inset-px opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            800px circle at ${smoothX}px ${smoothY}px,
                            rgba(195, 228, 29, 0.15),
                            transparent 80%
                        )
                    `
                }}
            />

            {/* 3. Ambient Floating Orbs (Organic Motion) */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Orb 1: Top Left - Accent Color */}
                <motion.div
                    className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[120px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Orb 2: Bottom Right - Secondary/White Glow */}
                <motion.div
                    className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-white/5 blur-[120px]"
                    animate={{
                        x: [0, -70, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />

                {/* Orb 3: Center/Random - Subtle Pulse */}
                <motion.div
                    className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-accent/3 blur-[100px]"
                    animate={{
                        x: [0, -40, 40, 0],
                        y: [0, 60, -20, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5,
                    }}
                />
            </div>

            {/* 4. Subtle Vignette to focus center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>
    );
};

export default BackgroundEffects;
