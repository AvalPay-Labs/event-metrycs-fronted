import apiClient from './axios-config';
import { User } from '@/types/user';
import { ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';

export const getUsers = async (params?: QueryParams): Promise<PaginatedResponse<User>> => {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/users', { params });
  return response.data.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return response.data.data;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, userData);
  return response.data.data;
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.put<ApiResponse<User>>('/users/profile', userData);
  return response.data.data;
};

export const updateProfilePicture = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('profilePicture', file);
  
  const response = await apiClient.post<ApiResponse<User>>('/users/profile/picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.data;
};