'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { getCartCount } from '@/utils/cart';

export default function CartButton({ onClick }: { onClick: () => void }) {
  const { cart } = useCart();
  const count = getCartCount(cart.items);
  return (
    <button
      className="md:hidden fixed bottom-8 right-8 z-50 flex items-center justify-center gap-2 bg-blue-600 text-white shadow-xl rounded-full p-4 hover:bg-blue-700 hover:shadow-2xl transition duration-200"
      onClick={onClick}
      aria-label="장바구니 열기"
      style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 4px 12px' }}
    >
      <div className="relative">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M6 6h15l-1.68 8.39A2 2 0 0 1 17.36 16H8.64a2 2 0 0 1-1.96-1.61L4 4H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1" fill="white"/><circle cx="19" cy="21" r="1" fill="white"/></svg>
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
    </button>
  );
}
