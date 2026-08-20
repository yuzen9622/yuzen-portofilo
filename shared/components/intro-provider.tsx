"use client";

import { useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { usePathname } from "@/i18n/navigation";

export type IntroStatus = "playing" | "done";

/** 只有首頁會播開場動畫 */
const INTRO_PATHNAME = "/";
/** 開場動畫總長：SplitText 落字（~1.0s）+ 一點緩衝 */
export const INTRO_DURATION_MS = 1200;

type IntroContextValue = {
  status: IntroStatus;
  isPlaying: boolean;
  completeIntro: () => void;
};

const IntroContext = createContext<IntroContextValue>({
  status: "done",
  isPlaying: false,
  completeIntro: () => {},
});

export function useIntro() {
  return useContext(IntroContext);
}

/**
 * 開場動畫的生命週期單一來源（single source of truth）。
 *
 * 為什麼用 context 而不是 zustand：初始值必須依「當前路由」在 SSR 就決定好，
 * 才不會出現「HTML 先畫出 navbar / hero，hydration 後才被遮罩蓋掉」的閃動。
 * 全域 store 在伺服器端是跨請求共用的，無法安全地帶路由資訊。
 */
export default function IntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  // 初始值只算一次：client 端換頁（provider 不會 remount）不會重播開場
  const [status, setStatus] = useState<IntroStatus>(
    pathname === INTRO_PATHNAME ? "playing" : "done",
  );

  const completeIntro = useCallback(() => setStatus("done"), []);

  useEffect(() => {
    if (status !== "playing") return;

    // 使用者要求減少動態效果 -> 立刻結束開場（遮罩本身用 motion-reduce:hidden 隱藏）
    const timeoutId = window.setTimeout(
      completeIntro,
      reduceMotion ? 0 : INTRO_DURATION_MS,
    );
    return () => window.clearTimeout(timeoutId);
  }, [status, reduceMotion, completeIntro]);

  // 開場期間鎖住捲動，結束後還原
  useEffect(() => {
    if (status !== "playing") return;

    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [status]);

  const value = useMemo<IntroContextValue>(
    () => ({ status, isPlaying: status === "playing", completeIntro }),
    [status, completeIntro],
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}
