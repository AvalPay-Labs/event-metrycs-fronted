"use client";

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '../ui/input';

interface SimpleLocationPickerProps {
  onLocationSelect: (location: {
    address: string;
    city: string;
    country: string;
    coordinates: { lat: number; lng: number };
  }) => void;
  defaultLocation?: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
}

export function SimpleLocationPicker({ onLocationSelect, defaultLocation }: SimpleLocationPickerProps) {
  const [address, setAddress] = useState(defaultLocation?.address || '');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = () => {
    if (address.trim()) {
      // Coordenadas por defecto (Bogotá)
      const coordinates = defaultLocation?.coordinates || { lat: 4.7110, lng: -74.0721 };
      
      onLocationSelect({
        address: address.trim(),
        city: city.trim() || 'Ciudad',
        country: country.trim() || 'País',
        coordinates
      });
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Dirección *"
        placeholder="Ej: Calle 123 #45-67, Medellín"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onBlur={handleSubmit}
        leftIcon={<MapPin className="w-4 h-4" />}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Ciudad"
          placeholder="Ej: Medellín"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onBlur={handleSubmit}
        />
        
        <Input
          label="País"
          placeholder="Ej: Colombia"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          onBlur={handleSubmit}
        />
      </div>
      
      <p className="text-xs text-textSecondary">
        Ingresa la dirección completa del evento
      </p>
    </div>
  );
} 