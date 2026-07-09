import { ReactNode } from "react";

export interface Profile {
  name: string;
  email: string;
  avatar: string;
  phone: string;
}
export interface SocialLink {
  url: string;
  icon: ReactNode;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  picture: string;
  datetime: string;
  tech?: string[];
  github?: string;
  demo?: string;
  intro?: string;
  highlights?: { title: string; description: string }[];
}

export interface ArchiveItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
  link?: string;
  highlight?: boolean;
}

export interface ArchiveCategory {
  id: string;
  name: string;
  items: ArchiveItem[];
}

export interface ArchiveGroup {
  id: string;
  name: string;
  categories: ArchiveCategory[];
}

export interface ArchiveContent {
  groups: ArchiveGroup[];
}

export interface Award {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export type CardConfig = {
  nickname: string;
  label: string;
  description: string;
  image: string;
  website?: string;
  github?: string;
  className: string;
  enterFromX: number;
  enterFromY: number;
  rotate: number;
  start: number;
  end: number;
};
