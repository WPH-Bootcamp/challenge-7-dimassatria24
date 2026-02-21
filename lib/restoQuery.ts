import { AllRestoPayload } from "@/features/restaurants/resto.type"

export function serializeFilters(
  filters: AllRestoPayload
): URLSearchParams {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value))
    }
  })

  return params
}

export function parseFilters(
  searchParams: URLSearchParams
): AllRestoPayload {
  return {
    range: searchParams.get('range')
      ? Number(searchParams.get('range'))
      : undefined,

    priceMin: searchParams.get('priceMin')
      ? Number(searchParams.get('priceMin'))
      : undefined,

    priceMax: searchParams.get('priceMax')
      ? Number(searchParams.get('priceMax'))
      : undefined,

    rating: searchParams.get('rating')
      ? Number(searchParams.get('rating'))
      : undefined,

    category: searchParams.get('category') as
      | 'price'
      | 'distance'
      | 'rating'
      | undefined,

    q: searchParams.get('q') ?? undefined,

    page: searchParams.get('page')
      ? Number(searchParams.get('page'))
      : 1,

    limit: searchParams.get('limit')
      ? Number(searchParams.get('limit'))
      : 20,
  }
}