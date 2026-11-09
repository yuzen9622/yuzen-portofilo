import type { Project } from "../types";

export const Projects_zhTW: Project[] = [
  {
    slug: "accessible-smart-map",
    title: "accessible smart map",
    description:
      "整合 TDX 大眾運輸與停車資訊，以及多運具無障礙路線規劃的台灣行動地圖，協助使用者更安心地出行。",
    picture: "/project/taipei-a11y.webp",
    datetime: "2025 - 2026",
     tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB"
    ],
    github: "https://github.com/yuzen9622/accessible-smart-map",
    demo: "https://map.yuzen.dev",
    intro:
      "這是我五專畢業專題，將台灣大眾運輸、停車與無障礙設施資訊整合於同一張地圖，協助使用者更安心地規劃出行。我負責後端，串接 TDX 資料、路徑規劃與對話服務。",
    highlights: [
      {
        title: "多運具 TDX 後端",
        description:
          "我負責串接 TDX 公車、臺鐵、高鐵、捷運與停車資訊的後端，讓多運具資料可結合無障礙脈絡呈現。",
      },
      {
        title: "GTFS 與路徑規劃",
        description:
          "以 TDX GTFS 作為 OpenTripPlanner 與 Valhalla 的圖資輸入，另有自訂 CSR 步行路線規劃引擎，目前支援臺北市。",
      },
      {
        title: "求助與語音互動",
        description:
          "整合 SOS LINE Bot、超過 10 項可供 Agent 呼叫的工具，以及即時 AI 語音互動，擴展地圖以外的協助方式。",
      },
      {
        title: "畢業專題與競賽佳作",
        description:
          "這項五專畢業專題以無障礙出行為核心，獲得 2026 全國專題創意競賽 佳作。",
      },
    ],
  },
  {
    slug: "graph-patent-analysis",
    title: "graph patent analysis",
    description:
      "供研究者與教師上傳專利資料集，建立可解釋的申請人、專利與技術概念圖譜，以追蹤技術方向與年度趨勢的研究工具。",
    picture:
      "https://opengraph.githubassets.com/1/yuzen9622/graph-patent-analysis",
    datetime: "2026",
   tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    github: "https://github.com/yuzen9622/graph-patent-analysis",
    intro:
      "為研究者與教師處理專利資料集而設計，透過 LLM 擷取申請人、專利與各專利的技術概念，轉為可分析的結構。藉由圖譜可觀察技術方向及其跨年度變化。",
    highlights: [
      {
        title: "從專利資料集開始的研究流程",
        description: "研究者與教師可上傳專利資料集，以既有資料展開分析。",
      },
      {
        title: "LLM 結構化擷取",
        description:
          "LLM 擷取申請人、專利與每筆專利的技術概念，將來源資料轉為可分析的結構。",
      },
      {
        title: "申請人 → 專利 → 概念與年度趨勢",
        description:
          "互動式概念圖與脈絡圖連結申請人、專利和概念，並以時間與 IPC 篩選觀察年度變化。",
      },
      {
        title: "可解釋的比較與匯出",
        description:
          "組合比較可搭配 support、Jaccard 相似度與來源專利檢視；結果可匯出。",
      },
    ],
  },
  {
    slug: "makentu2026",
    title: "MakeNTU2026",
    description:
      "結合確定性梅花易數與五行推演、Agentic RAG、結構化報告及語音互動的 MakeNTU 2026 決策助理。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/MakeNTU2026",
    datetime: "2026",
  tech: [
      "FastAPI",
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
    ],
    github: "https://github.com/yuzen9622/MakeNTU2026",
    intro:
      "在這個 MakeNTU 2026 專案中，我主要開發後端的 TTS、STT、RAG 與 Agent 功能。專案結合確定性推演、結構化 LLM 報告與語音流程，也讓我累積 TTS/STT 串接及 Agentic RAG 工作流程的實作經驗。",
    highlights: [
      {
        title: "後端開發角色",
        description:
          "我主要開發 TTS、STT、RAG 與 Agent 的後端功能，並與專案中的確定性推演引擎整合。",
      },
      {
        title: "WebSocket TTS/STT 語音流程",
        description:
          "透過 WebSocket 串接 STT 與 TTS 進行語音互動，讓我實際累積兩者整合的經驗。",
      },
      {
        title: "Agentic RAG 與結構化 Agent 流程",
        description:
          "我開發的 Agentic RAG 與 Agent 流程會取回相關脈絡，並組織成單次生成的結構化 LLM 報告；專案亦支援關係分析與快取預熱。",
      },
      {
        title: "參賽成果與實作收穫",
        description:
          "專案未獲獎，但讓我在語音整合與 Agentic RAG 上累積了扎實的實務經驗。",
      },
    ],
  },
  {
    slug: "termexpander-ai",
    title: "TermExpander AI",
    description:
      "協助學術寫作在脈絡中展開或轉換專業縮寫與完整名稱，降低一般網路搜尋常無法釐清的術語歧義的擴充功能。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/TermExpander-ai",
    datetime: "2025",
  tech: [
      "Chrome Extension MV3",
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
    ],
    github: "https://github.com/yuzen9622/TermExpander-ai",
    intro:
      "研究時常需在專業縮寫與完整名稱間轉換，但 Google 搜尋可能找不到結果或帶出錯誤語意。這個擴充功能以脈絡化的術語轉換支援學術寫作，而非只依賴通用搜尋結果。",
    highlights: [
      {
        title: "源自研究中的查找困擾",
        description:
          "專業縮寫與完整名稱常難以透過一般 Google 搜尋準確釐清，因此成為開發動機。",
      },
      {
        title: "脈絡化的縮寫與全名轉換",
        description:
          "依上下文在技術術語的縮寫與完整名稱間轉換，協助學術寫作保留原本意義。",
      },
      {
        title: "操作方式與隱私",
        description:
          "提供選取文字 Tooltip 與 Popup 轉換，使用 Gemini；API Key 僅儲存在本機，且不蒐集瀏覽紀錄。",
      },
      {
        title: "尚未發布，持續探索發行方式",
        description: "目前尚未發布，正探索其他發行管道。",
      },
    ],
  },
  {
    slug: "cite-for-all",
    title: "cite for all",
    description:
      "結合資料提供者支援的文獻查找與引用格式轉換，協助研究流程降低查核風險及不同期刊格式反覆調整的工具。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/cite-for-all",
    datetime: "2026",
 tech: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    github: "https://github.com/yuzen9622/cite-for-all",
    demo: "https://citation.yuzen.dev",
    intro:
      "整理文獻時，我希望在 AI 輔助研究流程中降低虛構或不存在文獻的風險，也減少因不同期刊格式而重複轉換的工作。cite-for-all 將資料提供者支援的 DOI 或標題精確比對與格式轉換結合；這類比對可協助降低風險，但不保證涵蓋所有情況。",
    highlights: [
      {
        title: "研究誠信的開發動機",
        description:
          "源於在 AI 輔助研究中更穩妥地整理文獻的需求，面對虛構或不存在文獻的風險，但不宣稱能完全排除。",
      },
      {
        title: "資料提供者支援的精確比對",
        description:
          "透過 DOI.org、Crossref 與 DataCite 進行 DOI 或標題精確比對，協助降低引用資料錯誤的風險。",
      },
      {
        title: "七種格式與具韌性的批次轉換",
        description:
          "支援最多 30 筆、七種引用格式的批次轉換；部分項目失敗時仍保留成功結果。",
      },
      {
        title: "匯出與可選私有工作區",
        description:
          "可複製結果或匯出 TXT、BibTeX；無需帳號即可轉換，登入後可選擇使用私有專案。",
      },
    ],
  },
  {
    slug: "yuzen-portofilo",
    title: "yuzen portofilo",
    description:
      "我的個人網站，以多語言作品集、內容與聯絡體驗，呈現前端版面設計及捲動動畫作品。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/yuzen-portofilo",
    datetime: "2026",
    tech: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
    ],
    github: "https://github.com/yuzen9622/yuzen-portofilo",
    demo: "https://www.yuzen.dev",
    intro:
      "這是我的個人網站，用來展示前端版面設計與動畫作品，並以捲動動畫塑造瀏覽互動。網站亦提供多語言路由、內容發布與聯絡功能，作為作品集的完整入口。",
    highlights: [
      {
        title: "個人作品集定位",
        description: "我將此網站作為前端版面設計與動畫作品的展示平台。",
      },
      {
        title: "前端版面與內容架構",
        description:
          "首頁、關於、專案、部落格與聯絡頁面，構成呈現作品與內容的前端版面架構。",
      },
      {
        title: "捲動動畫與動態無障礙",
        description: "透過捲動動畫建立互動節奏，並將動態無障礙納入體驗考量。",
      },
      {
        title: "多語言內容與聯絡平台",
        description:
          "整合多語言路由、支援 KaTeX 與程式碼高亮的 Markdown、SEO、聯絡表單及導覽列 Apple Music 整合。",
      },
    ],
  },
];
