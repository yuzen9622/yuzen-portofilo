"use client";

import { Link } from "@/i18n/navigation";
import type { Project } from "@/shared/content/types";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import TechIcon from "./tech-icon";

const textContainerVariants: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const textItemVariants: Variants = {
	hidden: { opacity: 0, y: 16 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.2 },
	},
};

export default function ProjectDetail({
	project,
	prev,
	next,
}: {
	project: Project;
	prev: Project;
	next: Project;
}) {
	const t = useTranslations("ProjectDetailPage");
	const reducedMotion = useReducedMotion();

	return (
		<div
			data-project-detail=""
			className="w-11/12 max-w-7xl mx-auto pt-12 pb-24 font-inter"
		>
			<motion.div
				variants={reducedMotion ? undefined : textContainerVariants}
				initial={reducedMotion ? false : "hidden"}
				animate="show"
			>
				<motion.div variants={reducedMotion ? undefined : textItemVariants}>
					<Link
						href="/projects"
						data-cursor-text="BACK"
						className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
					>
						<ArrowLeft
							aria-hidden="true"
							className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5 motion-reduce:transition-none"
						/>
						{t("backToProjects")}
					</Link>
				</motion.div>

				<motion.header
					variants={reducedMotion ? undefined : textItemVariants}
					className="mt-8 border-b border-border pb-8"
				>
					<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
						<div className="min-w-0">
							<h1 className="break-words text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
								{project.title}
							</h1>
							<time
								dateTime={project.datetime}
								className="mt-5 block text-sm font-medium tabular-nums text-muted-foreground"
							>
								{project.datetime}
							</time>
						</div>

						{(project.github || project.demo) && (
							<div className="flex flex-wrap gap-x-5 gap-y-2">
								{project.github && (
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										data-cursor-text="OPEN"
										className="group inline-flex min-h-11 items-center gap-1.5 border-b border-border text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
									>
										{t("viewGithub")}
										<ArrowUpRight
											aria-hidden="true"
											className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transition-none"
										/>
									</a>
								)}
								{project.demo && (
									<a
										href={project.demo}
										target="_blank"
										rel="noopener noreferrer"
										data-cursor-text="OPEN"
										className="group inline-flex min-h-11 items-center gap-1.5 border-b border-border text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
									>
										{t("viewDemo")}
										<ArrowUpRight
											aria-hidden="true"
											className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transition-none"
										/>
									</a>
								)}
							</div>
						)}
					</div>
				</motion.header>

				{project.tech && (
					<motion.div
						variants={reducedMotion ? undefined : textItemVariants}
						className="mt-6 flex flex-wrap gap-2"
					>
						{project.tech.map((tag) => (
							<span
								key={tag}
								title={tag}
								className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
							>
								<TechIcon name={tag} size={12} />
								{tag}
							</span>
						))}
					</motion.div>
				)}

				{project.intro && (
					<motion.p
						variants={reducedMotion ? undefined : textItemVariants}
						className="mt-12 max-w-3xl text-lg leading-relaxed text-foreground sm:text-xl"
					>
						{project.intro}
					</motion.p>
				)}

				{!!project.highlights?.length && (
					<motion.section
						variants={reducedMotion ? undefined : textItemVariants}
						className="mt-16"
						aria-labelledby="project-highlights"
					>
						<h2
							id="project-highlights"
							className="text-sm uppercase tracking-widest text-muted-foreground"
						>
							{t("highlights")}
						</h2>
						<div className="mt-6 border-t border-border">
							{project.highlights.map((highlight, index) => (
								<article
									key={highlight.title}
									className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-border  sm:grid-cols-[3rem_minmax(0,1fr)] sm:py-6 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start lg:gap-x-8 lg:py-4"
								>
									<span className="text-sm font-medium tabular-nums text-muted-foreground">
										{`${index + 1}`.padStart(2, "0")}
									</span>
									<h3 className="min-w-0 text-lg font-semibold leading-snug text-foreground">
										{highlight.title}
									</h3>
									<p className="col-start-2 min-w-0 text-sm leading-relaxed text-muted-foreground lg:col-start-auto lg:text-base">
										{highlight.description}
									</p>
								</article>
							))}
						</div>
					</motion.section>
				)}

				<motion.nav
					variants={reducedMotion ? undefined : textItemVariants}
					className="mt-20 grid border-y border-border sm:grid-cols-2"
				>
					<Link
						href={`/projects/${prev.slug}`}
						data-cursor-text="VIEW"
						className="group relative isolate flex min-h-36 flex-col justify-between gap-6 overflow-hidden border-b border-border py-8 pr-6 font-inter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring before:pointer-events-none before:absolute before:inset-0 before:z-0 before:-translate-x-full before:bg-muted/30 before:transition-transform before:duration-300 before:ease-out before:content-[''] hover:before:translate-x-0 focus-visible:before:translate-x-0 motion-reduce:before:duration-0 sm:border-b-0 sm:border-r sm:py-10"
					>
						<span className="relative z-10 text-xs uppercase tracking-widest text-muted-foreground">
							{t("prevProject")}
						</span>
						<span className="relative z-10 text-xl font-semibold text-foreground transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none sm:text-2xl">
							{prev.title}
						</span>
					</Link>
					<Link
						href={`/projects/${next.slug}`}
						data-cursor-text="VIEW"
						className="group relative isolate flex min-h-36 flex-col justify-between gap-6 overflow-hidden py-8 pl-6 text-end font-inter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring before:pointer-events-none before:absolute before:inset-0 before:z-0 before:translate-x-full before:bg-muted/30 before:transition-transform before:duration-300 before:ease-out before:content-[''] hover:before:translate-x-0 focus-visible:before:translate-x-0 motion-reduce:before:duration-0 sm:py-10"
					>
						<span className="relative z-10 text-xs uppercase tracking-widest text-muted-foreground">
							{t("nextProject")}
						</span>
						<span className="relative z-10 text-xl font-semibold text-foreground transition-transform duration-200 group-hover:-translate-x-1 group-focus-visible:-translate-x-1 motion-reduce:transition-none sm:text-2xl">
							{next.title}
						</span>
					</Link>
				</motion.nav>
			</motion.div>
		</div>
	);
}
