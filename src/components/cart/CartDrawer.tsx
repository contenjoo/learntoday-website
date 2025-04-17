'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { getCartTotal } from '@/utils/cart';
import Image from 'next/image';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, dispatch } = useCart();
  const total = getCartTotal(cart.items);

  // 바깥 영역 클릭 시 닫히는 핸들러
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end"
      onClick={handleOutsideClick}
    >
      <div
        className="h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out"
        style={{ boxShadow: 'rgba(60,64,67,0.3) 0px 1.5px 8px 0px' }}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">장바구니</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl">×</button>
        </div>
        <div className="p-6 flex flex-col gap-4 h-[calc(100%-160px)] overflow-y-auto">
          {cart.items.length === 0 ? (
            <div className="text-center text-gray-500 mt-16">장바구니가 비어있습니다.</div>
          ) : (
            cart.items.map((item, idx) => {
              console.log('Rendering cart item:', item);
              // 이미지 URL 처리
              const imageUrl = item.image_url.startsWith('/') ? item.image_url : `/${item.image_url}`;
              
              return (
                <div key={`${item.id}-${item.plan ?? 'default'}-${idx}`} className="flex gap-4 items-center border-b pb-4">
                  <div className="relative w-16 h-16 rounded bg-gray-100 overflow-hidden">
                    <Image 
                      src={imageUrl} 
                      alt={item.name} 
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{item.name}</div>
                    {item.plan && <div className="text-xs text-gray-500">{item.plan}</div>}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="rounded px-2 py-1 bg-gray-200 hover:bg-gray-300"
                        onClick={() => dispatch({ type: 'CHANGE_QUANTITY', id: item.id, plan: item.plan, quantity: Math.max(1, item.quantity - 1) })}
                      >-</button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="rounded px-2 py-1 bg-gray-200 hover:bg-gray-300"
                        onClick={() => dispatch({ type: 'CHANGE_QUANTITY', id: item.id, plan: item.plan, quantity: item.quantity + 1 })}
                      >+</button>
                    </div>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <div className="font-bold text-blue-700">{(item.price * item.quantity).toLocaleString()}원</div>
                    <button
                      className="mt-2 text-xs text-red-500 hover:underline"
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id, plan: item.plan })}
                    >삭제</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="p-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg">총 합계</span>
            <span className="font-bold text-2xl text-blue-700">{total.toLocaleString()}원</span>
          </div>
          <button
            className="w-full py-3 rounded bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition"
            disabled={cart.items.length === 0}
          >
            견적 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
