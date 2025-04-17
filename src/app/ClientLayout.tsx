"use client";
import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6">{children}</main>
      <Footer />
    </CartProvider>
  );
}
