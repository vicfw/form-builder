import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import LeftNav from "@/components/left-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Form Builder",
  description: "A form builder interface",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <LeftNav />
            <main className="flex-1 overflow-y-auto bg-[#f9fafb]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
