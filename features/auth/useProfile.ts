// useProfile.ts
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiError } from '@/lib/api-error';
import { ProfileResponse } from '@/types/types';
import { getUserProfile } from './auth.api';

export function useProfile() {
  return useQuery<ProfileResponse, AxiosError<ApiError>>({
    queryKey: ['profile'],
    queryFn: getUserProfile,
  });
}