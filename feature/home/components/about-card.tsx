"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

type AboutCardProps = {
  title?: string;
  href: string;
};

export default function AboutCard({ title, href }: AboutCardProps) {
  const card: Variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div
      variants={card}
      initial="initial"
      whileInView="animate"
      transition={{
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={href}
        className="relative group w-11/12 mx-auto flex overflow-hidden uppercase justify-between items-center hover:text-background duration-300 transition-colors"
      >
        <div className=" absolute  h-full inset-0 group-hover:translate-x-0 -z-10 -translate-x-[110%] bg-accent-foreground transition-all  pointer-events-auto"></div>
        <p className="lg:text-7xl  md:text-6xl text-4xl ">{title}</p>
        <ArrowRightIcon
          size={30}
          className="group-hover:-rotate-20 md:opacity-0 group-hover:opacity-100 lg:translate-x-10 group-hover:-translate-x-2 transition-transform"
        />
      </Link>
    </motion.div>
  );
}
