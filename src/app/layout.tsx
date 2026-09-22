import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "pproject-front",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="mx-auto flex min-h-svh max-w-full flex-col border-x border-border text-center">
        <Header />
        {children}
      </body>
    </html>
  );
}
