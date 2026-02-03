"use client";
import React from "react";

import type { Article } from "./types/blog";
import useArticle from "./hooks/use-article";
import ArticleEmpty from "./components/article-empty";
import ArticleLoading from "./components/article-loading";

export default function Article({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const { data, error, isLoading } = useArticle(slug, locale);
  console.log(error);
  return (
    <div>
      {isLoading ? <ArticleLoading /> : !data && error && <ArticleEmpty />}
      {data && <p>{data.title}</p>}
    </div>
  );
}
