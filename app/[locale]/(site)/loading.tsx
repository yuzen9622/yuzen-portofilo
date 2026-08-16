/**
 * Route loading 骨架屏：(site) 群組所有頁面共用。
 * 與 RouteProgress 頂部進度條搭配，避免跨頁導航硬切。
 */
export default function Loading() {
  return (
    <div
      aria-busy="true"
      className="mx-auto w-11/12 max-w-6xl animate-pulse space-y-10 pt-36 pb-24"
    >
      <div className="space-y-4">
        <div className="h-12 w-2/3 rounded-2xl bg-muted" />
        <div className="h-5 w-1/3 rounded-lg bg-muted" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-56 rounded-3xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
