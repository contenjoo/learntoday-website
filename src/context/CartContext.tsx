'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  price: number; // 실제 가격(원화 숫자)
  image_url: string;
  plan?: string; // 선택된 플랜명
  quantity: number;
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
      console.log('Adding item to cart:', action.product);
      // 동일 상품+플랜이면 수량 증가
      const idx = state.items.findIndex(
        (item) => item.id === action.product.id && item.plan === action.product.plan
      );
      if (idx !== -1) {
        const items = [...state.items];
        items[idx].quantity += action.product.quantity;
        console.log('Updated cart items:', items);
        return { items };
      }
      const newItems = [...state.items, action.product];
      console.log('New cart items:', newItems);
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
  // localStorage에서 장바구니 상태 불러오기
  const initialState = { items: [] };
  
  const [cart, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : initialState;
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        return initialState;
      }
    }
    return initialState;
  });
  
  // 장바구니 상태가 변경될 때마다 localStorage에 저장
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
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
