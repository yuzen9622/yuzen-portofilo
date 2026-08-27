"use client";
import { ArticleNavigationProvider } from "@/feature/blog/context/article-navigation-context";
import React from "react";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ArticleNavigationProvider>
      <div>{children}</div>
    </ArticleNavigationProvider>
  );
}
