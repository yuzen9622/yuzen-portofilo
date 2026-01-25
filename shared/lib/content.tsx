"use client";
import { Projects_zhTW } from "../content/projects/zh-TW";
export const getProjectsContent = (locale: string) => {
  const projects = locale === "zh-Hans" ? Projects_zhTW : [];
  return projects;
};
