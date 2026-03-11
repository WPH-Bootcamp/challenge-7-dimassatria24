// src/features/cart/cart.api.ts

import { api } from '@/lib/api';
import type {
  CartResponse,
  CartPayload,
  DeleteCartPayload,
} from './cart.type';

export const getCart = async (): Promise<CartResponse> => {
  const { data } = await api.get<CartResponse>('/cart');
  return data;
};

export const addToCart = async (
  payload: CartPayload
): Promise<CartResponse> => {
  const { data } = await api.post<CartResponse>('/cart', payload);
  return data;
};

export const updateCart = async (
  payload: CartPayload
): Promise<CartResponse> => {
  const { data } = await api.put<CartResponse>('cart', payload);
  return data;
};

export const deleteCart = async (
  payload: DeleteCartPayload
): Promise<CartResponse> => {
  const { data } = await api.delete<CartResponse>('/cart', {
    data: payload,
  });
  return data;
};