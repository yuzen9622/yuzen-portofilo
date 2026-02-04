import type { ReactNode } from "react";
import ClientLayout from "@/layouts/client-layout";

type Props = {
  children: ReactNode;
};

export default function SiteLayout({ children }: Props) {
  return <ClientLayout>{children}</ClientLayout>;
}
