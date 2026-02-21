import { useQuery } from '@tanstack/react-query';
import { BestSellerParams,  RestoResponse } from './resto.type';
import { getBestSellerResto } from './resto.api';

export const useBestSellerResto = (params: BestSellerParams) => {
  return useQuery<RestoResponse>({
    queryKey: ['best-seller', params],
    queryFn: async () => {
      const res = await getBestSellerResto(params);
      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });
};
