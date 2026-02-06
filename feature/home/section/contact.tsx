"use client";
import React from "react";
import { SectionLayout } from "../components/section-layout";
import { Link } from "@/i18n/navigation";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("HomePage");
  const reveal: Variants = {
    initial: {
      opacity: 0,
      y: 18,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const titleStagger: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const formStagger: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const slideUp: Variants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <SectionLayout
      leftContent={t("contact.title.leftContent")}
      rightContent={t("contact.title.rightContent")}
      id="contact"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="w-11/12 py-10 gap-4 items-center   flex-col md:flex-row  mx-auto  flex-1 flex "
      >
        <div className="flex flex-col  gap-10 flex-1 w-full">
          <motion.span
            variants={titleStagger}
            className=" uppercase max-sm:text-5xl text-7xl font-infer  font-semibold space-y-5"
          >
            <motion.div variants={reveal} className="overflow-hidden">
              <h1>Together.</h1>
            </motion.div>
            <motion.div variants={reveal} className="overflow-hidden">
              <h1>Create.</h1>
            </motion.div>
            <motion.div variants={reveal} className="overflow-hidden">
              <h1>Something.</h1>
            </motion.div>
          </motion.span>

          <motion.div variants={slideUp}>
            <Link
              href="mailto:oscar48079@gmail.com"
              className="border-2 flex items-center  transition-all justify-between border-primary hover:bg-background hover:text-primary p-3 py-2 bg-primary text-background text-xl font-inter text-end rounded-3xl"
            >
              <span className=" bg-green-300 dark:bg-green-500 rounded-full animate-pulse p-1"></span>
              oscar48079@gmail.com
            </Link>
          </motion.div>
        </div>
        <motion.div variants={formStagger} className="flex-1 w-full">
          <form className="flex flex-col gap-6 w-full">
            <motion.input
              variants={slideUp}
              type="text"
              placeholder="Your Name"
              className="p-4 border border-muted-foreground rounded-lg font-inter"
            />
            <motion.input
              variants={slideUp}
              type="email"
              placeholder="Your Email"
              className="p-4 border border-muted-foreground rounded-lg font-inter"
            />
            <motion.textarea
              variants={slideUp}
              placeholder="Your Message"
              className="p-4 border border-muted-foreground rounded-lg font-inter h-32"
            />
            <motion.button
              variants={slideUp}
              type="submit"
              className="bg-primary text-background p-4 rounded-lg font-inter  transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </SectionLayout>
  );
}
