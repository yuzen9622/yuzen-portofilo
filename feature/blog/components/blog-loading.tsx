import React from "react";

export default function BlogLoading() {
  return (
    <div className="w-11/12 max-w-7xl mx-auto border-x border-b divide-y md:divide-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="p-6 md:p-8 flex flex-col justify-between border-b nth-[2n]:border-r-0 lg:nth-[2n]:border-r lg:nth-[3n]:border-r-0 border-r animate-pulse"
        >
          <div className="space-y-4">
            {/* Image Skeleton */}
            <div className="w-full aspect-video rounded-2xl bg-muted/60" />

            {/* Meta Row Skeleton */}
            <div className="flex items-center gap-2 pt-2">
              <div className="h-5 w-16 rounded-full bg-muted/70" />
              <div className="h-4 w-24 rounded bg-muted/50" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="h-6 w-5/6 rounded bg-muted/80" />
              <div className="h-6 w-3/5 rounded bg-muted/80" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-1.5 pt-1">
              <div className="h-4 w-full rounded bg-muted/40" />
              <div className="h-4 w-4/5 rounded bg-muted/40" />
            </div>
          </div>

          {/* Bottom Bar Skeleton */}
          <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
            <div className="h-4 w-20 rounded bg-muted/50" />
            <div className="h-4 w-16 rounded bg-muted/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

