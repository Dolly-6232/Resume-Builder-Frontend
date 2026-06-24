import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { env } from '../config/env';

export const TOKEN_STORAGE_KEY = 'resume_builder_token';
export const USER_STORAGE_KEY = 'resume_builder_user';

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error?.response?.status === 401) {
      await AsyncStorage.multiRemove([TOKEN_STORAGE_KEY, USER_STORAGE_KEY]);
    }

    return Promise.reject(error);
  },
);

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; error?: string }
      | undefined;

    return data?.message || data?.error || error.message;
  }

  return error instanceof Error ? error.message : 'Something went wrong';
};
