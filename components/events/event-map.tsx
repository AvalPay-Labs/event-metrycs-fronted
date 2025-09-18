"use client";

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { EventLocation } from '@/types/event';
import { useGoogleMaps } from '@/lib/hooks/use-google-maps';

interface EventMapProps {
  location: EventLocation;
  eventName: string;
}

export function EventMap({ location, eventName }: EventMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoading, setMapLoading] = useState(true);
  const { isLoading: mapsLoading, error, isLoaded } = useGoogleMaps();

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    try {
      const map = new google.maps.Map(mapRef.current, {
        center: location.coordinates,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      new google.maps.Marker({
        position: location.coordinates,
        map: map,
        title: eventName,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#3B82F6',
          fillOpacity: 1,
          strokeColor: '#1E40AF',
          strokeWeight: 2,
        }
      });

      setMapLoading(false);
    } catch (error) {
      console.error('Error creating map:', error);
      setMapLoading(false);
    }
  }, [isLoaded, location, eventName]);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const isLoadingMap = mapsLoading || mapLoading;

  if (error) {
    return (
      <div className="text-center p-4 text-error">
        Error cargando el mapa: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-medium text-text">Ubicación</h3>
            <p className="text-sm text-textSecondary">{location.address}</p>
            {location.city && location.country && (
              <p className="text-xs text-textSecondary">{location.city}, {location.country}</p>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={openInGoogleMaps}
          leftIcon={<ExternalLink className="w-4 h-4" />}
        >
          Ver en Maps
        </Button>
      </div>
      
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-48 rounded-lg border border-element"
        />
        {isLoadingMap && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
} 