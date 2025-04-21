"use client";
import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TimePopup from "@/components/TimePopup";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <TimePopup />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6">{children}</main>
      <Footer />
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
    </CartProvider>
  );
}
