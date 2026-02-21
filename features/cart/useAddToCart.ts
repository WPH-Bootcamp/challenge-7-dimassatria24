// src/features/cart/useAddToCart.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from './cart.api';
import type { CartPayload, CartResponse } from './cart.type';

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation<CartResponse, Error, CartPayload>({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}