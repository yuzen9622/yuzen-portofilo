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
import TechIcon from "@/shared/components/tech-icon";

/** Degrees of drum rotation between two consecutive projects. */
const ANGLE_STEP = 52;
// The drum turns around the Y axis, so cards travel sideways while the page
// still scrolls vertically. -1 sends them left -> right as you scroll down;
// flip to 1 to send them right -> left.
const TRAVEL = 1;
// Smallest radius that keeps neighbouring cards from intersecting is
// cardWidth / (2 * sin(ANGLE_STEP / 2)); a hair above that keeps the drum
// tight, so a transition reads as rotation rather than sideways travel.
const RADIUS_RATIO = 1.18;
const PERSPECTIVE_RATIO = 2.8;
// How small the drum sits while the section is still approaching the fold.
const ENTRY_SCALE = 0.88;

const pad = (value: number) => String(value).padStart(2, "0");

export default function ProjectScrollStage({
  projects,
  progress,
  entry,
}: {
  projects: Project[];
  progress: MotionValue<number>;
  /** 0 while the track is still below the fold, 1 once it pins. */
  entry: MotionValue<number>;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Number of transitions, i.e. how far the drum turns from first to last.
  const lastIndex = Math.max(projects.length - 1, 1);

  // Mobile browsers resize the visual viewport continuously while the URL bar
  // collapses. Rounding the measurement means those sub-pixel/one-off pixel
  // deltas never reach React, so the drum is not rebuilt mid-scroll.
  const commitViewport = useCallback((width: number, height: number) => {
    const next = { width: Math.round(width), height: Math.round(height) };
    setViewport((current) =>
      current.width === next.width && current.height === next.height
        ? current
        : next,
    );
  }, []);

  const attachStage = useCallback(
    (node: HTMLDivElement | null) => {
      stageRef.current = node;
      if (node) commitViewport(node.clientWidth, node.clientHeight);
    },
    [commitViewport],
  );

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      commitViewport(entry.contentRect.width, entry.contentRect.height);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [commitViewport]);

  // The only React state driven by scroll. It changes at most once per
  // project, not once per scroll event, and exists so exactly one card is
  // hit-testable and in the accessibility tree.
  const activeIndexRef = useRef(0);
  const syncActive = useCallback(
    (value: number) => {
      const next = Math.min(
        Math.max(Math.round(value * lastIndex), 0),
        projects.length - 1,
      );
      // The event fires every scroll frame; the index changes once per project.
      // Comparing against a ref keeps the other ~59 frames out of React entirely.
      if (next === activeIndexRef.current) return;
      activeIndexRef.current = next;
      setActiveIndex(next);
    },
    [lastIndex, projects.length],
  );

  // useScroll's own mount measurement emits a change, so a page that loads
  // already scrolled into the track lands on the right card without a sync effect.
  useMotionValueEvent(progress, "change", syncActive);

  const geometry = useMemo(() => {
    // The card is a portrait column at every breakpoint, so it stays narrow and
    // takes its height from the stage instead. This wrapper IS the card box —
    // never cap the card inside it, or the drum spaces cards by a width they
    // no longer have and the gaps blow out.
    const cardWidth = Math.round(
      Math.min(Math.max(viewport.width * 0.82, 320), 600),
    );
    const cardHeight = Math.round(
      Math.min(Math.max(viewport.height * 0.72, 240), 440),
    );
    return {
      cardWidth,
      cardHeight,
      // Both derive from the width now: a Y-axis drum is spaced by how wide
      // the cards are, not how tall.
      radius: Math.round(cardWidth * RADIUS_RATIO),
      perspective: Math.round(cardWidth * PERSPECTIVE_RATIO),
    };
  }, [viewport.width, viewport.height]);

  const { cardWidth, cardHeight, radius, perspective } = geometry;

  const drumRotation = useTransform(
    progress,
    [0, 1],
    [0, -TRAVEL * lastIndex * ANGLE_STEP],
  );

  // Scaling the perspective container scales the composited 3D result as a
  // flat image, so the shrink is exactly uniform. Putting it on the drum
  // instead would scale the cards' translateZ but not the drum's, pushing the
  // front plane off z = 0.
  const entryScale = useTransform(entry, [0, 1], [ENTRY_SCALE, 1]);

  return (
    <div ref={attachStage} className="relative h-full w-full">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: "50% 50%",
          scale: entryScale,
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
            rotateY: drumRotation,
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
      </motion.div>

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
  // Positive means the card has already been scrolled past.
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
  // Secondary motion, mirrored from the vertical drum: the card tips a little
  // as it swings across and drifts on the axis the drum is not turning on.
  const swivel = useTransform(angle, [-ANGLE_STEP, 0, ANGLE_STEP], [-7, 0, 7]);
  const drift = useTransform(angle, [-ANGLE_STEP, 0, ANGLE_STEP], [22, 0, -22]);
  const scale = useTransform(
    angle,
    [-ANGLE_STEP, 0, ANGLE_STEP],
    [0.86, 1, 0.86],
  );
  // opacity 0 still costs a composited layer, and every card on the drum keeps
  // one alive for the whole scroll. Flipping visibility at the exact angle the
  // fade completes drops the far side of the drum out of paint entirely, so a
  // six-card drum composites three cards instead of six. Driven by the motion
  // value, so the cull costs no React render.
  const visibility = useTransform(angle, (value) =>
    Math.abs(value) > ANGLE_STEP * 1.7 ? "hidden" : "visible",
  );

  return (
    <div
      className={`absolute inset-0 ${active ? "" : "pointer-events-none"}`}
      style={{
        transform: `rotateY(${TRAVEL * index * ANGLE_STEP}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <motion.div
        className="h-full w-full"
        style={{ rotateX: swivel, y: drift, scale, opacity, visibility }}
      >
        <Link
          href={`/projects/${project.slug}`}
          tabIndex={active ? undefined : -1}
          aria-hidden={active ? undefined : true}
          data-cursor-text="VIEW"
          className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card/80 shadow-lg shadow-black/20 max-w-md md:bg-card/50 md:shadow-2xl md:backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-foreground/30 hover:shadow-black/30 focus-visible:-translate-y-1 focus-visible:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0"
        >
          <MediaFrame
            src={project.picture}
            alt=""
            className="min-h-0 grow backdrop-blur-none md:backdrop-blur-md"
            imageClassName="transition-transform duration-500  ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
          />

          <div className="flex shrink-0 flex-col justify-between gap-4 p-5 font-inter md:gap-5 md:p-6">
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
              <h3 className="mt-3 text-xl font-semibold uppercase leading-tight tracking-tight text-card-foreground md:mt-4 md:text-2xl">
                {project.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground md:mt-3">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {project.tech?.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  title={tech}
                  aria-label={tech}
                  className="inline-flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground"
                >
                  <TechIcon name={tech} size={16} />
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
