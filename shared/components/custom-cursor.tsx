"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

const emptySubscribe = () => () => {};

function subscribeTouch(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(pointer: coarse)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getTouchSnapshot() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

export type CursorVariant = "default" | "pointer" | "text" | "custom";

export default function CustomCursor() {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isTouchDevice = useSyncExternalStore(
    subscribeTouch,
    getTouchSnapshot,
    () => false,
  );

  const reduceMotion = useReducedMotion();

  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [customText, setCustomText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for the outer trailing ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check what element the mouse is hovering over
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const customTextAttr = target
        .closest("[data-cursor-text]")
        ?.getAttribute("data-cursor-text");
      if (customTextAttr) {
        setCursorVariant("custom");
        setCustomText(customTextAttr);
        return;
      }

      const interactive = target.closest(
        "a, button, [role='button'], input, select, textarea, [data-cursor='pointer'], .cursor-pointer",
      );
      if (interactive) {
        setCursorVariant("pointer");
        setCustomText("");
        return;
      }

      setCursorVariant("default");
      setCustomText("");
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isTouchDevice, isVisible]);

  if (!isHydrated || isTouchDevice || reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* 1. Precise Fast-tracking Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-foreground -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          opacity:
            isVisible && cursorVariant !== "custom"
              ? cursorVariant === "pointer"
                ? 0.3
                : 1
              : 0,
          scale: isClicking ? 0.7 : cursorVariant === "pointer" ? 0.5 : 1,
          transition: "opacity 0.2s ease, transform 0.15s ease",
        }}
      />

      {/* 2. Spring-smoothed Outer Trailing Ring / Pill / Custom Badge */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center rounded-full border border-foreground/40 "
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width:
            cursorVariant === "custom"
              ? 76
              : cursorVariant === "pointer"
                ? 48
                : 28,
          height:
            cursorVariant === "custom"
              ? 76
              : cursorVariant === "pointer"
                ? 48
                : 28,
          scale: isClicking ? 0.88 : 1,
          backgroundColor:
            cursorVariant === "custom"
              ? "var(--foreground)"
              : "transparent",
     borderColor:
            cursorVariant === "custom"
              ? "transparent"
              : cursorVariant === "pointer"
                ? "oklch(var(--primary-raw, 0.5 0.05 260) / 0.5)"
                : "var(--border)",     
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.4,
        }}
      >
        <AnimatePresence>
          {cursorVariant === "custom" && customText && (
            <motion.span
              key={customText}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[10px] font-bold tracking-widest uppercase text-background select-none"
            >
              {customText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
