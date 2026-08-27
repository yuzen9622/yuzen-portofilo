import ArticleLoading from "@/feature/blog/components/article-loading";

/**
 * 文章頁 loading 骨架屏：文章資料抓取期間顯示，避免硬切。
 */
export default function Loading() {
 return <ArticleLoading />;
}
