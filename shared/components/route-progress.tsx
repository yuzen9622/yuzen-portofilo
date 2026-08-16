"use client";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "loading" | "done";

const STALL_TIMEOUT_MS = 10_000;
const FADE_OUT_MS = 450;

/**
 * 頂部簡約進度條：偵測內部連結點擊開始累積進度，
 * 等 pathname commit（新頁面完成渲染）後補滿並淡出。
 * 不依賴任何第三方 loader；減少動態偏好時不顯示。
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const prevPathnameRef = useRef(pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearStallTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // 偵測內部導覽點擊 → 開始跑進度
  useEffect(() => {
    const resolveInternalDestination = (event: MouseEvent): string | null => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return null;
      }
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return null;
      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return null;
      if (anchor.hasAttribute("download")) return null;
      let url: URL;
      try {
        url = new URL(anchor.getAttribute("href") ?? "", window.location.href);
      } catch {
        return null;
      }
      if (url.origin !== window.location.origin) return null;
      return `${url.pathname}${url.search}`;
    };

    const handleClick = (event: MouseEvent) => {
      const destination = resolveInternalDestination(event);
      if (!destination) return;
      const current = `${window.location.pathname}${window.location.search}`;
      if (destination === current) return;
      setPhase("loading");
      // fallback：路由遲遲未 commit（例如導覽被中止）時自動收回
      clearStallTimer();
      timeoutRef.current = setTimeout(() => setPhase("idle"), STALL_TIMEOUT_MS);
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      clearStallTimer();
    };
  }, []);

  // pathname commit（新頁面渲染完成）→ 補滿並淡出。
  // setState 放在排程回呼中，避免 effect body 內同步 setState 造成 cascading renders。
  useEffect(() => {
    if (prevPathnameRef.current === pathname) return;
    prevPathnameRef.current = pathname;
    clearStallTimer();
    const doneTimer = setTimeout(() => {
      setPhase("done");
      fadeTimerRef.current = setTimeout(() => setPhase("idle"), FADE_OUT_MS);
    }, 0);
    return () => {
      clearTimeout(doneTimer);
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    };
  }, [pathname]);

  if (reduceMotion || phase === "idle") return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[9999] h-0.5 origin-left bg-primary"
      initial={{ scaleX: 0, opacity: 1 }}
      animate={
        phase === "loading"
          ? { scaleX: [0, 0.2, 0.55, 0.75, 0.85], opacity: 1 }
          : { scaleX: 1, opacity: [1, 1, 0] }
      }
      transition={
        phase === "loading"
          ? { duration: 6, times: [0, 0.2, 0.5, 0.8, 1], ease: "easeOut" }
          : { duration: 0.4, ease: "easeOut" }
      }
    />
  );
}
