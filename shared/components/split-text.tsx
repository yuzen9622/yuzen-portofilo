"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

type Props = {
	text: string;
	delay?: number;
	stagger?: number;
};

export default function SplitText({ text, delay = 0, stagger = 0.04 }: Props) {
	const reduceMotion = useReducedMotion();

	const container: Variants = {
		initial: {},
		animate: {
			transition: {
				delayChildren: delay,
				staggerChildren: reduceMotion ? 0 : stagger,
			},
		},
	};

	// opacity stays with the parent so its drop-in stays visible before the letters settle
	const character: Variants = reduceMotion
		? {
				initial: { y: 0 },
				animate: { y: 0 },
			}
		: {
				initial: { y: -20 },
				animate: {
					y: 0,
					transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
				},
			};

	const words = text.split(" ");

	return (
		<motion.span
			className="inline-block"
			variants={container}
			initial="initial"
			animate="animate"
		>
			<span className="sr-only">{text}</span>
			<span aria-hidden="true">
				{words.map((word, wordIndex) => (
					<Fragment key={`${word}-${wordIndex}`}>
						<span className="inline-block whitespace-nowrap">
							{Array.from(word).map((char, charIndex) => (
								<motion.span
									key={`${char}-${charIndex}`}
									variants={character}
									className="inline-block"
								>
									{char}
								</motion.span>
							))}
						</span>
						{wordIndex < words.length - 1 ? " " : null}
					</Fragment>
				))}
			</span>
		</motion.span>
	);
}
