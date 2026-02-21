// src/features/order/useCheckoutOrder.ts

import { useMutation } from '@tanstack/react-query';
import { checkoutOrder } from './order.api';
import type {
  OrderCheckoutPayload,
  OrderCheckoutResponse,
} from './order.types';

export function useCheckoutOrder() {
  return useMutation<OrderCheckoutResponse, Error, OrderCheckoutPayload>({
    mutationFn: checkoutOrder,
  });
}