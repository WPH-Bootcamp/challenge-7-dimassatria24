// src/features/order/order.api.ts

import { api } from '@/lib/api';
import type {
  MyOrderResponse,
  OrderCheckoutPayload,
  OrderCheckoutResponse,
  OrderStatus,
} from './order.types';

export const checkoutOrder = async (
  payload: OrderCheckoutPayload
): Promise<OrderCheckoutResponse> => {
  const { data } = await api.post<OrderCheckoutResponse>(
    '/order/checkout',
    payload
  );
  return data;
};

export const getMyOrders = async (
  status?: OrderStatus
): Promise<MyOrderResponse> => {
  const { data } = await api.get<MyOrderResponse>(
    '/order/my-order',
    {
      params: status ? { status } : undefined,
    }
  );
  return data;
};