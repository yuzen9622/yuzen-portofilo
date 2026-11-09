"use client";

import { cn } from "@/shared/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
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
} from "@icons-pack/react-simple-icons";

type Skill = { label: string; icon: ReactNode };

const icon = (Icon: typeof SiReact, color?: string) => (
  <Icon color={color} className={color ? undefined : "text-foreground"} size="1em" />
);

const DEFAULT_SKILLS: Skill[] = [
  { label: "React", icon: icon(SiReact, SiReactHex) },
  { label: "TypeScript", icon: icon(SiTypescript, SiTypescriptHex) },
  { label: "Next.js", icon: icon(SiNextdotjs) },
  { label: "Node.js", icon: icon(SiNodedotjs, SiNodedotjsHex) },
  { label: "Python", icon: icon(SiPython, SiPythonHex) },
  { label: "PostgreSQL", icon: icon(SiPostgresql, SiPostgresqlHex) },
  { label: "MongoDB", icon: icon(SiMongodb, SiMongodbHex) },
  { label: "MySQL", icon: icon(SiMysql, SiMysqlHex) },
  { label: "C++", icon: icon(SiCplusplus, SiCplusplusHex) },
  { label: "Git", icon: icon(SiGit, SiGitHex) },
];

/** One endless row. `base` sets its own direction; scroll velocity boosts and flips it. */
function Row({
  children,
  base,
  boost,
  skew,
}: {
  children: ReactNode;
  base: number;
  boost: MotionValue<number>;
  skew: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const setRef = useRef<HTMLDivElement | null>(null);
  const widthRef = useRef(0);
  const direction = useRef(1);

  useEffect(() => {
    const el = setRef.current;
    if (!el) return;
    const update = () => (widthRef.current = el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const w = widthRef.current;
    if (reduceMotion || !w) return;
    const b = boost.get();
    if (b < -0.05) direction.current = -1;
    else if (b > 0.05) direction.current = 1;
    let next = x.get() - base * direction.current * (delta / 1000) * (1 + Math.abs(b));
    if (next <= -w) next += w;
    if (next > 0) next -= w;
    x.set(next);
  });

  return (
    <motion.div style={{ x, skewX: reduceMotion ? 0 : skew }} className="flex w-max">
      <div ref={setRef} className="flex w-max">
        {children}
      </div>
      <div aria-hidden className="flex w-max">
        {children}
      </div>
      <div aria-hidden className="flex w-max">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Two counter-moving typographic rails. The upper one is outlined type that
 * fills in on hover; the lower one is a quieter serif echo. Scrolling speeds
 * them up, reverses them with the scroll direction and shears them slightly.
 */
export default function Marquee({
  skills = DEFAULT_SKILLS,
  className,
}: {
  skills?: Skill[];
  className?: string;
}) {
  const items = skills.length > 0 ? skills : DEFAULT_SKILLS;

  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [-5, 0, 5], { clamp: false });
  const skew = useTransform(velocity, [-2500, 0, 2500], [-7, 0, 7]);

  return (
    <div
      aria-label={`Skills: ${items.map((s) => s.label).join(", ")}`}
      className={cn("relative select-none overflow-hidden py-6", className)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div className="border-y border-foreground/10 py-4 md:py-6">
        <Row base={50} boost={boost} skew={skew}>
          {items.map((item) => (
            <span
              key={item.label}
              aria-hidden
              className="group flex items-center gap-[0.35em] px-[0.4em] font-sans text-[clamp(2.75rem,7vw,6.5rem)] font-semibold uppercase leading-none tracking-[-0.05em]"
            >
              <span className="text-[0.55em] opacity-30 grayscale transition-[opacity,filter,transform] duration-700 ease-fluid group-hover:rotate-[-12deg] group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0">
                {item.icon}
              </span>
              <span className="text-transparent transition-colors duration-700 ease-fluid [-webkit-text-stroke:1px_color-mix(in_oklab,var(--foreground)_45%,transparent)] group-hover:text-foreground group-hover:[-webkit-text-stroke-color:var(--foreground)]">
                {item.label}
              </span>
            </span>
          ))}
        </Row>
      </div>

      <div className="py-3 md:py-4">
        <Row base={-32} boost={boost} skew={skew}>
          {items.map((item) => (
            <span
              key={item.label}
              aria-hidden
              className="flex items-center gap-6 px-6 font-serif text-[clamp(1.5rem,3vw,2.5rem)] italic leading-none text-muted-foreground"
            >
              {item.label}
              <span className="size-1.5 rounded-full bg-foreground/25" />
            </span>
          ))}
        </Row>
      </div>
    </div>
  );
}
