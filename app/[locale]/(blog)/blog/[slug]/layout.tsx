"use client";
import { ArticleNavigationProvider } from "@/feature/blog/context/article-navigation-context";
import ArticleNavbar from "@/feature/blog/layouts/article-navbar";
import React from "react";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ArticleNavigationProvider>
      <div>
        <ArticleNavbar />
        {children}
      </div>
    </ArticleNavigationProvider>
  );
}
