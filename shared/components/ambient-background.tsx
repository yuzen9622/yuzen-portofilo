"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const emptySubscribe = () => () => {};

const TOUCH_QUERY = "(pointer: coarse), (hover: none)";

function subscribeTouch(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(TOUCH_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getTouchSnapshot() {
  // Deliberately media-query only. `"ontouchstart" in window` and
  // `maxTouchPoints > 0` are both true on plenty of desktop browsers, which
  // would wrongly disable the pointer-driven spotlight there.
  return window.matchMedia(TOUCH_QUERY).matches;
}

/**
 * Falloff profile shared by every ambient glow.
 *
 * These stops are the measured radial profile of the original
 * `blur-[120px]`-on-a-circle version, so the gradient reproduces what the CSS
 * filter used to paint without asking WebKit for a giant off-screen blur
 * buffer. Sampling it rather than eyeballing it matters: the authored 5% fill
 * only peaked near 2% once the blur had spread it, and a gradient that starts
 * at the authored value reads as a hard blob instead of atmosphere.
 */
function falloff(peak: string) {
  const at = (weight: number) =>
    `color-mix(in oklab, ${peak} ${weight}%, transparent)`;
  return [
    `radial-gradient(circle closest-side,`,
    `${peak} 0%,`,
    `${at(92)} 17%,`,
    `${at(71)} 33%,`,
    `${at(40)} 50%,`,
    `${at(18)} 67%,`,
    `${at(6)} 83%,`,
    `transparent 100%)`,
  ].join(" ");
}

const ORB_GRADIENT = falloff("var(--ambient-orb)");
const SPOTLIGHT_GRADIENT = falloff(
  "var(--ambient-glow, oklch(0.6 0.12 250 / 0.036))",
);

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
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/*
        1. Global Tactile Grain / Film Noise Layer

        `/noise.png` carries balanced black and white speckles in its alpha
        channel, so plain alpha compositing reads as grain on a light or a dark
        backdrop with no net colour cast. That removes the `mix-blend-overlay`
        this layer used to rely on — a blend mode on a full-viewport `fixed`
        layer forces the compositor to read the whole page back on every
        repaint, which is what pushed high-DPR mobile WebKit into a GPU
        out-of-memory crash while scrolling. Without it the grain is cheap
        enough to keep on every device.

        The texture is also pre-rasterized rather than an inline SVG
        `feTurbulence`, so no procedural filter runs at paint time.
      */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage: 'url("/noise.png")',
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/*
        2. Static Ambient Atmospheric Glow Orbs (Subtle Depth)

        Each box is sized to the footprint the old blurred circle actually
        covered (its 500-600px element plus the blur tail) and centred on that
        version's measured centroid, which sat slightly off the element's centre
        because the fill was a corner-to-corner linear gradient.
      */}
      <div
        className="absolute top-[-430px] left-[-430px] size-[968px]"
        style={{ background: ORB_GRADIENT }}
      />
      <div
        className="absolute top-[calc(33.333%_-_311px)] right-[-471px] size-[1148px]"
        style={{ background: ORB_GRADIENT }}
      />
      <div
        className="absolute bottom-[-454px] left-[calc(25%_-_294px)] size-[1058px]"
        style={{ background: ORB_GRADIENT }}
      />

      {/* 3. Interactive Mouse-Following Ambient Spotlight */}
      {enableSpotlight && (
        <motion.div
          className="pointer-events-none fixed size-[910px] -translate-x-1/2 -translate-y-1/2"
          style={{
            x: springX,
            y: springY,
            // Same measured falloff, so dropping the former `blur-[100px]` costs
            // nothing visually while removing a large off-screen buffer that was
            // rebuilt as the cursor moved.
            background: SPOTLIGHT_GRADIENT,
            opacity: isHoveringWindow ? 1 : 0.4,
            transition: "opacity 0.6s ease",
          }}
        />
      )}
    </div>
  );
}
