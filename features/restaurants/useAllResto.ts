import { useQuery } from '@tanstack/react-query';
import { getAllResto } from './resto.api';
import {AllRestoPayload } from './resto.type';


export const useAllResto = (
  params: AllRestoPayload
) => {
  return useQuery({
    queryKey: ['resto', params],
    queryFn: async () => {
      const res = await getAllResto(params)
      return res.data
    },
    placeholderData: (previousData) => previousData,
  })
}