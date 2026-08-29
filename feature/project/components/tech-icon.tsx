import {
	SiBootstrap,
	SiBootstrapHex,
	SiCloudinary,
	SiCloudinaryHex,
	SiCss,
	SiCssHex,
	SiDjango,
	SiDjangoHex,
	SiDocker,
	SiDockerHex,
	SiExpress,
	SiExpressHex,
	SiFastapi,
	SiFastapiHex,
	SiGooglegemini,
	SiGooglegeminiHex,
	SiGooglechrome,
	SiGooglechromeHex,
	SiGooglemaps,
	SiGooglemapsHex,
	SiHtml5,
	SiHtml5Hex,
	SiJavascript,
	SiJavascriptHex,
	SiMongodb,
	SiMongodbHex,
	SiMui,
	SiMuiHex,
	SiMysql,
	SiMysqlHex,
	SiNextdotjs,
	SiNextdotjsHex,
	SiNodedotjs,
	SiNodedotjsHex,
	SiPostgresql,
	SiPostgresqlHex,
	SiPython,
	SiPythonHex,
	SiReact,
	SiReactHex,
	SiRedis,
	SiRedisHex,
	SiShadcnui,
	SiShadcnuiHex,
	SiSqlite,
	SiSqliteHex,
	SiSupabase,
	SiSupabaseHex,
	SiTailwindcss,
	SiTailwindcssHex,
	SiTypescript,
	SiTypescriptHex,
	SiVercel,
	SiVercelHex,
	SiVite,
	SiViteHex,
} from "@icons-pack/react-simple-icons";
import {
	AudioLines,
	Bot,
	BrainCircuit,
	CloudSun,
	CodeXml,
	DatabaseZap,
	KeyRound,
	Navigation,
	Radio,
	Zap,
	type LucideIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type BrandIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

/**
 * 技術名稱 → 品牌 icon（Simple Icons）
 * 沒有品牌 icon 的技術用 lucide 泛用 icon 代替，最後兜底 CodeXml。
 */
const BRAND_ICONS: Record<string, BrandIcon> = {
	"Next.js": SiNextdotjs,
	"Next.js 16": SiNextdotjs,
	TypeScript: SiTypescript,
	Supabase: SiSupabase,
	Cloudinary: SiCloudinary,
	React: SiReact,
	"React 19": SiReact,
	"React Native": SiReact,
	FastAPI: SiFastapi,
	Vite: SiVite,
	"Gemini API": SiGooglegemini,
	"Gemini Live API": SiGooglegemini,
	"Chrome Extension MV3": SiGooglechrome,
	"Chrome Extension (MV3)": SiGooglechrome,
	"Google Maps API": SiGooglemaps,
	"shadcn/ui": SiShadcnui,
	Express: SiExpress,
	"Node.js": SiNodedotjs,
	Django: SiDjango,
	Python: SiPython,
	PostgreSQL: SiPostgresql,
	Bootstrap: SiBootstrap,
	MySQL: SiMysql,
	SQLite: SiSqlite,
	MongoDB: SiMongodb,
	Redis: SiRedis,
	Docker: SiDocker,
	"Material UI": SiMui,
	"Tailwind CSS": SiTailwindcss,
	Vercel: SiVercel,
	JavaScript: SiJavascript,
	HTML: SiHtml5,
	CSS: SiCss,
};

const BRAND_COLORS: Record<string, string> = {
	"Next.js": SiNextdotjsHex,
	"Next.js 16": SiNextdotjsHex,
	TypeScript: SiTypescriptHex,
	Supabase: SiSupabaseHex,
	Cloudinary: SiCloudinaryHex,
	React: SiReactHex,
	"React 19": SiReactHex,
	"React Native": SiReactHex,
	FastAPI: SiFastapiHex,
	Vite: SiViteHex,
	"Gemini API": SiGooglegeminiHex,
	"Gemini Live API": SiGooglegeminiHex,
	"Chrome Extension MV3": SiGooglechromeHex,
	"Chrome Extension (MV3)": SiGooglechromeHex,
	"Google Maps API": SiGooglemapsHex,
	"shadcn/ui": SiShadcnuiHex,
	Express: SiExpressHex,
	"Node.js": SiNodedotjsHex,
	Django: SiDjangoHex,
	Python: SiPythonHex,
	PostgreSQL: SiPostgresqlHex,
	Bootstrap: SiBootstrapHex,
	MySQL: SiMysqlHex,
	SQLite: SiSqliteHex,
	MongoDB: SiMongodbHex,
	Redis: SiRedisHex,
	Docker: SiDockerHex,
	"Material UI": SiMuiHex,
	"Tailwind CSS": SiTailwindcssHex,
	Vercel: SiVercelHex,
	JavaScript: SiJavascriptHex,
	HTML: SiHtml5Hex,
	CSS: SiCssHex,
};

/** 沒有品牌 logo 的技術，用語意相近的 lucide icon 代替 */
const FALLBACK_ICONS: Record<string, LucideIcon> = {
	"OpenAI API": Bot,
	Whisper: AudioLines,
	"faster-whisper": AudioLines,
	"Agentic RAG": BrainCircuit,
	ChromaDB: DatabaseZap,
	WebSocket: Radio,
	JWT: KeyRound,
	"TDX API": Navigation,
	NextAuth: KeyRound,
	"中央氣象局 API": CloudSun,
	"CWA API": CloudSun,
	"CWB Open Data API": CloudSun,
	Ably: Zap,
};

/** 品牌是黑底白字 logo 的技術：dark mode 下不能用品牌色（會隱形），改用文字色 */
const DARK_MODE_FRIENDLY: Record<string, true> = {
	"Next.js": true,
	"Next.js 16": true,
	Vercel: true,
};

export default function TechIcon({
	name,
	size = 12,
	className,
}: {
	name: string;
	size?: number;
	className?: string;
}) {
	const Brand = BRAND_ICONS[name];
	if (Brand) {
		if (DARK_MODE_FRIENDLY[name]) {
			return <Brand size={size} className={className} />;
		}
		return (
			<Brand size={size} color={BRAND_COLORS[name]} className={className} />
		);
	}

	const Fallback = FALLBACK_ICONS[name] ?? CodeXml;
	return <Fallback size={size} className={className} aria-hidden />;
}
