import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { DemoProvider } from "@/context/DemoContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InfoSupportWidget from "@/components/InfoSupportWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "주식회사 오늘배움 - AI 기반 교육 솔루션",
  description: "주식회사 오늘배움은 교육 기관을 위한 다양한 AI 및 디지털 기술 기반 솔루션을 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script defer src="https://pinchat.app/pinchat.js?token=today"></script>
      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-neutral-50`}>
        <CartProvider>
          <DemoProvider>
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6">{children}</main>
            <Footer />
            <InfoSupportWidget />
          </DemoProvider>
        </CartProvider>
      </body>
    </html>
  );
}
