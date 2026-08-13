import {
	SiBootstrap,
	SiBootstrapHex,
	SiCloudinary,
	SiCloudinaryHex,
	SiCss,
	SiCssHex,
	SiDjango,
	SiDjangoHex,
	SiExpress,
	SiExpressHex,
	SiFastapi,
	SiFastapiHex,
	SiGooglegemini,
	SiGooglegeminiHex,
	SiGooglemaps,
	SiGooglemapsHex,
	SiHtml5,
	SiHtml5Hex,
	SiJavascript,
	SiJavascriptHex,
	SiMysql,
	SiMysqlHex,
	SiNextdotjs,
	SiNextdotjsHex,
	SiNodedotjs,
	SiNodedotjsHex,
	SiPython,
	SiPythonHex,
	SiReact,
	SiReactHex,
	SiShadcnui,
	SiShadcnuiHex,
	SiSupabase,
	SiSupabaseHex,
	SiTypescript,
	SiTypescriptHex,
	SiVite,
	SiViteHex,
} from "@icons-pack/react-simple-icons";
import {
	AudioLines,
	Bot,
	BrainCircuit,
	CloudSun,
	CodeXml,
	KeyRound,
	Puzzle,
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
	TypeScript: SiTypescript,
	Supabase: SiSupabase,
	Cloudinary: SiCloudinary,
	React: SiReact,
	"React Native": SiReact,
	FastAPI: SiFastapi,
	Vite: SiVite,
	"Gemini API": SiGooglegemini,
	"Google Maps API": SiGooglemaps,
	"shadcn/ui": SiShadcnui,
	Express: SiExpress,
	"Node.js": SiNodedotjs,
	Django: SiDjango,
	Python: SiPython,
	Bootstrap: SiBootstrap,
	MySQL: SiMysql,
	JavaScript: SiJavascript,
	HTML: SiHtml5,
	CSS: SiCss,
};

const BRAND_COLORS: Record<string, string> = {
	"Next.js": SiNextdotjsHex,
	TypeScript: SiTypescriptHex,
	Supabase: SiSupabaseHex,
	Cloudinary: SiCloudinaryHex,
	React: SiReactHex,
	FastAPI: SiFastapiHex,
	Vite: SiViteHex,
	"Gemini API": SiGooglegeminiHex,
	"Google Maps API": SiGooglemapsHex,
	"shadcn/ui": SiShadcnuiHex,
	Express: SiExpressHex,
	"Node.js": SiNodedotjsHex,
	Django: SiDjangoHex,
	Python: SiPythonHex,
	Bootstrap: SiBootstrapHex,
	MySQL: SiMysqlHex,
	JavaScript: SiJavascriptHex,
	HTML: SiHtml5Hex,
	CSS: SiCssHex,
};

/** 沒有品牌 logo 的技術，用語意相近的 lucide icon 代替 */
const FALLBACK_ICONS: Record<string, LucideIcon> = {
	"OpenAI API": Bot,
	Whisper: AudioLines,
	"Agentic RAG": BrainCircuit,
	"Chrome Extension (MV3)": Puzzle,
	NextAuth: KeyRound,
	"中央氣象局 API": CloudSun,
	"CWB Open Data API": CloudSun,
	Ably: Zap,
};

/** 品牌是黑底白字 logo 的技術：dark mode 下不能用品牌色（會隱形），改用文字色 */
const DARK_MODE_FRIENDLY: Record<string, true> = {
	"Next.js": true,
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
