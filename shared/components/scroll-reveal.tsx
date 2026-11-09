"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/shared/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  blur?: number;
  once?: boolean;
  amount?: number;
  delay?: number;
  duration?: number;
  as?: "div" | "li" | "span" | "p";
};

/** Heavy fade-up with a blur that resolves as the element enters the viewport. */
export default function ScrollReveal({
  children,
  className,
  y = 48,
  blur = 10,
  once = true,
  amount = 0.25,
  delay = 0,
  duration = 1.1,
  as = "div",
}: Props) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  const variants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration, ease: EASE_EXPO, delay },
        },
      };

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </Component>
  );
}

/**
 * Line-by-line mask reveal: each line slides up out of an invisible box.
 * Pass `animate` to drive it from a parent state (e.g. the intro); otherwise it
 * plays when scrolled into view.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  play,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const line: Variants = reduceMotion
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : {
        hidden: { y: "110%", rotate: 2.5 },
        show: (i: number) => ({
          y: "0%",
          rotate: 0,
          transition: { duration: 1.2, ease: EASE_EXPO, delay: delay + i * stagger },
        }),
      };

  const trigger =
    play === undefined
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.4 } }
      : { initial: "hidden", animate: play ? "show" : "hidden" };

  return (
    <motion.span className={className} {...trigger}>
      {lines.map((content, i) => (
        <span key={i} className="block overflow-hidden pb-[0.16em] -mb-[0.16em]">
          <motion.span
            custom={i}
            variants={line}
            className={`block origin-bottom-left ${lineClassName ?? ""}`}
          >
            {content}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
