"use client";
import type { Project } from "@/shared/content/types";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import TechIcon from "./tech-icon";

const textContainerVariants: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const textItemVariants: Variants = {
	hidden: { opacity: 0, y: 24 },
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
		<div className="w-11/12 max-w-5xl mx-auto pt-28 pb-16 font-inter">
			<motion.div
				variants={reducedMotion ? undefined : textContainerVariants}
				initial={reducedMotion ? false : "hidden"}
				animate="show"
			>
				<motion.div variants={reducedMotion ? undefined : textItemVariants}>
					<Link
						href="/projects"
						className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
					>
						<ArrowLeft className="size-4" />
						{t("backToProjects")}
					</Link>
				</motion.div>

				<motion.h1
					variants={reducedMotion ? undefined : textItemVariants}
					className="mt-6 text-4xl sm:text-6xl font-semibold uppercase"
				>
					{project.title}
				</motion.h1>

				<motion.div
					variants={reducedMotion ? undefined : textItemVariants}
					className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3"
				>
					<span className="text-sm text-muted-foreground tabular-nums whitespace-nowrap">
						{project.datetime}
					</span>
					{project.tech && (
						<div className="flex flex-wrap gap-2">
							{project.tech.map((tag) => (
								<span
									key={tag}
									title={tag}
									className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground"
								>
									<TechIcon name={tag} size={12} />
									{tag}
								</span>
							))}
						</div>
					)}
				</motion.div>

				<motion.div
					variants={reducedMotion ? undefined : textItemVariants}
					className="mt-6 flex flex-wrap gap-3"
				>
					{project.github && (
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
						>
							{t("viewGithub")}
							<ArrowUpRight className="size-4" />
						</a>
					)}
					{project.demo && (
						<a
							href={project.demo}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
						>
							{t("viewDemo")}
							<ArrowUpRight className="size-4" />
						</a>
					)}
				</motion.div>
			</motion.div>

			<motion.div
				initial={
					reducedMotion ? false : { scale: 1.05, borderRadius: 0, opacity: 0 }
				}
				animate={{ scale: 1, borderRadius: 24, opacity: 1 }}
				transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.2 }}
				className="mt-10 overflow-hidden"
			>
				<Image
					src={project.picture}
					alt={project.title}
					width={1600}
					height={900}
					priority
					className="w-full object-cover aspect-video"
					unoptimized={project.picture.startsWith("http")}
				/>
			</motion.div>

			{project.intro && (
				<motion.p
					initial={reducedMotion ? false : { opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-10% 0px" }}
					transition={{
						type: "spring",
						stiffness: 100,
						damping: 30,
						mass: 0.2,
					}}
					className="mt-12 text-lg sm:text-xl leading-relaxed"
				>
					{project.intro}
				</motion.p>
			)}

			{!!project.highlights?.length && (
				<div className="mt-14">
					<motion.h2
						initial={reducedMotion ? false : { opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-10% 0px" }}
						transition={{
							type: "spring",
							stiffness: 100,
							damping: 30,
							mass: 0.2,
						}}
						className="text-sm uppercase tracking-widest text-muted-foreground"
					>
						{t("highlights")}
					</motion.h2>
					<div className="mt-6 flex flex-col divide-y">
						{project.highlights.map((highlight, index) => (
							<motion.div
								key={highlight.title}
								initial={reducedMotion ? false : { opacity: 0, y: 32 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-10% 0px" }}
								transition={{
									type: "spring",
									stiffness: 100,
									damping: 30,
									mass: 0.2,
								}}
								className="grid grid-cols-[3rem_1fr] gap-4 py-6"
							>
								<span className="text-2xl font-bold text-muted-foreground/40 tabular-nums">
									{`${index + 1}`.padStart(2, "0")}
								</span>
								<div>
									<h3 className="font-semibold text-lg">{highlight.title}</h3>
									<p className="mt-1 text-muted-foreground leading-relaxed">
										{highlight.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			)}

			<div className="mt-16 grid grid-cols-2 border-t pt-6 gap-4">
				<Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-1">
					<span className="text-xs uppercase tracking-widest text-muted-foreground">
						{t("prevProject")}
					</span>
					<span className="font-semibold group-hover:text-primary transition-colors">
						{prev.title}
					</span>
				</Link>
				<Link
					href={`/projects/${next.slug}`}
					className="group flex flex-col gap-1 text-end"
				>
					<span className="text-xs uppercase tracking-widest text-muted-foreground">
						{t("nextProject")}
					</span>
					<span className="font-semibold group-hover:text-primary transition-colors">
						{next.title}
					</span>
				</Link>
			</div>
		</div>
	);
}
