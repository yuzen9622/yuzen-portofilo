import { Button } from "@/components/ui/button";
import { ChevronLeft, FileQuestion } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React from "react";

export default function ArticleEmpty() {
  const t = useTranslations("BlogPage");

  return (
    <div className="w-11/12 max-w-7xl mx-auto border-x border-b min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-inter">
      <div className="size-16 rounded-full bg-muted/60 flex items-center justify-center mb-5 text-muted-foreground">
        <FileQuestion className="size-8" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">找不到文章</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        該文章可能已被移除、重新命名或暫時未發布。
      </p>
      <Link href="/blog" className="mt-6">
        <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs">
          <ChevronLeft className="size-4" />
          {t("backToBlog")}
        </Button>
      </Link>
    </div>
  );
}

