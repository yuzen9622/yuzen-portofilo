import { motion } from "framer-motion";
import React from "react";

type SectionLayoutProps = {
  id: string;
  children?: React.ReactNode;
  rightContent?: string;
  leftContent?: string;
};
export default function SectionLayout({
  children,
  id,
  rightContent,
  leftContent,
}: SectionLayoutProps) {
  return (
    <section
      id={id}
      className=" flex flex-col min-h-dvh space-y-3 mt-10 max-w-dvw overflow-hidden"
    >
      <motion.div className="w-dvw border"></motion.div>
      <motion.div className="flex text-muted-foreground uppercase justify-between w-11/12 mx-auto">
        <p>{leftContent}</p>
        <p>{rightContent}</p>
      </motion.div>
      <motion.div className="w-dvw border"></motion.div>
      {children}
    </section>
  );
}
