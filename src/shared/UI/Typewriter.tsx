import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type TypewriterProps = {
  text: string;
  speed?: number;
  shuffleSpeed?: number;
  isHoverable?: boolean;
  delay?: number;
};

const chars = "!@#$%^&*";

function Typewriter({
  text,
  speed = 50,
  shuffleSpeed = 50,
  isHoverable = true,
  delay = 0,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const originalTextRef = useRef(text);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
  if (!inView) return;

  let currentIndex = 0;
  let interval: ReturnType<typeof setInterval>;

  setDisplayedText("");

  const timeout = setTimeout(() => {
    interval = setInterval(() => {
      currentIndex++;

      setDisplayedText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        clearInterval(interval);
      }
    }, speed);
  }, delay);

  return () => {
    clearTimeout(timeout);
    if (interval) clearInterval(interval);
  };
}, [inView, text, speed, delay]);

  useEffect(() => {
    if (!isHovering || displayedText.length !== text.length) return;

    let iterations = 0;

    const interval = setInterval(() => {
      setDisplayedText(
        originalTextRef.current
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return originalTextRef.current[index];

            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterations++;

      if (iterations > originalTextRef.current.length) {
        clearInterval(interval);
        setDisplayedText(originalTextRef.current);
      }
    }, shuffleSpeed);

    return () => clearInterval(interval);
  }, [isHovering, displayedText.length, text.length, shuffleSpeed]);

  return (
    <span
      ref={ref}
      onMouseEnter={() => isHoverable && setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setDisplayedText(text);
      }}
    >
      {displayedText}
    </span>
  );
}

export default Typewriter;