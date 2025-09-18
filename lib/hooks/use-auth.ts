"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { login as apiLogin, register as apiRegister, getCurrentUser, logout as apiLogout } from '../api/auth-api';
import { AuthUser, LoginCredentials, RegisterData } from '@/types/user';
import { useAuthStore } from '../store/auth-store';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  
  const { token, setToken, setUser: setStoreUser } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = token || localStorage.getItem('token');
        
        if (storedToken) {
          if (!token) setToken(storedToken);
          localStorage.setItem('token', storedToken);
          
          const userData = await getCurrentUser();
          setUser(userData);
          setStoreUser(userData);
          console.log('User authenticated:', userData);
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setStoreUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [token, setToken, setStoreUser]);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      console.log('Login with credentials:', credentials);
      const response = await apiLogin(credentials);
      console.log('Login response:', response);
      
      const userToken = response.token;
      const userData = response.user || response;
      
      if (!userToken) {
        throw new Error('No token received from server');
      }
      
      localStorage.setItem('token', userToken);
      setToken(userToken);
      setUser(userData);
      setStoreUser(userData);
      
      toast.success('Login successful!');
      router.push('/dashboard');
      return userData;
    } catch (error: unknown) {
      console.error('Login error:', error);
      toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error logging in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const result = await apiRegister(userData);
      
      if (result && result.token && result.user) {
        localStorage.setItem('token', result.token);
        setToken(result.token);
        setUser(result.user);
        setStoreUser(result.user);
        
        toast.success('Registration successful!');
        router.push('/dashboard');
        return result.user;
      } else {
        console.error('Registration error: Invalid user data received', result);
        toast.error('Error during registration process');
        throw new Error('Invalid user data received');
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || 'Error to register');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setStoreUser(null);
      
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error: unknown) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}