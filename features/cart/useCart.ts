// src/features/cart/useCart.ts

import { useQuery } from '@tanstack/react-query';
import { getCart } from './cart.api';
import type { CartResponse } from './cart.type';

export function useCart() {
  return useQuery<CartResponse>({
    queryKey: ['cart'],
    queryFn: getCart,
  });
}