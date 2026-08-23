export default function ArticleLoading() {
  return (
    <div className="w-11/12 max-w-7xl mx-auto border-x border-b pt-8 md:pt-12 pb-28 md:pb-32 font-inter animate-pulse motion-reduce:animate-none">
      <article className="px-4 sm:px-6 md:px-10">
        {/* Editorial Header Skeleton */}
        <div className="max-w-4xl space-y-6 pb-10 md:pb-14">
          <div className="h-6 w-20 rounded-full bg-muted/70" />

          <div className="space-y-3">
            <div className="h-10 w-full rounded bg-muted/80 sm:h-14" />
            <div className="h-10 w-2/3 rounded bg-muted/80 sm:h-14" />
          </div>

          <div className="h-6 w-3/4 rounded bg-muted/40" />

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border/60 py-4 sm:gap-x-6">
            <div className="h-4 w-20 rounded bg-muted/50" />
            <div className="h-4 w-28 rounded bg-muted/50" />
            <div className="h-4 w-24 rounded bg-muted/50" />
          </div>
        </div>

        {/* Content + Sidebar Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px] gap-10 xl:gap-14 items-start">
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
      </article>
    </div>
  );
}
