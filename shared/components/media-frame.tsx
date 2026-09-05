"use client";

import { cn } from "@/shared/lib/utils";

export default function MediaFrame({
  src,
  alt,
  className,
  imageClassName,
  sizes,
  unoptimized,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  unoptimized?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center overflow-hidden bg-muted/10 backdrop-blur-md p-8",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "block max-h-full max-w-full rounded-md",
          imageClassName,
        )}
      />
    </div>
  );
}