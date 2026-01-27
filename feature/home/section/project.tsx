"use client";
import React from "react";
import { SectionLayout } from "../components/section-layout";
import { getProjectsContent } from "@/shared/lib/content";
import { useParams } from "next/navigation";
import ProjectCard from "../components/project-card";
import Link from "next/link";
import { motion } from "framer-motion";

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
      </div>
      <div className="w-full   mx-auto  flex-1 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  ">
        {projects.slice(4, 6).map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index + 5} />
        ))}
        <Link
          href="/projects"
          className="relative isolate group flex items-center justify-center md:col-span-2 lg:border-2 lg:col-span-1 p-2"
        >
          <h1 className="z-10 text-background text-6xl font-semibold uppercase">
            All Projects
          </h1>

          <motion.div className="absolute inset-0 bg-primary group-hover:rounded-none rounded-2xl duration-500 scale-90 group-hover:scale-100 transition-all" />
        </Link>
      </div>
    </SectionLayout>
  );
}
