import type { Article, BlogAPIResponse, ImgResponse } from "../types/blog";

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

  function getFallbackSrc(data?: ImgResponse): string {
    if (data?.large) return data.large.url;
    if (data?.medium) return data.medium.url;
    if (data?.small) return data.small.url;
    if (data?.thumbnail) return data.thumbnail.url;
    return "/blog/default-placeholder.webp";
  }

  return { posts: data?.data ?? [], loading: isLoading, error, getFallbackSrc };
};
