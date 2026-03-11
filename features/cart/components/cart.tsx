'use client';

import { CartRestaurant } from "../cart.type";
import { useAddToCart } from "../useAddToCart";
import { useCart } from "../useCart";
import { useDeleteCart } from "../useDeleteCart";
import { useUpdateCart } from "../useUpdateCart";


export default function Cart() {
  const { data, isLoading, isError } = useCart();
  const { mutate: addCart } = useAddToCart();
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: deleteCart } = useDeleteCart();

  if (isLoading) return <p>Loading cart...</p>;
  if (isError || !data) return <p>Gagal memuat cart</p>;

  const { cart, summary } = data.data;

  if (cart.length === 0) {
    return <p className="text-center">Cart kamu masih kosong 🛒</p>;
  }

  const handleIncrease = (
    restaurantId: number,
    menuId: number,
    quantity: number
  ) => {
    updateCart({
      restaurantId,
      menuId,
      quantity: quantity + 1,
    });
  };

  const handleDecrease = (
    restaurantId: number,
    menuId: number,
    quantity: number
  ) => {
    if (quantity <= 1) {
      deleteCart({ restaurantId, menuId });
    } else {
      updateCart({
        restaurantId,
        menuId,
        quantity: quantity - 1,
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Cart</h1>

      {/* Cart by Restaurant */}
      {cart.map((restaurant: CartRestaurant) => (
        <div
          key={restaurant.restaurantId}
          className="rounded-lg border p-4 space-y-3"
        >
          <h2 className="font-semibold text-lg">
            {restaurant.restaurantName}
          </h2>

          <ul className="space-y-3">
            {restaurant.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{item.menuName}</p>
                  <p className="text-sm text-gray-500">
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() =>
                      handleDecrease(
                        restaurant.restaurantId,
                        item.menuId,
                        item.quantity
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() =>
                      handleIncrease(
                        restaurant.restaurantId,
                        item.menuId,
                        item.quantity
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <p className="font-medium">
                  Rp {item.subtotal.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Summary */}
      <div className="border-t pt-4 space-y-1">
        <p>Total Item: {summary.totalItems}</p>
        <p>Restaurant: {summary.restaurantCount}</p>
        <p className="font-semibold">
          Total Price: Rp {summary.totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
}