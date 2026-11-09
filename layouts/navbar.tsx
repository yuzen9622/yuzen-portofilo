"use client";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import Tool from "@/layouts/tool";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

import { NAVIGATION_LINKS, ProfileBase, SocialBase } from "@/shared/content/base";
import { useIntro } from "@/shared/components/intro-provider";
import { EASE_EXPO, EASE_FLUID } from "@/shared/lib/motion";

const linkHref = (href: string) => (href === "/" ? "/" : `/${href}`);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  // 開場動畫播放期間讓 navbar 收在畫面上方，結束後與遮罩淡出同步滑入
  const { isPlaying } = useIntro();

  // Framer's scroll value instead of a raw scroll listener; hide on the way
  // down, reveal on the way up
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setIsTop(y < 50);
    setIsHidden(y > 240 && y > prev + 2 ? true : y < prev - 2 ? false : isHidden);
  });

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const shellState =
    isPlaying
      ? "opacity-0 -translate-y-6 pointer-events-none"
      : isHidden && !isOpen
        ? "-translate-y-[140%]"
        : "opacity-100 translate-y-0";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(`/${href}`);

  return (
    <>
      <div
        className={cn(
          "sticky top-4 z-20 hidden justify-center transition-[transform,opacity] duration-700 ease-fluid sm:flex",
          shellState,
        )}
      >
        <NavigationMenu
          className={cn(
            "h-fit flex-none rounded-full p-1.5 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-fluid",
            isTop
              ? "bg-transparent shadow-none"
              : "bg-background/70 shadow-[0_20px_50px_-24px_oklch(0.2_0_0/0.35),inset_0_1px_0_oklch(1_0_0/0.25)] ring-1 ring-foreground/[0.08] backdrop-blur-xl dark:ring-white/10",
          )}
        >
          <NavigationMenuList
            className="gap-0.5"
            onMouseLeave={() => setHovered(null)}
          >
            {NAVIGATION_LINKS.map((item) => (
              <li key={item.name}>
                <NavigationMenuItem asChild>
                  <Link
                    href={linkHref(item.href)}
                    onMouseEnter={() => setHovered(item.name)}
                    onFocus={() => setHovered(item.name)}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-500 ease-fluid",
                      hovered === item.name
                        ? "text-background"
                        : isActive(item.href)
                          ? "text-foreground"
                          : "text-muted-foreground",
                    )}
                  >
                    {hovered === item.name && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-foreground"
                        transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
                      />
                    )}
                    {isActive(item.href) && (
                      <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" />
                    )}
                    <span>{item.name}</span>
                  </Link>
                </NavigationMenuItem>
              </li>
            ))}
            <span className="mx-1.5 h-5 w-px bg-foreground/10" aria-hidden />
            <Tool />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile island */}
      <NavigationMenu
        className={cn(
          "sticky top-3 z-30 mx-auto hidden h-fit w-[calc(100%-2rem)] max-w-none flex-none justify-between rounded-full p-1.5 pr-2 transition-[transform,opacity,background-color] duration-700 ease-fluid max-sm:flex",
          shellState,
          isOpen || isTop
            ? "bg-transparent"
            : "bg-background/80 shadow-[0_20px_50px_-24px_oklch(0.2_0_0/0.35)] ring-1 ring-foreground/[0.08] backdrop-blur-md",
        )}
      >
        <Link href="/" aria-label="Home" className="relative">
          <Avatar className="pointer-events-none aspect-square h-10 w-10">
            <AvatarImage
              className="rounded-full"
              alt={ProfileBase.name}
              width={48}
              height={48}
              src={ProfileBase.avatar}
            />
            <AvatarFallback>{ProfileBase.name}</AvatarFallback>
          </Avatar>
        </Link>
        <NavigationMenuList>
          <div className="flex items-center gap-2">
            <Tool />
            <NavigationMenuItem>
              <button
                type="button"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative flex size-10 items-center justify-center rounded-full bg-foreground/[0.05] ring-1 ring-foreground/10 transition-transform duration-500 ease-fluid active:scale-95"
              >
                {/* Two lines morph into an X */}
                <span
                  className={cn(
                    "absolute h-px w-4 bg-foreground transition-transform duration-500 ease-fluid",
                    isOpen ? "rotate-45" : "-translate-y-[3px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-4 bg-foreground transition-transform duration-500 ease-fluid",
                    isOpen ? "-rotate-45" : "translate-y-[3px]",
                  )}
                />
              </button>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: EASE_FLUID, delay: 0.15 } }}
            transition={{ duration: 0.5, ease: EASE_FLUID }}
            // A full-viewport backdrop-filter allocates an off-screen buffer the size of
            // the whole screen; keep the background near-opaque and the blur small so
            // mobile WebKit doesn't run out of GPU memory.
            className="fixed inset-0 z-20 flex h-dvh w-dvw flex-col justify-between bg-background/95 px-6 pb-10 pt-28 backdrop-blur-sm sm:hidden"
          >
            <nav>
              <ul className="space-y-1">
                {NAVIGATION_LINKS.map((item, index) => (
                  <li key={item.name} className="overflow-hidden">
                    <motion.div
                      initial={reduceMotion ? false : { y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%", transition: { duration: 0.35, ease: EASE_FLUID, delay: (NAVIGATION_LINKS.length - index) * 0.03 } }}
                      transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.1 + index * 0.06 }}
                    >
                      <Link
                        href={linkHref(item.href)}
                        onClick={() => setIsOpen(false)}
                        className="block py-1 font-sans text-5xl font-semibold uppercase tracking-[-0.05em]"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.45 }}
              className="flex items-end justify-between border-t border-foreground/10 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              <a href={`mailto:${ProfileBase.email}`} className="text-foreground">
                {ProfileBase.email}
              </a>
              <div className="flex gap-4">
                {Object.entries(SocialBase).map(([key, value]) => (
                  <a key={key} href={value.url} target="_blank" rel="noopener noreferrer">
                    {key.slice(0, 2)}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
