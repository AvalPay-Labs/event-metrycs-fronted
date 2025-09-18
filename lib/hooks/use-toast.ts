"use client";

import { toast } from 'sonner';

export function useToast() {
  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  const showWarning = (message: string) => {
    toast.warning(message);
  };

  const showInfo = (message: string) => {
    toast.info(message);
  };

  const showLoading = (message: string, promise: Promise<unknown>, options?: {
    success?: string;
    error?: string;
  }) => {
    return toast.promise(promise, {
      loading: message,
      success: options?.success || 'Completado con éxito',
      error: (err) => options?.error || err.message || 'Ha ocurrido un error',
    });
  };

  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    loading: showLoading,
  };
}