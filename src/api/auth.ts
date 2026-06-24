import { apiClient } from './client';
import type { AuthResponse, User } from '../types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

const normalizeUser = (user: any): User | null => {
  if (!user) {
    return null;
  }

  return {
    id: user.id || user._id,
    name: user.name || '',
    email: user.email || '',
    avatar: user.photoURL || user.avatar,
    isPremium: user.isPremium,
    subscriptionType: user.subscriptionType,
  };
};

const normalizeAuthResponse = (data: any): AuthResponse => {
  const token = data?.token || data?.accessToken || data?.data?.token;
  const user = normalizeUser(data?.user || data?.data?.user);

  if (!token) {
    throw new Error('Authentication response did not include a JWT token.');
  }

  return { token, user };
};

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', payload);
    return normalizeAuthResponse(response.data);
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register', payload);
    return normalizeAuthResponse(response.data);
  },

  async google(idToken: string): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/google', { idToken });
    return normalizeAuthResponse(response.data);
  },
};
