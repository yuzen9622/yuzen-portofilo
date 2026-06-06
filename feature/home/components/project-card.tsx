import { Project } from "@/shared/content/types";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

export default function ProjectCard({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  const projectRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["start end", "center end"],
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });
  const scale = useTransform(springProgress, [0, 1], [0.8, 1]);
  const translateX = useTransform(
    springProgress,
    [0, 1],
    [index % 2 === 0 ? -200 : 200, 0],
  );
  const borderRadius = useTransform(springProgress, [0, 1], [0, 24]);
  const borderRadiusTemplate = useMotionTemplate`${borderRadius}px`;
  const textContainerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const textItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
        mass: 0.2,
      },
    },
  };
  return (
    <div
      ref={projectRef}
      className={`flex-1  
      flex flex-col gap-4 overflow-hidden nth-[2n]:border-l-2 border-b-2 items-center justify-center p-6 group font-inter ${className}`}
    >
      <motion.div
        style={{
          scale: scale,
          translateX: translateX,
          borderRadius: borderRadiusTemplate,
        }}
        className="w-full h-full overflow-hidden"
      >
        <Image
          alt={project.title}
          className=" w-full object-cover aspect-video"
          src={project.picture}
          width={1000}
          height={1000}
        />
      </motion.div>

      <motion.span
        className="w-full text-start  space-y-3 relative"
        variants={textContainerVariants}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-5xl font-semibold uppercase "
          variants={textItemVariants}
        >
          {project.title}
        </motion.h1>
        <motion.p
          className=" text-sm  line-clamp-2 text-muted-foreground"
          variants={textItemVariants}
        >
          {project.description}
        </motion.p>
        <motion.div
          style={{ scale: scale }}
          className="text-7xl font-inter font-bold  pointer-events-none  group-hover:text-muted-foreground/50 transition-colors absolute bottom-0 right-6 z-0 text-muted-foreground/30 "
        >
          {`${index}`.padStart(2, "0")}
        </motion.div>
      </motion.span>
    </div>
  );
}
