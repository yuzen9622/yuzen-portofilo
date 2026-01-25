"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import React, { useRef } from "react";

type ScrollTextProps = {
  text?: string;
  lines?: string[];
  children?: React.ReactNode;
  className?: string;
  lineClassName?: string;
};

export default function ScrollText({ text }: ScrollTextProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end 0.5"],
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });
  const bg = useTransform(springProgress, [0, 1], [0, 100]);
  const background = useMotionTemplate`
  linear-gradient(to right, transparent ${bg}%, var(--background) ${bg}%)
`;
  return (
    <div className=" relative text-xl lg:text-2xl">
      <p className="text-primary/70   leading-normal whitespace-pre-wrap ">
        {text}
      </p>
      <p className=" absolute   top-0 whitespace-pre-wrap ">
        <motion.span
          style={{
            background: background,
          }}
          className=" text-primary/50   whitespace-pre-wrap  leading-normal"
          ref={containerRef}
        >
          {text}
        </motion.span>
      </p>
    </div>
  );
}
