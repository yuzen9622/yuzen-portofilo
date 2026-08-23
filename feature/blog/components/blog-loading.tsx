export default function BlogLoading() {
  return (
    <div className="w-11/12 max-w-7xl mx-auto border-x border-b">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="grid grid-cols-1 gap-5 border-b border-border px-5 py-6 font-inter motion-reduce:animate-none sm:px-7 sm:py-7 md:grid-cols-12 md:items-start md:gap-x-6 md:px-8 md:py-8 lg:gap-x-8 last:border-b-0 animate-pulse"
        >
          <div className="flex items-start gap-4 md:col-span-3 md:flex-col md:gap-3 lg:col-span-2">
            <div className="h-8 w-10 rounded bg-muted/80" />
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-muted/50" />
              <div className="h-3 w-16 rounded bg-muted/60" />
            </div>
          </div>

          <div className="space-y-3 md:col-span-6 lg:col-span-7">
            <div className="h-7 w-11/12 rounded bg-muted/80 sm:h-8" />
            <div className="h-7 w-3/4 rounded bg-muted/80 sm:h-8" />
            <div className="space-y-2 pt-1">
              <div className="h-4 w-full rounded bg-muted/40" />
              <div className="h-4 w-4/5 rounded bg-muted/40" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-4 md:col-span-3 md:min-h-full md:flex-col md:items-end md:justify-between md:border-t-0 md:pt-0 lg:col-span-3">
            <div className="space-y-2 md:flex md:flex-col md:items-end">
              <div className="h-3 w-20 rounded bg-muted/50" />
              <div className="h-3 w-16 rounded bg-muted/60" />
            </div>
            <div className="h-4 w-20 rounded bg-muted/70" />
          </div>
        </div>
      ))}
    </div>
  );
}
