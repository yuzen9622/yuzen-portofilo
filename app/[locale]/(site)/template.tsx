"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * template.tsx 每次路由切換都會 remount → 提供頁面淡入轉場。
 * Navbar / Footer 位於 layout 層不受影響（音樂播放不中斷）。
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
