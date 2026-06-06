import { useMemo, useState } from "react";
import { TypographyInlineCode } from "./typography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CheckIcon, CopyIcon } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkDark,
  coldarkCold,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import React from "react";
import useTheme from "@/shared/hooks/use-theme";

interface NotionCodeBlockProps {
  className?: string;
  children: React.ReactNode;
  file?: string;
}
export function CodeBlock({
  className = "",
  children,
  file,
}: NotionCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();
  const language = useMemo(() => {
    const match = /language-([a-z0-9+-]+)/i.exec(className);
    return match ? match[1] : null;
  }, [className]);

  const handleCopy = async () => {
    if (typeof children === "string" || Array.isArray(children)) {
      const text = Array.isArray(children) ? children.join("") : children;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error("Copy failed", err);
      }
    }
  };

  if (!language) return <TypographyInlineCode>{children}</TypographyInlineCode>;

  return (
    <pre className=" relative  text-sm   rounded-3xl ">
      <div className="absolute  top-1.5 px-3  py-2 rounded-3xl right-2  border  flex gap-3 text-xs">
        {file && <pre className=" bg-transparent transition">{file}</pre>}
        {language && (
          <p className="   bg-transparent   transition">{language}</p>
        )}

        {copied ? (
          <Tooltip>
            <TooltipTrigger className="  text-green-400  backdrop-blur-md  transition">
              <CheckIcon size={16} />
            </TooltipTrigger>
            <TooltipContent>Copied!</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleCopy}
                className="  backdrop-blur-md  rounded-3xl transition"
              >
                <CopyIcon size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Copy</TooltipContent>
          </Tooltip>
        )}
      </div>
      <SyntaxHighlighter
        style={isDark ? coldarkDark : coldarkCold}
        language={language}
        className=" rounded-md border text-base text-inherit! pt-10!"
        useInlineStyles={true}
        showLineNumbers
      >
        {String(children).trim()}
      </SyntaxHighlighter>
    </pre>
  );
}
