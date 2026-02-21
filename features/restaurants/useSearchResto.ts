import { useQuery } from '@tanstack/react-query'
import { searchResto } from './resto.api'
import { SearchRestoPayload } from './resto.type'

export const useSearchResto = (
  params: SearchRestoPayload
) => {
  return useQuery({
    queryKey: ['search-resto', params],
    queryFn: async () => {
      const res = await searchResto(params)
      return res.data
    },
    enabled: params.q.length > 0, // 🔥 penting
  })
}