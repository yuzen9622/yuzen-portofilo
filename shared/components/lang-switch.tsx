"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeIcon } from "lucide-react";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useCallback } from "react";
export default function LangSwitch() {
  const { locale } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const switchLocale = useCallback(
    (newLocale: string) => {
      console.log("Switching locale to:", newLocale);
      if (newLocale === locale) return;

      router.replace(pathname, { locale: newLocale });
    },
    [locale, pathname, router],
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Change Language"
          className="p-2 relative  cursor-pointer hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary"
        >
          <GlobeIcon size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={24}>
        {routing.locales.map((loc) => (
          <DropdownMenuCheckboxItem
            key={loc}
            checked={loc === locale}
            onCheckedChange={() => switchLocale(loc)}
          >
            {loc.toUpperCase()}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
