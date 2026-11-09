"use client";
import { getAwardsContent, getProjectsContent } from "@/shared/lib/content";
import {
	animate,
	motion,
	useInView,
	useMotionValue,
	useReducedMotion,
	useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Bezel from "@/shared/components/bezel";
import ScrollReveal from "@/shared/components/scroll-reveal";
import { cn } from "@/shared/lib/utils";
import { EASE_EXPO } from "@/shared/lib/motion";
import GitHubContributionCalendar from "../components/github-contribution-calendar";

const CODING_SINCE = 2022;

function Counter({ value }: { value: number }) {
	const ref = useRef<HTMLSpanElement | null>(null);
	const inView = useInView(ref, { once: true, margin: "-15% 0px" });
	const reducedMotion = useReducedMotion();
	const count = useMotionValue(0);
	const rounded = useTransform(count, (v) => Math.round(v));

	useEffect(() => {
		if (!inView) return;
		if (reducedMotion) {
			count.set(value);
			return;
		}
		const controls = animate(count, value, { duration: 2.2, ease: EASE_EXPO });
		return () => controls.stop();
	}, [inView, reducedMotion, value, count]);

	return <motion.span ref={ref}>{rounded}</motion.span>;
}

function StatCard({
	value,
	suffix,
	label,
	index,
	className,
	feature = false,
}: {
	value: number;
	suffix?: string;
	label: string;
	index: number;
	className?: string;
	feature?: boolean;
}) {
	return (
		<ScrollReveal delay={index * 0.08} className={cn("h-full", className)}>
			<Bezel className="group h-full" innerClassName="flex h-full flex-col justify-between gap-10 p-6 md:p-8">
				{/* subtle grid texture that drifts on hover */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 opacity-[0.35] transition-transform duration-[1.6s] ease-fluid [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] group-hover:translate-x-2 group-hover:-translate-y-2"
				/>
				<div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
					<span>{label}</span>
					<span className="ml-4 h-px flex-1 bg-foreground/10" />
				</div>
				<p
					className={cn(
						"relative font-sans font-semibold tabular-nums leading-[0.8] tracking-[-0.06em]",
						feature ? "text-[clamp(6rem,14vw,12rem)]" : "text-[clamp(4rem,7vw,6rem)]",
					)}
				>
					<Counter value={value} />
					{suffix && (
						<span className="font-serif text-[0.6em] font-normal italic text-muted-foreground">
							{suffix}
						</span>
					)}
				</p>
			</Bezel>
		</ScrollReveal>
	);
}

export default function Stats() {
	const t = useTranslations("StatsPage");
	const { locale }: { locale: string } = useParams();
	const awards = getAwardsContent(locale);
	const projects = getProjectsContent(locale);
	const papers = awards.filter((award) => award.paper).length;
	const years = new Date().getFullYear() - CODING_SINCE;

	return (
		<section id="stats" className="py-16 md:py-24">
			{/* Asymmetric bento: one hero metric beside a stacked trio */}
			<div className="mx-auto grid w-11/12 max-w-6xl grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
				<StatCard
					feature
					value={awards.length}
					suffix="+"
					label={t("awards")}
					index={0}
					className="md:col-span-6 md:row-span-2"
				/>
				<StatCard value={projects.length} label={t("projects")} index={1} className="md:col-span-6" />
				<StatCard value={years} suffix="+" label={t("years")} index={2} className="md:col-span-3" />
				<StatCard value={papers} label={t("papers")} index={3} className="md:col-span-3" />
				<ScrollReveal delay={0.1} className="md:col-span-12">
					<GitHubContributionCalendar />
				</ScrollReveal>
			</div>
		</section>
	);
}
