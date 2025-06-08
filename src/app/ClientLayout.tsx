"use client";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TimePopup from "@/components/TimePopup";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 듀얼 포털 페이지에서는 기본 헤더/푸터를 숨김
  const isLandingPage = pathname === '/';
  
  if (!mounted) {
    return (
      <div className="min-h-screen">
        {isLandingPage ? children : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    );
  }
  
  if (isLandingPage) {
    return (
      <div className="min-h-screen" suppressHydrationWarning>
        {children}
        <ScrollToTop />
      </div>
    );
  }
  
  return (
    <div suppressHydrationWarning>
      <Header />
      <TimePopup />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6">{children}</main>
      <Footer />
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            padding: '12px 16px',
          },
          success: {
            style: {
              borderLeft: '4px solid #10B981',
            },
          },
          error: {
            style: {
              borderLeft: '4px solid #EF4444',
            },
          },
        }}
      />
    </div>
  );
}
