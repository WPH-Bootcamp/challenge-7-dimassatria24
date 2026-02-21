'use client';

import Profile from "@/features/auth/components/Profile";
import CartList from "@/features/cart/components/cart";
import AllRestoWithFilter from "@/features/restaurants/components/AllRestoWithFilter";
import BestSellerResto from "@/features/restaurants/components/BestSellerResto";
import RecommendationResto from "@/features/restaurants/components/RecommendationResto";
import SearhRestoPage from "../restoSearch/page";
import RestoDetailPage from "../restoDetail/page";
import RestaurantDetail from "@/features/restaurants/components/RestaurantDetail";
import CartPage from "../cart/page";
import CheckotPage from "../checkout/page";
import MyOrderPage from "../my-order/page";


export default function profilePage() {

  return (
    <div className="">
      <Profile/>
      <CartList/>
      <BestSellerResto/>
      <RecommendationResto/>
      <AllRestoWithFilter/>
      <SearhRestoPage/>
      <RestaurantDetail/>
      <CartPage/>
      <CheckotPage/>
      <CheckotPage/>
      <MyOrderPage/>
    </div>
  );
}