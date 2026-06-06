"use client";
import useSWR from "swr";
import { Article } from "../types/blog";
import { useBlogStore } from "../store/blog-store";

export default function useArticle(slug: string, lng: string) {
  const { posts } = useBlogStore();
  const {
    data: swrData,
    error,
    isLoading,
  } = useSWR(
    `/api/articles/${slug}?lng=${lng}`,
    async (url): Promise<Article> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Article not found");
      }
      return await response.json();
    },
  );
  const data = posts.find((post) => post.slug === slug) || swrData;
  return { data, error, isLoading };
}
