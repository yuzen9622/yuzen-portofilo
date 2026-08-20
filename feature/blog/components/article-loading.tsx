import React from "react";

export default function ArticleLoading() {
  return (
    <div className="w-11/12 max-w-7xl mx-auto border-x border-b pt-24 pb-16 px-4 md:px-8 font-inter animate-pulse">
      {/* Header Meta Skeleton */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="h-6 w-20 rounded-full bg-muted/70" />
        <div className="h-4 w-28 rounded bg-muted/50" />
        <div className="h-4 w-20 rounded bg-muted/50" />
      </div>

      {/* Title Skeleton */}
      <div className="space-y-3 mb-6 max-w-4xl">
        <div className="h-10 sm:h-14 w-full rounded bg-muted/80" />
        <div className="h-10 sm:h-14 w-2/3 rounded bg-muted/80" />
      </div>

      {/* Description Skeleton */}
      <div className="h-6 w-3/4 rounded bg-muted/40 mb-10" />

      {/* Cover Image Skeleton */}
      <div className="w-full aspect-video md:aspect-21/9 rounded-2xl bg-muted/60 mb-12" />

      {/* Content + Sidebar Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
        {/* Content Paragraphs Skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-muted/50" />
            <div className="h-4 w-full rounded bg-muted/50" />
            <div className="h-4 w-4/5 rounded bg-muted/50" />
          </div>
          <div className="h-8 w-1/3 rounded bg-muted/70 pt-4" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-muted/50" />
            <div className="h-4 w-5/6 rounded bg-muted/50" />
            <div className="h-4 w-3/4 rounded bg-muted/50" />
          </div>
          <div className="h-48 w-full rounded-xl bg-muted/40" />
        </div>

        {/* Sidebar Skeleton */}
        <div className="hidden lg:block space-y-4">
          <div className="h-5 w-24 rounded bg-muted/60" />
          <div className="space-y-2 pt-2">
            <div className="h-4 w-3/4 rounded bg-muted/40" />
            <div className="h-4 w-5/6 rounded bg-muted/40" />
            <div className="h-4 w-2/3 rounded bg-muted/40" />
            <div className="h-4 w-4/5 rounded bg-muted/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

