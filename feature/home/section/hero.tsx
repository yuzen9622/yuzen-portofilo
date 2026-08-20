"use client";
import RotatingText from "@/components/RotatingText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ProfileBase, SocialBase } from "@/shared/content/base";
import Marquee from "@/feature/home/components/marquee";
import {
	motion,
	useMotionTemplate,
	useScroll,
	useSpring,
	useTransform,
	Variants,
} from "framer-motion";

import Link from "next/link";
import { useRef } from "react";

import { cn } from "@/shared/lib/utils";
import Magnetic from "@/shared/components/magnetic";
import { useIntro } from "@/shared/components/intro-provider";
import { INTRO_MORPH_DURATION } from "@/shared/components/intro-overlay";
import { ChevronDown } from "lucide-react";
export default function Hero() {
	const imageRef = useRef(null);
	// 進場時機交給全域開場狀態，不再各自寫死 setTimeout / delay
	const { isPlaying } = useIntro();

	const { scrollYProgress: imageScrollYProgress } = useScroll({
		target: imageRef,
		offset: ["0.4 center", "end start"],
	});

	const imageSpringProgress = useSpring(imageScrollYProgress, {
		stiffness: 100,
		damping: 30,
		mass: 0.2,
	});

	const rounded = useTransform(imageSpringProgress, [0, 1], [15, 300]);
	const roundedTemplate = useMotionTemplate`${rounded}px`;

	const reveal: Variants = {
		initial: {
			opacity: 0,
			y: 18,
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
				ease: [0.22, 1, 0.36, 1],
			},
		},
	};
	const line: Variants = {
		initial: {
			width: 0,
		},
		animate: {
			width: "100%",
			transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
		},
	};

	const revealDelayed: Variants = {
		...reveal,
		animate: {
			...reveal.animate,
			transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
		},
	};

	const socials: Variants = {
		initial: {},
		animate: {
			transition: {
				delayChildren: 0.15,
				staggerChildren: 0.08,
			},
		},
	};

	const below = {
		initial: {},
		animate: {
			transition: {
				delayChildren: 0.2,
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<motion.section
			initial="initial"
			animate={isPlaying ? "initial" : "animate"}
			className=" flex flex-col font-inter space-y-3 mt-10 max-w-dvw  min-h-dvh overflow-hidden relative"
		>
			<div className=" w-11/12 max-w-6xl  mx-auto  space-y-3">
				<div className="flex  justify-between sm:flex-row flex-col  items-center  md:space-y-0 space-y-6">
					<div className="lg:text-6xl uppercase w-full h-full flex flex-col max-sm:items-center md:text-4xl text-3xl  space-y-2  ">
						<motion.h1 className="w-fit" variants={revealDelayed}>
							Designing Systems
						</motion.h1>
						<motion.h1 className="w-fit" variants={revealDelayed}>
							Not Just Code
						</motion.h1>

						<motion.div className="flex flex-col  space-y-2 w-fit" variants={below}>
							{/* 開場遮罩在 layout 最上層（intro-overlay.tsx）。
							    等開場結束才掛載，由 layoutId 從遮罩標題 morph 過來。
							    這層刻意用純 div、不加淡入 variants：morph 過程中再疊一層
							    opacity 動畫就會看起來像殘影。 */}
							{!isPlaying && (
								<div className="flex flex-col space-y-2 w-fit">
									<RotatingText
										key="rotating-title"
										layoutId="hero-title"
										transition={{
											duration: 1.1,
											ease: [0.22, 1, 0.36, 1],
											layout: {
												duration: INTRO_MORPH_DURATION,
												ease: [0.22, 1, 0.36, 1],
											},
										}}
										staggerFrom={"last"}
										staggerDuration={0.05}
										splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 "
										rotationInterval={2500}
										texts={["Yuzen", "Build.", "Measure.", "Refine."]}
									/>
								</div>
							)}
							<motion.div
								key="hero-title-divider"
								variants={line}
								className="border"
							></motion.div>
						</motion.div>
					</div>

					<motion.div ref={imageRef} variants={revealDelayed}>
						<Avatar className={cn("w-80 h-80 rounded-none")}>
							<AvatarFallback>{ProfileBase.name}</AvatarFallback>
							<motion.div
								className="overflow-hidden"
								style={{ borderRadius: roundedTemplate }}
							>
								<AvatarImage src={ProfileBase.avatar} />
							</motion.div>
						</Avatar>
					</motion.div>
				</div>
				<motion.div
					variants={socials}
					className="flex gap-4 items-center max-sm:justify-center   "
				>
					{Object.entries(SocialBase).map(([key, value]) => (
						<motion.div className="hover:rotate-6 " variants={reveal} key={key}>
							<Magnetic strength={0.4}>
								<Link className=" transition-all block p-1" href={value.url}>
									{value.icon}
								</Link>
							</Magnetic>
						</motion.div>
					))}
				</motion.div>
			</div>
			<motion.div variants={below}>
				<motion.div variants={line} className=" border"></motion.div>
				<motion.div className="flex-1 py-10">
					<Marquee />
				</motion.div>
			</motion.div>

			<motion.div
				variants={below}
				className="absolute bottom-25 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 animate-bounce text-muted-foreground"
			>
				<ChevronDown className="w-6 h-6" />
			</motion.div>
		</motion.section>
	);
}
