import type { Project } from "../types";

export const Projects_en: Project[] = [
  {
    slug: "chatto",
    title: "chatto",
    description:
      "Chat.to is a clean and simple real-time chat application that lets you easily communicate with friends and groups. Combining Ably, Next.js, Supabase, and NextAuth, it provides a smooth, secure, and engaging messaging experience.",
    picture: "/project/chatto.webp",
    datetime: "2025",
    tech: ["Next.js", "TypeScript", "Supabase", "Ably", "NextAuth", "Cloudinary"],
    github: "https://github.com/yuzen9622/chat.to",
    demo: "https://chat-to-sage.vercel.app/introduce",
    intro:
      "A full-featured real-time chat application with group rooms, typing indicators, and media uploads — built the way modern chat should be.",
    highlights: [
      {
        title: "Real-time via Ably pub/sub",
        description:
          "Instead of rolling my own WebSocket server, the app uses Ably pub/sub — letting it scale horizontally on Vercel's serverless runtime without long-lived connections on the origin.",
      },
      {
        title: "Session-based auth wired into channel authorization",
        description:
          "NextAuth sessions are integrated into API routes and Ably channel authorization, so users can only subscribe to rooms they belong to.",
      },
      {
        title: "Media uploads offloaded to Cloudinary",
        description:
          "Signed uploads send large payloads directly to Cloudinary, keeping them out of the API layer entirely.",
      },
      {
        title: "Typing indicators as ephemeral presence events",
        description:
          "Typing indicators are ephemeral Ably presence events (not persisted) — a deliberate trade-off between UX fidelity and DB write pressure.",
      },
    ],
  },
  {
    slug: "makentu2026",
    title: "MakeNTU 2026",
    description:
      "A hackathon project combining agentic RAG, voice transcription, and a React frontend into a single AI-powered assistant.",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/MakeNTU2026",
    datetime: "2026",
    tech: ["TypeScript", "React", "FastAPI", "Whisper", "Agentic RAG"],
    github: "https://github.com/yuzen9622/MakeNTU2026",
    intro:
      "A MakeNTU 2026 hackathon project: agentic RAG, voice transcription, and a React frontend combined into one AI assistant.",
    highlights: [
      {
        title: "Whisper voice input straight into the RAG pipeline",
        description:
          "Speech is transcribed server-side and fed directly into retrieval — no intermediate state between speech and retrieval.",
      },
      {
        title: "Agentic RAG loop",
        description:
          "The model can decide to re-query the retrieval layer before generating a final answer, reducing hallucination on domain-specific questions.",
      },
      {
        title: "Single request path on FastAPI",
        description:
          "Transcription, embedding, and generation are handled in a single request path to keep latency manageable under demo conditions.",
      },
    ],
  },
  {
    slug: "termexpander-ai",
    title: "TermExpander-ai",
    description:
      "A Chrome extension for academic research and professional writing: highlight any term on a webpage and get a normalized academic version — expanded acronyms, standardized translations, and formal replacements.",
    picture: "https://opengraph.githubassets.com/1/yuzen9622/TermExpander-ai",
    datetime: "2026",
    tech: ["TypeScript", "Chrome Extension (MV3)", "OpenAI API", "Gemini API", "Vite", "React"],
    github: "https://github.com/yuzen9622/TermExpander-ai",
    intro:
      "Highlight a term, click the floating button, and get a normalized academic version. Designed for real research workflows.",
    highlights: [
      {
        title: "Multi-provider LLM support",
        description:
          "GPT and Gemini sit behind a small adapter layer — adding a new provider is a single file.",
      },
      {
        title: "BYOK (bring-your-own-key) architecture",
        description:
          "API keys are stored locally in the browser and never touch my servers. No backend, no billing, no data retention.",
      },
      {
        title: "Floating-button UX",
        description:
          "The button appears on text selection and is built to stay out of the way on dense academic pages.",
      },
      {
        title: "Built for real research workflows",
        description:
          "Acronym expansion (e.g. RAG → Retrieval-Augmented Generation), cross-language term standardization, informal-to-formal rewriting.",
      },
    ],
  },
  {
    slug: "accessible-navigation",
    title: "Taipei Accessible Navigation System",
    description:
      "An intelligent navigation platform integrating accessible facility information and real-time public transportation dynamics, providing friendly and safe route planning services for people with mobility impairments.",
    picture: "/project/taipei-a11y.webp",
    datetime: "2023",
    tech: ["Next.js", "TypeScript", "Google Maps API", "shadcn/ui", "Express", "Node.js"],
    github: "https://github.com/yuzen9622/taipei-accessible-map",
    intro:
      "An accessible smart navigation system for Taipei that surfaces barrier-free routes and facilities for users with mobility needs.",
    highlights: [
      {
        title: "Barrier-free routing layer on top of Google Maps",
        description:
          "Filters and surfaces accessibility data that the default API doesn't expose.",
      },
      {
        title: "Separated frontend and REST API backend",
        description:
          "Frontend and backend live in separate repos with a clean RESTful contract — easier to swap map providers or add mobile clients later.",
      },
      {
        title: "Designed around real constraints",
        description:
          "Wheelchair ramps, elevator availability, accessible entrances — not just \"avoid stairs\" but modeling the actual decision tree a mobility-impaired user runs through.",
      },
    ],
  },
  {
    slug: "dcard-clone",
    title: "Dcard Clone",
    description:
      "A community forum clone built with Django, featuring user authentication, article creation and management, comments, categories, and pagination. Integrates Django's admin interface and Bootstrap responsive design.",
    picture: "/project/dcard.webp",
    datetime: "2024",
    tech: ["Django", "Python", "Bootstrap", "MySQL"],
    github: "https://github.com/yuzen9622/Dcard",
    intro:
      "A Django clone of the Dcard community forum, built to practice the full backend MVC workflow.",
    highlights: [
      {
        title: "Complete authentication flow",
        description:
          "Registration, login, and session management integrated with Django's built-in auth system.",
      },
      {
        title: "Articles and comments",
        description:
          "Article CRUD, comments, categories, and pagination, modeled with the Django ORM.",
      },
      {
        title: "Admin integration",
        description:
          "Django Admin for fast content management, paired with a responsive Bootstrap frontend.",
      },
    ],
  },
  {
    slug: "weast",
    title: "Weast",
    description:
      "A simple and intuitive bookkeeping application that helps you easily manage income and expenses, allowing you to better control your finances.",
    picture: "/project/weast.webp",
    datetime: "2023",
    tech: ["React Native", "JavaScript", "Node.js"],
    github: "https://github.com/yuzen9622/Account-App",
    intro: "A simple, intuitive bookkeeping app — one of my earliest complete projects.",
    highlights: [
      {
        title: "Income & expense management",
        description:
          "Records income and expenses with categorized statistics to help track personal finances.",
      },
      {
        title: "Client-server practice",
        description:
          "Paired with a standalone Node.js API (account_api_node) to practice client-server architecture.",
      },
    ],
  },
  {
    slug: "web3",
    title: "Web Technology Introduction",
    description:
      "An educational website aimed at helping beginners quickly grasp the basic concepts and tools of modern Web development, covering HTML, CSS, and JavaScript fundamentals plus an introduction to backend technologies and CI/CD.",
    picture: "/project/web3.webp",
    datetime: "2023",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/yuzen9622/web3",
    intro:
      "An educational site helping beginners grasp the fundamentals of modern web development.",
    highlights: [
      {
        title: "Structured fundamentals",
        description:
          "HTML, CSS, and JavaScript basics taught through practical cases and code examples.",
      },
      {
        title: "Beyond the frontend",
        description:
          "Introductions to backend technologies and CI/CD automation to build a complete view of development.",
      },
    ],
  },
  {
    slug: "weather-app",
    title: "Taiwan Weather App",
    description:
      "A weather query application built with React, fetching real-time and 3-hour forecast information from the Central Weather Bureau API. Supports queries for all regions in Taiwan with responsive design.",
    picture: "/project/weatherapp.webp",
    datetime: "2023",
    tech: ["React", "JavaScript", "CWB Open Data API"],
    intro:
      "A React weather app powered by Taiwan's Central Weather Bureau open data.",
    highlights: [
      {
        title: "Real-time and forecast data",
        description:
          "Fetches current conditions and 3-hour forecasts for every region in Taiwan.",
      },
      {
        title: "Responsive dynamic UI",
        description:
          "Mobile-first responsive design dynamically displaying temperature, humidity, wind speed, and conditions.",
      },
    ],
  },
];
