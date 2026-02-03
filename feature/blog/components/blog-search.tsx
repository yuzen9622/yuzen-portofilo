"use client";
import { ArrowDownWideNarrow, Search, SlidersHorizontal } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
type BlogSearchProps = {
  search: string;
  setSearch: (value: string) => void;
  publishedOnly: boolean;
  setPublishedOnly: (value: boolean) => void;
  sortOrder: "newest" | "oldest";
  setSortOrder: (value: "newest" | "oldest") => void;
  selectedTag: string | null;
  setSelectedTag: (value: string | null) => void;
  allTags: string[];
};
export default function BlogSearch({
  search,
  setSearch,
  publishedOnly,
  setPublishedOnly,
  sortOrder,
  setSortOrder,
  selectedTag,
  setSelectedTag,
  allTags,
}: BlogSearchProps) {
  const t = useTranslations("BlogPage");

  return (
    <>
      <div className="flex items-center gap-2 w-11/12 max-w-7xl mx-auto border-x-2 border-b-2 py-4  px-2">
        <div className="relative flex-1 backdrop-blur-3xl rounded-3xl">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            type="text"
            placeholder={t("search.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 pl-10 rounded-3xl"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-3xl backdrop-blur-3xl"
              aria-label={t("search.filters")}
            >
              <SlidersHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="backdrop-blur-md bg-background/50"
          >
            <DropdownMenuLabel className="flex items-center gap-2">
              <SlidersHorizontal size={16} />
              {t("search.filters")}
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={publishedOnly}
              onCheckedChange={(checked) => setPublishedOnly(Boolean(checked))}
            >
              {t("search.publishedOnly")}
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="flex items-center gap-2">
              <ArrowDownWideNarrow size={16} />
              {t("search.sortBy")}
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={sortOrder}
              onValueChange={(value) =>
                setSortOrder(value === "oldest" ? "oldest" : "newest")
              }
            >
              <DropdownMenuRadioItem value="newest">
                {t("search.newest")}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">
                {t("search.oldest")}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" w-11/12 max-w-7xl mx-auto py-3 px-2 border-x-2 border-b-2 flex gap-2 overflow-x-auto">
        {allTags.length > 0 &&
          allTags.map((tag) => (
            <Badge
              className="text-sm px-3 py-2"
              variant={selectedTag === tag ? "default" : "outline"}
              key={tag}
              asChild
            >
              <button
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </button>
            </Badge>
          ))}
      </div>
    </>
  );
}
