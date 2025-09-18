"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Event, EventFormData, EventLocation } from "@/types/event";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select";
import { LocationPicker } from "./location-picker";
import { Upload, Calendar, X, Plus, Target, Tag, Clock, MapPin } from "lucide-react";
import Image from "next/image";

interface EventFormProps {
  defaultValues?: Partial<EventFormData>;
  onSubmit: (data: EventFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
  event?: Event; // Para modo edición
}

export function EventForm({ 
  defaultValues, 
  onSubmit, 
  onCancel,
  isLoading = false,
  mode = 'create',
  event
}: EventFormProps) {
  const { 
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<EventFormData>({
    defaultValues: defaultValues || {
      name: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      startTime: "09:00",
      endTime: "17:00",
      timezone: "America/Bogota",
      type: "in-person",
      objectives: [],
      kpis: [],
    }
  });

  const [objectives, setObjectives] = React.useState<string[]>(defaultValues?.objectives || []);
  const [newObjective, setNewObjective] = React.useState("");
  const [kpis, setKpis] = React.useState<string[]>(defaultValues?.kpis || []);
  const [newKpi, setNewKpi] = React.useState("");
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = React.useState<EventLocation | null>(null);

  const watchedType = watch("type");

  // Efecto para actualizar el formulario cuando cambien los defaultValues
  useEffect(() => {
    if (defaultValues && mode === 'edit') {
      reset(defaultValues);
      setObjectives(defaultValues.objectives || []);
      setKpis(defaultValues.kpis || []);
      setSelectedLocation(defaultValues.location as EventLocation | null);
      
      // Para modo edición, mostrar la imagen actual si existe
      if (event?.logoUrl) {
        setLogoPreview(event.logoUrl);
      }
    }
  }, [defaultValues, reset, mode, event]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Guardar el archivo para enviarlo al backend
      setValue('logo', file);
      
      // Crear vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, newObjective.trim()]);
      setNewObjective("");
    }
  };

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const addKpi = () => {
    if (newKpi.trim()) {
      setKpis([...kpis, newKpi.trim()]);
      setNewKpi("");
    }
  };

  const removeKpi = (index: number) => {
    setKpis(kpis.filter((_, i) => i !== index));
  };

  const handleLocationSelect = (location: EventLocation) => {
    setSelectedLocation(location);
    setValue('location', location);
  };

  const onFormSubmit = (data: EventFormData) => {
    const formData = {
      ...data,
      objectives,
      kpis,
      location: (data.type === 'in-person' || data.type === 'hybrid') ? selectedLocation : undefined,
    };
    
    console.log('Sending form data:', formData); // Para debug
    onSubmit(formData as EventFormData);
  };

  // Generar opciones de zona horaria
  const timezoneOptions = [
    { value: "America/Bogota", label: "Colombia (UTC-5)" },
    { value: "America/Mexico_City", label: "México (UTC-6)" },
    { value: "America/New_York", label: "Nueva York (UTC-5/-4)" },
    { value: "America/Los_Angeles", label: "Los Ángeles (UTC-8/-7)" },
    { value: "Europe/Madrid", label: "Madrid (UTC+1/+2)" },
    { value: "Europe/London", label: "Londres (UTC+0/+1)" },
    { value: "Asia/Tokyo", label: "Tokio (UTC+9)" },
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="space-y-6">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle className="text-text">Información básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="name"
              label="Nombre del evento *"
              placeholder="Ingresa el nombre del evento"
              error={errors.name?.message}
              {...register("name", { required: "El nombre es requerido" })}
            />

            <Textarea
              id="description"
              label="Descripción del evento *"
              rows={4}
              placeholder="Describe el evento"
              error={errors.description?.message}
              {...register("description", { required: "La descripción es requerida" })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="date"
                label="Fecha del evento *"
                type="date"
                leftIcon={<Calendar className="w-4 h-4" />}
                error={errors.date?.message}
                {...register("date", { required: "La fecha es requerida" })}
              />

              <Select
                id="type"
                label="Tipo de evento *"
                options={[
                  { value: "in-person", label: "Presencial" },
                  { value: "virtual", label: "Virtual" },
                  { value: "hybrid", label: "Híbrido" }
                ]}
                error={errors.type?.message}
                {...register("type", { required: "El tipo es requerido" })}
              />
            </div>

            {/* Horarios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                id="startTime"
                label="Hora de inicio *"
                type="time"
                leftIcon={<Clock className="w-4 h-4" />}
                error={errors.startTime?.message}
                {...register("startTime", { required: "La hora de inicio es requerida" })}
              />

              <Input
                id="endTime"
                label="Hora de fin *"
                type="time"
                leftIcon={<Clock className="w-4 h-4" />}
                error={errors.endTime?.message}
                {...register("endTime", { required: "La hora de fin es requerida" })}
              />

              <Select
                id="timezone"
                label="Zona horaria *"
                options={timezoneOptions}
                error={errors.timezone?.message}
                {...register("timezone", { required: "La zona horaria es requerida" })}
              />
            </div>

            {/* Logo */}
            <div>
              <label htmlFor="logo" className="block text-sm font-medium mb-1 text-text">
                Logo del evento
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-element rounded-lg cursor-pointer hover:border-primary transition-colors">
                  {logoPreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={logoPreview}
                        alt="Vista previa del logo"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setLogoPreview(null)}
                        className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 hover:bg-error/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-textSecondary mb-2" />
                      <p className="text-xs text-textSecondary text-center">
                        {mode === 'edit' ? 'Cambiar imagen' : 'Subir imagen'}
                      </p>
                    </div>
                  )}
                  <input
                    id="logo"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </label>
                <div className="text-sm text-textSecondary">
                  <p>Formato recomendado: PNG, JPG</p>
                  <p>Tamaño recomendado: 400x400px</p>
                  {mode === 'edit' && logoPreview && (
                    <p className="text-primary mt-1">✓ Imagen actual cargada</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ubicación (solo para eventos presenciales e híbridos) */}
        {(watchedType === 'in-person' || watchedType === 'hybrid') && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-text">
                <MapPin className="w-5 h-5 mr-2" />
                Ubicación del evento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LocationPicker
                onLocationSelect={handleLocationSelect}
                defaultLocation={selectedLocation ? {
                  address: selectedLocation.address,
                  coordinates: selectedLocation.coordinates
                } : undefined}
              />
              {errors.location && (
                <p className="text-error text-sm mt-1">La ubicación es requerida para eventos presenciales</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Objetivos y KPIs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-text">Objetivos y KPIs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Objetivos */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text">
                <Target className="w-4 h-4 inline mr-1" />
                Objetivos del evento
              </label>
              <div className="flex space-x-2 mb-3">
                <Input
                  placeholder="Agregar objetivo"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                />
                <Button type="button" onClick={addObjective} disabled={!newObjective.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-center justify-between bg-element p-2 rounded">
                    <span className="text-sm">{objective}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeObjective(index)}
                      className="text-error hover:text-error"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text">
                <Tag className="w-4 h-4 inline mr-1" />
                KPIs (Indicadores clave)
              </label>
              <div className="flex space-x-2 mb-3">
                <Input
                  placeholder="Agregar KPI"
                  value={newKpi}
                  onChange={(e) => setNewKpi(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKpi())}
                />
                <Button type="button" onClick={addKpi} disabled={!newKpi.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {kpis.map((kpi, index) => (
                  <div key={index} className="flex items-center justify-between bg-element p-2 rounded">
                    <span className="text-sm">{kpi}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKpi(index)}
                      className="text-error hover:text-error"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {mode === 'edit' ? 'Actualizando...' : 'Creando...'}
              </>
            ) : (
              mode === 'edit' ? 'Actualizar evento' : 'Crear evento'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}