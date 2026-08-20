import type { Project } from "../types";

export const Projects_en: Project[] = [
  {
    slug: "chatto",
    title: "Chat.to",
    description:
      "Chat.to is a modern real-time messaging platform combining Next.js, Supabase, Ably, and NextAuth to deliver group chat rooms, voice/video calling, direct media uploads, and markdown rendering.",
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
      "A full-featured real-time communication platform with friend discovery, group rooms, ephemeral presence indicators, voice/video calls, and direct media uploads, designed for serverless scalability.",
    highlights: [
      {
        title: "Real-time pub/sub & zero-DB presence via Ably",
        description:
          "Eliminates persistent server WebSocket overhead by utilizing Ably's pub/sub and presence architecture, enabling stateless horizontal scaling across Vercel serverless functions while decoupling ephemeral typing indicators completely from database writes.",
      },
      {
        title: "NextAuth JWT session integrated channel security",
        description:
          "Binds NextAuth JWT session validation to Ably token auth endpoints, dynamically issuing room-scoped tokens based on database memberships to enforce strict cross-room isolation.",
      },
      {
        title: "Signed direct uploads to Cloudinary CDN",
        description:
          "Implements signed client-side direct uploads to Cloudinary, bypassing serverless API payload constraints and drastically cutting server bandwidth usage.",
      },
      {
        title: "Full social chat suite & Markdown parsing",
        description:
          "Features friend requests, group administrative roles, threaded message replies, edit/soft-delete workflows, read receipts, and real-time Markdown syntax rendering.",
      },
    ],
  },
  {
    slug: "makentu2026",
    title: "MakeNTU 2026 — Yi-Agent",
    description:
      "A MakeNTU 2026 hackathon project: an AI decision assistant combining a deterministic I-Ching engine, Agentic RAG, and single-pass LLM synthesis with bidirectional voice streaming.",
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
      "Transforms ancient Plum Blossom I-Ching divination into actionable modern decision advice via a deterministic five-element engine, ChromaDB retrieval, and single-pass LLM synthesis with real-time voice streaming.",
    highlights: [
      {
        title: "Deterministic Five-Element engine (0 LLM invocations)",
        description:
          "Eliminates hallucination in divination logic by computing lunar calendar alignments, hexagram mutations (ben/zhi/hu gua), and body/application elemental interactions through pure deterministic algorithms with zero model calls.",
      },
      {
        title: "Agentic RAG & structured four-part decision synthesis",
        description:
          "Queries ChromaDB vector store for historical I-Ching texts, enforcing a structured four-part JSON schema (overview, reading, active-verb actionable steps, optimal timing) in a single LLM pass.",
      },
      {
        title: "Bidirectional WebSocket voice pipeline (STT + LLM + TTS)",
        description:
          "Coordinates faster-whisper speech-to-text, LLM generation, and localized TTS via an asynchronous audio buffer queue over WebSockets for natural, low-latency spoken consultations.",
      },
      {
        title: "Lock Folder KV-Cache pre-warming & streaming UI",
        description:
          "Pre-warms KV-Cache on FastAPI startup to minimize time-to-first-token (TTFT), paired with React 19 and Radix UI streaming markdown tokens in real time.",
      },
    ],
  },
  {
    slug: "termexpander-ai",
    title: "TermExpander AI",
    description:
      "A Chrome extension (Manifest V3) for academic research and writing: highlight any term to instantly expand acronyms, standardize nomenclature, and refine academic phrasing.",
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
      "Highlight technical terms across academic papers and webpages to trigger Google Gemini models, transforming colloquial or abbreviated terms into standard academic nomenclature.",
    highlights: [
      {
        title: "Selection-triggered inline tooltip UX",
        description:
          "Injects content script listeners on text selection to position a lightweight floating tooltip adjacent to highlighted terms, querying AI and rendering normalized definitions without layout shifts or context switching.",
      },
      {
        title: "Academic nomenclature normalization & formal tone rewriting",
        description:
          "Employs specialized academic prompt engineering to expand technical abbreviations (e.g., ITS, RAG, LLM) into standard citation formats [Chinese (English, Acronym)] and rewrite informal sentences for journal submissions.",
      },
      {
        title: "Google Gemini 2.5 multi-model adapter architecture",
        description:
          "Implements a modular model adapter supporting Gemini 2.5 Flash, Pro, and 2.0 Flash Lite with structured schema enforcement for sub-second semantic recognition.",
      },
      {
        title: "BYOK local storage & zero-server privacy",
        description:
          "Built on a Bring-Your-Own-Key client-only architecture storing encrypted API keys in chrome.storage.local, communicating directly with Google endpoints without telemetry or history collection.",
      },
    ],
  },
  {
    slug: "accessible-navigation",
    title: "Accessible Smart Navigation",
    description:
      "A multimodal accessible smart navigation platform integrating TDX transit feeds, indoor GTFS networks, and Gemini Live voice streaming to deliver barrier-free routes for mobility-impaired users.",
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
      "An integrated smart navigation platform built for wheelchair users and mobility-impaired individuals, featuring multimodal routing algorithms, crowd-sourced hazard reporting, and Gemini Live voice assistance.",
    highlights: [
      {
        title: "Multimodal routing engine & GTFS indoor multi-floor graph",
        description:
          "Integrates real-time TDX transit data with multi-floor GTFS indoor graphs (elevators, ramps, accessible station exits) using OpenTripPlanner/Valhalla to route mobility-impaired users around stairs and barriers.",
      },
      {
        title: "Gemini Live WebSocket bidirectional voice assistant",
        description:
          "Streams two-way audio over WebSockets with Gemini Live, enabling conversational accessibility inquiries, elevator directions, and natural-language route explanations.",
      },
      {
        title: "Comprehensive accessibility GIS layers & live CCTV feeds",
        description:
          "Aggregates nationwide accessible restrooms, parking spaces, welfare institutions, campus facilities, and tactile paving, enriched with live intersection CCTV video streams and weather warnings.",
      },
      {
        title: "Crowdsourced hazard reporting & automated lifecycle scheduling",
        description:
          "Enables real-time obstacle and construction reporting with community validation and automated cron expiration jobs to maintain fresh, reliable ground-truth data.",
      },
      {
        title: "Strict architectural linting (lint:arch) & Docker Compose",
        description:
          "Enforces unidirectional module boundaries via custom architectural linting, backed by Redis caching, MongoDB persistence, Docker Compose orchestration, and comprehensive Vitest test coverage.",
      },
    ],
  },
  {
    slug: "dcard-clone",
    title: "Dcard Clone",
    description:
      "A community forum platform built with Django, featuring user authentication, article CRUD, hierarchical board categories, pagination, reader comments, and Django Admin content management.",
    picture: "/project/dcard.webp",
    datetime: "2024",
    tech: ["Django", "Python", "Bootstrap", "SQLite", "HTML", "CSS"],
    github: "https://github.com/yuzen9622/Dcard",
    intro:
      "Recreates core Dcard forum features with Django, demonstrating MVC/MTV architectural patterns, relational ORM modeling, and responsive frontend integration.",
    highlights: [
      {
        title: "Full authentication & session management",
        description:
          "Implements secure user registration, login, logout, and session lifecycle using Django Auth, ensuring robust permission checks across article authoring and commenting.",
      },
      {
        title: "Relational ORM data modeling & multi-board categories",
        description:
          "Models one-to-many relationships across posts, categorical boards, and nested comment threads using Django ORM, supporting full CRUD operations, board filtering, and paginated feeds.",
      },
      {
        title: "Customized Django Admin & responsive Bootstrap layout",
        description:
          "Leverages a customized Django Admin suite for rapid content moderation, coupled with a mobile-first Bootstrap 5 grid layout for responsive cross-device experiences.",
      },
    ],
  },
  {
    slug: "weast",
    title: "Weast",
    description:
      "An intuitive personal finance and expense tracker web app built with React, Material UI, and a Node.js Express MVC backend, featuring multi-account transfers, date filtering, and statistical charts.",
    picture: "/project/weast.webp",
    datetime: "2023",
    tech: ["React", "Material UI", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/yuzen9622/Account-App",
    demo: "https://account-app-phi.vercel.app/",
    intro:
      "A personal financial management system designed for daily bookkeeping, featuring multi-account fund tracking, visual expense charts, and JWT data isolation.",
    highlights: [
      {
        title: "Transaction logging & multi-account fund transfers",
        description:
          "Enables rapid bookkeeping for income and expenses with customizable tags, notes, and intra-account fund transfers across cash, bank, and credit accounts.",
      },
      {
        title: "Multi-dimensional date filtering & interactive charts",
        description:
          "Provides dynamic filtering by day, month, year, or custom date ranges (start/end), visualized through interactive MUI charts to highlight spending habits and monthly balances.",
      },
      {
        title: "Decoupled Express MVC backend architecture",
        description:
          "Connects a React MUI frontend to a standalone Node.js backend (account_api_node) structured around a clean Controller-Model-Router MVC pattern for business logic and MongoDB operations.",
      },
      {
        title: "JWT Bearer Token authorization & data isolation",
        description:
          "Implements Bearer Token authentication headers across REST endpoints to enforce strict user-level data encryption and account isolation in MongoDB.",
      },
    ],
  },
  {
    slug: "web3",
    title: "Web Technology Introduction",
    description:
      "A structured educational and reference platform for modern web technologies, covering core frontend standards, framework comparisons, backend runtimes, database paradigms, and CI/CD pipelines.",
    picture: "/project/web3.webp",
    datetime: "2023",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    github: "https://github.com/yuzen9622/web3",
    demo: "https://web3-six-omega.vercel.app",
    intro:
      "An educational platform designed to provide beginners and developers with a comprehensive overview of modern web development, from frontend foundations to backend architecture and DevOps.",
    highlights: [
      {
        title: "Structured frontend core standards & framework breakdown",
        description:
          "Covers HTML5 semantic elements, modern CSS3 layout engines, and vanilla JavaScript DOM manipulation alongside architectural comparisons of React, Vue, and Angular.",
      },
      {
        title: "Backend ecosystem & database paradigm comparisons",
        description:
          "Introduces Laravel (PHP), Spring Boot (Java), and Express (Node.js) runtime environments, contrasting relational ACID databases (MySQL/PostgreSQL) with document-oriented NoSQL (MongoDB).",
      },
      {
        title: "DevOps mindset & CI/CD automation pipelines",
        description:
          "Walks through modern software delivery workflows including Git branching strategies, automated testing with GitHub Actions, and continuous deployment to Vercel and cloud platforms.",
      },
    ],
  },
  {
    slug: "weather-app",
    title: "Taiwan Weather App",
    description:
      "A real-time weather query web application built with React, integrating Central Weather Administration (CWA) open data for Taiwan's counties and islands with 3-hour forecasts and responsive UI.",
    picture: "/project/weatherapp.webp",
    datetime: "2023",
    tech: ["React", "JavaScript", "CSS", "CWA API"],
    github: "https://github.com/yuzen9622/weather-app",
    demo: "http://weather.yuzen.dev/",
    intro:
      "A responsive weather application built with React and Central Weather Administration open data, featuring diurnal state detection, live readings, and 3-hour forecasts.",
    highlights: [
      {
        title: "CWA Open Data API integration",
        description:
          "Integrates Taiwan Central Weather Administration open data via Fetch API, parsing real-time observations including temperature, relative humidity, wind speed, and precipitation for 22 counties and outlying islands.",
      },
      {
        title: "3-hour forecasts & horizontal scroll cards",
        description:
          "Processes multi-period forecast intervals into horizontal CSS-overflow scrolling cards displaying diurnal trends, high/low extremes, and meteorological icons.",
      },
      {
        title: "Diurnal state detection & mobile-first UI",
        description:
          "Calculates time-of-day states (morning, afternoon, night) to dynamically adapt theme aesthetics, optimized for vertical smartphone screens without manual zooming.",
      },
    ],
  },
];
