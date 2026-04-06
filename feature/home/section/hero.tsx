"use client";
import RotatingText from "@/components/RotatingText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ProfileBase, SocialBase } from "@/shared/content/base";
import Marquee from "@/feature/home/components/marquee";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useMobile from "@/shared/hooks/use-mobile";
import { cn } from "@/shared/lib/utils";
export default function Hero() {
  const marqueeRef = useRef(null);
  const imageRef = useRef(null);
  const [showRotatingText, setShowRotatingText] = useState(false);
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll({
    target: marqueeRef,
    offset: ["start center", "end start"],
  });
  const { scrollYProgress: imageScrollYProgress } = useScroll({
    target: imageRef,
    offset: ["0.4 center", "end start"],
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });
  const imageSpringProgress = useSpring(imageScrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });
  const rotate = useTransform(springProgress, [0, 1], [0, 3]);
  const translateY = useTransform(springProgress, [0, 1], [0, 100]);
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

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowRotatingText(true);
    }, 2400);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (showRotatingText) {
      return;
    }

    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [showRotatingText]);

  const revealDelayed: Variants = {
    ...reveal,
    animate: {
      ...reveal.animate,
      transition: { delay: 2.5 },
    },
  };

  const socials: Variants = {
    initial: {},
    animate: {
      transition: {
        delayChildren: 2.5,
        staggerChildren: 0.08,
      },
    },
  };

  const below = {
    initial: {},
    animate: {
      transition: {
        delayChildren: 2.5,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      className=" flex flex-col font-inter space-y-3 mt-10 max-w-dvw  overflow-hidden"
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

            <motion.div
              className="flex flex-col  space-y-2 w-fit"
              variants={below}
            >
              <AnimatePresence mode="wait">
                {!showRotatingText ? (
                  <motion.div className="w-full min-h-dvh z-10  fixed bg-background flex items-center justify-center top-0 left-0 ">
                    <motion.h1
                      initial={{ y: -120, opacity: 0, scale: 2 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                        layout: {
                          duration: 1.2,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                      key={"init-title"}
                      layoutId="hero-title"
                    >
                      Yuzen
                    </motion.h1>
                  </motion.div>
                ) : (
                  <motion.div className="flex flex-col space-y-2 w-fit">
                    <RotatingText
                      key="rotating-title"
                      layoutId="hero-title"
                      transition={{
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                        layout: {
                          duration: 1.2,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                      staggerFrom={"last"}
                      staggerDuration={0.05}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 "
                      rotationInterval={2500}
                      texts={["Yuzen", "Build.", "Measure.", "Refine."]}
                    />
                  </motion.div>
                )}
                <motion.div variants={line} className="border"></motion.div>
              </AnimatePresence>
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
              <Link className=" transition-all" href={value.url}>
                {value.icon}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div variants={below}>
        <motion.div variants={line} className=" border"></motion.div>
        <motion.div
          variants={reveal}
          style={{ rotate, translateY: isMobile ? 0 : translateY }}
          ref={marqueeRef}
          className="flex-1 py-10"
        >
          <Marquee />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
