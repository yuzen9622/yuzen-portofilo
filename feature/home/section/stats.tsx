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
import React, { useEffect, useRef } from "react";

const CODING_SINCE = 2022;

function StatItem({
	value,
	suffix,
	label,
}: {
	value: number;
	suffix?: string;
	label: string;
}) {
	const ref = useRef<HTMLDivElement | null>(null);
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
		const controls = animate(count, value, {
			type: "spring",
			stiffness: 100,
			damping: 30,
			mass: 0.2,
		});
		return () => controls.stop();
	}, [inView, reducedMotion, value, count]);

	return (
		<div
			ref={ref}
			className="flex flex-col items-center justify-center gap-2 py-10 border-b sm:nth-[2n]:border-l lg:border-b-0 lg:not-first:border-l"
		>
			<p className="font-inter text-5xl sm:text-6xl font-bold tabular-nums">
				<motion.span>{rounded}</motion.span>
				{suffix}
			</p>
			<p className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
				{label}
			</p>
		</div>
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
		<section id="stats" className="w-full border-b font-inter">
			<div className="grid grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto">
				<StatItem value={awards.length} suffix="+" label={t("awards")} />
				<StatItem value={projects.length} label={t("projects")} />
				<StatItem value={years} suffix="+" label={t("years")} />
				<StatItem value={papers} label={t("papers")} />
			</div>
		</section>
	);
}
