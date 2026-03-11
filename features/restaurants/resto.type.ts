// restaurants type
export type PriceRange = {
  min: number;
  max: number;
};

export type Restaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: PriceRange;
  distance: number;

  category: string;
};

export type Pagination = {
  page?: number;
  limit?: number;
  total: number;
  totalPages: number;
};

export type RestoResponse = {
  success: boolean;
  data: {
    restaurants: Restaurant[];
    pagination: Pagination;
  };
};

export type BestSellerParams = {
  page?: number;
  limit?: number;
};

// recommendation type
export type SampleMenu = {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
};

export type RecommendationRestaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  lat: number;
  long: number;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  sampleMenus: SampleMenu[];
  isFrequentlyOrdered: boolean;
  distance: number;
};

export type RecommendationResponse = {
  success: boolean;
  data: {
    recommendations: RecommendationRestaurant[];
    message: string;
  };
};

// all resto type

export type AllRestaurantResponse = {
  success: boolean;
  data: {
    restaurants: Restaurant[];
    pagination: Pagination;
    filters: AppliedFilters;
    meta: {
      page: number;
      limit: number;
      total: number;
    };
  };
};

/**
 * QUERY PARAMS (FILTER)
 */
export type AllRestoParams = {
  page?: number;
  limit?: number;

  minRating?: number;
  maxDistance?: number;

  minPrice?: number;
  maxPrice?: number;
  search?: string;

  sortBy?: 'distance' | 'rating';
};

/**
 * SEARCH ONLY
 */
export type SearchRestoPayload = {
  q: string;
  page?: number;
  limit?: number;
};

export type AllRestoPayload = {
  range?: number; // km
  priceMin?: number;
  priceMax?: number;
  rating?: number; // 1–5
  category?: 'price' | 'distance' | 'rating';
  page?: number;
  limit?: number;
  q?: string;
};

export type AppliedFilters = {
  range: number | null;
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
  category: string | null;
};

// resto by ID type

export interface Coordinate {
  lat: number;
  long: number;
}

export interface Menu {
  id: number;
  foodName: string;
  price: number;
  type: 'food' | 'drink';
  image: string;
}

export interface ReviewUser {
  id: number;
  name: string;
  avatar: string | null;
}

export interface Review {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: ReviewUser;
}

export interface RestaurantDetail {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates: Coordinate;
  distance?: number;
  logo: string;
  images: string[];
  category: string;
  totalMenus: number;
  totalReviews: number;
  menus: Menu[];
  reviews: Review[];
}

export interface RestaurantDetailResponse {
  success: boolean;
  message?: string;
  data: RestaurantDetail;
}

export interface GetRestaurantDetailParams {
  id: number;
  limitMenu?: number;
  limitReview?: number;
}