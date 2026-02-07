"use client";
import { Button } from "@/components/ui/button";
import LangSwitch from "@/shared/components/lang-switch";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import useTheme from "@/shared/hooks/use-theme";
import { ChevronLeftIcon, MoonIcon, SunIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
export default function ArticleNavbar() {
  const { isDark, setTheme } = useTheme();
  const t = useTranslations("BlogPage");

  return (
    <div className=" fixed  top-0 z-20  w-full backdrop-blur-md bg-background/50 mx-auto ">
      <div className="w-11/12 max-w-6xl justify-between mx-auto flex items-center ">
        <Link href="/blog">
          <Button
            variant={"link"}
            size="sm"
            className="  text-primary  py-2 rounded-3xl "
          >
            <ChevronLeftIcon size={16} />
            {t("backToBlog")}
          </Button>
        </Link>
        <div className="space-x-2 0 p-1 rounded-3xl  ">
          <button
            type="button"
            onClick={() => {
              setTheme(isDark ? "light" : "dark");
            }}
            className=" relative p-2   rounded-3xl  cursor-pointer hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary"
          >
            {isDark ? (
              <SunIcon suppressHydrationWarning size={18} />
            ) : (
              <MoonIcon suppressHydrationWarning size={18} />
            )}
          </button>
          {/* 
          <DropdownMenu>
            <DropdownMenuTrigger
              className="md:hidden relative p-2  rounded-3xl cursor-pointer hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0 hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full before:-z-20 before:bg-primary"
              aria-label="Table of contents"
            >
              <List size={18} className=" z-10 " />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>目錄</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {toc.length > 0 ? (
                toc.map((item) => {
                  const isActive = item.id === activeHeadingId;
                  const indent =
                    item.level === 1
                      ? "pl-2"
                      : item.level === 2
                        ? "pl-4"
                        : item.level === 3
                          ? "pl-6"
                          : "pl-8";
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      className={indent}
                      onSelect={() =>
                        handleNavigateToHeading(
                          item.id,
                          markdownRootRef.current,
                        )
                      }
                    >
                      <span
                        className={
                          isActive
                            ? "font-medium text-primary"
                            : "text-muted-foreground"
                        }
                      >
                        {item.text}
                      </span>
                    </DropdownMenuItem>
                  );
                })
              ) : (
                <DropdownMenuItem disabled>
                  <span className="text-muted-foreground">無可用標題</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu> */}

          <LangSwitch />
        </div>
      </div>
    </div>
  );
}
