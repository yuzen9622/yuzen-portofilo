import { Button } from "@/components/ui/button";
import { FolderSearch, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

type BlogEmptyProps = {
  onReset?: () => void;
};

export default function BlogEmpty({ onReset }: BlogEmptyProps) {
  const t = useTranslations("BlogPage");

  return (
    <div className="w-11/12 max-w-6xl mx-auto border-x border-b py-24 flex flex-col items-center justify-center text-center px-4">
      <div className="size-16 rounded-full bg-muted/60 flex items-center justify-center mb-5 text-muted-foreground">
        <FolderSearch className="size-8" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight">{t("noPosts")}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        請嘗試更換搜尋關鍵字、切換其他分類標籤，或重設篩選條件以檢視更多文章。
      </p>
      {onReset && (
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="mt-6 rounded-full gap-2 text-xs"
        >
          <RotateCcw className="size-3.5" />
          {t("search.clear")}
        </Button>
      )}
    </div>
  );
}
