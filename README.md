# Yuzen Portfolio

> 🌐 **[2026.yuzen.dev](https://2026.yuzen.dev)**

個人作品集與技術部落格網站，展示開發專案、技術文章與專業技能。支援中英文雙語切換，具備深色/淺色主題、響應式設計與完整 SEO 優化。

## 網站內容

- **首頁** — 個人介紹、精選專案展示與聯絡入口
- **關於** — 技術背景、技能與開發經歷
- **專案** — 作品集展示，包含 Chatto 即時聊天、Dcard Clone、微財記帳、台灣天氣 App 等
- **部落格** — 技術文章撰寫，支援 Markdown 渲染、程式碼高亮、KaTeX 數學公式
- **聯絡** — 透過表單直接寄送 Email 聯繫

## 技術棧

### 前端框架

| 技術               | 說明                               |
| ------------------ | ---------------------------------- |
| **Next.js 16**     | App Router、Server Components、ISR |
| **React 19**       | 最新版 React，搭配 Server Actions  |
| **TypeScript**     | 全專案型別安全                     |
| **Tailwind CSS 4** | Utility-first CSS 框架             |

### UI / 動畫

| 技術              | 說明                    |
| ----------------- | ----------------------- |
| **Radix UI**      | 無障礙 Headless UI 元件 |
| **Framer Motion** | 頁面過渡與互動動畫      |
| **Lucide Icons**  | 圖示系統                |
| **next-themes**   | 深色 / 淺色主題切換     |

### 國際化 (i18n)

| 技術          | 說明                                    |
| ------------- | --------------------------------------- |
| **next-intl** | 路由型 i18n，支援 `en` / `zh-Hant` 雙語 |

### 部落格系統

| 技術                | 說明                                           |
| ------------------- | ---------------------------------------------- |
| **Strapi CMS**      | Headless CMS 作為後端內容管理                  |
| **react-markdown**  | Markdown 渲染引擎                              |
| **rehype / remark** | 支援 GFM、KaTeX 數學公式、程式碼高亮、Raw HTML |
| **SWR**             | 資料請求與快取策略                             |

### 狀態管理 / 工具

| 技術                 | 說明                       |
| -------------------- | -------------------------- |
| **Zustand**          | 輕量狀態管理               |
| **Resend**           | Email 發送服務（聯絡表單） |
| **Vercel Analytics** | 網站流量分析               |

### SEO 優化

- 動態 `sitemap.xml` 自動產生（含所有靜態頁面與部落格文章）
- `robots.txt` 搜尋引擎爬蟲規則
- JSON-LD 結構化資料（`Person`、`BlogPosting`）
- Open Graph & Twitter Card metadata
- 多語言 `alternate` 標籤與 `canonical` URL
- Web App Manifest（PWA 支援）

## 專案結構

```
app/              # Next.js App Router 頁面與 API 路由
  [locale]/       # 國際化路由 (en / zh-Hant)
    (site)/       # 主站頁面 (首頁、關於、專案、聯絡)
    (blog)/       # 部落格頁面
  api/            # API Routes (文章、聯絡表單)
components/       # 共用 UI 元件
feature/          # 功能模組 (blog、home)
i18n/             # 國際化設定
layouts/          # 全域佈局元件
messages/         # i18n 翻譯檔 (en.json / zh-Hant.json)
shared/           # 共用工具、Hooks、內容資料
```

## 部署

使用 [Vercel](https://vercel.com) 部署，支援 ISR 增量靜態再生與 Edge Runtime。

## License

MIT
