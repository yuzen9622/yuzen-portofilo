import React from "react";
import { SectionLayout } from "../components/section-layout";

export default function Project() {
  return (
    <SectionLayout
      id="about"
      leftContent="my Proejects"
      rightContent="Build.Feature."
      className="  relative pt-10 bg-background"
    >
      <div className="w-full   mx-auto max-w-7xl flex-1 flex flex-col md:flex-row  items-center"></div>
    </SectionLayout>
  );
}
