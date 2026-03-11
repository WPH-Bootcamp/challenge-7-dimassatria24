// // export interface CardPayload {
// //   succes: boolean;
// //   data: {
// //     cart: [
// //       {
// //         restaurant: {
// //           id: number;
// //           name: string;
// //           logo: string;
// //         };
// //         items: [
// //           {
// //             id: number;
// //             menu: {
// //               id: number;
// //               foodName: string;
// //               price: number;
// //               type: string;
// //               image: string;
// //             };
// //             quantity: number;
// //             itemTotal: number;
// //           },
// //         ];
// //         subtotal: number;
// //       },
// //     ];
// //     summary: {
// //       totalItems: number;
// //       totalPrice: number;
// //       restaurantCount: number;
// //     };
// //   };
// // }

// // export interface CartResponse {
// //   succes: boolean;
// //   message: string;
// //   data: {
// //     cart: [];
// //     summary: {
// //       totalItems: number;
// //       totalPrice: number;
// //       restaurantCount: number;
// //     };
// //   };
// // }

// // types/cart.ts

// export interface Restaurant {
//   id: number;
//   name: string;
//   logo: string;
// }

// export interface MenuItem {
//   id: number;
//   foodName: string;
//   price: number;
//   type: string;
//   image: string;
// }

// export interface CartItem {
//   id: number;
//   menu: MenuItem;
//   quantity: number;
//   itemTotal: number;
// }

// export interface CartEntry {
//   restaurant: Restaurant;
//   items: CartItem[];
//   subtotal: number;
// }

// export interface CartSummary {
//   totalItems: number;
//   totalPrice: number;
//   restaurantCount: number;
// }

// export interface CartData {
//   cart: CartEntry[];
//   summary: CartSummary;
// }

// // Jika mau konsisten dengan format response API
// export interface CartResponse {
//   success: boolean;
//   message?: string; // optional jika API kadang tidak mengirim message
//   data: CartData;
// }

// src/features/cart/cart.type.ts

// src/features/cart/cart.types.ts

/* =====================
 * Domain Models
 * ===================== */

// src/features/cart/cart.types.ts

/* =====================
 * Domain Models
 * ===================== */

export interface CartItem {
  id: number;
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface CartRestaurant {
  restaurantId: number;
  restaurantName: string;
  items: CartItem[];
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
}

/* =====================
 * API Response
 * ===================== */

export interface CartData {
  cart: CartRestaurant[];
  summary: CartSummary;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: CartData;
}

/* =====================
 * Mutation Payloads
 * ===================== */

export interface CartMutationBase {
  restaurantId: number;
  menuId: number;
}

export interface CartPayload extends CartMutationBase {
  quantity: number;
}

export type DeleteCartPayload = CartMutationBase;