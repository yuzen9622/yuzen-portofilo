'use client"';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";

import rehypeSanitize from "rehype-sanitize";
import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "./code-block";
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyList,
  TypographyP,
  TypographyTable,
  TypographyTbody,
  TypographyTd,
  TypographyTh,
  TypographyTr,
} from "./typography";
import { ArrowUpRightIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
export default function ArticleMarkdown({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeSanitize, rehypeSlug, rehypeKatex, rehypeRaw]}
      components={{
        h1: ({ ...props }) => {
          return <TypographyH1 {...props} />;
        },
        h2: ({ ...props }) => {
          return <TypographyH2 {...props} />;
        },
        h3: ({ ...props }) => {
          return <TypographyH3 {...props} />;
        },
        h4: ({ ...props }) => {
          return <TypographyH4 {...props} />;
        },
        p: ({ children }) => <TypographyP>{children}</TypographyP>,
        code: ({ className = "", children, ...props }) => {
          return (
            <CodeBlock className={className} {...props}>
              {children}
            </CodeBlock>
          );
        },
        pre: ({ children }) => children as React.ReactElement,
        a: ({ href, children }) => (
          <Link
            href={href ?? ""}
            className="group underline text-primary"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
            <ArrowUpRightIcon
              className="inline group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
              size={14}
            />
          </Link>
        ),
        ul: ({ children }) => <TypographyList>{children}</TypographyList>,

        ol: ({ children }) => (
          <ol className="list-decimal list-inside my-4 space-y-2">
            {children}
          </ol>
        ),
        blockquote: ({ children }) => (
          <TypographyBlockquote>{children}</TypographyBlockquote>
        ),
        table: ({ children }) => <TypographyTable>{children}</TypographyTable>,
        tbody: ({ children }) => <TypographyTbody>{children}</TypographyTbody>,
        tr: ({ children }) => <TypographyTr>{children}</TypographyTr>,
        th: ({ children }) => <TypographyTh>{children}</TypographyTh>,
        td: ({ children }) => <TypographyTd>{children}</TypographyTd>,
        input: ({ type, disabled, checked, ...props }) => {
          if (type === "checkbox")
            return (
              <Checkbox
                checked={checked}
                className=" disabled:opacity-100"
                disabled={disabled}
              />
            );
          return <input type={type} {...props} />;
        },
        img: ({ src, alt }) => {
          return (
            <Image
              src={(src as string) ?? ""}
              alt={alt ?? ""}
              width={800}
              height={600}
              className="max-w-full h-auto rounded-md"
            />
          );
        },
        hr: ({ ...props }) => {
          return <Separator className="my-6" {...props} />;
        },
      }}
    >
      {children as string}
    </ReactMarkdown>
  );
}
