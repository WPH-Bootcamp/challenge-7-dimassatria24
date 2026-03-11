import { api } from '@/lib/api';
import {
  AllRestaurantResponse,
  AllRestoPayload,
  BestSellerParams,
  GetRestaurantDetailParams,
  RecommendationResponse,
  RecommendationRestaurant,
  RestaurantDetailResponse,
  RestoResponse,
  SearchRestoPayload,
} from './resto.type';

export const getAllResto = (params: AllRestoPayload) =>
  api.get<AllRestaurantResponse>('/resto', { params });

export const getBestSellerResto = (params: BestSellerParams) =>
  api.get<RestoResponse>('/resto/best-seller', { params });

export const getRecommendationResto = (params: RecommendationRestaurant) =>
  api.get<RecommendationResponse>('/resto/recommended', { params });

export const searchResto = (params: SearchRestoPayload) =>
  api.get<AllRestaurantResponse>('/resto/search', { params });


export const getRestaurantDetail = ({
  id,
  limitMenu,
  limitReview,
}: GetRestaurantDetailParams) => {
  return api.get<RestaurantDetailResponse>(`/resto/${id}`, {
    params: {
      limitMenu,
      limitReview,
    },
  });
};