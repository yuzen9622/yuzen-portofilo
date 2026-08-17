"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * 全域過場動畫 Loading 畫面：
 * 解決全站各頁面佈局差異過大（Hero、Bento、兩欄、單欄等）導致骨架屏跳動突兀的問題。
 * 採用與版面無關的現代極簡光暈軌道動畫，提供絲滑優雅的轉場視覺體驗。
 */
export default function Loading() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="relative flex min-h-[72vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-16 select-none"
    >
      <span className="sr-only">頁面載入中...</span>

      {/* 1. 背景氛圍呼吸光暈 */}
      <motion.div
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-primary/10 dark:bg-primary/15 blur-[90px]"
        initial={{ opacity: 0.4, scale: 0.85 }}
        animate={
          reduceMotion
            ? { opacity: 0.6, scale: 1 }
            : {
                opacity: [0.35, 0.7, 0.35],
                scale: [0.88, 1.12, 0.88],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. 動畫核心容器 */}
      <motion.div
        className="relative flex flex-col items-center gap-8"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* 雙軌軌道光圈與中央標誌 */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          {/* 擴散脈衝波 */}
          {!reduceMotion && (
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/30 dark:border-primary/40"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{
                scale: [0.8, 1.45, 1.7],
                opacity: [0.6, 0.2, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}

          {/* 外層順時針旋轉軌道 */}
          <motion.div
            className="absolute inset-0"
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              className="h-full w-full -rotate-90 text-primary/40 dark:text-primary/50"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="16 12 8 12"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* 內層逆時針旋轉軌道 */}
          <motion.div
            className="absolute inset-2"
            animate={reduceMotion ? {} : { rotate: -360 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              className="h-full w-full text-foreground/20 dark:text-foreground/30"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
            </svg>
          </motion.div>

          {/* 軌道上的流動亮點 */}
          {!reduceMotion && (
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute top-0 left-1/2 -ml-1.5 h-3 w-3 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary,#6366f1)]" />
            </motion.div>
          )}

          {/* 中央品牌/標誌晶片 */}
          <motion.div
            className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-background/80 shadow-lg backdrop-blur-md dark:border-primary/30 dark:bg-muted/40"
            animate={
              reduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 15px rgba(var(--primary-rgb, 99, 102, 241), 0.1)",
                      "0 0 25px rgba(var(--primary-rgb, 99, 102, 241), 0.25)",
                      "0 0 15px rgba(var(--primary-rgb, 99, 102, 241), 0.1)",
                    ],
                  }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="font-mono text-base font-bold tracking-tighter text-foreground">
              YZ
            </span>
          </motion.div>
        </div>

        {/* 3. 轉場文字與微進度條 */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
            <span>LOADING</span>
            {!reduceMotion && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ...
              </motion.span>
            )}
          </div>

          {/* 掃描微動態條 */}
          <div className="relative h-1 w-24 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="absolute inset-y-0 w-10 rounded-full bg-primary"
              initial={{ x: "-100%" }}
              animate={
                reduceMotion
                  ? { x: "0%", width: "100%" }
                  : {
                      x: ["-100%", "240%"],
                    }
              }
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
