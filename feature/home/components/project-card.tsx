"use client";

import { Link } from "@/i18n/navigation";
import type { Project } from "@/shared/content/types";
import Bezel from "@/shared/components/bezel";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import useMobile from "@/shared/hooks/use-mobile";

/**
 * One card in the sticky z-axis cascade. While later cards slide over it, the
 * card recedes (scale + dim) driven by the list's scroll progress.
 */
export default function ProjectCard({
  project,
  index,
  total,
  listProgress,
}: {
  project: Project;
  index: number;
  total: number;
  listProgress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobile();
  // no stacking choreography on phones: plain vertical list
  const reduceMotion = (useReducedMotion() ?? false) || isMobile;

  // Image parallax while this card travels through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-12%", "0%"]);
  const entryRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [index % 2 ? 2 : -2, 0]);

  const start = index / total;
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(listProgress, [start, 1], reduceMotion ? [1, 1] : [1, targetScale]);
  const dim = useTransform(listProgress, [start, 1], reduceMotion ? [0, 0] : [0, (total - 1 - index) * 0.08]);

  return (
    <div ref={ref} className="md:sticky md:top-0 md:flex md:h-[100dvh] md:items-center">
      {/* cascade offset so stacked card edges peek out above each other */}
      <div
        className="w-full md:translate-y-[calc(var(--i)*1.25rem)]"
        style={{ "--i": index } as React.CSSProperties}
      >
      <motion.div
        style={{ scale, rotate: entryRotate }}
        className="w-full origin-top md:will-change-transform"
      >
        <Link
          href={`/projects/${project.slug}`}
          data-cursor-text="VIEW"
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-[2rem]"
        >
          <Bezel
            // opaque surfaces: cards stack on top of each other
            className="bg-[oklch(0.96_0_0)] dark:bg-[oklch(0.19_0_0)]"
            innerClassName="grid bg-background dark:bg-[oklch(0.165_0_0)] md:grid-cols-12 md:h-[min(68vh,620px)]"
          >
            {/* Copy */}
            <div className="relative flex flex-col justify-between gap-10 p-6 md:col-span-5 md:p-10">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <time dateTime={project.datetime}>{project.datetime}</time>
                <span className="ml-4 h-px flex-1 bg-foreground/10" />
              </div>

              <div className="space-y-5">
                <h3 className="break-words font-sans text-[clamp(2rem,4vw,3.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em]">
                  {project.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.description}
                </p>
                {project.tech && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {project.tech.slice(0, 5).join("  /  ")}
                  </p>
                )}
              </div>

              <span className="inline-flex w-fit items-center gap-3 rounded-full bg-foreground py-1.5 pl-5 pr-1.5 text-sm font-medium text-background transition-transform duration-700 ease-fluid group-active:scale-[0.98]">
                View case
                <span className="flex size-8 items-center justify-center rounded-full bg-background/15 transition-transform duration-700 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.25}
                    className="size-4 transition-transform duration-700 ease-fluid group-hover:rotate-45"
                  />
                </span>
              </span>
            </div>

            {/* Visual */}
            <div className="relative m-1.5 aspect-[16/10] overflow-hidden rounded-[calc(2rem-0.75rem)] bg-muted md:col-span-7 md:m-2 md:aspect-auto">
              <motion.div style={{ y: imageY }} className="absolute -inset-y-[12%] inset-x-0">
                <Image
                  src={project.picture}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 58vw, 92vw"
                  className="object-cover object-left transition-transform duration-[1.4s] ease-fluid group-hover:scale-[1.04]"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_oklch(0_0_0/0.06)] rounded-[inherit]" />
            </div>

            {/* Dims as the next card covers this one */}
            <motion.div
              aria-hidden
              style={{ opacity: dim }}
              className="pointer-events-none absolute inset-0 bg-black"
            />
          </Bezel>
        </Link>
      </motion.div>
      </div>
    </div>
  );
}
