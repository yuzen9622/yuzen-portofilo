import { cn } from "@/shared/lib/utils";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children?: React.ReactNode;
  setHeadingId?: (id: string) => void;
};

export function TypographyH1({
  children,
  className,

  ...props
}: HeadingProps) {
  return (
    <h1
      className={cn(
        "scroll-mt-28 text-4xl font-extrabold tracking-tight text-balance",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
export function TypographyH2({
  children,
  className,
  onChange,
  ...props
}: HeadingProps) {
  void onChange;
  return (
    <h2
      className={cn(
        "scroll-mt-28 border-b pb-4 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
export function TypographyH3({
  children,
  className,

  ...props
}: HeadingProps) {
  return (
    <h3
      className={cn(
        "scroll-mt-28 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
export function TypographyH4({ children, className, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(
        "scroll-mt-28 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
export function TypographyP({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 not-first:mt-6 ">{children}</p>;
}
export function TypographyBlockquote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <blockquote className="mt-6 border-l-3 bg-muted border-primary pl-6 italic">
      {children}
    </blockquote>
  );
}
export function TypographyTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">{children}</table>
    </div>
  );
}
export function TypographyList({ children }: { children: React.ReactNode }) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2   ">{children}</ul>;
}
export function TypographyInlineCode({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <code className="bg-secondary   relative  rounded px-[0.3rem] py-[0.2rem]  text-primary text-sm font-semibold">
      {children}
    </code>
  );
}

export const TypographyThead: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>;

export const TypographyTbody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <tbody>{children}</tbody>;

export const TypographyTr: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <tr className="even:bg-muted border-t">{children}</tr>;

export const TypographyTh: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <th className="border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right">
    {children}
  </th>
);

export const TypographyTd: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <td className="border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right">
    {children}
  </td>
);
