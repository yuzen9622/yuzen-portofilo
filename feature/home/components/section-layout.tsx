"use client";
import { cn } from "@/shared/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import React, { forwardRef } from "react";
import ScrollReveal, { MaskLines } from "@/shared/components/scroll-reveal";
import { EASE_EXPO } from "@/shared/lib/motion";

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
        // overflow-x-clip (not overflow-hidden) so sticky children keep working
        className={cn(
          "relative flex flex-col max-w-dvw overflow-x-clip py-24 md:py-36",
          className,
        )}
      >
        <header className="mx-auto grid w-11/12 max-w-6xl items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            {leftContent && (
              <h2 className="font-sans text-[clamp(2.6rem,7vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em]">
                <MaskLines lines={[leftContent]} />
              </h2>
            )}
          </div>
          {rightContent && (
            <ScrollReveal
              delay={0.15}
              y={24}
              className="md:col-span-4 md:text-right"
            >
              <p className="font-serif text-3xl italic leading-none text-muted-foreground md:text-4xl">
                {rightContent}
              </p>
            </ScrollReveal>
          )}
        </header>
        {/* Hairline draws from the left once the header is in view */}
        <motion.div
          aria-hidden
          className="mx-auto mt-10 h-px w-11/12 max-w-6xl origin-left bg-linear-to-r from-foreground/25 via-foreground/10 to-transparent md:mt-14"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.6, ease: EASE_EXPO }}
        />
        {children}
      </section>
    );
  },
);

SectionLayout.displayName = "SectionLayout";
