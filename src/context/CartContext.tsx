'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  price: number; // 실제 가격(원화 숫자)
  image_url: string;
  plan?: string; // 선택된 플랜명
  quantity: number;
  schoolType?: string; // 학교 유형 (A, B, C, D)
  studentCount?: number; // 학생 수
}

interface CartState {
  items: CartProduct[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: CartProduct }
  | { type: 'REMOVE_ITEM'; id: string; plan?: string }
  | { type: 'CHANGE_QUANTITY'; id: string; plan?: string; quantity: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  cart: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ cart: { items: [] }, dispatch: () => {} });

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      // 디버깅 코드 제거
      // 동일 상품+플랜이면 수량 증가
      const idx = state.items.findIndex(
        (item) => item.id === action.product.id && item.plan === action.product.plan
      );
      if (idx !== -1) {
        const items = [...state.items];
        items[idx].quantity += action.product.quantity;
        // 디버깅 코드 제거
        return { items };
      }
      const newItems = [...state.items, action.product];
      // 디버깅 코드 제거
      return { items: newItems };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(
          (item) => !(item.id === action.id && item.plan === action.plan)
        ),
      };
    }
    case 'CHANGE_QUANTITY': {
      return {
        items: state.items.map((item) =>
          item.id === action.id && item.plan === action.plan
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // 초기 상태 설정
  const initialState = { items: [] };
  
  // 하이드레이션 오류 해결을 위해 클라이언트 사이드에서만 localStorage 사용
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  
  // 클라이언트 사이드에서만 실행되는 코드
  React.useEffect(() => {
    // localStorage에서 장바구니 상태 불러오기 (초기 로드 시 한 번만 실행)
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // 각 아이템을 개별적으로 추가하여 불필요한 리렌더링 방지
        parsedCart.items.forEach((item: CartProduct) => {
          dispatch({ type: 'ADD_ITEM', product: item });
        });
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []); // 마운트 시 한 번만 실행
  
  // 장바구니 상태가 변경될 때마다 localStorage에 저장
  React.useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      // 디버깅 코드 제거
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cart]);
  
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
