import { cn } from "@/shared/lib/utils";
import React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children?: React.ReactNode;
  setHeadingId?: (id: string) => void;
};

export function TypographyH1({
  children,
  className,
  id,
  ...props
}: HeadingProps) {
  return (
    <h1
      id={id}
      className={cn(
        "group scroll-mt-24 text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-10 mb-4 flex items-center justify-between",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-60 hover:opacity-100! transition-opacity text-muted-foreground text-xl font-normal ml-2 select-none"
          aria-label="Link to section"
        >
          #
        </a>
      )}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
  id,
  ...props
}: HeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "group scroll-mt-24 border-b border-border/80 pb-3 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mt-12 mb-4 first:mt-0 flex items-center justify-between",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-60 hover:opacity-100! transition-opacity text-muted-foreground text-lg font-normal ml-2 select-none"
          aria-label="Link to section"
        >
          #
        </a>
      )}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
  id,
  ...props
}: HeadingProps) {
  return (
    <h3
      id={id}
      className={cn(
        "group scroll-mt-24 text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-8 mb-3 flex items-center justify-between",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-60 hover:opacity-100! transition-opacity text-muted-foreground text-base font-normal ml-2 select-none"
          aria-label="Link to section"
        >
          #
        </a>
      )}
    </h3>
  );
}

export function TypographyH4({
  children,
  className,
  id,
  ...props
}: HeadingProps) {
  return (
    <h4
      id={id}
      className={cn(
        "group scroll-mt-24 text-lg sm:text-xl font-semibold tracking-tight text-foreground mt-6 mb-2 flex items-center justify-between",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-60 hover:opacity-100! transition-opacity text-muted-foreground text-sm font-normal ml-2 select-none"
          aria-label="Link to section"
        >
          #
        </a>
      )}
    </h4>
  );
}

export function TypographyP({ children }: { children: React.ReactNode }) {
  return (
    <p className="leading-relaxed text-[15px] sm:text-base text-foreground/90 my-5 font-normal">
      {children}
    </p>
  );
}

export function TypographyBlockquote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <blockquote className="my-6 border-l-2 border-primary bg-muted/40 rounded-r-xl px-5 py-3.5 text-muted-foreground italic text-sm sm:text-base leading-relaxed">
      {children}
    </blockquote>
  );
}

export function TypographyTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border/80">
      <table className="w-full text-sm text-left border-collapse">{children}</table>
    </div>
  );
}

export function TypographyList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-5 ml-6 list-disc [&>li]:mt-2 text-foreground/90 text-sm sm:text-base leading-relaxed">
      {children}
    </ul>
  );
}

export function TypographyInlineCode({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <code className="bg-muted px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono text-primary font-medium border border-border/50">
      {children}
    </code>
  );
}

export const TypographyThead: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <thead className="bg-muted/70 text-foreground font-semibold border-b border-border">
    {children}
  </thead>
);

export const TypographyTbody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <tbody className="divide-y divide-border/60">{children}</tbody>;

export const TypographyTr: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <tr className="hover:bg-muted/30 transition-colors">{children}</tr>;

export const TypographyTh: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
    {children}
  </th>
);

export const TypographyTd: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <td className="px-4 py-3 text-sm text-foreground/90">
    {children}
  </td>
);

