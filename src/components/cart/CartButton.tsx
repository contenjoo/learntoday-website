'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { getCartCount } from '@/utils/cart';

export default function CartButton({ onClick }: { onClick: () => void }) {
  const { cart } = useCart();
  const count = getCartCount(cart.items);
  return (
    <button
      className="fixed top-6 right-8 z-50 flex items-center gap-2 bg-white border border-blue-100 shadow-xl rounded-full px-6 py-3 hover:bg-blue-50 hover:shadow-2xl transition duration-200 ring-1 ring-blue-100"
      onClick={onClick}
      aria-label="장바구니 열기"
      style={{ boxShadow: 'rgba(60,64,67,0.3) 0px 1.5px 8px 0px' }}
    >
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M6 6h15l-1.68 8.39A2 2 0 0 1 17.36 16H8.64a2 2 0 0 1-1.96-1.61L4 4H2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1" fill="#2563eb"/><circle cx="19" cy="21" r="1" fill="#2563eb"/></svg>
      <span className="font-bold text-blue-700">{count}</span>
    </button>
  );
}
