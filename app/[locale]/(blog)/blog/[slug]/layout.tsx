"use client";
import ArticleNavbar from "@/feature/blog/layouts/article-navbar";
import React from "react";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ArticleNavbar />
      {children}
    </div>
  );
}
