"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
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
import { useParams } from "next/navigation";
import { Locale } from "next-intl";

export default function Navbar() {
  const { locale }: { locale: Locale } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const MotionLink = motion.create(Link);
  const [isTop, setIsTop] = useState(true);

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
          "top-2 sticky z-20 flex items-center transition-all duration-300 justify-center",
          isTop && "top-0 w-full "
        )}
      >
        <NavigationMenu
          className={cn(
            "outline p-3 hover:shadow-xs transition-all rounded-full duration-300  h-fit hidden sm:block flex-none  bg-background/80  backdrop-blur-xs",
            isTop && " rounded-none outline-none"
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
                    locale={locale}
                    className={cn(
                      "rounded-3xl  px-4  py-2 z-0 transition  hover:text-background relative hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary "
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
          "p-3  w-11/12 max-w-none  h-fit  hidden max-sm:flex rounded-2xl transition-all justify-between flex-none top-2 sticky  z-30  backdrop-blur-xs bg-background/80",
          isOpen && "max-sm:backdrop-blur-none bg-transparent",
          isTop && "w-full top-0 rounded-none"
        )}
      >
        <Link
          locale={locale}
          href={`/`}
          className="relative font-bold text-xl  text-primary"
        >
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
            className=" fixed z-20  bg-background/80  sm:hidden w-dvw h-dvh backdrop-blur-3xl flex justify-center flex-col items-center gap-10 "
          >
            <AnimatePresence mode="wait">
              {isOpen &&
                NAVIGATION_LINKS.map((item, index) => (
                  <MotionLink
                    key={item.name}
                    layout
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    exit={{ y: 40, opacity: 0 }}
                    href={`/${locale}/${item.href}`}
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
