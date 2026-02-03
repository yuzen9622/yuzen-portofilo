"use client";
import useSWR from "swr";
import { Article } from "../types/blog";

export default function useArticle(slug: string, lng: string) {
  const { data, error, isLoading } = useSWR(
    `/api/articles/${slug}?lng=${lng}`,
    async (url): Promise<Article> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Article not found");
      }
      return await response.json();
    },
  );
  return { data, error, isLoading };
}
