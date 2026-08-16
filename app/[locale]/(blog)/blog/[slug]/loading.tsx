/**
 * 文章頁 loading 骨架屏：文章資料抓取期間顯示，避免硬切。
 */
export default function Loading() {
  return (
    <div
      aria-busy="true"
      className="mx-auto w-11/12 max-w-3xl animate-pulse space-y-6 pt-32 pb-24"
    >
      <div className="h-10 w-3/4 rounded-2xl bg-muted" />
      <div className="h-4 w-1/3 rounded-lg bg-muted" />
      <div className="h-72 w-full rounded-3xl bg-muted" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-4 rounded bg-muted"
            style={{ width: `${88 - (index % 3) * 14}%` }}
          />
        ))}
      </div>
    </div>
  );
}
