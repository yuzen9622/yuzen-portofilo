"use client";
import RotatingText from "@/components/RotatingText";
import Image from "next/image";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
	type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

import { ProfileBase, SocialBase } from "@/shared/content/base";
import Marquee from "@/feature/home/components/marquee";
import Magnetic from "@/shared/components/magnetic";
import Bezel from "@/shared/components/bezel";
import PillLink from "@/shared/components/pill-link";
import { MaskLines } from "@/shared/components/scroll-reveal";
import { useIntro } from "@/shared/components/intro-provider";
import { INTRO_MORPH_DURATION } from "@/shared/components/intro-overlay";
import { EASE_EXPO, SCROLL_SPRING } from "@/shared/lib/motion";

const EASE = [0.22, 1, 0.36, 1] as const;
// The rest of the hero assembles once the intro name has mostly landed, so the
// flying title never crosses text that is still rising into place.
const REVEAL_AFTER_MORPH = INTRO_MORPH_DURATION * 0.55;

function useTaipeiTime() {
	const [time, setTime] = useState<string | null>(null);
	useEffect(() => {
		const format = new Intl.DateTimeFormat("en-GB", {
			timeZone: "Asia/Taipei",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
		const tick = () => setTime(format.format(new Date()));
		tick();
		const id = window.setInterval(tick, 1000);
		return () => window.clearInterval(id);
	}, []);
	return time;
}

export default function Hero() {
	const sectionRef = useRef<HTMLElement>(null);
	const { isPlaying } = useIntro();
	const reduceMotion = useReducedMotion() ?? false;
	const time = useTaipeiTime();
	const t = useTranslations("HomePage.hero");
	// CJK glyphs need looser tracking and no uppercase transform
	const isZh = useLocale().startsWith("zh");

	// Scroll-out: the whole stage recedes as the next section slides over it
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});
	const progress = useSpring(scrollYProgress, SCROLL_SPRING);
	const stageY = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [0, 160]);
	const stageScale = useTransform(progress, [0, 1], reduceMotion ? [1, 1] : [1, 0.92]);
	const stageOpacity = useTransform(progress, [0, 0.85], [1, 0]);
	const imageScale = useTransform(progress, [0, 1], reduceMotion ? [1, 1] : [1.08, 1.28]);
	const portraitY = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [0, -90]);

	// Pointer tilt on the portrait
	const tiltX = useMotionValue(0);
	const tiltY = useMotionValue(0);
	const rotateX = useSpring(tiltX, { stiffness: 150, damping: 18, mass: 0.4 });
	const rotateY = useSpring(tiltY, { stiffness: 150, damping: 18, mass: 0.4 });
	const glareX = useMotionValue(50);
	const glareY = useMotionValue(30);
	const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, oklch(1 0 0 / 0.22), transparent 55%)`;

	const handleTilt = (e: PointerEvent<HTMLDivElement>) => {
		if (reduceMotion || e.pointerType !== "mouse") return;
		const rect = e.currentTarget.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width;
		const py = (e.clientY - rect.top) / rect.height;
		tiltX.set((0.5 - py) * 10);
		tiltY.set((px - 0.5) * 12);
		glareX.set(px * 100);
		glareY.set(py * 100);
	};
	const resetTilt = () => {
		tiltX.set(0);
		tiltY.set(0);
		glareX.set(50);
		glareY.set(30);
	};

	const fadeUp: Variants = {
		initial: { opacity: 0, y: 28, filter: "blur(8px)" },
		animate: (i: number = 0) => ({
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			transition: { duration: 1.1, ease: EASE_EXPO, delay: REVEAL_AFTER_MORPH + 0.15 + i * 0.08 },
		}),
	};

	const portrait: Variants = {
		initial: { opacity: 0, scale: 0.9, rotate: -4, y: 40 },
		animate: {
			opacity: 1,
			scale: 1,
			rotate: 2,
			y: 0,
			transition: { duration: 1.6, ease: EASE_EXPO, delay: 0.15 },
		},
	};

	return (
		<motion.section
			ref={sectionRef}
			initial="initial"
			animate={isPlaying ? "initial" : "animate"}
			className="relative flex min-h-[100dvh] max-w-dvw flex-col overflow-x-clip pt-16 md:pt-24"
		>
			<motion.div
				style={{ y: stageY, scale: stageScale, opacity: stageOpacity }}
				className="origin-top"
			>
				<div className="mx-auto grid w-11/12 max-w-6xl items-center gap-14 md:grid-cols-12 md:gap-10">
					{/* Left: editorial typography */}
					<div className="flex flex-col gap-8 md:col-span-7">
						<h1
							className={cn(
								"font-sans font-semibold",
								isZh
									? "text-[clamp(2.75rem,7.2vw,6.75rem)] leading-[1.02] tracking-[-0.02em]"
									: "text-[clamp(3rem,8.4vw,8rem)] uppercase leading-[0.86] tracking-[-0.055em]",
							)}
						>
							<MaskLines
								play={!isPlaying}
								delay={REVEAL_AFTER_MORPH}
								lines={[
									t("line1"),
									t.rich("line2", {
										em: (chunks) => (
											<span
												className={cn(
													"font-normal text-muted-foreground",
													isZh
														? "mr-[0.15em] font-sans text-[0.9em]"
														: "font-serif text-[0.92em] normal-case italic tracking-[-0.02em]",
												)}
											>
												{chunks}
											</span>
										),
									}),
									t("line3"),
								]}
							/>
						</h1>

						{/* Plain div on purpose: any opacity/blur/y on an ancestor hides or
						    skews the layoutId morph from the intro title while it lands. */}
						{/* Always uppercase so "Yuzen" matches the intro title letter for letter */}
						<div className="flex items-center gap-4 font-sans text-4xl font-semibold uppercase tracking-[-0.04em] md:text-6xl">
							{/* Hairline draws in once the name has landed */}
							<motion.span
								aria-hidden
								variants={{
									initial: { scaleX: 0 },
									animate: {
										scaleX: 1,
										transition: { duration: 1, ease: EASE_EXPO, delay: INTRO_MORPH_DURATION * 0.7 },
									},
								}}
								className="h-px w-10 origin-left bg-foreground/30 md:w-16"
							/>
							{/* 開場遮罩在 layout 最上層（intro-overlay.tsx）。
							    等開場結束才掛載，由 layoutId 從遮罩標題 morph 過來。
							    這層刻意不加淡入：morph 過程中再疊一層 opacity 動畫會像殘影。 */}
							<span className="min-h-[1.1em]">
								{!isPlaying && (
									<RotatingText
										key="rotating-title"
										layoutId="hero-title"
										transition={{
											duration: 1.1,
											ease: EASE,
											layout: { duration: INTRO_MORPH_DURATION, ease: EASE },
										}}
										staggerFrom={"last"}
										staggerDuration={0.05}
										splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
										rotationInterval={2500}
										texts={t.raw("rotating") as string[]}
									/>
								)}
							</span>
						</div>

						<motion.p
							custom={2}
							variants={fadeUp}
							className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
						>
							{t.rich("bio", {
								strong: (chunks) => <span className="text-foreground">{chunks}</span>,
							})}
						</motion.p>

						<motion.div
							custom={3}
							variants={fadeUp}
							className="flex flex-wrap items-center gap-3"
						>
							<PillLink href="/projects" cursorText={t("cursorWork")}>
								{t("work")}
							</PillLink>
							<PillLink href="/contact" variant="ghost">
								{t("contact")}
							</PillLink>
						</motion.div>

						<motion.ul
							custom={4}
							variants={fadeUp}
							className="flex items-center gap-2"
						>
							{Object.entries(SocialBase).map(([key, value]) => (
								<li key={key}>
									<Magnetic strength={0.4}>
										<a
											href={value.url}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={key}
											className="flex size-11 items-center justify-center rounded-full text-muted-foreground ring-1 ring-foreground/10 transition-[color,background-color,transform] duration-700 ease-fluid hover:bg-foreground hover:text-background active:scale-95 [&_svg]:size-4"
										>
											{value.icon}
										</a>
									</Magnetic>
								</li>
							))}
						</motion.ul>
					</div>

					{/* Right: tilting portrait in a machined frame */}
					<motion.div
						style={{ y: portraitY }}
						className="relative mx-auto w-full max-w-[22rem] md:col-span-5 md:max-w-none md:pl-6"
					>
					<motion.div variants={portrait}>
						<div
							className="[perspective:1200px]"
							onPointerMove={handleTilt}
							onPointerLeave={resetTilt}
						>
							<motion.div
								style={{ rotateX, rotateY }}
								className="relative [transform-style:preserve-3d]"
								data-cursor-text={t("cursorHello")}
							>
								<Bezel className="rounded-[2.5rem]" innerClassName="rounded-[calc(2.5rem-0.375rem)] aspect-[4/5]">
									<motion.div style={{ scale: imageScale }} className="absolute inset-0">
										<Image
											src={ProfileBase.avatar}
											alt={ProfileBase.name}
											fill
											priority
											sizes="(min-width: 768px) 40vw, 90vw"
											className="object-cover"
										/>
									</motion.div>
									<motion.div
										aria-hidden
										style={{ background: glare }}
										className="pointer-events-none absolute inset-0 mix-blend-soft-light"
									/>
									<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent" />
									<div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
										<div>
											<p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
												{t("portfolio")}
											</p>
											<p className="font-serif text-3xl italic">Yuzen</p>
										</div>
										<p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
											©2026
										</p>
									</div>
								</Bezel>

							</motion.div>
						</div>
					</motion.div>
					</motion.div>
				</div>

				{/* Bottom rail: scroll cue + coordinates */}
				<motion.div
					custom={5}
					variants={fadeUp}
					className="mx-auto mt-16 flex w-11/12 max-w-6xl items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:mt-24"
				>
					<span className="hidden sm:block" suppressHydrationWarning>
						{t("location")} — {time ?? "--:--:--"}
					</span>
					<a href="#about" className="group flex flex-col items-center gap-3">
						<span>{t("scroll")}</span>
						<span className="relative h-12 w-px overflow-hidden bg-foreground/15">
							<span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.2s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-foreground motion-reduce:animate-none" />
						</span>
					</a>
					<span className="hidden sm:block">{t("since")}</span>
				</motion.div>
			</motion.div>

			<motion.div custom={6} variants={fadeUp} className="mt-10 md:mt-14">
				<Marquee />
			</motion.div>
		</motion.section>
	);
}
