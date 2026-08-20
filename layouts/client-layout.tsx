"use client";
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import IntroProvider from "@/shared/components/intro-provider";
import IntroOverlay from "@/shared/components/intro-overlay";

type Props = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: Props) {
  return (
    <IntroProvider>
      <IntroOverlay />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </IntroProvider>
  );
}
