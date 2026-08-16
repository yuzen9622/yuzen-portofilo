"use client";
import { flushSync } from "react-dom";
import { useTheme as useNextTheme } from "next-themes";

type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

const TRANSITION_DURATION_MS = 550;

export default function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();

  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  /**
   * 切換明暗主題。若瀏覽器支援 View Transitions API 且使用者未啟用
   * 「減少動態」偏好，會從點擊位置（太陽/月亮按鈕幾何中心）以圓形
   * clip-path 水波擴散至全螢幕；否則 fallback 為即時切換。
   */
  const toggleTheme = (origin?: { clientX: number; clientY: number }) => {
    const next = isDark ? "light" : "dark";
    const doc = document as DocumentWithViewTransition;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // 無縫向下相容：不支援 View Transitions 或減少動態 → 即時切換
    if (typeof doc.startViewTransition !== "function" || reduceMotion) {
      setTheme(next);
      return;
    }

    // 精確原點：點擊座標；無事件時退回畫面中央
    const x = origin?.clientX ?? window.innerWidth / 2;
    const y = origin?.clientY ?? window.innerHeight / 2;
    // 覆蓋全螢幕所需的最大半徑
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => {
      // next-themes 透過 effect 更新 <html> class，flushSync 確保
      // DOM 在快照截圖前同步完成更新
      flushSync(() => setTheme(next));
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: TRANSITION_DURATION_MS,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        /* transition 被中斷（連續快速點擊）時忽略 */
      });
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    systemTheme,
    isDark,
    isLight:
      theme === "light" || (theme === "system" && systemTheme === "light"),
  };
}
