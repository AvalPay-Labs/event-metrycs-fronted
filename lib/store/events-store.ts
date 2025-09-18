"use client";

import { create } from 'zustand';
import { Event } from '@/types/event';

interface EventsState {
  events: Event[];
  selectedEvent: Event | null;
  filters: {
    search: string;
    type: string[];
    dateRange: {
      from: string | null;
      to: string | null;
    };
    creator: string | null;
  };
  setEvents: (events: Event[]) => void;
  setSelectedEvent: (event: Event | null) => void;
  setFilters: (filters: Partial<EventsState['filters']>) => void;
  resetFilters: () => void;
}

export const useEventsStore = create<EventsState>((set) => ({
  events: [],
  selectedEvent: null,
  filters: {
    search: '',
    type: [],
    dateRange: {
      from: null,
      to: null,
    },
    creator: null,
  },
  setEvents: (events) => set({ events }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setFilters: (filters) => set((state) => ({
    filters: {
      ...state.filters,
      ...filters,
    },
  })),
  resetFilters: () => set({
    filters: {
      search: '',
      type: [],
      dateRange: {
        from: null,
        to: null,
      },
      creator: null,
    },
  }),
}));