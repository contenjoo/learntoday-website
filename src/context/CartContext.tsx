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
      // 동일 상품+플랜이면 수량 증가
      const idx = state.items.findIndex(
        (item) => item.id === action.product.id && item.plan === action.product.plan
      );
      if (idx !== -1) {
        const items = [...state.items];
        items[idx].quantity += action.product.quantity;
        return { items };
      }
      return { items: [...state.items, action.product] };
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
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
