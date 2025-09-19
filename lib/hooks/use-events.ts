"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  getEvents, 
  getEvent, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  importEventData
} from '../api/events-api';
import { EventFormData } from '@/types/event';
import { QueryParams } from '@/types/api';

export function useEvents(initialParams?: QueryParams) {
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 1,
    limit: 10,
    sort: '-createdAt',
    ...initialParams
  });

  const eventsQuery = useQuery({
    queryKey: ['events', queryParams],
    queryFn: () => getEvents(queryParams),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });

  const createEventMutation = useMutation({
    mutationFn: (data: EventFormData) => createEvent(data),
    onSuccess: (newEvent) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.setQueryData(['event', newEvent._id], newEvent);
      toast.success('Evento creado exitosamente');
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al crear el evento';
      toast.error(message);
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EventFormData> }) => updateEvent(id, data),
    onSuccess: (updatedEvent, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.setQueryData(['event', variables.id], updatedEvent);
      toast.success('Evento actualizado exitosamente');
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al actualizar el evento';
      toast.error(message);
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.removeQueries({ queryKey: ['event', deletedId] });
      toast.success('Evento eliminado exitosamente');
    },
    onError: (error: unknown) => {
      const message = (error as Error).message || 'Error al eliminar el evento';
      toast.error(message);
    },
  });

  const importEventDataMutation = useMutation({
    mutationFn: ({ id, file, type }: { id: string; file: File; type?: 'attendees' | 'metrics' }) => {
      console.log('🔄 Mutation called with:', { id, file: file ? file.name : 'no file', type });
      return importEventData(id, file, type || 'attendees');
    },
    onSuccess: (updatedEvent, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.setQueryData(['event', variables.id], updatedEvent);
      toast.success('Datos importados exitosamente');
    },
    onError: (error: unknown) => {
      console.error('Error importing data:', error);
      const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error)?.message || 'Error al importar datos';
      toast.error(errorMessage);
    },
  });

  const refetchEvents = () => {
    return eventsQuery.refetch();
  };

  const refetchEvent = (id: string) => {
    return queryClient.invalidateQueries({ queryKey: ['event', id] });
  };

  return {
    // Data
    events: eventsQuery.data?.data || [],
    eventsQuery,
    
    // Pagination
    pagination: {
      currentPage: eventsQuery.data?.page || 1,
      totalPages: eventsQuery.data?.totalPages || 1,
      totalEvents: eventsQuery.data?.total || 0,
      limit: eventsQuery.data?.limit || 10,
    },
    
    // Mutations
    createEvent: createEventMutation.mutateAsync,
    updateEvent: updateEventMutation.mutateAsync,
    deleteEvent: deleteEventMutation.mutateAsync,
    importEventData: async (id: string, file: File, type: 'attendees' | 'metrics' = 'attendees') => {
      console.log('📤 Hook importEventData called with:', { id, fileName: file?.name, type });
      return importEventDataMutation.mutateAsync({ id, file, type });
    },
    
    // Loading states
    isCreating: createEventMutation.isPending,
    isUpdating: updateEventMutation.isPending,
    isDeleting: deleteEventMutation.isPending,
    isImporting: importEventDataMutation.isPending,
    
    // Utils
    setQueryParams,
    refetchEvents,
    refetchEvent,
  };
}

// Hook separado para obtener un evento individual
export function useEvent(id: string) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: unknown) => {
      // No reintentar si es un error 404
      if ((error as { response?: { status?: number } }).response?.status === 404) return false;
      return failureCount < 3;
    }
  });
}