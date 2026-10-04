import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/dashboard/Navbar";
import TanstackQueryProvider from "@/components/providers/TanstackQueryProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";

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

export default async function DashboardLayout({children }: Readonly<{children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) redirect('/login?callbackUrl=/dashboard');

  const session = await verifySession(sessionCookie.value);
  if (!session?.id) redirect('/login?callbackUrl=/dashboard');

  if (session.role !== 'admin') { redirect('/') }

  return (
    <html lang="en">
      <TanstackQueryProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar/>
          {children}
        </body>
      </TanstackQueryProvider>
    </html>
  );
}