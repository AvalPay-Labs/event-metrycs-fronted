"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser } from '@/types/user';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user: AuthUser | null) => set({ user, isAuthenticated: !!user }),
      setToken: (token: string | null) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'event-metrics-auth',
      partialize: (state: AuthState) => ({ token: state.token, user: state.user }),
    }
  )
);