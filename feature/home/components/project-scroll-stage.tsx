"use client";

import { Link } from "@/i18n/navigation";
import type { Project } from "@/shared/content/types";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MediaFrame from "@/shared/components/media-frame";

/** Degrees of drum rotation between two consecutive projects. */
const ANGLE_STEP = 52;
// Smallest radius that keeps neighbouring cards from intersecting is
// cardHeight / (2 * sin(ANGLE_STEP / 2)); a hair above that keeps the drum
// tight, so a transition reads as rotation rather than vertical travel.
const RADIUS_RATIO = 1.18;
const PERSPECTIVE_RATIO = 2.8;

const pad = (value: number) => String(value).padStart(2, "0");

export default function ProjectScrollStage({
  projects,
  progress,
}: {
  projects: Project[];
  progress: MotionValue<number>;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Number of transitions, i.e. how far the drum turns from first to last.
  const lastIndex = Math.max(projects.length - 1, 1);

  const attachStage = useCallback((node: HTMLDivElement | null) => {
    stageRef.current = node;
    if (node) {
      setViewport({ width: node.clientWidth, height: node.clientHeight });
    }
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      setViewport({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The only React state driven by scroll. It changes at most once per
  // project, not once per scroll event, and exists so exactly one card is
  // hit-testable and in the accessibility tree.
  const syncActive = useCallback(
    (value: number) => {
      const next = Math.min(
        Math.max(Math.round(value * lastIndex), 0),
        projects.length - 1,
      );
      setActiveIndex(next);
    },
    [lastIndex, projects.length],
  );

  // useScroll's own mount measurement emits a change, so a page that loads
  // already scrolled into the track lands on the right card without a sync effect.
  useMotionValueEvent(progress, "change", syncActive);

  const geometry = useMemo(() => {
    const cardWidth = Math.round(
      Math.min(Math.max(viewport.width * 0.82, 280), 840),
    );
    const cardHeight = Math.round(
      Math.min(Math.max(viewport.height * 0.48, 240), 440),
    );
    return {
      cardWidth,
      cardHeight,
      radius: Math.round(cardHeight * RADIUS_RATIO),
      perspective: Math.round(cardHeight * PERSPECTIVE_RATIO),
    };
  }, [viewport.width, viewport.height]);

  const { cardWidth, cardHeight, radius, perspective } = geometry;

  const drumRotation = useTransform(
    progress,
    [0, 1],
    [0, lastIndex * ANGLE_STEP],
  );

  return (
    <div ref={attachStage} className="relative h-full w-full">
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: "50% 50%",
        }}
      >
        <motion.div
          className="relative"
          style={{
            width: cardWidth,
            height: cardHeight,
            transformStyle: "preserve-3d",
            // translateZ first, so the front of the drum lands on the z=0 plane.
            z: -radius,
            rotateX: drumRotation,
          }}
        >
          {projects.map((project, index) => (
            <StageCard
              key={project.slug}
              project={project}
              index={index}
              lastIndex={lastIndex}
              radius={radius}
              progress={progress}
              active={index === activeIndex}
            />
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex w-11/12 max-w-6xl items-center gap-4 font-inter md:bottom-10">
        <span className="text-xs tabular-nums text-muted-foreground">
          {pad(activeIndex + 1)}
        </span>
        <div className="relative h-px flex-1 bg-border">
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left bg-foreground"
            style={{ scaleX: progress }}
          />
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {pad(projects.length)}
        </span>
      </div>
    </div>
  );
}

function StageCard({
  project,
  index,
  lastIndex,
  radius,
  progress,
  active,
}: {
  project: Project;
  index: number;
  lastIndex: number;
  radius: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  // Signed angular distance from the front of the drum, in degrees.
  const angle = useTransform(
    progress,
    (value) => (value * lastIndex - index) * ANGLE_STEP,
  );
  const opacity = useTransform(
    angle,
    [
      -ANGLE_STEP * 1.7,
      -ANGLE_STEP * 0.85,
      0,
      ANGLE_STEP * 0.85,
      ANGLE_STEP * 1.7,
    ],
    [0, 0.5, 1, 0.5, 0],
  );
  const swivel = useTransform(
    angle,
    [-ANGLE_STEP, 0, ANGLE_STEP],
    [11, 0, -11],
  );
  const drift = useTransform(angle, [-ANGLE_STEP, 0, ANGLE_STEP], [38, 0, -38]);
  const scale = useTransform(
    angle,
    [-ANGLE_STEP, 0, ANGLE_STEP],
    [0.86, 1, 0.86],
  );

  return (
    <div
      className={`absolute inset-0 ${active ? "" : "pointer-events-none"}`}
      style={{
        transform: `rotateX(${-index * ANGLE_STEP}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <motion.div
        className="h-full w-full"
        style={{ rotateY: swivel, x: drift, scale, opacity }}
      >
        <Link
          href={`/projects/${project.slug}`}
          tabIndex={active ? undefined : -1}
          aria-hidden={active ? undefined : true}
          data-cursor-text="VIEW"
          className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/20 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-foreground/30 hover:shadow-black/30 focus-visible:-translate-y-1 focus-visible:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0 md:flex-row"
        >
          <MediaFrame
            src={project.picture}
            alt=""
            className="grow md:w-[58%] md:shrink-0 md:grow-0"
            sizes="(max-width: 768px) 86vw, 520px"
            imageClassName="transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
          />

          <div className="flex shrink-0 flex-col justify-between gap-4 p-5 font-inter md:flex-1 md:p-8">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {pad(index + 1)}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-x-0 motion-reduce:group-focus-visible:translate-y-0"
                />
              </div>
              <h3 className="mt-3 text-xl font-semibold uppercase leading-tight tracking-tight text-card-foreground md:mt-4 md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground md:mt-4 md:line-clamp-5">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {project.tech?.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              <time
                dateTime={project.datetime}
                className="ml-auto text-xs tabular-nums text-muted-foreground"
              >
                {project.datetime}
              </time>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
