import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/dashboard/Navbar";
import TanstackQueryProvider from "@/components/providers/TanstackQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Universe&You App Dashboard",
  description: "Keep track with the world around you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanstackQueryProvider>

      
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-clip`}>
          <Navbar/>
          {children}
        </body>
      </TanstackQueryProvider>
    </html>
  );
}
