"use client";
import React, { useRef } from "react";
import { NAVIGATION_LINKS } from "@/shared/content/base";
import { SectionLayout } from "../components/section-layout";
import AboutCard from "../components/about-card";
import ScrollText from "../components/scroll-text";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
export default function About() {
  const containerRef = useRef(null);
  const t = useTranslations("HomePage");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end center", "0.6 start"],
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });
  const translateY = useTransform(springProgress, [0, 1], [0, -100]);
  const opacity = useTransform(springProgress, [0, 1], [1, 0]);
  return (
    <SectionLayout
      ref={containerRef}
      id="about"
      leftContent={t("about.title.leftContent")}
      rightContent={t("about.title.rightContent")}
      className="  justify-between"
    >
      <motion.div
        style={{ translateY, opacity }}
        className="w-full  py-10  mx-auto max-w-7xl flex-1 flex space-y-10 flex-col md:flex-row  justify-between items-center"
      >
        <div className="flex-1  w-full">
          {NAVIGATION_LINKS.map((link, index) => (
            <AboutCard key={index} href={link.href} title={link.name} />
          ))}
        </div>
        <div className="flex-1 w-11/12 mx-auto   ">
          <ScrollText text={t("about.description")} />
        </div>
      </motion.div>
    </SectionLayout>
  );
}
