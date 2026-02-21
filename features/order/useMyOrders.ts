// src/features/order/useMyOrders.ts

import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from './order.api';
import type { OrderStatus, MyOrderResponse } from './order.types';

export function useMyOrders(status?: OrderStatus) {
  return useQuery<MyOrderResponse>({
    queryKey: ['my-orders', status ?? 'all'],
    queryFn: () => getMyOrders(status),
  });
}