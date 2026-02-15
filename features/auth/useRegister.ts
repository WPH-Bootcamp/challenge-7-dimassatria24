import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { registerUser } from './auth.api';
import { RegisterPayload, RegisterResponse } from '../../types/types';
import { ApiError } from '@/lib/api-error';

export function useRegister() {
  return useMutation<
    RegisterResponse,
    AxiosError<ApiError>,
    RegisterPayload
  >({
    mutationFn: registerUser,

    onSuccess: (res) => {
      toast.success(
        res.message || 'Registrasi berhasil 🎉'
      );
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Registrasi gagal';

      toast.error(message);
    },
  });
}