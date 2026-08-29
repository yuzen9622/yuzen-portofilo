"use client";

import { Link } from "@/i18n/navigation";
import type { Project } from "@/shared/content/types";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reducedMotion = useReducedMotion() ?? false;
  const isRightAligned = index % 2 === 1;

  return (
    <motion.div
      initial={
        reducedMotion ? false : { opacity: 0, x: isRightAligned ? 12 : -12 }
      }
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={
        reducedMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }
      }
      className={`w-full border-b border-border md:w-[87%] ${
        isRightAligned ? "md:ml-auto" : "md:mr-auto"
      }`}
    >
      <Link
        href={`/projects/${project.slug}`}
        data-project-row=""
        data-cursor-text="VIEW"
        className="group relative isolate block min-h-11 overflow-hidden font-inter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring before:pointer-events-none before:absolute before:inset-0 before:z-0 before:-translate-x-full before:bg-muted/30 before:transition-transform before:duration-300 before:ease-out before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:z-0 after:w-px after:-translate-y-full after:bg-primary after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:before:translate-x-0 hover:after:translate-y-0 focus-visible:before:translate-x-0 focus-visible:after:translate-y-0 motion-reduce:before:duration-0 motion-reduce:after:duration-0"
      >
        <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-3 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto] md:items-center md:gap-x-8 md:py-8 lg:gap-x-12">
          <h3 className="min-w-0 break-normal text-2xl font-semibold uppercase leading-[0.95] tracking-tight text-foreground transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none sm:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="col-span-2 min-w-0 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground md:col-span-1 md:col-start-2 md:row-start-1 md:text-base">
            {project.description}
          </p>
          <div className="col-start-2 row-start-1 flex items-center justify-end gap-3 text-sm font-medium tabular-nums text-muted-foreground md:col-start-3">
            <time dateTime={project.datetime}>{project.datetime}</time>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transition-none"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
