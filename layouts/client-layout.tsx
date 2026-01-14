import React from "react";
import Navbar from "./navbar";

type Props = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: Props) {
  return (
    <div className="">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
