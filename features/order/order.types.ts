// src/features/order/order.types.ts

/* =====================
 * Payload Types
 * ===================== */

export interface OrderItemPayload {
  menuId: number;
  quantity: number;
}

export interface OrderRestaurantPayload {
  restaurantId: number;
  items: OrderItemPayload[];
}

export interface OrderCheckoutPayload {
  restaurants: OrderRestaurantPayload[];
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
  notes?: string;
}

/* =====================
 * Response Types
 * ===================== */

export interface OrderPricing {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
}

export interface OrderItem {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
  itemTotal: number;
}

export interface OrderRestaurant {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: OrderItem[];
  subtotal: number;
}

export interface OrderTransaction {
  id: number;
  transactionId: string;
  paymentMethod: string;
  status: 'pending' | 'done' | 'cancelled';
  deliveryAddress: string;
  phone: string;
  pricing: OrderPricing;
  restaurants: OrderRestaurant[];
  createdAt: string;
}

export interface OrderCheckoutResponse {
  success: boolean;
  message: string;
  data: {
    transaction: OrderTransaction;
  };
}

// src/features/order/order.types.ts

/* =====================
 * Order List (My Order)
 * ===================== */

export type OrderStatus =
  | 'preparing'
  | 'on the way'
  | 'delivered'
  | 'done'
  | 'canceled';

export interface OrderListItem {
  id: number;
  transactionId: string;
  paymentMethod: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
}

export interface MyOrderResponse {
  success: boolean;
  message: string;
  data: {
    orders: OrderListItem[];
  };
}