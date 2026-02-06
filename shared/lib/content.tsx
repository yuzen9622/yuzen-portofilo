"use client";
import { Projects_zhTW } from "../content/projects/zh-TW";
import { Projects_en } from "../content/projects/en";
export const getProjectsContent = (locale: string) => {
  const projects = locale === "zh-Hant" ? Projects_zhTW : Projects_en;
  return projects;
};
