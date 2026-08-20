import type { Project } from "../types";

export const Projects_zhTW: Project[] = [
  {
    slug: "chatto",
    title: "Chat.to",
    description:
      "Chat.to 是一款現代即時通訊平台，結合 Next.js、Supabase、Ably 與 NextAuth，提供具備群組通訊、語音/視訊通話、多媒體直傳與 Markdown 訊息渲染的流暢聊天體驗。",
    picture: "/project/chatto.webp",
    datetime: "2025",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Ably",
      "NextAuth",
      "Cloudinary",
    ],
    github: "https://github.com/yuzen9622/chat.to",
    demo: "https://chat-to-sage.vercel.app/introduce",
    intro:
      "一個功能完整的全端即時通訊平台，具備好友搜尋、群組聊天室、即時 Presence 狀態、語音/視訊通話與媒體直傳，專為 Serverless 架構最佳化設計。",
    highlights: [
      {
        title: "以 Ably Pub/Sub & Presence 實作即時通訊",
        description:
          "捨棄傳統長連線 WebSocket 伺服器維護成本，採用 Ably 的 Pub/Sub 與 Presence 事件機制，使應用能在 Vercel Serverless 架構下無狀態水平擴展；輸入中指示器（Typing Indicator）採用暫態 Presence 事件實作，完全不落地資料庫，在即時 UX 與 DB 寫入壓力間取得最佳平衡。",
      },
      {
        title: "NextAuth 會話驗證整合頻道安全授權",
        description:
          "將 NextAuth JWT Session 驗證與 Ably Token Request 授權端點深度整合，依據使用者資料庫權限動態簽發頻道專屬 Token，嚴格限制使用者僅能訂閱與發布所屬群組頻道，杜絕跨房間未授權存取。",
      },
      {
        title: "Direct Signed Uploads 媒體直傳 Cloudinary",
        description:
          "設計 Signed Upload 直傳機制，前端透過 API 取得短期時效簽章後將圖片與多媒體檔案直傳 Cloudinary CDN，大型檔案 Payload 完全繞過 Node.js API 伺服器，規避 Serverless 請求大小限制並節省主機頻寬。",
      },
      {
        title: "全功能通訊架構與 Markdown 即時渲染",
        description:
          "完整實作好友邀請/接受/刪除流程、群組權限管理、訊息回覆（Reply）、編輯與軟刪除、已讀標記（Read Receipts）以及即時 Markdown 語法解析渲染，打造低延遲、高互動性的現代通訊體驗。",
      },
    ],
  },
  {
    slug: "makentu2026",
    title: "MakeNTU 2026 — 易策 Yi-Agent",
    description:
      "MakeNTU 2026 黑客松作品：結合確定性梅花易數生克引擎、Agentic RAG 與單次 LLM 合成的 AI 決策助理，支援 WebSocket 雙向語音對話與結構化決策報告。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/MakeNTU2026",
    datetime: "2026",
    tech: [
      "React 19",
      "TypeScript",
      "FastAPI",
      "Python",
      "ChromaDB",
      "Agentic RAG",
      "faster-whisper",
      "WebSocket",
    ],
    github: "https://github.com/yuzen9622/MakeNTU2026",
    intro:
      "將千年梅花易數轉化為現代可執行的決策建議。透過確定性演算法計算五行體用生克，結合 ChromaDB 知識庫檢索與單次 LLM 合成，輸出四段式落地報告並支援即時語音問卦。",
    highlights: [
      {
        title: "確定性五行體用生克引擎（0 次 LLM 調用）",
        description:
          "針對傳統 AI 占卜易產生隨機幻覺之痛點，以台灣時間農曆干支換算與銅錢起卦法進行純演算法確定性運算，嚴謹推導本卦、互卦、之卦與動爻體用生克關係並計算風險分數，起卦推演過程 100% 可重現且不依賴模型推論。",
      },
      {
        title: "Agentic RAG 與結構化落地決策輸出",
        description:
          "依卦象五行與使用者領域問題自動檢索 ChromaDB 易學典籍知識庫（梅花易數、十翼、八字），透過單次 LLM 提示工程嚴格輸出「局勢概述、卦象解讀、可執行建議、行動時機」四段式 JSON 報告，並強制所有建議均以具體動詞開頭，避免空泛論述。",
      },
      {
        title: "WebSocket 雙向語音串流管線（STT + LLM + TTS）",
        description:
          "建構低延遲雙向音訊串流管線，整合 faster-whisper（語音轉文字）與台灣口音語音合成（TTS），透過音訊緩衝佇列（Audio Buffer Queue）協調處理，使用者開口即可進行自然的即時口語問卦對話。",
      },
      {
        title: "Lock Folder KV-Cache 預熱與串流渲染",
        description:
          "於 FastAPI 伺服器啟動階段在背景預熱 Lock Folder KV-Cache，大幅縮短首次推論之首字延遲（TTFT）；前端採用 React 19 與 Radix UI 實作 WebSocket/SSE 串流逐字解析渲染，確保流暢的視覺體驗。",
      },
    ],
  },
  {
    slug: "termexpander-ai",
    title: "TermExpander AI",
    description:
      "專為學術研究與專業寫作設計的 Chrome 擴充功能（Manifest V3）：選取網頁任何術語即可即時浮動展開縮寫、標準化中英對照並優化學術語氣。",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/TermExpander-ai",
    datetime: "2026",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Chrome Extension (MV3)",
      "Gemini API",
    ],
    github: "https://github.com/yuzen9622/TermExpander-ai",
    intro:
      "在文獻與網頁中選取專業術語，自動調用 Google Gemini 模型將其轉化為規範格式「中文名稱（英文名稱, 縮寫）」，大幅提升學術論文撰寫效率。",
    highlights: [
      {
        title: "選取即解析的 Tooltip 浮動視窗 UX",
        description:
          "透過 Content Script 監聽網頁文字反白事件，在選取位置旁邊即時定位並浮現輕量化 Tooltip 視窗，即時發送 AI 請求並顯示正規化術語，使用者無需切換分頁或開啟 Popup 彈窗即可流暢閱讀論文。",
      },
      {
        title: "學術術語標準化與語氣正規化",
        description:
          "專門針對學術研究場景設計提示工程，自動將領域縮寫（如 ITS, RAG, LLM）轉換為國際標準格式「中文名稱（英文名稱, 縮寫）」，並具備將口語化短語改寫為符合學術期刊規範之正式用語功能。",
      },
      {
        title: "Google Gemini 2.5 多模型適配架構",
        description:
          "設計統一的模型調用 Adapter 層，完整支援 Google Gemini 2.5 Flash、Pro 與 2.0 Flash Lite，結合結構化輸出規範，在亞秒級時間內完成高精確度的專業詞彙語意辨識。",
      },
      {
        title: "BYOK 本地儲存與零伺服器隱私保護",
        description:
          "採用 Bring Your Own Key（BYOK）無後端架構，使用者之 API Key 嚴格加密保存在瀏覽器本地（chrome.storage.local），所有 API 請求均直接由客戶端連向 Google 端點，不經第三方伺服器，不追蹤任何瀏覽歷史。",
      },
    ],
  },
  {
    slug: "accessible-navigation",
    title: "無障礙智慧導航",
    description:
      "整合 TDX 交通動態、GTFS 跨樓層室內圖資與 Gemini Live 語音串流的多模態無障礙智慧導航平台，為行動不便族群提供友善且安全的路線規劃與設施查詢。",
    picture: "/project/taipei-a11y.webp",
    datetime: "2024 - 2026",
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "TDX API",
      "Gemini Live API",
      "Docker",
    ],
    github: "https://github.com/yuzen9622/accessible-smart-map",
    demo: "https://map.yuzen.dev/",
    intro:
      "專為身心障礙與行動不便族群打造的一體化智慧導航平台，結合室內外多模態路網演算法、即時路障回報與 Gemini Live 語音對話，落實平等出行權。",
    highlights: [
      {
        title: "多模態無障礙路網與 GTFS 室內跨樓層拓撲",
        description:
          "整合 TDX 捷運/公車即時動態與 GTFS 跨樓層室內拓撲網絡（月台、電梯、出入口無障礙通道關聯），結合 OpenTripPlanner/Valhalla 路由引擎，為輪椅與行動不便族群精準避開階梯與施工路段，規劃含坡道與電梯之真實無障礙路徑。",
      },
      {
        title: "Gemini Live WebSocket 雙向語音導航助理",
        description:
          "透過 WebSocket 串接 Gemini Live 雙向即時音訊串流，使用者能以口語隨時詢問路線、捷運電梯出口位置與無障礙設施，系統提供低延遲語音解說與即時指引。",
      },
      {
        title: "全方位無障礙空間圖層與即時 CCTV 串流",
        description:
          "彙整全台無障礙廁所、身障專用停車格、福利機構、校園無障礙設施、導盲磚與有聲號誌圖資，並即時串接路口 CCTV 監控影像與氣象警報，打造一站式無障礙地理資訊（GIS）系統。",
      },
      {
        title: "社群障礙回報（Hazard Report）與生命週期排程",
        description:
          "實作路面障礙與施工通報機制，包含社群使用者共筆確認評分，後端搭配定時過期排程（Hazard Expire Job）自動清理無效通報，維持路況圖資之高時效性與真實度。",
      },
      {
        title: "架構邊界檢查（lint:arch）與 Docker 容器化",
        description:
          "後端嚴格實施分層依賴規則檢查（pnpm lint:arch）確保模組單向依賴，整合 Redis 快取熱門到站預估與 Session、MongoDB 資料持久化，以 Docker Compose 容器化部署並具備完整 Vitest 整合測試。",
      },
    ],
  },
  {
    slug: "dcard-clone",
    title: "Dcard Clone",
    description:
      "使用 Django 打造的社群論壇平台，完整實現使用者認證、文章 CRUD、多層次看板分類、分頁載入、讀者留言互動與 Django Admin 內容後台管理。",
    picture: "/project/dcard.webp",
    datetime: "2024",
    tech: ["Django", "Python", "Bootstrap", "SQLite", "HTML", "CSS"],
    github: "https://github.com/yuzen9622/Dcard",
    intro:
      "以 Django 復刻 Dcard 社群論壇的核心架構，實踐完整的後端 MVC/MTV 設計模式、關聯式資料庫模型設計與前後端響應式整合。",
    highlights: [
      {
        title: "完整使用者認證與 Session 狀態管理",
        description:
          "基於 Django 內建 Auth 模組實作用戶註冊、登入、登出與權限驗證流程，結合 Session-based 認證機制管理登入態，確保發文、編輯與評論之權限隔離。",
      },
      {
        title: "關聯式 ORM 模型與多看板分類架構",
        description:
          "運用 Django ORM 建立文章（Post）、分類看板（Category）與評論（Comment）間的一對多關聯模型，支援文章 CRUD、板塊分類過濾、分頁載入（Pagination）與留言互動。",
      },
      {
        title: "Django Admin 後台內容管理與 Bootstrap 響應式前端",
        description:
          "客製化 Django 內建 Admin 後台，便於管理者高效審查與管理使用者帳號、文章及留言內容；前端採用 Bootstrap 5 響應式網格系統，打造兼顧行動裝置與桌面的論壇瀏覽體驗。",
      },
    ],
  },
  {
    slug: "weast",
    title: "微財 Weast",
    description:
      "一款直覺易用的個人財務記帳 Web 應用程式，結合 React、Material UI 與 Node.js (Express MVC) 後端，提供收支記錄、多帳戶轉帳、時間範圍篩選與統計圖表分析。",
    picture: "/project/weast.webp",
    datetime: "2023",
    tech: ["React", "Material UI", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/yuzen9622/Account-App",
    demo: "https://account-app-phi.vercel.app/",
    intro:
      "專為日常記帳設計的個人財務管理系統，具備多帳戶資金調度、視覺化消費統計與 JWT 數據隔離，為前後端分離之全端實踐。",
    highlights: [
      {
        title: "收支記錄與多帳戶資產轉移調度",
        description:
          "支援快速新增日常收入與支出記錄，具備自訂消費分類、金額備註與多帳戶（如現金、銀行、信用卡）間之資金調度轉帳（toAccountId）功能。",
      },
      {
        title: "多維度時間篩選與統計圖表視覺化",
        description:
          "前端提供以日、月、年或自訂起訖區間（start/end）動態篩選財務明細，結合直觀的統計圖表視覺化呈現個人消費結構與每月收支結餘趨勢。",
      },
      {
        title: "前後端分離與 Express MVC 架構",
        description:
          "前端 React (MUI) 透過 RESTful API 與獨立的 Node.js 後端（account_api_node）溝通，後端嚴格遵循 Controller、Model、Router 三層式 MVC 架構處理業務邏輯與 MongoDB 存取。",
      },
      {
        title: "JWT Bearer Token 授權與數據隔離",
        description:
          "實作基於 JWT 的 Token 身份驗證機制，在 API 請求標頭中驗證 Authorization Bearer Token，嚴格確保個人財務隱私資料之加密儲存與用戶隔離。",
      },
    ],
  },
  {
    slug: "web3",
    title: "網頁技術導論",
    description:
      "現代 Web 開發技術的系統化教學與導覽平台，涵蓋前端三大核心、主流框架比較、後端架構、關聯/非關聯資料庫選型與 CI/CD 自動化部署流程。",
    picture: "/project/web3.webp",
    datetime: "2023",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    github: "https://github.com/yuzen9622/web3",
    demo: "https://web3-six-omega.vercel.app",
    intro:
      "為初學者與開發者建立系統性 Web 開發全景視野的教學網站，從前端基礎延伸至後端架構、資料庫與 DevOps 現代實務。",
    highlights: [
      {
        title: "系統化前端核心標準與主流框架比較",
        description:
          "深入剖析 HTML5 語意化標籤、CSS3 現代版面配置與 JavaScript DOM 操作基礎，並客觀評析 React (元件化)、Vue (漸進式) 與 Angular (企業級) 三大框架之架構特性與適用場景。",
      },
      {
        title: "後端架構生態與資料庫選型指南",
        description:
          "介紹 PHP (Laravel)、Java (Spring Boot) 與 Node.js (Express) 等主流後端運行環境，並對比關聯式資料庫（MySQL/PostgreSQL，ACID 事務）與 NoSQL 資料庫（MongoDB，彈性文檔模型）之設計差異。",
      },
      {
        title: "DevOps 思維與 CI/CD 自動化實務",
        description:
          "介紹現代軟體交付生命週期，涵蓋 Git 版本控制、GitHub Actions 持續整合自動化測試建置，以及 Vercel/雲端平台持續部署（CD）的最佳實踐。",
      },
    ],
  },
  {
    slug: "weather-app",
    title: "台灣天氣查詢 App",
    description:
      "以 React 打造的台灣即時天氣查詢應用，串接中央氣象署（CWA）開放資料 API，支援全台縣市與離島即時觀測、逐三小時預報、時段感知主題與直式響應式設計。",
    picture: "/project/weatherapp.webp",
    datetime: "2023",
    tech: ["React", "JavaScript", "CSS", "中央氣象局 API"],
    github: "https://github.com/yuzen9622/weather-app",
    demo: "http://weather.yuzen.dev/",
    intro:
      "以 React 串接中央氣象署開放資料，具備時段判斷、即時天候渲染與逐三小時預報的響應式天氣查詢工具。",
    highlights: [
      {
        title: "中央氣象署 (CWA) 開放資料即時串接",
        description:
          "透過 Fetch API 串接中央氣象署開放資料平台，即時解析全台灣 22 縣市與澎金馬離島地區之氣溫、相對濕度、風速與降雨機率等觀測數據。",
      },
      {
        title: "逐三小時預報與平滑滾動視覺卡片",
        description:
          "整合未來時段預報資料，以 CSS Overflow 橫向平滑滾動卡片呈現逐三小時氣象變化趨勢、當日最高最低溫與氣候型態圖示。",
      },
      {
        title: "早中晚時段感知與行動優先響應式介面",
        description:
          "設計時間感知演算法自動判斷當前為早晨、中午或夜間，動態調整介面主題色系與視覺呈現；整體版面針對智慧型手機直式螢幕深度最佳化，免縮放即可完整掌握天候資訊。",
      },
    ],
  },
];
