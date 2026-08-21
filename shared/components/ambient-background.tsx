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

/**
 * Soft glow painted purely as a radial gradient.
 *
 * The previous implementation used `blur-[120px]` on a 500px box, which forces
 * WebKit to allocate an off-screen framebuffer far larger than the element for
 * every repaint. Stacked three deep behind a `fixed` layer that repaints on
 * scroll, this was enough to exhaust GPU memory on high-DPR iPhones. A radial
 * gradient produces the same visual falloff with no filter and no extra buffer,
 * so the boxes are simply sized to cover what the blur used to bleed into.
 */
const ORB_GRADIENT =
  "radial-gradient(closest-side, var(--ambient-orb) 0%, var(--ambient-orb-soft) 55%, transparent 100%)";

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

  const enableSpotlight = !isTouchDevice && !reduceMotion;

  useEffect(() => {
    if (!enableSpotlight) return;

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
  }, [enableSpotlight, mouseX, mouseY]);

  if (!isHydrated) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/*
        1. Global Tactile Grain / Film Noise Layer

        Pointer-fine devices only. A full-viewport `fixed` layer with a blend
        mode forces the compositor to read back the whole backdrop on every
        repaint; on high-DPR mobile WebKit that readback is what tipped scrolling
        into a GPU out-of-memory crash. The grain sits at ~3% opacity and is
        effectively invisible at phone pixel density anyway, so touch devices
        skip it entirely rather than paying for it.

        The texture is also a pre-rasterized PNG now (`/noise.png`) instead of an
        inline SVG `feTurbulence`, so no procedural filter is evaluated at paint
        time.
      */}
      {!isTouchDevice && (
        <div
          className="pointer-events-none fixed inset-0 z-40 opacity-[0.032] mix-blend-overlay dark:opacity-[0.045]"
          style={{
            backgroundImage: 'url("/noise.png")',
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      )}

      {/* 2. Static Ambient Atmospheric Glow Orbs (Subtle Depth) */}
      <div
        className="absolute -top-64 -left-64 h-[760px] w-[760px]"
        style={{ background: ORB_GRADIENT }}
      />
      <div
        className="absolute top-1/4 -right-72 h-[880px] w-[880px]"
        style={{ background: ORB_GRADIENT }}
      />
      <div
        className="absolute -bottom-64 left-[10%] h-[810px] w-[810px]"
        style={{ background: ORB_GRADIENT }}
      />

      {/* 3. Interactive Mouse-Following Ambient Spotlight */}
      {enableSpotlight && (
        <motion.div
          className="pointer-events-none fixed h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2"
          style={{
            x: springX,
            y: springY,
            // Gradient-only falloff: dropping the former `blur-[100px]` removes a
            // large off-screen buffer that was re-created as the cursor moved.
            background:
              "radial-gradient(closest-side, var(--ambient-glow, oklch(0.6 0.12 250 / 0.08)) 0%, oklch(0.5 0.08 250 / 0.02) 50%, transparent 100%)",
            opacity: isHoveringWindow ? 1 : 0.4,
            transition: "opacity 0.6s ease",
          }}
        />
      )}
    </div>
  );
}
