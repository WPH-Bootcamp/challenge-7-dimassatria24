'use client';

import { useState } from 'react';
import { useMyOrders } from '@/features/order/useMyOrders';
import type { OrderStatus } from '@/features/order/order.types';

const STATUS_OPTIONS: { label: string; value?: OrderStatus }[] = [
  { label: '-- Semua Status --', value: undefined },
  { label: 'Preparing', value: 'preparing' },
  { label: 'On The Way', value: 'on the way' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Done', value: 'done' },
  { label: 'Canceled', value: 'canceled' },
];

export default function MyOrderList() {
  const [status, setStatus] = useState<OrderStatus | undefined>(
    'done'
  );

  const { data, isLoading, isError } = useMyOrders(status);

  if (isLoading) return <p>Loading orders...</p>;
  if (isError || !data) return <p>Gagal memuat order</p>;

  const orders = data.data.orders;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">My Orders</h1>

      {/* Filter */}
      <select
        className="border p-2 rounded"
        value={status ?? ''}
        onChange={(e) =>
          setStatus(
            e.target.value
              ? (e.target.value as OrderStatus)
              : undefined
          )
        }
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.label} value={opt.value ?? ''}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Order List */}
      {orders.length === 0 ? (
        <p className="text-gray-500">Tidak ada order</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border rounded-lg p-4 space-y-1"
            >
              <p className="font-medium">
                Transaction ID: {order.transactionId}
              </p>

              <p className="text-sm text-gray-600">
                Status: <b>{order.status}</b>
              </p>

              <p className="text-sm">
                Payment: {order.paymentMethod}
              </p>

              <p className="font-semibold">
                Rp {order.totalPrice.toLocaleString()}
              </p>

              <p className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}