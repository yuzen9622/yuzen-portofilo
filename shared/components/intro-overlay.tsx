"use client";

import { AnimatePresence, motion } from "framer-motion";

import SplitText from "@/shared/components/split-text";
import { useIntro } from "@/shared/components/intro-provider";

const EASE = [0.22, 1, 0.36, 1] as const;
/** 標題 morph 到 Hero 的時間，兩端必須一致（見 hero.tsx 的 RotatingText） */
export const INTRO_MORPH_DURATION = 0.9;

/**
 * 全域開場遮罩。
 *
 * 刻意放在 layout 最上層（navbar 的兄弟節點）而不是 Hero 裡面：
 * 1. `fixed` 不會被 template.tsx 的 transform 圈成新的 containing block。
 * 2. 背景不設 `initial`，所以 SSR 輸出的 HTML 本身就是不透明滿版，
 *    第 0 毫秒就蓋住 navbar，不必等 JS 下載與 hydration。
 */
export default function IntroOverlay() {
  const { isPlaying } = useIntro();

  return (
    <>
      {/* 背景放在 AnimatePresence 內：它需要 exit 才能淡出 */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            key="intro-backdrop"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-[100] bg-background motion-reduce:hidden"
          />
        )}
      </AnimatePresence>

      {/*
       * 標題刻意放在 AnimatePresence *外面*。
       *
       * 這是殘影的真正修法：`layoutId` 本身沒問題，問題是舊節點被 AnimatePresence 留住。
       * - 在 AnimatePresence 內：framer 會保留舊節點與新節點做 shared-layout crossfade，
       *   兩份「Yuzen」同時存在、互相穿透 → 殘影。
       * - 在外面：isPlaying 轉 false 時 React 直接卸載，framer 只拿它最後的 bounding box
       *   把 Hero 的 RotatingText 投影過去 → 單一元素 morph，畫面上永遠只有一份「Yuzen」。
       */}
      {isPlaying && (
        <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center font-inter motion-reduce:hidden">
          <motion.h1
            layoutId="hero-title"
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: EASE,
              layout: { duration: INTRO_MORPH_DURATION, ease: EASE },
            }}
            className="text-6xl uppercase md:text-7xl lg:text-8xl"
          >
            <SplitText text="Yuzen" delay={0.1} stagger={0.09} />
          </motion.h1>
        </div>
      )}
    </>
  );
}
