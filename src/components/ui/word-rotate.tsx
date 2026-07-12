"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <span className="relative inline-flex overflow-hidden align-baseline rounded-md px-2 py-0.5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:shadow-[0px_2px_3px_-1px_rgba(255,255,255,0.1),0px_1px_0px_0px_rgba(255,255,255,0.02),0px_0px_0px_1px_rgba(255,255,255,0.08)]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          className={cn("inline-block whitespace-nowrap", className)}
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: "blur(10px)" }
          }
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: "blur(0px)", x: [0, -2, 2, 0] }
          }
          exit={
            reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(10px)" }
          }
          transition={{
            duration: 0.5,
            x: {
              duration: 0.4,
              delay: 0.5,
            },
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
