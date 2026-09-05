"use client";

import { Link } from "@/i18n/navigation";
import { getProjectsContent } from "@/shared/lib/content";
import { useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useRef } from "react";
import ProjectCard from "../components/project-card";
import ProjectScrollStage from "../components/project-scroll-stage";
import { SectionLayout } from "../components/section-layout";

// The pinned viewport plus one scroll leg per transition, so the track grows
// with the project count instead of being a hard-coded height.
const PINNED_VH = 100;
const PER_TRANSITION_VH = 90;

export default function Project({ all = false }: { all?: boolean }) {
  const { locale }: { locale: string } = useParams();
  const t = useTranslations("ProjectPage");
  const reduced = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement | null>(null);

  const projects = getProjectsContent(locale);
  const visibleProjects = projects.slice(0, all ? projects.length : 6);

  // start start -> the track top reaches the viewport top (first project).
  // end end     -> the track bottom reaches the viewport bottom, which is the
  //                last frame the sticky child is fully pinned (last project).
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <SectionLayout
      id="projects"
      leftContent={t("title.leftContent")}
      rightContent={t("title.rightContent")}
      // overflow-visible is required: SectionLayout clips by default and any
      // clipping ancestor silently disables position: sticky below.
      // No opaque background here: the section sits above the fixed ambient
      // background layer, so bg-background would hide the grain and glow for the
      // whole /projects page. Every other section leaves it transparent too.
      className="relative overflow-visible"
    >
      <div
        ref={trackRef}
        className="relative"
        style={{
          height: reduced
            ? "auto"
            : `${PINNED_VH + (visibleProjects.length - 1) * PER_TRANSITION_VH}vh`,
        }}
      >
        {reduced ? (
          <div className="mx-auto w-11/12 max-w-6xl border-t border-border">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="sticky top-0 h-screen h-dvh overflow-hidden">
            <ProjectScrollStage
              projects={visibleProjects}
              progress={scrollYProgress}
            />
          </div>
        )}
      </div>

      <div className="w-11/12 max-w-6xl mx-auto border-t border-border">
        {!all && (
          <Link
            href="/projects"
            data-cursor-text="ALL"
            className="group relative isolate flex min-h-11 items-center justify-between gap-6 overflow-hidden py-6 font-inter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring before:pointer-events-none before:absolute before:inset-0 before:z-0 before:-translate-x-full before:bg-muted/30 before:transition-transform before:duration-300 before:ease-out before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:z-0 after:w-px after:-translate-y-full after:bg-primary after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:before:translate-x-0 hover:after:translate-y-0 focus-visible:before:translate-x-0 focus-visible:after:translate-y-0 motion-reduce:before:duration-0 motion-reduce:after:duration-0 md:py-8"
          >
            <span className="relative z-10 text-2xl font-semibold uppercase tracking-tight text-foreground transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none sm:text-3xl lg:text-4xl">
              {t("title.leftContent")}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="relative z-10 size-5 shrink-0 text-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transition-none"
            />
          </Link>
        )}
      </div>
    </SectionLayout>
  );
}
