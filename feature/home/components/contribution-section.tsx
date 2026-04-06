"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

import Image from "next/image";
import { CardConfig } from "@/shared/content/types";
import Link from "next/link";
import { Github, Globe } from "lucide-react";

type ContributionCardProps = CardConfig & {
  progress: MotionValue<number>;
  reduceMotion: boolean;
};

function ContributionCard({
  nickname,
  label,
  description,
  image,
  github,
  website,
  className,
  enterFromX,
  enterFromY,
  start,
  end,
  progress,
  reduceMotion,
}: ContributionCardProps) {
  const inputRange = reduceMotion ? [0, 1] : [start, end];
  const x = useTransform(
    progress,
    inputRange,
    reduceMotion ? [0, 0] : [enterFromX, 0],
  );
  const y = useTransform(
    progress,
    inputRange,
    reduceMotion ? [0, 0] : [enterFromY, 0],
  );
  const opacity = useTransform(
    progress,
    inputRange,
    reduceMotion ? [1, 1] : [0, 1],
  );
  const scale = useTransform(
    progress,
    inputRange,
    reduceMotion ? [1, 1] : [0.92, 1],
  );

  return (
    <motion.article
      style={
        reduceMotion
          ? undefined
          : {
              x,
              y,
              opacity,
              scale,
            }
      }
      className={`absolute w-[min(18rem,80vw)]  z-50  border border-border/70 bg-background/90 p-5 shadow-[0_24px_90px_-48px_rgba(0,0,0,0.65)] backdrop-blur-sm sm:w-[18rem] ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.35em] text-muted-foreground uppercase">
            {label}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight uppercase">
            {nickname}
          </h3>
        </div>
        <Image width={50} height={50} src={image} alt={nickname} />
      </div>

      <p className="mt-4 max-w-56 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="flex gap-2 mt-4">
        {github && (
          <Link
            href={github}
            className="border border-border p-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
          </Link>
        )}
        {website && (
          <Link
            href={website}
            target="_blank"
            className="border border-border p-2"
            rel="noopener noreferrer"
          >
            <Globe size={20} />
          </Link>
        )}
      </div>

      <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
    </motion.article>
  );
}

export default function ContributionSection({
  cards,
}: {
  cards: CardConfig[];
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });
  const sectionHeightClass = cards.length <= 2 ? "h-[260dvh]" : "h-[400dvh]";

  return (
    <section
      ref={sectionRef}
      className={`relative mt-10 w-full ${sectionHeightClass}`}
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="relative h-dvh w-full overflow-hidden ">
            {cards.map((card) => (
              <ContributionCard
                key={card.label}
                progress={springProgress}
                reduceMotion={Boolean(reduceMotion)}
                {...card}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
