"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useGoogleMaps } from '@/lib/hooks/use-google-maps';

interface LocationPickerProps {
  onLocationSelect: (location: {
    address: string;
    city: string;
    country: string;
    coordinates: { lat: number; lng: number };
    placeId?: string;
  }) => void;
  defaultLocation?: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  disabled?: boolean;
}

export function LocationPicker({ onLocationSelect, defaultLocation, disabled }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [searchInput, setSearchInput] = useState(defaultLocation?.address || '');
  const [mapLoading, setMapLoading] = useState(true);
  const { isLoading: mapsLoading, error, isLoaded } = useGoogleMaps();

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    
    try {
      const response = await geocoder.geocode({ location: { lat, lng } });
      
      if (response.results[0]) {
        const result = response.results[0];
        const addressComponents = result.address_components;
        
        let city = '';
        let country = '';
        
        addressComponents.forEach(component => {
          if (component.types.includes('locality')) {
            city = component.long_name;
          }
          if (component.types.includes('country')) {
            country = component.long_name;
          }
        });

        const locationData = {
          address: result.formatted_address,
          city,
          country,
          coordinates: { lat, lng },
          placeId: result.place_id
        };

        setSearchInput(result.formatted_address);
        onLocationSelect(locationData);
      }
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
    }
  }, [onLocationSelect]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    try {
      const defaultCenter = defaultLocation?.coordinates || { lat: 4.7110, lng: -74.0721 };
      
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      setMap(mapInstance);

      const markerInstance = new google.maps.Marker({
        position: defaultCenter,
        map: mapInstance,
        draggable: true,
        title: 'Ubicación del evento'
      });

      setMarker(markerInstance);

      // Listener para cuando se arrastra el marcador
      markerInstance.addListener('dragend', () => {
        const position = markerInstance.getPosition();
        if (position) {
          reverseGeocode(position.lat(), position.lng());
        }
      });

      // Listener para clicks en el mapa
      mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          markerInstance.setPosition(e.latLng);
          reverseGeocode(e.latLng.lat(), e.latLng.lng());
        }
      });

      setMapLoading(false);
    } catch (error) {
      console.error('Error creating map:', error);
      setMapLoading(false);
    }
  }, [isLoaded, defaultLocation, reverseGeocode]);

  const searchLocation = async () => {
    if (!searchInput.trim() || !map) return;

    const service = new google.maps.places.PlacesService(map);
    
    const request = {
      query: searchInput,
      fields: ['place_id', 'formatted_address', 'geometry', 'address_components']
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
        const place = results[0];
        
        if (place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          
          map.setCenter({ lat, lng });
          marker?.setPosition({ lat, lng });
          
          let city = '';
          let country = '';
          
          place.address_components?.forEach(component => {
            if (component.types.includes('locality')) {
              city = component.long_name;
            }
            if (component.types.includes('country')) {
              country = component.long_name;
            }
          });

          onLocationSelect({
            address: place.formatted_address || searchInput,
            city,
            country,
            coordinates: { lat, lng },
            placeId: place.place_id
          });
        }
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchLocation();
    }
  };

  const isLoadingMap = mapsLoading || mapLoading;

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Buscar dirección o lugar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          leftIcon={<MapPin className="w-4 h-4" />}
        />
        <Button
          type="button"
          variant="outline"
          onClick={searchLocation}
          disabled={disabled || !searchInput.trim()}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-64 rounded-lg border border-element"
          style={{ minHeight: '256px' }}
        />
        {isLoadingMap && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-textSecondary">Cargando mapa...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <p className="text-error text-sm">Error: {error}</p>
          </div>
        )}
      </div>
      
      <p className="text-xs text-textSecondary">
        Haz clic en el mapa o arrastra el marcador para seleccionar la ubicación exacta
      </p>
    </div>
  );
} 