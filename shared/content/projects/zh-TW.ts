import type { Project } from "../types";

export const Projects_zhTW: Project[] = [
  {
    slug: "accessible-smart-map",
    title: "accessible-smart-map",
    description:
      "以無障礙設施圖層、友善路線規劃與即時 TDX 公車／大眾運輸資訊為核心的地圖服務。",
    picture: "/project/taipei-a11y.webp",
    datetime: "2025 - 2026",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "MapLibre",
      "react-map-gl",
      "Node.js",
      "Express",
      "TDX API",
    ],
    github: "https://github.com/yuzen9622/accessible-smart-map",
    demo: "https://map.yuzen.dev",
    intro:
      "將無障礙設施、友善路線規劃與台灣 TDX 即時公車及大眾運輸資料整合於同一張網頁地圖，協助使用者更安心地安排出行。",
    highlights: [
      {
        title: "無障礙設施圖層",
        description:
          "以地圖圖層整理無障礙相關設施，讓使用者在出發前可查找並確認所需地點。",
      },
      {
        title: "以無障礙需求為中心的路線規劃",
        description:
          "協助使用者以無障礙考量規劃路線，更容易評估適合的移動選項。",
      },
      {
        title: "TDX 即時公車與大眾運輸資料",
        description:
          "串接 TDX 即時公車與大眾運輸資料，讓路線規劃能結合當前公共運輸資訊一併判斷。",
      },
    ],
  },
  {
    slug: "graph-patent-analysis",
    title: "graph-patent-analysis",
    description:
      "匯入 XLSX 專利資料並透過 Gemini 擷取概念，建立可檢視、可比較與可匯出的技術組合分析圖譜。",
    picture:
      "https://opengraph.githubassets.com/1/yuzen9622/graph-patent-analysis",
    datetime: "2026",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "vis-network",
      "graphology",
      "Louvain",
      "Vercel AI SDK",
      "Gemini",
      "PostgreSQL",
    ],
    github: "https://github.com/yuzen9622/graph-patent-analysis",
    intro:
      "將專利試算表轉化為技術概念網路與 Applicant → Patent → Concept 脈絡圖，結合 Gemini 概念擷取、篩選、比較、可解釋性檢查及 AI 趨勢報告。",
    highlights: [
      {
        title: "XLSX 匯入與 Gemini 概念擷取",
        description:
          "匯入專利試算表後，使用 Gemini 擷取技術概念，作為後續分析的基礎。",
      },
      {
        title: "技術概念網路與組合脈絡圖",
        description:
          "建立技術概念網路與 Applicant → Patent → Concept 脈絡圖，並支援並列比較專利組合。",
      },
      {
        title: "時間、IPC 與可解釋性檢查",
        description:
          "提供時間與 IPC 篩選，並可檢視 support、Jaccard 相似度及來源專利，讓分析結果可追溯。",
      },
      {
        title: "AI 趨勢報告與可攜式匯出",
        description:
          "產生 AI 趨勢報告，並可將分析匯出為 CSV、Excel 或獨立 HTML 檔案。",
      },
    ],
  },
  {
    slug: "makentu2026",
    title: "MakeNTU2026",
    description:
      "MakeNTU 2026 的 AI 決策助理，結合確定性梅花易數與五行引擎、Agentic RAG、結構化 LLM 報告及語音互動。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/MakeNTU2026",
    datetime: "2026",
    tech: [
      "FastAPI",
      "Pydantic",
      "ChromaDB",
      "sentence-transformers",
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Zustand",
    ],
    github: "https://github.com/yuzen9622/MakeNTU2026",
    intro:
      "結合可重現的占卜推演邏輯與 Agentic RAG，產出單次結構化報告，支援 WebSocket STT/TTS 語音對話、關係分析與快取預熱。",
    highlights: [
      {
        title: "確定性梅花易數與五行引擎",
        description:
          "以確定性的梅花易數與五行推演，為每次諮詢提供可重現的基礎。",
      },
      {
        title: "Agentic RAG 與單次結構化報告",
        description:
          "透過 Agentic RAG 取回相關脈絡，並以單次 LLM 生成產出結構化報告。",
      },
      {
        title: "WebSocket 語音流程與關係分析",
        description:
          "以 WebSocket 串接 STT 與 TTS 語音流程，同時支援關係導向的分析。",
      },
      {
        title: "快取預熱",
        description:
          "預先暖機快取，讓互動式諮詢能更快速回應。",
      },
    ],
  },
  {
    slug: "termexpander-ai",
    title: "TermExpander-ai",
    description:
      "協助展開學術縮寫、轉換選取文字並將寫作潤飾為更正式學術語氣的 Chrome 擴充功能。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/TermExpander-ai",
    datetime: "2025",
    tech: [
      "Chrome Extension MV3",
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Gemini API",
      "Chrome Storage API",
    ],
    github: "https://github.com/yuzen9622/TermExpander-ai",
    intro:
      "這個 Manifest V3 擴充功能協助研究者展開學術縮寫，透過選取文字與 Popup 工具進行轉換，並將內容潤飾為學術語氣。",
    highlights: [
      {
        title: "學術縮寫展開",
        description:
          "將學術縮寫展開為更清楚的術語，協助讀者理解專業文本。",
      },
      {
        title: "選取 Tooltip 與 Popup 轉換",
        description:
          "提供選取文字的 Tooltip 與 Popup 工作流程，無需離開瀏覽器即可轉換內容。",
      },
      {
        title: "學術語氣潤飾",
        description:
          "將文字調整為更正式的學術語氣，適合研究與專業寫作情境。",
      },
      {
        title: "本機 API Key 與隱私",
        description:
          "透過 Chrome Storage API 將使用者 API Key 儲存在本機，且不蒐集瀏覽紀錄。",
      },
    ],
  },
  {
    slug: "cite-for-all",
    title: "cite-for-all",
    description:
      "提供 DOI 或標題精確查詢、七種引用格式、具韌性的批次轉換，以及複製或檔案匯出的引用轉換工具。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/cite-for-all",
    datetime: "2026",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Citation.js",
      "citeproc",
      "CSL",
      "Auth.js",
      "Prisma",
      "PostgreSQL",
    ],
    github: "https://github.com/yuzen9622/cite-for-all",
    demo: "https://citation.yuzen.dev",
    intro:
      "透過 DOI.org、Crossref 與 DataCite 以 DOI 或標題查詢文獻；可將最多 30 筆資料轉為七種格式，並支援匿名轉換或登入後建立私有專案。",
    highlights: [
      {
        title: "DOI 與標題精確查詢",
        description:
          "透過 DOI.org、Crossref 與 DataCite，以精確 DOI 或標題查找文獻資料。",
      },
      {
        title: "七種格式與具韌性的批次轉換",
        description:
          "支援七種引用格式與最多 30 筆批次處理；個別項目失敗時，成功結果仍會保留。",
      },
      {
        title: "複製與檔案匯出",
        description:
          "可直接複製結果，或下載為 TXT 與 BibTeX 檔案。",
      },
      {
        title: "匿名轉換與可選私有專案",
        description:
          "無需帳號即可轉換；登入使用者則可選擇使用私有專案。",
      },
    ],
  },
  {
    slug: "yuzen-portofilo",
    title: "yuzen-portofilo",
    description:
      "具備在地化首頁、關於、專案、部落格與聯絡體驗，以及動態介面的多語言作品集網站。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/yuzen-portofilo",
    datetime: "2026",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "Motion",
      "React Markdown",
      "KaTeX",
      "Resend",
      "Zustand",
      "SWR",
    ],
    github: "https://github.com/yuzen9622/yuzen-portofilo",
    demo: "https://www.yuzen.dev",
    intro:
      "以 Next.js 打造的作品集網站，整合在地化路由、動態 UI、支援語法高亮與 KaTeX 的 Markdown 部落格、SEO、聯絡表單，以及 Apple Music 導覽列整合。",
    highlights: [
      {
        title: "多語言在地化路由",
        description:
          "透過在地化路由提供首頁、關於、專案、部落格與聯絡頁面的多語言體驗。",
      },
      {
        title: "動態介面",
        description:
          "使用 Motion 為作品集中的互動加入有目的的動態效果。",
      },
      {
        title: "技術型 Markdown 部落格",
        description:
          "以 Markdown 發布文章，並支援程式碼語法高亮與 KaTeX 技術內容排版。",
      },
      {
        title: "SEO、聯絡與 Apple Music",
        description:
          "整合 SEO、以 Resend 驅動的聯絡表單，以及導覽列中的 Apple Music 整合。",
      },
    ],
  },
];
