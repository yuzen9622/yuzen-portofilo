"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeIcon } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

import { useParams } from "next/navigation";
import { LANGUAGE_OPTIONS } from "../content/base";
import { useCallback, useState } from "react";
import Magnetic from "@/shared/components/magnetic";
import { cn } from "@/shared/lib/utils";

type LangSwitchProps = {
    className?: string;
    triggerClassName?: string;
    sideOffset?: number;
    align?: "start" | "center" | "end";
    iconSize?: number;
};

export default function LangSwitch({
    className,
    triggerClassName,
    sideOffset = 24,
    align = "end",
    iconSize = 18,
}: LangSwitchProps = {}) {
    const [open, setOpen] = useState(false);
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
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <Magnetic
                disabled={open}
                strength={0.35}
                className={cn(
                    "flex items-center justify-center shrink-0",
                    className,
                )}
            >
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        aria-label="Change Language"
                        className={
                            triggerClassName ??
                            "flex items-center justify-center p-2 relative cursor-pointer hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0 hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full before:-z-20 before:bg-primary"
                        }
                    >
                        <GlobeIcon size={iconSize} />
                    </button>
                </DropdownMenuTrigger>
            </Magnetic>
            <DropdownMenuContent align={align} sideOffset={sideOffset}>
                {LANGUAGE_OPTIONS.map((loc) => (
                    <DropdownMenuCheckboxItem
                        key={loc.value}
                        checked={loc.value === locale}
                        onCheckedChange={() => switchLocale(loc.value)}
                    >
                        <div className="flex items-center justify-between w-full gap-2">
                            {loc.label}
                            <ReactCountryFlag
                                countryCode={loc.countryCode}
                                className="rounded-sm"
                                style={{
                                    fontSize: "1.5em",
                                    lineHeight: "1em",
                                }}
                                svg
                            />
                        </div>
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
