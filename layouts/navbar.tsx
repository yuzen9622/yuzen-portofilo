"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import Tool from "@/layouts/tool";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

import { NAVIGATION_LINKS, ProfileBase } from "@/shared/content/base";
import { useIntro } from "@/shared/components/intro-provider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const MotionLink = motion.create(Link);
  const [isTop, setIsTop] = useState(true);
  // 開場動畫播放期間讓 navbar 收在畫面上方，結束後與遮罩淡出同步滑入
  const { isPlaying } = useIntro();
  const introHidden = isPlaying
    ? "opacity-0 -translate-y-4 pointer-events-none"
    : "opacity-100 translate-y-0";

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={cn(
          "top-2 sticky z-20 flex items-center transition-all duration-500 justify-center",
          isTop && "top-0 w-full",
          introHidden,
        )}
      >
        <NavigationMenu
          className={cn(
            "p-3 transition-all rounded-full duration-300 h-fit hidden sm:block flex-none",
            isTop
              ? "bg-transparent backdrop-blur-none outline-none shadow-none"
              : "bg-background/80 backdrop-blur-md border border-border/40 shadow-xs",
          )}
        >
          <NavigationMenuList className="transition-all">
            {NAVIGATION_LINKS.map((item, index) => (
              <li key={item.name}>
                <NavigationMenuItem
                  asChild
                  key={index}
                  className="overflow-hidden  "
                >
                  <Link
                    className={cn(
                      "rounded-3xl  px-4  py-2 z-0 transition  hover:text-background relative hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary ",
                    )}
                    href={`/${item.href}`}
                  >
                    <span>{item.name}</span>
                  </Link>
                </NavigationMenuItem>
              </li>
            ))}
            <Tool />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/** RWD navbar */}
      <NavigationMenu
        className={cn(
          "p-3 w-11/12 max-w-none mx-auto h-fit hidden max-sm:flex rounded-2xl transition-all duration-500 justify-between flex-none top-2 sticky z-30",
          introHidden,
          isOpen
            ? "backdrop-blur-none bg-transparent"
            : isTop
              ? "bg-transparent backdrop-blur-none"
              : "backdrop-blur-md bg-background/80 border border-border/40 shadow-xs",
        )}
      >
        <Link href={`/`} className="relative font-bold text-xl  text-primary">
          <Avatar className="  pointer-events-none  w-10 h-10     aspect-square">
            <AvatarImage
              className=" rounded-full"
              alt={ProfileBase.name}
              width={48}
              height={48}
              src={ProfileBase.avatar}
            />
            <AvatarFallback>{ProfileBase.name}</AvatarFallback>
          </Avatar>
        </Link>
        <NavigationMenuList>
          <div className="flex gap-2 items-center ">
            <NavigationMenuItem
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              {isOpen ? <X /> : <Menu />}
            </NavigationMenuItem>
            <Tool />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            // A full-viewport backdrop-filter allocates an off-screen buffer the size of
            // the whole screen, and the opacity fade re-composites it every frame.
            // Mobile WebKit can run out of GPU memory doing that, so lean on a more
            // opaque background and a small blur radius instead.
            className=" fixed z-20  inset-0 bg-background/95  sm:hidden w-dvw h-dvh backdrop-blur-sm flex justify-center flex-col items-center gap-10 "
          >
            <AnimatePresence>
              {isOpen &&
                NAVIGATION_LINKS.map((item, index) => (
                  <MotionLink
                    key={item.name}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    exit={{ y: 40, opacity: 0 }}
                    href={`/${item.href}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(" px-4 py-2 text-4xl inter ")}
                  >
                    {item.name}
                  </MotionLink>
                ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
