"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ContributionMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "0.5 start"],
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });
  const translateY = useTransform(springProgress, [0, 1], [0, -100]);
  const opacity = useTransform(springProgress, [0, 1], [1, 0]);
  const text = "CONTRIBUTION@YUZEN";

  return (
    <motion.div
      ref={containerRef}
      style={{ translateY, opacity }}
      className="w-full overflow-hidden"
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...Array(2)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex">
            {[...Array(3)].map((_, index) => (
              <h1
                key={`${groupIndex}-${index}`}
                className="px-8 text-center font-bold font-inter leading-[0.9] text-[clamp(3rem,13vw,22rem)] whitespace-nowrap"
              >
                {text}
              </h1>
            ))}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
