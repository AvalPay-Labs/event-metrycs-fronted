import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

let isLoaded = false;
let loadPromise: Promise<void> | null = null;

export function useGoogleMaps() {
  const [isLoading, setIsLoading] = useState(!isLoaded);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
      return;
    }

    if (loadPromise) {
      loadPromise
        .then(() => {
          setIsLoading(false);
          isLoaded = true;
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
      return;
    }

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
      libraries: ['places'], // Incluir todas las librerías necesarias
    });

    loadPromise = loader.load() as unknown as Promise<void>;
    
    loadPromise
      .then(() => {
        setIsLoading(false);
        isLoaded = true;
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return { isLoading, error, isLoaded };
} 