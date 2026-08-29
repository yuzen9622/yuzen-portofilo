import type { Project } from "../types";

export const Projects_en: Project[] = [
  {
    slug: "accessible-smart-map",
    title: "accessible-smart-map",
    description:
      "An accessibility-first Taiwan mobility map that combines TDX transit and parking data with multimodal, barrier-aware route planning for more confident travel.",
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
      "GTFS",
      "OpenTripPlanner",
      "Valhalla",
      "LINE Bot",
      "AI voice",
    ],
    github: "https://github.com/yuzen9622/accessible-smart-map",
    demo: "https://map.yuzen.dev",
    intro:
      "Created as my five-year junior college capstone, this accessibility-first map brings together Taiwan transit, parking, and facility information to support more confident travel. I was responsible for the backend, which integrates TDX data with routing and conversational services.",
    highlights: [
      {
        title: "Multimodal TDX backend",
        description:
          "I built the backend integration for TDX bus, conventional rail, high-speed rail, metro, and parking information, making multimodal data available alongside accessibility context.",
      },
      {
        title: "GTFS-driven routing",
        description:
          "TDX GTFS serves as graph input for OpenTripPlanner and Valhalla, while a custom CSR walking-route engine currently covers Taipei City.",
      },
      {
        title: "SOS and conversational assistance",
        description:
          "An SOS LINE Bot, more than 10 callable agent tools, and real-time AI voice interaction extend the map beyond visual route planning.",
      },
      {
        title: "Capstone recognition",
        description:
          "Built as my five-year junior college capstone, the project centers accessibility and received an Honorable Mention in the 2026 AI C Project Competition.",
      },
    ],
  },
  {
    slug: "graph-patent-analysis",
    title: "graph-patent-analysis",
    description:
      "A research tool for researchers and teachers that turns uploaded patent datasets into explainable applicant, patent, and concept graphs for tracing technology trends over time.",
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
      "Built for researchers and teachers working with patent datasets, it uses an LLM to structure applicants, patents, and each patent's technical concepts. The resulting graphs make changing technology directions and year-by-year trends easier to examine.",
    highlights: [
      {
        title: "Patent research workflow",
        description:
          "Researchers and teachers can upload patent datasets and begin analysis from the records they already use.",
      },
      {
        title: "LLM-assisted structured extraction",
        description:
          "An LLM extracts applicants, patents, and the technical concepts associated with each patent, turning source data into analysis-ready structure.",
      },
      {
        title: "Applicant → Patent → Concept trends",
        description:
          "Interactive concept and context graphs connect applicants, patents, and concepts, with temporal and IPC filters for examining changes across years.",
      },
      {
        title: "Explainable comparison and export",
        description:
          "Portfolio comparison pairs visual analysis with support, Jaccard similarity, and source-patent inspection; results can be exported.",
      },
    ],
  },
  {
    slug: "makentu2026",
    title: "MakeNTU2026",
    description:
      "A MakeNTU 2026 decision assistant combining deterministic Plum Blossom I Ching and five-elements reasoning with Agentic RAG, structured reports, and voice interaction.",
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
      "For this MakeNTU 2026 project, I mainly developed the backend TTS, STT, RAG, and agent components. The work paired deterministic divination logic with structured LLM reports and a voice flow, giving me hands-on experience integrating TTS/STT and an Agentic RAG workflow.",
    highlights: [
      {
        title: "Backend contribution",
        description:
          "I mainly developed the TTS, STT, RAG, and agent components behind the experience, working alongside the project's deterministic reasoning engine.",
      },
      {
        title: "TTS/STT voice pipeline",
        description:
          "A WebSocket flow connects speech-to-text and text-to-speech for voice interaction, giving me practical experience integrating the two services.",
      },
      {
        title: "Agentic RAG and structured flow",
        description:
          "I developed the Agentic RAG and agent flow that retrieves context and shapes it into a one-shot structured LLM report; relationship analysis and cache warmup support the broader workflow.",
      },
      {
        title: "Hackathon learning",
        description:
          "The project did not receive an award, but it provided substantial practical experience with voice integration and Agentic RAG.",
      },
    ],
  },
  {
    slug: "termexpander-ai",
    title: "TermExpander-ai",
    description:
      "An academic-writing extension that expands or converts specialized abbreviations and full terms in context, reducing ambiguity that ordinary web searches often leave unresolved.",
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
      "Research work often requires switching between specialized abbreviations and full forms, yet a Google search can return an irrelevant meaning. This extension provides contextual terminology conversion for academic writing rather than relying on a generic search result.",
    highlights: [
      {
        title: "Research-driven motivation",
        description:
          "It began with a recurring research problem: specialized abbreviations and full forms are hard to resolve accurately through a general Google search.",
      },
      {
        title: "Contextual term expansion",
        description:
          "Converts technical terms between abbreviations and full names in context, helping academic writing retain the intended meaning.",
      },
      {
        title: "Focused interaction and privacy",
        description:
          "Selection tooltips and a popup provide conversion entry points. Gemini powers the feature, while the API key stays stored locally and browsing history is not collected.",
      },
      {
        title: "Distribution in progress",
        description:
          "The extension is not yet published; alternative distribution options are being explored.",
      },
    ],
  },
  {
    slug: "cite-for-all",
    title: "cite-for-all",
    description:
      "A research workflow that pairs provider-backed literature lookup with citation-format conversion, reducing verification risk and repetitive reformatting across journal requirements.",
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
      "While organizing literature, I wanted a workflow that could reduce the risk of fabricated or nonexistent references in AI-rich research and avoid repetitive reformatting for different journals. cite-for-all combines provider-backed exact DOI or title matching with citation conversion; this matching helps reduce risk rather than guaranteeing every reference.",
    highlights: [
      {
        title: "Research-integrity motivation",
        description:
          "Built from a need to organize literature more safely in an AI-rich workflow, it addresses the risk of fabricated or nonexistent references without claiming to eliminate it.",
      },
      {
        title: "Provider-backed exact matching",
        description:
          "Exact DOI or title matching through DOI.org, Crossref, and DataCite helps reduce the risk of incorrect reference data.",
      },
      {
        title: "Formats and resilient batches",
        description:
          "Converts up to 30 items into seven citation formats. Partial failures preserve successful results rather than discarding the whole batch.",
      },
      {
        title: "Export and optional workspaces",
        description:
          "Results can be copied or exported as TXT or BibTeX; conversion works anonymously, with optional private projects for signed-in users.",
      },
    ],
  },
  {
    slug: "yuzen-portofilo",
    title: "yuzen-portofilo",
    description:
      "My personal website, designed to showcase frontend layout and scroll-animation work through a multilingual portfolio, editorial content, and contact experience.",
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
      "This personal website showcases my frontend layout design and animation work, using scroll-driven interaction to shape the browsing experience. It also provides multilingual routes, publishing, and contact surfaces around the portfolio.",
    highlights: [
      {
        title: "Personal portfolio direction",
        description:
          "I built this site as a focused showcase for my frontend layout design and animation work.",
      },
      {
        title: "Portfolio layout and content",
        description:
          "The home, about, projects, blog, and contact sections form a structured frontend layout for presenting work and content.",
      },
      {
        title: "Scroll motion with accessibility",
        description:
          "Scroll animation creates interaction across the site, with motion accessibility considered in the experience.",
      },
      {
        title: "Multilingual publishing platform",
        description:
          "Localized routes, Markdown with KaTeX and code highlighting, SEO, a contact form, and an Apple Music navbar integration support the broader site.",
      },
    ],
  },
];
