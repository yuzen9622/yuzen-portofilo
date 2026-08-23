"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type ArticleNavigationContextValue = {
  mobileTocOpen: boolean;
  setMobileTocOpen: Dispatch<SetStateAction<boolean>>;
  openMobileToc: () => void;
};

const ArticleNavigationContext =
  createContext<ArticleNavigationContextValue | null>(null);

export function ArticleNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const openMobileToc = useCallback(() => {
    setMobileTocOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      mobileTocOpen,
      setMobileTocOpen,
      openMobileToc,
    }),
    [mobileTocOpen, openMobileToc],
  );

  return (
    <ArticleNavigationContext.Provider value={value}>
      {children}
    </ArticleNavigationContext.Provider>
  );
}

export function useArticleNavigation() {
  const context = useContext(ArticleNavigationContext);

  if (!context) {
    throw new Error(
      "useArticleNavigation must be used within an ArticleNavigationProvider",
    );
  }

  return context;
}
