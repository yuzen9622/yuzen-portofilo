import type { Project } from "../types";

export const Projects_zhTW: Project[] = [
  {
    slug: "chatto",
    title: "chatto",
    description:
      "Chat.to 是一款簡潔的即時聊天應用程式，讓你輕鬆與朋友和群組進行交流。結合 Ably、Next.js、Supabase 和 NextAuth，提供順暢、安全且吸引人的訊息傳遞體驗。",
    picture: "/project/chatto.webp",
    datetime: "2025",
    tech: ["Next.js", "TypeScript", "Supabase", "Ably", "NextAuth", "Cloudinary"],
    github: "https://github.com/yuzen9622/chat.to",
    demo: "https://chat-to-sage.vercel.app/introduce",
    intro:
      "一個功能完整的即時聊天應用，支援群組聊天室、輸入指示與媒體上傳。以現代聊天應用該有的樣子打造。",
    highlights: [
      {
        title: "以 Ably pub/sub 實作即時通訊",
        description:
          "不自建 WebSocket 伺服器，改用 Ably 的 pub/sub 服務，讓應用能在 Vercel serverless 環境水平擴展，origin 端不需維持長連線。",
      },
      {
        title: "NextAuth session 驗證整合頻道授權",
        description:
          "session-based 認證整合進 API routes 與 Ably 頻道授權，使用者只能訂閱自己所屬的聊天室。",
      },
      {
        title: "媒體上傳卸載至 Cloudinary",
        description:
          "透過 signed upload 直傳 Cloudinary，大型檔案完全不經過 API 層。",
      },
      {
        title: "輸入指示採用暫態 presence 事件",
        description:
          "typing indicator 以 Ably 的暫態 presence 事件實作、不落資料庫——在 UX 即時性與 DB 寫入壓力間刻意取捨。",
      },
    ],
  },
  {
    slug: "makentu2026",
    title: "MakeNTU 2026 — 易策",
    description:
      "結合 Agentic RAG、語音轉錄與 React 前端的 AI 助理黑客松專案。Whisper 語音輸入直接串進 RAG 檢索管線。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/MakeNTU2026",
    datetime: "2026",
    tech: ["TypeScript", "React", "FastAPI", "Whisper", "Agentic RAG"],
    github: "https://github.com/yuzen9622/MakeNTU2026",
    intro:
      "MakeNTU 2026 黑客松作品：一個把 Agentic RAG、語音轉錄與 React 前端整合成單一 AI 助理的專案。",
    highlights: [
      {
        title: "Whisper 語音輸入直進 RAG 管線",
        description:
          "語音在伺服器端以 Whisper 轉錄後直接餵入檢索管線，語音到檢索之間沒有中間狀態。",
      },
      {
        title: "Agentic RAG 迴圈",
        description:
          "模型可自行決定在產生最終回答前重新查詢檢索層，降低領域問題的幻覺率。",
      },
      {
        title: "單一請求路徑的 FastAPI 後端",
        description:
          "轉錄、embedding 與生成在同一條請求路徑處理，在 demo 環境下把延遲控制在可接受範圍。",
      },
    ],
  },
  {
    slug: "termexpander-ai",
    title: "TermExpander-ai",
    description:
      "為學術研究與正式寫作設計的 Chrome 擴充功能：選取網頁上的任何術語，一鍵取得正規化的學術版本——縮寫展開、標準化翻譯、口語轉正式用語。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/TermExpander-ai",
    datetime: "2026",
    tech: ["TypeScript", "Chrome Extension (MV3)", "OpenAI API", "Gemini API", "Vite", "React"],
    github: "https://github.com/yuzen9622/TermExpander-ai",
    intro:
      "在網頁上選取術語、點擊浮動按鈕，即可取得正規化的學術用語。專為真實研究工作流設計。",
    highlights: [
      {
        title: "多供應商 LLM 支援",
        description:
          "GPT 與 Gemini 藏在一層小型 adapter 後面，新增一個供應商只需一個檔案。",
      },
      {
        title: "BYOK（自帶金鑰）架構",
        description:
          "API 金鑰只存在使用者瀏覽器本地，完全不經過我的伺服器——沒有後端、沒有計費、沒有資料保留。",
      },
      {
        title: "選取即浮現的按鈕 UX",
        description:
          "浮動按鈕在選取文字時出現，設計上刻意不干擾資訊密集的學術頁面。",
      },
      {
        title: "針對真實研究工作流設計",
        description:
          "縮寫展開（如 RAG → Retrieval-Augmented Generation）、跨語言術語標準化、口語轉正式改寫。",
      },
    ],
  },
  {
    slug: "accessible-navigation",
    title: "臺北無障礙導航系統",
    description:
      "整合無障礙設施資訊與即時大眾運輸動態的智慧導航平台，為行動不便族群提供友善且安全的路線規劃服務。",
    picture: "/project/taipei-a11y.webp",
    datetime: "2023",
    tech: ["Next.js", "TypeScript", "Google Maps API", "shadcn/ui", "Express", "Node.js"],
    github: "https://github.com/yuzen9622/taipei-accessible-map",
    intro:
      "為台北打造的無障礙智慧導航系統，為有行動需求的使用者呈現無障礙路線與設施。",
    highlights: [
      {
        title: "Google Maps 之上的無障礙路線層",
        description:
          "在預設 API 不提供的情況下，過濾並呈現無障礙資料，建構專屬的 barrier-free 路線層。",
      },
      {
        title: "前後端分離的 RESTful 架構",
        description:
          "前端與 REST API 後端拆為獨立 repo、以乾淨的 RESTful contract 溝通——日後要換地圖供應商或加行動端 client 都更容易。",
      },
      {
        title: "以真實限制建模",
        description:
          "輪椅坡道、電梯可用性、無障礙出入口——不只是「避開樓梯」，而是把行動不便使用者實際的決策樹建進系統。",
      },
    ],
  },
  {
    slug: "dcard-clone",
    title: "Dcard Clone",
    description:
      "一個使用 Django 打造的個人部落格展示網站，包含使用者認證、文章新增與管理、留言、分類與分頁功能。整合 Django 的後台管理介面與 Bootstrap 響應式設計，便於管理與瀏覽。",
    picture: "/project/dcard.webp",
    datetime: "2024",
    tech: ["Django", "Python", "Bootstrap", "MySQL"],
    github: "https://github.com/yuzen9622/Dcard",
    intro: "以 Django 復刻 Dcard 社群論壇的核心功能，練習完整的後端 MVC 開發流程。",
    highlights: [
      {
        title: "完整的使用者認證流程",
        description: "註冊、登入、session 管理，整合 Django 內建認證系統。",
      },
      {
        title: "文章與留言系統",
        description: "文章 CRUD、留言、分類與分頁，資料模型以 Django ORM 設計。",
      },
      {
        title: "後台管理整合",
        description: "利用 Django Admin 快速建立內容管理介面，搭配 Bootstrap 響應式前端。",
      },
    ],
  },
  {
    slug: "weast",
    title: "微財",
    description:
      "一款簡單直覺的記帳應用程式，協助你輕鬆管理收入與支出，讓你更有效掌控財務狀況。",
    picture: "/project/weast.webp",
    datetime: "2023",
    tech: ["React Native", "JavaScript", "Node.js"],
    github: "https://github.com/yuzen9622/Account-App",
    intro: "簡單直覺的記帳應用，我最早期的完整專案之一。",
    highlights: [
      {
        title: "收支管理核心功能",
        description: "記錄收入與支出、分類統計，協助掌控個人財務狀況。",
      },
      {
        title: "前後端分離練習",
        description: "搭配獨立的 Node.js API（account_api_node）練習 client-server 架構。",
      },
    ],
  },
  {
    slug: "web3",
    title: "網頁技術導論",
    description:
      "網頁技術導論是一個教學性質的網站，目標是幫助初學者快速掌握現代 Web 開發的基本概念與工具。內容涵蓋 HTML、CSS 與 JavaScript 的基礎教學，同時也簡介後端技術與 CI/CD 自動化流程。",
    picture: "/project/web3.webp",
    datetime: "2023",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/yuzen9622/web3",
    intro: "幫助初學者快速掌握現代 Web 開發基本概念的教學網站。",
    highlights: [
      {
        title: "系統化的基礎教學",
        description: "涵蓋 HTML、CSS、JavaScript 基礎，結合實際案例與程式碼範例。",
      },
      {
        title: "延伸至後端與 CI/CD",
        description: "簡介後端技術與 CI/CD 自動化流程，讓學習者建立完整的開發視野。",
      },
    ],
  },
  {
    slug: "weather-app",
    title: "台灣天氣查詢 App",
    description:
      "一款以 React 打造的天氣查詢應用程式，從中央氣象局 API 取得即時與三小時預報資訊。支援全台各地區查詢，具備行動裝置響應式設計，動態顯示溫度、濕度、風速與天氣狀況。",
    picture: "/project/weatherapp.webp",
    datetime: "2023",
    tech: ["React", "JavaScript", "中央氣象局 API"],
    intro: "以 React 打造的天氣查詢應用，串接中央氣象局開放資料。",
    highlights: [
      {
        title: "即時與預報資料整合",
        description: "從中央氣象局 API 取得即時天氣與三小時預報，支援全台各地區查詢。",
      },
      {
        title: "響應式動態介面",
        description: "行動裝置優先的響應式設計，動態顯示溫度、濕度、風速與天氣狀況。",
      },
    ],
  },
];
