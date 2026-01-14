"use client";

import { cn } from "@/shared/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  SiReact,
  SiReactHex,
  SiCplusplus,
  SiCplusplusHex,
  SiMongodb,
  SiMongodbHex,
  SiPostgresql,
  SiPostgresqlHex,
  SiMysql,
  SiMysqlHex,
  SiNodedotjs,
  SiNextdotjs,
  SiNodedotjsHex,
  SiTypescript,
  SiTypescriptHex,
  SiPython,
  SiPythonHex,
  SiGit,
  SiGitHex,
  IconType,
  SiNextdotjsHex,
} from "@icons-pack/react-simple-icons";

const DEFAULT_SKILLS = [
  { label: "React", icon: <SiReact color={SiReactHex} size={65} /> },
  { label: "C++", icon: <SiCplusplus color={SiCplusplusHex} size={65} /> },
  { label: "MongoDB", icon: <SiMongodb color={SiMongodbHex} size={65} /> },
  {
    label: "PostgreSQL",
    icon: <SiPostgresql color={SiPostgresqlHex} size={65} />,
  },
  { label: "MySQL", icon: <SiMysql color={SiMysqlHex} size={65} /> },
  { label: "Node.js", icon: <SiNodedotjs color={SiNodedotjsHex} size={65} /> },
  { label: "Next.js", icon: <SiNextdotjs color={SiNextdotjsHex} size={65} /> },
  {
    label: "TypeScript",
    icon: <SiTypescript color={SiTypescriptHex} size={65} />,
  },
  { label: "Python", icon: <SiPython color={SiPythonHex} size={65} /> },
  { label: "Git", icon: <SiGit color={SiGitHex} size={65} /> },
];

type MarqueeProps = {
  skills?: { label: string; icon: React.ReactNode }[];
  speedPxPerSecond?: number;
  className?: string;
};

export default function Marquee({
  skills = DEFAULT_SKILLS,
  speedPxPerSecond = 90,
  className,
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);

  const firstSetRef = useRef<HTMLDivElement | null>(null);
  const contentWidthRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const items = useMemo(() => {
    const safeSkills = skills.length > 0 ? skills : DEFAULT_SKILLS;
    return safeSkills;
  }, [skills]);

  useEffect(() => {
    const el = firstSetRef.current;
    if (!el) return;

    const update = () => {
      contentWidthRef.current = el.getBoundingClientRect().width;
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, [items]);

  useAnimationFrame((time) => {
    if (shouldReduceMotion || isPaused) {
      lastTimeRef.current = time;
      return;
    }

    const last = lastTimeRef.current;
    lastTimeRef.current = time;
    if (last == null) return;

    const dt = (time - last) / 1000;
    const contentWidth = contentWidthRef.current;
    if (!contentWidth) return;

    const next = x.get() - speedPxPerSecond * dt;
    x.set(next <= -contentWidth ? next + contentWidth : next);
  });

  return (
    <section className={cn("max-w-full overflow-y-hidden  ", className)}>
      <div className="w-11/12 mx-auto ">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={cn(
            "mt-6 relative overflow-hidden rounded-2xl  bg-background/60 backdrop-blur-xs",
            "py-6"
          )}
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
          aria-label="Skills marquee"
        >
          <div className="relative ">
            <motion.div
              className="flex w-max gap-20 group px-6 will-change-transform"
              style={{ x }}
            >
              <div ref={firstSetRef} className=" flex w-max gap-20">
                {items.map((item) => (
                  <div
                    className="group-hover:blur-xs p-6 duration-500   transition-all hover:blur-none!"
                    key={item.label}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
              <div ref={firstSetRef} className="flex w-max gap-20">
                {items.map((item) => (
                  <div
                    className="group-hover:blur-md  p-6  w-full h-full transition-all duration-500 hover:blur-none!"
                    key={item.label}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
            </motion.div>

            {shouldReduceMotion && (
              <p className="px-6 mt-3 text-xs text-muted-foreground">
                Reduced motion enabled.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
