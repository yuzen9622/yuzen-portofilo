"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  once?: boolean;
  amount?: number;
  delay?: number;
};

export default function ScrollReveal({
  children,
  className,
  y = 16,
  once = true,
  amount = 0.2,
  delay = 0,
}: Props) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay,
          },
        },
      };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
