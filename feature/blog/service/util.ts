import type { ImgResponse, TocItem } from "../types/blog";

export function getFallbackSrc(data?: ImgResponse): string {
  if (data?.large) return data.large.url;
  if (data?.medium) return data.medium.url;
  if (data?.small) return data.small.url;
  if (data?.thumbnail) return data.thumbnail.url;
  return "/blog/default-placeholder.webp";
}

/**
 * 計算預估閱讀時間（以中文約 350 字/分、英文約 200 字/分混合計算）
 */
export function estimateReadingTime(content?: string): number {
  if (!content) return 1;
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/#+\s/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();

  // 計算中文字元數與英文字詞數
  const cjkChars = (cleanContent.match(/[\u4e00-\u9fa5]/g) || []).length;
  const nonCjkWords = cleanContent
    .replace(/[\u4e00-\u9fa5]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.ceil(cjkChars / 350 + nonCjkWords / 200);
  return Math.max(1, minutes);
}

/**
 * 簡易轉換標題字串為 slug ID（相容於 rehype-slug 產生的 kebab-case）
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * 從 Markdown 內容提取目錄結構 (H1 ~ H3)
 */
export function extractHeadings(content?: string): TocItem[] {
  if (!content) return [];
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 1 | 2 | 3;
    const rawText = match[2].trim();
    // 移除 markdown 內嵌連結或樣式
    const text = rawText.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`]/g, "");
    const id = slugifyHeading(text);
    if (text) {
      items.push({ id, text, level });
    }
  }

  return items;
}

/**
 * 格式化部落格發布日期
 */
export function formatBlogDate(dateStr?: string, locale: string = "zh-Hant"): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString(locale === "en" ? "en-US" : "zh-TW", {
    year: "numeric",
    month: locale === "en" ? "short" : "numeric",
    day: "numeric",
  });
}

/**
 * 呼叫瀏覽器原生 Web Share API (navigator.share)
 * 若裝置/作業系統不支援（例如 Linux 桌面版 Chrome）或非安全上下文，自動降級為複製文章連結至剪貼簿
 */
export async function shareArticle(options?: {
  title?: string;
  text?: string;
  url?: string;
  onSuccess?: () => void;
  onError?: () => void;
}) {
  if (typeof window === "undefined") return;

  // 確保為合法的絕對路徑 URL
  const rawUrl = options?.url || window.location.href;
  let shareUrl = rawUrl;
  try {
    shareUrl = new URL(rawUrl, window.location.origin).href;
  } catch {
    shareUrl = window.location.href;
  }

  const shareTitle = options?.title || (typeof document !== "undefined" ? document.title : "");
  const shareData: ShareData = {
    title: shareTitle,
    url: shareUrl,
  };

  // 若有自訂額外文字說明且不與標題重複才加入 text
  if (options?.text && options.text !== shareTitle) {
    shareData.text = options.text;
  }

  // 1. 檢查瀏覽器與作業系統是否支援 Web Share API
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    const canShare =
      typeof navigator.canShare === "function"
        ? navigator.canShare(shareData)
        : true;

    if (canShare) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: unknown) {
        // 使用者手動取消/關閉系統分享面板 (AbortError)，不觸發 fallback 複製
        if ((err as Error)?.name === "AbortError") {
          return;
        }
        console.warn("[Web Share API] navigator.share error details:", err);
      }
    } else {
      console.warn("[Web Share API] navigator.canShare returned false for:", shareData);
    }
  } else {
    console.info(
      "[Web Share API] navigator.share is undefined. Check Chrome version (macOS Chrome requires >= v128) or secure context.",
    );
  }

  // 2. Fallback: 複製連結至剪貼簿
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    options?.onSuccess?.();
  } catch (err) {
    console.error("[Web Share API] Clipboard copy failed:", err);
    options?.onError?.();
  }
}


