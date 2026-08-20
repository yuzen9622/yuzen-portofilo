"use client";
import {
  ArrowDownWideNarrow,
  Check,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
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
import { cn } from "@/shared/lib/utils";

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
  totalResults?: number;
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
  totalResults,
}: BlogSearchProps) {
  const t = useTranslations("BlogPage");

  const hasActiveFilters = !publishedOnly || sortOrder !== "newest" || !!selectedTag || !!search;

  return (
    <div className="w-11/12 max-w-7xl mx-auto border-x border-b font-inter">
      {/* Search Input & Action Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 md:px-6">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground"
            size={18}
          />
          <Input
            type="text"
            placeholder={t("search.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 pl-10 pr-10 rounded-full bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary text-sm transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {typeof totalResults === "number" && (
            <span className="text-xs font-mono text-muted-foreground px-2 tabular-nums hidden sm:inline-block">
              {totalResults} {totalResults === 1 ? "post" : "posts"}
            </span>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-11 px-4 rounded-full gap-2 text-xs font-medium backdrop-blur-sm transition-all",
                  hasActiveFilters && "border-primary/50 text-primary",
                )}
                aria-label={t("search.filters")}
              >
                <SlidersHorizontal size={14} />
                <span>{t("search.filters")}</span>
                {(!publishedOnly || sortOrder !== "newest") && (
                  <span className="size-1.5 rounded-full bg-primary" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-56 backdrop-blur-xl bg-background/90 border border-border"
            >
              <DropdownMenuLabel className="flex items-center gap-2 text-xs text-muted-foreground">
                <SlidersHorizontal size={13} />
                {t("search.filters")}
              </DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={publishedOnly}
                onCheckedChange={(checked) => setPublishedOnly(Boolean(checked))}
                className="text-xs cursor-pointer"
              >
                {t("search.publishedOnly")}
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel className="flex items-center gap-2 text-xs text-muted-foreground">
                <ArrowDownWideNarrow size={13} />
                {t("search.sortBy")}
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={sortOrder}
                onValueChange={(value) =>
                  setSortOrder(value === "oldest" ? "oldest" : "newest")
                }
              >
                <DropdownMenuRadioItem value="newest" className="text-xs cursor-pointer">
                  {t("search.newest")}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest" className="text-xs cursor-pointer">
                  {t("search.oldest")}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Category Pills Bar */}
      {allTags.length > 0 && (
        <div className="border-t border-border/60 px-4 md:px-6 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={cn(
              "shrink-0 text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer select-none",
              selectedTag === null
                ? "bg-primary text-primary-foreground border-primary font-medium shadow-xs"
                : "bg-transparent text-muted-foreground hover:text-foreground border-border hover:border-border/80",
            )}
          >
            {t("allCategories")}
          </button>
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                type="button"
                key={tag}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={cn(
                  "shrink-0 text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer select-none flex items-center gap-1.5",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary font-medium shadow-xs"
                    : "bg-transparent text-muted-foreground hover:text-foreground border-border hover:border-border/80",
                )}
              >
                {isSelected && <Check size={11} className="stroke-[2.5]" />}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

