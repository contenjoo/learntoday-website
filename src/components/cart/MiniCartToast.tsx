'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { getCartTotal } from '@/utils/cart';

interface MiniCartToastProps {
  isVisible: boolean;
  onClose: () => void;
  onViewCart: () => void;
  newItemAdded?: {
    id: string;
    name: string;
    plan: string;
    price: number;
    image_url: string;
  };
}

export default function MiniCartToast({ 
  isVisible, 
  onClose, 
  onViewCart,
  newItemAdded 
}: MiniCartToastProps) {
  const { cart } = useCart();
  const total = getCartTotal(cart.items);
  const [animation, setAnimation] = useState('translate-y-full opacity-0');
  
  // 자동 닫힘 타이머
  useEffect(() => {
    if (isVisible) {
      setAnimation('translate-y-0 opacity-100');
      const timer = setTimeout(() => {
        setAnimation('translate-y-full opacity-0');
        setTimeout(onClose, 300); // 애니메이션 완료 후 닫기
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed bottom-20 right-4 z-50 w-80 bg-white rounded-lg shadow-xl border border-blue-100 transform transition-all duration-300 ${animation}`}
      style={{ boxShadow: 'rgba(60,64,67,0.3) 0px 4px 16px 0px' }}
    >
      <div className="p-3 border-b flex justify-between items-center bg-blue-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M6 6h15l-1.68 8.39A2 2 0 0 1 17.36 16H8.64a2 2 0 0 1-1.96-1.61L4 4H2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="21" r="1" fill="#2563eb"/>
            <circle cx="19" cy="21" r="1" fill="#2563eb"/>
          </svg>
          <h3 className="font-semibold text-blue-700">장바구니에 추가됨</h3>
        </div>
        <button 
          onClick={() => {
            setAnimation('translate-y-full opacity-0');
            setTimeout(onClose, 300);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      {newItemAdded && (
        <div className="p-3 flex gap-3 items-center border-b">
          <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
            <Image 
              src={newItemAdded.image_url.startsWith('/') ? newItemAdded.image_url : `/${newItemAdded.image_url}`} 
              alt={newItemAdded.name} 
              fill
              style={{ objectFit: 'cover' }}
              className="rounded"
            />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-800">{newItemAdded.name}</div>
            <div className="text-xs text-gray-500">{newItemAdded.plan}</div>
          </div>
          <div className="text-blue-700 font-bold">{newItemAdded.price.toLocaleString()}원</div>
        </div>
      )}
      
      <div className="p-3 flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-500">총 {cart.items.length}개 상품</div>
          <div className="font-bold text-blue-700">{total.toLocaleString()}원</div>
        </div>
        <button
          onClick={() => {
            setAnimation('translate-y-full opacity-0');
            setTimeout(() => {
              onClose();
              onViewCart();
            }, 300);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          장바구니 보기
        </button>
      </div>
    </div>
  );
}
