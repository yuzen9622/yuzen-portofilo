"use client";
import { cn } from "@/shared/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import React, { forwardRef } from "react";

type SectionLayoutProps = {
  id: string;
  children?: React.ReactNode;
  rightContent?: string;
  leftContent?: string;
  className?: string;
};
export const SectionLayout = forwardRef<HTMLElement, SectionLayoutProps>(
  ({ children, id, className, rightContent, leftContent }, ref) => {
    const reduceMotion = useReducedMotion();
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          " flex flex-col  py-5  max-w-dvw overflow-hidden",
          className,
        )}
      >
        <motion.div
          className="flex text-muted-foreground uppercase justify-between w-11/12 mx-auto"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p>{leftContent}</p>
          <p>{rightContent}</p>
        </motion.div>
        {/* 底線從 scaleX: 0 向右劃開進場（line draw） */}
        <motion.div
          className="w-dvw border-b origin-left"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        ></motion.div>
        {children}
      </section>
    );
  },
);

SectionLayout.displayName = "SectionLayout";
