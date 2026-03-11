// src/features/cart/useUpdateCart.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCart } from './cart.api';
import type { CartPayload, CartResponse } from './cart.type';

export function useUpdateCart() {
  const queryClient = useQueryClient();

  return useMutation<CartResponse, Error, CartPayload>({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}