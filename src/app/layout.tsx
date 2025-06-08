import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { DemoProvider } from "@/context/DemoContext";
import ConditionalInfoWidget from "@/components/ConditionalInfoWidget";
import PinchatScript from "@/components/PinchatScript";
import ClientLayout from "./ClientLayout";
import ClientOnlyCleanup from "@/components/ClientOnlyCleanup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "주식회사 오늘배움 - 국내 최고 에듀테크 AI 기반 교육 솔루션",
  description: "주식회사 오늘배움은 교육 기관을 위한 다양한 에듀테크 및 AI 기반 교육 솔루션을 제공합니다. 교사와 교육자가 혁신적인 에듀테크 기술을 활용하여 교육 효과를 극대화할 수 있도록 지원합니다.",
  keywords: "오늘배움, 에듀테크, AI 교육, 교육 솔루션, 교사 지원, 학습 관리, 인공지능 교육, 에듀테크 솔루션, 교육 혁신, 디지털 교육",
  authors: [{ name: "주식회사 오늘배움" }],
  creator: "주식회사 오늘배움",
  publisher: "주식회사 오늘배움",
  metadataBase: new URL("https://learntoday.co.kr"),
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  openGraph: {
    title: "오늘배움 | 최신 에듀테크와 AI 기반 교육 솔루션",
    description: "오늘배움은 교사와 교육자가 혁신적인 에듀테크 기술을 활용하여 교육 효과를 극대화할 수 있도록 지원합니다. 최신 AI 기술로 교육 현장의 혁신을 이끌어갑니다.",
    url: "https://learntoday.co.kr",
    siteName: "주식회사 오늘배움 - 에듀테크 전문기업",
    images: [
      {
        url: "/images/ww.jpg",
        width: 800,
        height: 600,
        alt: "오늘배움 에듀테크 솔루션 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/images/ww.jpg",
    shortcut: "/images/ww.jpg",
    apple: "/images/ww.jpg",
  },
  verification: {
    google: "46NWowo4i8zMiRrpH_wco2RKWoZADIaYQ97uXLiajh8",
    other: {
      "naver-site-verification": "2af4b7b029bdf75f1d2b2c2b4fba52483645ad61",
    },
  },
  alternates: {
    canonical: "https://learntoday.co.kr",
  },
  twitter: {
    card: 'summary_large_image',
    title: '오늘배움 - 에듀테크 및 AI 교육 솔루션',
    description: '혁신적인 에듀테크 기술로 교육의 미래를 선도합니다',
    images: ['/images/ww.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="naver-site-verification" content="2af4b7b029bdf75f1d2b2c2b4fba52483645ad61" />
        <meta name="google-site-verification" content="46NWowo4i8zMiRrpH_wco2RKWoZADIaYQ97uXLiajh8" />
        <meta name="NaverBot" content="All" />
        <meta name="NaverBot" content="index,follow" />
        <meta name="Yeti" content="All" />
        <meta name="Yeti" content="index,follow" />
        <meta property="og:image" content="/images/ww.jpg" />
        <meta property="og:title" content="오늘배움 | 최신 에듀테크와 AI 기반 교육 솔루션" />
        <meta property="og:description" content="오늘배움은 교사와 교육자가 혁신적인 에듀테크 기술을 활용하여 교육 효과를 극대화할 수 있도록 지원합니다. 최신 AI 기술로 교육 현장의 혁신을 이끌어갑니다." />
        <meta property="og:url" content="https://learntoday.co.kr" />
        <meta name="keywords" content="오늘배움, 에듀테크, AI 교육, 교육 솔루션, 교사 지원, 학습 관리, 인공지능 교육, 에듀테크 솔루션, 교육 혁신, 디지털 교육" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="오늘배움 - 에듀테크 및 AI 교육 솔루션" />
        <meta name="twitter:description" content="혁신적인 에듀테크 기술로 교육의 미래를 선도합니다" />
        <meta name="twitter:image" content="/images/ww.jpg" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://learntoday.co.kr" />
        <link rel="icon" href="/images/ww.jpg" />
        <link rel="apple-touch-icon" href="/images/ww.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="/no-nextjs-icon.css" />

      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <DemoProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
            <ConditionalInfoWidget />
            <PinchatScript />
            <ClientOnlyCleanup />
          </DemoProvider>
        </CartProvider>
      </body>
    </html>
  );
}
