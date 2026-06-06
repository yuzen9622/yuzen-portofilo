export interface BlogAPIResponse<T> {
  data: T;
}
export interface Article {
  documentId: string;
  slug: string;
  title: string;
  cover?: Cover;
  author?: Author;
  description: string;
  categories: Category[];
  publishedAt: string;
  isPublished: boolean;
  content: string;
}
export interface ArticleContent {
  content: string;
  title: string;
  slug: string;
}
export interface Cover {
  formats: ImgResponse;
}

export interface ImgResponse {
  thumbnail: { url: string } | null;
  small: { url: string } | null;
  medium: { url: string } | null;
  large: { url: string } | null;
}

export interface Author {
  name: string;
}

export interface Category {
  name: string;
}

export type BlogMetadata = {
  posts: Article[];
};

export type BlogFilter = {
  tag?: string;
  search?: string;
  year?: string;
};
export type TocItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};
