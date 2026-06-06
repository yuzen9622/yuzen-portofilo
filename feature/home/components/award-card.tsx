"use client";

import { Award } from "@/shared/content/types";

import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/shared/lib/utils";

export default function AwardCard({
  award,
  onPoint,
}: {
  award: Award;
  onPoint?: (imageSrc?: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = () => {
    if (!cardRef.current) return;

    const imageSrc = award.image;
    onPoint?.(imageSrc);
  };
  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative border-b flex w-full flex-col gap-5 overflow-hidden bg-background/70 p-5 md:flex-row md:items-center md:justify-between md:px-7 md:py-6",
      )}
    >
      <div className="flex flex-1 flex-col gap-3 md:max-w-[56%]">
        <h3 className="text-4xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-4xl">
          {award.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col items-start justify-center gap-2 text-sm text-muted-foreground md:max-w-[30%] md:items-center md:text-center">
        <p className="text-base font-medium text-foreground/90 md:text-lg">
          {award.description}
        </p>
        <p className="text-xs uppercase tracking-[0.28em] md:text-sm">
          {new Date(award.date).toLocaleDateString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}
