"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
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

export default function AmbientBackground() {
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

  const [isHoveringWindow, setIsHoveringWindow] = useState(false);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth organic spring trailing for the ambient spotlight
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25, mass: 0.8 });

  useEffect(() => {
    // Set initial mouse position to center
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsHoveringWindow(true);
    };

    const handleMouseLeave = () => {
      setIsHoveringWindow(false);
    };

    const handleMouseEnter = () => {
      setIsHoveringWindow(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isHydrated) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Global Tactile Grain / Film Noise Layer */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.032] dark:opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      {/* 2. Static Ambient Atmospheric Glow Orbs (Subtle Depth) */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/5 via-primary/2 to-transparent blur-[120px] dark:from-primary/10 dark:via-primary/3" />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-primary/4 via-primary/2 to-transparent blur-[140px] dark:from-primary/8 dark:via-primary/2" />
      <div className="absolute -bottom-40 left-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-primary/5 via-primary/2 to-transparent blur-[130px] dark:from-primary/10 dark:via-primary/2" />

      {/* 3. Interactive Mouse-Following Ambient Spotlight */}
      {!isTouchDevice && !reduceMotion && (
        <motion.div
          className="fixed h-[650px] w-[650px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-[100px]"
          style={{
            x: springX,
            y: springY,
            background:
              "radial-gradient(circle, var(--ambient-glow, oklch(0.6 0.12 250 / 0.08)) 0%, oklch(0.5 0.08 250 / 0.02) 45%, transparent 70%)",
            opacity: isHoveringWindow ? 1 : 0.4,
            transition: "opacity 0.6s ease",
          }}
        />
      )}
    </div>
  );
}
