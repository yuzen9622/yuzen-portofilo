"use client";
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
