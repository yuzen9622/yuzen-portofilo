import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost";

const base =
  "group relative inline-flex min-h-11 items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 font-sans text-sm font-medium tracking-tight transition-[transform,background-color,color,box-shadow] duration-700 ease-fluid active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, { shell: string; icon: string }> = {
  solid: {
    shell:
      "bg-foreground text-background shadow-[0_18px_40px_-18px_oklch(0.2_0_0/0.55)] hover:shadow-[0_24px_50px_-18px_oklch(0.2_0_0/0.6)]",
    icon: "bg-background/15",
  },
  ghost: {
    shell:
      "bg-foreground/[0.04] text-foreground ring-1 ring-foreground/10 hover:bg-foreground/[0.07] dark:bg-white/[0.04] dark:ring-white/10",
    icon: "bg-foreground/[0.06] dark:bg-white/10",
  },
};

/** Button-in-button CTA: label plus a nested circular icon island. */
export default function PillLink({
  href,
  children,
  variant = "solid",
  className,
  external = false,
  icon,
  cursorText,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  icon?: ReactNode;
  cursorText?: string;
}) {
  const v = variants[variant];
  const inner = (
    <>
      <span>{children}</span>
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-transform duration-700 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
          v.icon,
        )}
      >
        {icon ?? (
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.25}
            className="size-4 transition-transform duration-700 ease-fluid group-hover:rotate-45"
          />
        )}
      </span>
    </>
  );

  const cls = cn(base, v.shell, className);

  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={cls}
        data-cursor-text={cursorText}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} data-cursor-text={cursorText}>
      {inner}
    </Link>
  );
}
