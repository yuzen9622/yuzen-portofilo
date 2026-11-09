"use client";

import { getProjectsContent } from "@/shared/lib/content";
import { useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useRef } from "react";
import ProjectCard from "../components/project-card";
import { SectionLayout } from "../components/section-layout";
import PillLink from "@/shared/components/pill-link";
import ScrollReveal from "@/shared/components/scroll-reveal";

export default function Project({ all = false }: { all?: boolean }) {
  const { locale }: { locale: string } = useParams();
  const t = useTranslations("ProjectPage");
  const projects = getProjectsContent(locale);
  const visibleProjects = projects.slice(0, all ? projects.length : 6);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start start", "end end"],
  });

  return (
    <SectionLayout
      id="projects"
      leftContent={t("title.leftContent")}
      rightContent={t("title.rightContent")}
      // No opaque background: the fixed ambient layer (grain/glow) shows through.
      className="relative"
    >
      <div
        ref={listRef}
        className="mx-auto mt-12 flex w-11/12 max-w-7xl flex-col gap-6 md:mt-0 md:gap-0"
      >
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            total={visibleProjects.length}
            listProgress={scrollYProgress}
          />
        ))}
      </div>
      {!all && (
        <ScrollReveal className="mx-auto mt-16 flex w-11/12 max-w-7xl justify-center md:mt-24">
          <PillLink href="/projects" cursorText="ALL">
            {t("title.leftContent")}
          </PillLink>
        </ScrollReveal>
      )}
    </SectionLayout>
  );
}
