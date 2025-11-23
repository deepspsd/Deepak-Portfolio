import React, { useState, useEffect, useRef, useMemo } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "bottom",
  className = "",
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (element) {
            observer.unobserve(element);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {segments.map((segment, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            filter: isVisible ? "blur(0px)" : "blur(10px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0)"
              : direction === "top"
              ? "translateY(-20px)"
              : "translateY(20px)",
            transition: `all 0.5s ease ${index * delay}ms`,
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < segments.length - 1 && " "}
        </span>
      ))}
    </div>
  );
};

export default BlurText;
