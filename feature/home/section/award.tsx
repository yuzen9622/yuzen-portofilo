"use client";
import React, { useEffect } from "react";
import { SectionLayout } from "../components/section-layout";
import { useTranslations } from "next-intl";
import { getAwardsContent } from "@/shared/lib/content";
import { useParams } from "next/navigation";
import AwardCard from "../components/award-card";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
const FALLBACK_IMAGE = "/blog/default-placeholder.webp";

export default function Award() {
  const t = useTranslations("AwardPage");
  const { locale }: { locale: string } = useParams();
  const [pointImage, setPointImage] = React.useState<string>("");
  const awards = getAwardsContent(locale);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imageOpacity = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const springX = useSpring(mouseX, {
    stiffness: 180,
    damping: 24,
    mass: 0.15,
  });
  const springY = useSpring(mouseY, {
    stiffness: 180,
    damping: 24,
    mass: 0.15,
  });
  const imageOpacitySpring = useSpring(imageOpacity, {
    stiffness: 180,
    damping: 24,
    mass: 0.15,
  });
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      imageOpacity.set(1);
    };
    const handleMouseLeave = () => {
      imageOpacity.set(0);
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  });

  return (
    <SectionLayout
      id="award"
      rightContent={t("title.rightContent")}
      leftContent={t("title.leftContent")}
    >
      <div
        ref={containerRef}
        className="w-full overflow-hidden  relative py-10  mx-auto max-w-full flex-1 flex  flex-col  justify-between items-center"
      >
        {awards.map((award) => (
          <AwardCard
            key={award.id}
            onPoint={(img) => setPointImage(img ?? FALLBACK_IMAGE)}
            award={award}
          />
        ))}
        <motion.div
          style={{
            x: springX,
            y: springY,
            opacity: imageOpacitySpring,
          }}
          className="pointer-events-none  absolute z-50 h-40 w-30 rotate-6 -translate-x-200 -translate-y-50  overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-2xl shadow-black/20 "
        >
          {pointImage !== "" && (
            <Image
              src={pointImage}
              alt={"point image"}
              fill
              sizes="128px"
              className="object-cover"
            />
          )}
        </motion.div>
      </div>
    </SectionLayout>
  );
}
