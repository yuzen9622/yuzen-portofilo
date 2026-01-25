"use client";
import React from "react";
import { SectionLayout } from "../components/section-layout";
import { getProjectsContent } from "@/shared/lib/content";
import { useParams } from "next/navigation";
import ProjectCard from "../components/project-card";
import Link from "next/link";

export default function Project() {
  const { locale }: { locale: string } = useParams();
  const projects = getProjectsContent(locale);
  return (
    <SectionLayout
      id="projects"
      leftContent="my Projects"
      rightContent="Build.Feature."
      className="  relative  bg-background "
    >
      <div className="w-full   mx-auto  flex-1 grid grid-cols-1 md:grid-cols-2">
        {projects.slice(0, 4).map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index + 1} />
        ))}
        <Link
          href="/projects"
          className="text-center w-full  inter font-semibold  self-center text-6xl flex-6/12 uppercase"
        >
          More Projects
        </Link>
      </div>
    </SectionLayout>
  );
}
