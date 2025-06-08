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
    schoolType?: string;
    studentCount?: number;
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
      className={`fixed right-4 bottom-28 md:right-8 md:top-24 z-50 w-80 bg-white rounded-lg shadow-xl border border-blue-100 transform transition-all duration-300 ${animation}`}
      style={{ boxShadow: 'rgba(60,64,67,0.3) 0px 4px 16px 0px' }}
    >
      <div className="p-3 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="cart-icon flex items-center justify-center">
            <i className="inline-block w-5 h-5 relative">
              <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                🛒
              </span>
            </i>
          </span>
          <h3 className="font-semibold text-white">상품이 추가되었습니다</h3>
        </div>
        <button 
          onClick={() => {
            setAnimation('translate-y-full opacity-0');
            setTimeout(onClose, 300);
          }}
          className="text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      
      {newItemAdded && (
        <div className="p-3 flex gap-3 items-center border-b">
          <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
            <Image 
              src={newItemAdded.image_url.startsWith('/') ? newItemAdded.image_url : `/${newItemAdded.image_url}`} 
              alt={newItemAdded.name} 
              fill
              style={{ objectFit: 'contain' }}
              className="rounded p-1"
            />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-800">{newItemAdded.name}</div>
            {/* Mizou 제품이고 schoolType과 studentCount가 있으면 학교 유형과 학생 수 표시 */}
            {newItemAdded.name === 'Mizou' && newItemAdded.schoolType && newItemAdded.studentCount ? (
              <>
                <div className="text-xs text-gray-500">
                  학교 플랜
                </div>
                <p className="text-sm text-gray-600 mt-1" data-component-name="ProductsPage">
                  {newItemAdded.schoolType} ({newItemAdded.studentCount.toLocaleString()}명)
                </p>
              </>
            ) : (
              <div className="text-xs text-gray-500">{newItemAdded.plan}</div>
            )}
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
          className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
        >
          장바구니 보기
        </button>
      </div>
    </div>
  );
}
