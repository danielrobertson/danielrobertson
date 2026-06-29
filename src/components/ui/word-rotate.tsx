"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function WordRotate({
  words,
  duration = 5000,
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{words[0]}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn("absolute left-0 top-0 whitespace-nowrap", className)}
          initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            x: [0, -2, 0],
          }}
          exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          transition={{
            duration: 0.45,
            ease: [0.4, 0, 0.7, 1],
            x: {
              delay: 0.25,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
