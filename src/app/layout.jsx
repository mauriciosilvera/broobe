import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import SessionAuthProvider from "@/context/SessionAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Broobe challenge",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionAuthProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </SessionAuthProvider>
    </html>
  );
}
