"use client";
import { ArrowUp, Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";

import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { CircleProgress } from "@/shared/components/circle-progress";

import LanguageSelector from "@/shared/components/lang-switch";

export default function Tool() {
  const { setTheme, theme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = useMemo(
    () => (theme === "system" && systemTheme === "dark") || theme === "dark",
    [theme, systemTheme]
  );

  const circleRef = useRef<SVGCircleElement>(null);
  const { scrollYProgress } = useScroll();
  const [scrollYPercent, setScrollYPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const percent = Math.max(0, Math.min(100, Math.round(latest * 100)));
    setScrollYPercent(percent);
  });
  const reduceMotion = useReducedMotion();

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  });
  const r = 45;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - scrollYPercent / 100);
  if (!mounted) return null;
  return (
    <>
      <NavigationMenuItem
        className=" p-2  cursor-pointer hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary"
        onClick={() => {
          setTheme(isDark ? "light" : "dark");
        }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </NavigationMenuItem>
      <NavigationMenuItem className="">
        <LanguageSelector />
      </NavigationMenuItem>
      {scrollYPercent !== 0 && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <NavigationMenuItem
            className="relative isolate  cursor-pointer   text-foreground"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="relative  z-10 border  flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-background">
              {scrollYPercent === 100 ? (
                <ArrowUp size={18} />
              ) : (
                <CircleProgress
                  ref={circleRef}
                  circumference={circumference}
                  offset={offset}
                  scrollY={
                    reduceMotion
                      ? springProgress.get() * 100
                      : springProgress.get() * 100
                  }
                />
              )}
            </span>
          </NavigationMenuItem>
        </motion.div>
      )}
    </>
  );
}
