import { useQuery } from "@tanstack/react-query";
import { getRestaurantDetail } from "./resto.api";

type UseRestaurantDetailProps = {
  id: number;
  limitMenu?: number;
  limitReview?: number;
  enabled?: boolean;
};

export function useRestaurantDetail({
  id,
  limitMenu = 5,
  limitReview = 5,
  enabled = true,
}: UseRestaurantDetailProps) {
  return useQuery({
    queryKey: ['restaurant-detail', id, limitMenu, limitReview],
    queryFn: () =>
      getRestaurantDetail({ id, limitMenu, limitReview }).then(res => res.data),
    enabled,
  });
}