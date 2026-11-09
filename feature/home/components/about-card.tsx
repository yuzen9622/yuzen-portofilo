"use client";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/shared/components/scroll-reveal";

type AboutCardProps = {
  title?: string;
  href: string;
  index: number;
};

/** Index row: a fill sweeps up from below and the arrow island slides in. */
export default function AboutCard({ title, href, index }: AboutCardProps) {
  return (
    <ScrollReveal as="li" y={24} blur={6} delay={index * 0.06}>
      <Link
        href={href === "/" ? "/" : `/${href}`}
        className="group relative isolate flex items-center justify-between gap-4 overflow-hidden border-b border-foreground/10 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 translate-y-full bg-foreground transition-transform duration-700 ease-fluid group-hover:translate-y-0"
        />
        <span className="flex items-baseline gap-4 pl-1 transition-[color,transform] duration-700 ease-fluid group-hover:translate-x-3 group-hover:text-background">
          <span className="font-sans text-3xl font-semibold uppercase tracking-[-0.04em] md:text-4xl">
            {title}
          </span>
        </span>
        <span className="mr-2 flex size-10 items-center justify-center rounded-full ring-1 ring-foreground/10 transition-[transform,background-color,color] duration-700 ease-fluid group-hover:-translate-x-1 group-hover:rotate-45 group-hover:bg-background group-hover:text-foreground">
          <ArrowUpRight aria-hidden strokeWidth={1.25} className="size-4" />
        </span>
      </Link>
    </ScrollReveal>
  );
}
