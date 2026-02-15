import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { LoginPayload, LoginResponse } from '../../types/types';
import { ApiError } from '@/lib/api-error';
import { loginUser } from './auth.api';
import { toast } from 'sonner';

export function useLogin() {
  return useMutation<LoginResponse, AxiosError<ApiError>, LoginPayload>({
    mutationFn: (payload) => loginUser(payload),

    onSuccess: (data) => {
      const token = data.data.token;

      // ✅ Simpan ke cookie
      Cookies.set('token', token, {
        expires: 1,
        sameSite: 'lax',
      });

      toast.success('Login Berhasil');
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ?? error.message ?? 'Login Gagal';

      toast.error(message);
    },
  });
}
