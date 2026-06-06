"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

type Props = {
  heightClassName?: string;
};

export default function ScrollProgress({ heightClassName = "h-1" }: Props) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      className={`fixed left-0 top-0 z-50 w-full origin-left bg-primary/80 ${heightClassName}`}
      style={{
        scaleX: reduceMotion ? scrollYProgress : springProgress,
      }}
    />
  );
}
