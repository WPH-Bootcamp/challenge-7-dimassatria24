// src/features/cart/useDeleteCart.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCart } from './cart.api';
import type { DeleteCartPayload, CartResponse } from './cart.type';

export function useDeleteCart() {
  const queryClient = useQueryClient();

  return useMutation<CartResponse, Error, DeleteCartPayload>({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}