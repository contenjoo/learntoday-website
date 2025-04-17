import type { CartProduct } from '@/context/CartContext';

/**
 * Calculate total quantity of items in cart
 */
export function getCartCount(items: CartProduct[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Calculate total price of items in cart
 */
export function getCartTotal(items: CartProduct[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
