"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * 文章頁淡入轉場（同 (site)/template.tsx）。
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
