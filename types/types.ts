export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      avatar: string;
    };
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegisterResponse {
  succes: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      avatar: string;
      latitude: number;
      longitude: number;
      createAt: string;
    };
  };
}

export interface UserProfilePayload {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfilePayload;
}

// types/profile.ts
export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateProfileResponse {
  succes: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      avatar: string;
      latitude: number;
      longitude: number;
      createAt: string;
    };
  };
}
