"use client";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
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
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          " flex flex-col  py-5  max-w-dvw overflow-hidden",
          className,
        )}
      >
        <motion.div className="flex text-muted-foreground uppercase justify-between w-11/12 mx-auto">
          <p>{leftContent}</p>
          <p>{rightContent}</p>
        </motion.div>
        <motion.div className="w-dvw border"></motion.div>
        {children}
      </section>
    );
  },
);

SectionLayout.displayName = "SectionLayout";
