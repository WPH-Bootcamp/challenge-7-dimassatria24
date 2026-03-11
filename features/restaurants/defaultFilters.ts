// constants/defaultFilters.ts

import { AllRestoPayload } from "./resto.type";

export const DEFAULT_FILTERS: AllRestoPayload = {
  range: undefined,
  priceMin: undefined,
  priceMax: undefined,
  rating: undefined,
  category: undefined,
  q: undefined,
  page: 1,
  limit: 20,
}