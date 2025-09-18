import apiClient from './axios-config';
import { AuthUser, LoginCredentials, RegisterData } from '@/types/user';

export const login = async (credentials: LoginCredentials): Promise<{token: string, user: AuthUser}> => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData: RegisterData): Promise<{token: string, user: AuthUser}> => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('token');
};