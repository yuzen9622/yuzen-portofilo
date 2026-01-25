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
}
