import { api } from '@/lib/api';
import {
  LoginPayload,
  LoginResponse,
  ProfileResponse,
  RegisterPayload,
  RegisterResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '@/types/types';

export async function registerUser(payload: RegisterPayload) {
  const res = await api.post<RegisterResponse>('/auth/register', payload);
  return res.data;
}

export async function loginUser(payload: LoginPayload) {
  const res = await api.post<LoginResponse>('/auth/login', payload);
  return res.data;
}

export async function getUserProfile(): Promise<ProfileResponse> {
  const res = await api.get<ProfileResponse>('/auth/profile');
  return res.data;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  const res = await api.put<UpdateProfileResponse>('/auth/profile', payload);
  return res.data;
}