"use client";

import { CardConfig } from "@/shared/content/types";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import ContributionMarquee from "../components/contribution-marquee";
import ContributionSection from "../components/contribution-section";

export default function Contribution() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const CARD_CONFIGS: CardConfig[] = [
    {
      nickname: "南宮柳信",
      label: "01",
      description: "空梅居士 — 於虛無中見繁花",
      image:
        "https://www.nangong5421.com/_next/image?url=%2Favatar.jpg&w=640&q=75",
      className: "left-[6%] top-[10%] sm:left-[10%] -rotate-3",
      enterFromX: 0,
      enterFromY: 72,
      rotate: 0,
      start: 0,
      end: 0.05,
    },
    {
      nickname: "twcat0503",
      label: "02",
      description: "台貓",
      image: "https://twcat0503.org/icon.jpg",
      className: "right-[6%] top-[50%] sm:top-[21%] sm:right-[10%] rotate-3",
      enterFromX: 0,
      enterFromY: 72,
      rotate: 0,
      start: 0.2,
      end: 0.3,
    },

    {
      nickname: "justin",
      label: "03",
      description: "justin",
      image: "https://justin0711.com/static/img/profile.jpg",
      github: "github.com/him6794",
      website: "https://justin0711.com",
      className: "left-[6%] top-[14%] sm:top-[51%] sm:left-[0%] -rotate-6",
      enterFromX: 0,
      enterFromY: 72,
      rotate: 0,
      start: 0.4,
      end: 0.5,
    },
    {
      nickname: " 青呱Gua",
      label: "04",
      description: "廢物一枚 便便教主",
      image: "https://guatw.net/images/IMG_9209.png",
      github: "https://github.com/carol000000",
      website: "https://guatw.net/",
      className: "right-[6%] top-[60%] rotate-6  sm:top-[61%] sm:right-[6%] ",
      enterFromX: 0,
      enterFromY: 72,
      rotate: 0,
      start: 0.4,
      end: 0.5,
    },
  ];

  const applyProgressRange = (cards: CardConfig[]) => {
    const total = cards.length;

    return cards.map((card, index) => {
      const start = index / total;
      const end = (index + 1) / total;

      return {
        ...card,
        start,
        end,
      };
    });
  };

  const desktopCards = applyProgressRange(CARD_CONFIGS);

  const mobileCardGroups = CARD_CONFIGS.reduce<CardConfig[][]>(
    (groups, card) => {
      const currentGroup = groups[groups.length - 1];

      if (!currentGroup || currentGroup.length === 2) {
        groups.push([card]);
        return groups;
      }

      currentGroup.push(card);
      return groups;
    },
    [],
  ).map((group) => applyProgressRange(group));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headingY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.82, 0.9, 1],
    [24, 0, 0, -24, -40],
  );

  const maskCut = useTransform(
    scrollYProgress,
    [0, 0.2, 0.82, 0.9, 1],
    [100, -18, -18, 100, 120],
  );
  const headingMask = useMotionTemplate`linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) ${maskCut}%, rgba(0,0,0,1) calc(${maskCut}% + 14%), rgba(0,0,0,1) 100%)`;

  return (
    <section ref={sectionRef} className="relative mt-10 w-full">
      <ContributionMarquee />

      <div className="hidden md:block">
        <ContributionSection cards={desktopCards} />
      </div>

      <div className="space-y-10 md:hidden">
        {mobileCardGroups.map((group, index) => (
          <ContributionSection key={`mobile-group-${index}`} cards={group} />
        ))}
      </div>
      <motion.h1
        style={{
          y: headingY,
          WebkitMaskImage: headingMask,
          maskImage: headingMask,
        }}
        className="pointer-events-none fixed left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold tracking-[0.18em] uppercase sm:text-6xl"
      >
        Contributions
      </motion.h1>
    </section>
  );
}
