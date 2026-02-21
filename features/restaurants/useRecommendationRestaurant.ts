import { useQuery } from '@tanstack/react-query';
import { RecommendationResponse, RecommendationRestaurant } from './resto.type';
import { api } from '@/lib/api';

export const useRecommendationRestaurant = (
  params?: RecommendationRestaurant
) => {
  return useQuery<RecommendationResponse>({
    queryKey: ['recommended', params],
    queryFn: async () => {
      const res = await api.get<RecommendationResponse>(
        '/resto/recommended',
        { params }
      )
      return res.data
    },
    placeholderData: (prev) => prev,
  })
}

