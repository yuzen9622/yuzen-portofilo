import { create } from "zustand";
import { Article } from "../types/blog";

type BlogState = {
  posts: Article[];
};
type BlogAction = {
  setPosts: (posts: Article[]) => void;
};
type BlogStore = BlogState & BlogAction;
export const useBlogStore = create<BlogStore>((set) => ({
  posts: [],
  setPosts: (posts: Article[]) => set(() => ({ posts })),
}));
