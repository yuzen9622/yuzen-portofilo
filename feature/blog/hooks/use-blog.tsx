import { useEffect } from "react";
import { useBlogStore } from "../store/blog-store";
import type { Article, BlogAPIResponse } from "../types/blog";

import useSWR from "swr";

function useArticles(lng: string) {
  return useSWR(
    `/api/articles?lng=${lng}`,
    (url): Promise<BlogAPIResponse<Article[]>> =>
      fetch(url).then((r) => r.json()),
  );
}

export const useBlogLoader = (locale: string) => {
  const { data, isLoading, error } = useArticles(locale);
  const { setPosts } = useBlogStore();

  useEffect(() => {
    setPosts(data?.data ?? []);
  }, [data, setPosts]);

  return { posts: data?.data ?? [], loading: isLoading, error };
};
