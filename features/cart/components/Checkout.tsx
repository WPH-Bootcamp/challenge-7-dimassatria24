'use client';

import { useCart } from '@/features/cart/useCart';

export default function Checkout() {
  const { data, isLoading, isError } = useCart();

  if (isLoading) return <p>Loading checkout...</p>;
  if (isError || !data) return <p>Gagal memuat checkout</p>;

  const { cart, summary } = data.data;

  if (cart.length === 0) {
    return (
      <div className='text-center'>
        <p>Cart kamu kosong 🛒</p>
      </div>
    );
  }

  const handleCheckout = () => {
    /**
     * NANTI:
     * - panggil API checkout
     * - redirect ke payment
     */
    console.log('Checkout payload:', cart);
  };

  return (
    <div className='max-w-3xl mx-auto space-y-6'>
      <h1 className='text-2xl font-semibold'>Checkout</h1>

      {/* Restaurant Summary */}
      {cart.map((restaurant) => (
        <div
          key={restaurant.restaurantId}
          className='border rounded-lg p-4 space-y-3'
        >
          <h2 className='font-semibold text-lg'>{restaurant.restaurantName}</h2>

          <ul className='space-y-2'>
            {restaurant.items.map((item) => (
              <li key={item.id} className='flex justify-between text-sm'>
                <span>
                  {item.menuName} × {item.quantity}
                </span>
                <span>Rp {item.subtotal.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Payment Summary */}
      <div className='border-t pt-4 space-y-2'>
        <div className='flex justify-between'>
          <span>Total Item</span>
          <span>{summary.totalItems}</span>
        </div>

        <div className='flex justify-between'>
          <span>Jumlah Restaurant</span>
          <span>{summary.restaurantCount}</span>
        </div>

        <div className='flex justify-between font-semibold text-lg'>
          <span>Total Pembayaran</span>
          <span>Rp {summary.totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className='w-full bg-black text-white py-3 rounded-lg'
      >
        Checkout
      </button>
    </div>
  );
}
