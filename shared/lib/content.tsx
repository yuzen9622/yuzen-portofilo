"use client";
import { Projects_zhTW } from "../content/projects/zh-TW";
import { Projects_en } from "../content/projects/en";
import { Awards_zhTW } from "../content/awards/zh-TW";
import { Awards_en } from "../content/awards/en";
export const getProjectsContent = (locale: string) => {
  const projects = locale === "zh-Hant" ? Projects_zhTW : Projects_en;
  return projects;
};

export const getAwardsContent = (locale: string) => {
  const awards = locale === "zh-Hant" ? Awards_zhTW : Awards_en;
  return awards;
};
