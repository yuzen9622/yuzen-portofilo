import { Projects_zhTW } from "../content/projects/zh-TW";
import { Projects_en } from "../content/projects/en";
import { Awards_zhTW } from "../content/awards/zh-TW";
import { Awards_en } from "../content/awards/en";
import { Archive_zhTW } from "../content/archive/zh-TW";
import { Archive_en } from "../content/archive/en";
import type { ArchiveContent } from "../content/types";

export const getProjectsContent = (locale: string) => {
  const projects = locale === "zh-Hant" ? Projects_zhTW : Projects_en;
  return projects;
};

export const getAwardsContent = (locale: string) => {
  const awards = locale === "zh-Hant" ? Awards_zhTW : Awards_en;
  return awards;
};

export const getArchiveContent = (locale: string): ArchiveContent => {
  const archive = locale === "zh-Hant" ? Archive_zhTW : Archive_en;
  return archive;
};
