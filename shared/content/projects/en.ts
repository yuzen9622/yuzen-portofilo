import type { Project } from "../types";

export const Projects_en: Project[] = [
  {
    slug: "accessible-smart-map",
    title: "accessible-smart-map",
    description:
      "An accessibility-focused map for exploring facility layers, planning barrier-aware routes, and viewing live TDX bus and transit information.",
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
      "A web map that brings accessibility facilities, accessible route planning, and live Taiwan TDX bus and transit data together to support more confident travel.",
    highlights: [
      {
        title: "Accessibility facility layers",
        description:
          "Organizes accessibility-related facilities into map layers so people can inspect relevant places before they travel.",
      },
      {
        title: "Barrier-aware route planning",
        description:
          "Helps users plan routes with accessibility considerations at the center, making it easier to evaluate travel options.",
      },
      {
        title: "Live TDX transit data",
        description:
          "Connects to TDX live bus and transit data so route planning can be considered alongside current public-transport information.",
      },
    ],
  },
  {
    slug: "graph-patent-analysis",
    title: "graph-patent-analysis",
    description:
      "A patent portfolio analysis tool that turns XLSX data into inspectable concept networks, contextual graphs, comparisons, and exports.",
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
      "Imports XLSX patent data, uses Gemini to extract concepts, and turns portfolios into inspectable technical and Applicant → Patent → Concept graphs for comparison and reporting.",
    highlights: [
      {
        title: "XLSX import and Gemini concept extraction",
        description:
          "Imports patent spreadsheets and uses Gemini to extract the technical concepts that anchor later analysis.",
      },
      {
        title: "Concept networks and portfolio context",
        description:
          "Builds a technical concept network and an Applicant → Patent → Concept context graph, with side-by-side portfolio comparison.",
      },
      {
        title: "Filters and explainable inspection",
        description:
          "Supports temporal and IPC filters, then exposes support, Jaccard similarity, and source-patent inspection for traceable findings.",
      },
      {
        title: "AI reports and portable exports",
        description:
          "Generates AI trend reports and exports analysis as CSV, Excel, or standalone HTML.",
      },
    ],
  },
  {
    slug: "makentu2026",
    title: "MakeNTU2026",
    description:
      "A MakeNTU 2026 decision assistant combining a deterministic Plum Blossom I Ching and five-elements engine with Agentic RAG, structured LLM reports, and voice interaction.",
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
      "It pairs reproducible divination logic with Agentic RAG to produce one-shot structured reports, supports WebSocket STT/TTS voice conversations, relationship analysis, and cache warmup.",
    highlights: [
      {
        title: "Deterministic Plum Blossom I Ching and five-elements engine",
        description:
          "Uses deterministic Meihua Yishu and five-elements reasoning to provide a reproducible foundation for each consultation.",
      },
      {
        title: "Agentic RAG and one-shot structured reports",
        description:
          "Retrieves relevant context with Agentic RAG and produces a structured LLM report in one generation pass.",
      },
      {
        title: "WebSocket voice flow and relationship analysis",
        description:
          "Connects STT and TTS through a WebSocket voice flow while also supporting relationship-focused analysis.",
      },
      {
        title: "Cache warmup",
        description:
          "Warms caches in advance to make interactive consultations more responsive.",
      },
    ],
  },
  {
    slug: "termexpander-ai",
    title: "TermExpander-ai",
    description:
      "A Chrome extension for expanding academic abbreviations, converting selected text, and refining writing into a more academic tone.",
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
      "A Manifest V3 extension that helps researchers expand academic abbreviations, use selection and popup conversion tools, and refine text for an academic tone.",
    highlights: [
      {
        title: "Academic abbreviation expansion",
        description:
          "Expands academic abbreviations into clearer terminology to help readers understand specialized text.",
      },
      {
        title: "Selection tooltip and popup conversion",
        description:
          "Offers a tooltip for selected text and a popup workflow for converting text without leaving the browser.",
      },
      {
        title: "Academic tone refinement",
        description:
          "Refines wording toward a more formal academic tone for research and professional writing.",
      },
      {
        title: "Local API key and privacy",
        description:
          "Stores the user's API key locally with the Chrome Storage API and does not collect browsing history.",
      },
    ],
  },
  {
    slug: "cite-for-all",
    title: "cite-for-all",
    description:
      "A citation converter for exact DOI or title lookup, seven styles, resilient batches, and copy or file export.",
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
      "Looks up references by DOI or title through DOI.org, Crossref, and DataCite; converts up to 30 items in seven styles; and supports anonymous conversion or optional authenticated private projects.",
    highlights: [
      {
        title: "DOI and title resolution",
        description:
          "Finds references by exact DOI or title using DOI.org, Crossref, and DataCite.",
      },
      {
        title: "Seven styles and resilient batches",
        description:
          "Formats references in seven citation styles and processes batches of up to 30 items without discarding successful results when individual items fail.",
      },
      {
        title: "Copy and file export",
        description:
          "Lets users copy results or download them as TXT or BibTeX files.",
      },
      {
        title: "Anonymous or private workflows",
        description:
          "Keeps conversion available without an account while offering authenticated users optional private projects.",
      },
    ],
  },
  {
    slug: "yuzen-portofilo",
    title: "yuzen-portofilo",
    description:
      "A multilingual portfolio site with localized home, about, projects, blog, and contact experiences in an animated interface.",
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
      "A Next.js portfolio that combines localized routing, animated UI, Markdown publishing with syntax highlighting and KaTeX, SEO, a contact form, and an Apple Music navbar integration.",
    highlights: [
      {
        title: "Multilingual localized routing",
        description:
          "Presents home, about, projects, blog, and contact experiences through localized routes.",
      },
      {
        title: "Animated interface",
        description:
          "Uses Motion to add purposeful animation throughout the portfolio experience.",
      },
      {
        title: "Technical Markdown blog",
        description:
          "Publishes Markdown posts with syntax highlighting and KaTeX support for technical writing.",
      },
      {
        title: "SEO, contact, and Apple Music",
        description:
          "Combines SEO support, a contact form powered by Resend, and an Apple Music integration in the navbar.",
      },
    ],
  },
];
