'use client';

import { useState } from 'react';
import { useCheckoutOrder } from '@/features/order/useCheckoutOrder';

export default function CheckoutDirectPage() {
  const { mutate, isPending, data } = useCheckoutOrder();

  const [form, setForm] = useState({
    deliveryAddress: '',
    phone: '',
    paymentMethod: '',
    notes: '',
  });

  const handleCheckout = () => {
    mutate({
      restaurants: [
        {
          restaurantId: 108,
          items: [
            {
              menuId: 224,
              quantity: 1,
            },
          ],
        },
      ],
      deliveryAddress: form.deliveryAddress,
      phone: form.phone,
      paymentMethod: form.paymentMethod,
      notes: form.notes,
    });
  };

  if (data) {
    return (
      <div className='max-w-xl mx-auto space-y-4'>
        <h1 className='text-xl font-semibold'>Order Berhasil 🎉</h1>

        <p>
          Transaction ID: <b>{data.data.transaction.transactionId}</b>
        </p>

        <p>Status: {data.data.transaction.status}</p>

        <p className='font-semibold'>
          Total: Rp {data.data.transaction.pricing.totalPrice.toLocaleString()}
        </p>
      </div>
    );
  }

  return (
    <div className='max-w-xl mx-auto space-y-4'>
      <h1 className='text-xl font-semibold'>Checkout (Direct Order)</h1>

      <input
        placeholder='Alamat Pengiriman'
        className='w-full border p-2 rounded'
        value={form.deliveryAddress}
        onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })}
      />

      <input
        placeholder='No. Telepon'
        className='w-full border p-2 rounded'
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        placeholder='Metode Pembayaran'
        className='w-full border p-2 rounded'
        value={form.paymentMethod}
        onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
      />

      <textarea
        placeholder='Catatan (opsional)'
        className='w-full border p-2 rounded'
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <button
        disabled={isPending}
        onClick={handleCheckout}
        className='w-full bg-black text-white py-2 rounded'
      >
        {isPending ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
}
