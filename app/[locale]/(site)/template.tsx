"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

/**
 * template.tsx 每次路由切換都會 remount → 提供頁面淡入轉場。
 * Navbar / Footer 位於 layout 層不受影響（音樂播放不中斷）。
 */

// 模組層級旗標：整份文件只會在「首次載入」時為 false，全站重新整理才會重置。
// 只在 useEffect 內寫入，所以伺服器端永遠是 false → SSR / hydration 結果一致。
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    hasNavigated = true;
  }, []);

  // 首次載入不做淡入。否則 SSR 出來的 HTML 帶著 opacity:0，
  // 使用者要等 JS 下載完、hydration 跑完才看得到內容（畫面上只剩 navbar）。
  if (reduceMotion || !hasNavigated) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
