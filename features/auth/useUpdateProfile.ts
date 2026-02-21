import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { ApiError } from '@/lib/api-error';
import {
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '@/features/auth/auth.types';
import { updateProfile } from './auth.api';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateProfileResponse,
    AxiosError<ApiError>,
    UpdateProfilePayload
  >({
    mutationFn: updateProfile,

    onSuccess: (res) => {
      toast.success(res.message || 'Profile berhasil diperbarui');

      // 🔄 refresh profile
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? 'Gagal update profile');
    },
  });
}
