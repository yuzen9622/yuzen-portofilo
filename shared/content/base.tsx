import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";
import { LinkedinIcon } from "lucide-react";
import { NavLink, Profile, SocialLink } from "./types";

export const NAVIGATION_LINKS: NavLink[] = [
  { name: "Yuzen", href: "/" },
  { name: "About", href: "about" },
  { name: "Projects", href: "projects" },
  { name: "Blog", href: "blog" },
  { name: "Contact", href: "contact" },
];

export const ProfileBase: Profile = {
  name: "Yuzen",
  email: "oscar48079@gmail.com",
  avatar: "/avatar.webp",
  phone: "+886965303635",
};

export const SocialBase: Record<string, SocialLink> = {
  github: { url: "https://github.com/yuzen9622", icon: <SiGithub /> },
  linkedin: {
    url: "https://www.linkedin.com/in/yu-zen-tsao-52824233b/",
    icon: <LinkedinIcon />,
  },
  instagram: {
    url: "https://www.instagram.com/zn._.622/",
    icon: <SiInstagram />,
  },
};
