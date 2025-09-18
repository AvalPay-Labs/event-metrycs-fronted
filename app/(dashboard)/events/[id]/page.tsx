"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { EventDetails } from "@/components/events/event-details";
import { EventMetrics } from "@/components/events/event-metrics";
import { ImportDataForm } from "@/components/events/import-data-form";
import { Button } from "@/components/ui/button";
import { Edit, Trash, RefreshCw } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useEvents, useEvent } from "@/lib/hooks/use-events";
import { Spinner } from "@/components/ui/spinner";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { deleteEvent, importEventData, refetchEvent } = useEvents();
  const { data: event, isLoading, isError, error } = useEvent(id);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEvent(id);
      router.push("/events");
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleImport = async (eventId: string, file: File, type: 'attendees' | 'metrics' = 'attendees') => {
    try {
      console.log('📥 handleImport called with:', { eventId, fileName: file.name, type });
      // Llamar correctamente con parámetros separados
      await importEventData(eventId, file, type);
      // Los datos se actualizarán automáticamente gracias a React Query
    } catch (error) {
      console.error("Error importing data:", error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetchEvent(id);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !event) {
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error loading event';
    
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-xl font-semibold text-error mb-4">Error loading event</h2>
        <p className="text-textSecondary mb-6 text-center max-w-md">{errorMessage}</p>
        <div className="flex space-x-3">
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Link href="/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Eventos", href: "/events" },
          { label: event.name, href: `/events/${id}` },
        ]}
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title={event.name} subtitle={event.description} />
        
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          
          <Link href={`/events/${id}/edit`}>
            <Button variant="outline" leftIcon={<Edit className="w-4 h-4" />}>
              Editar
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className="text-error hover:text-error"
            leftIcon={<Trash className="w-4 h-4" />}
            onClick={() => setShowDeleteDialog(true)}
            disabled={isDeleting}
          >
            Eliminar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <EventDetails event={event} />
          <ImportDataForm 
            eventId={id}
            onImport={handleImport}
          />
        </div>
        
        <div className="lg:col-span-2">
          <EventMetrics event={event} />
        </div>
      </div>

      <Dialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Eliminar evento"
        description="¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer."
      >
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowDeleteDialog(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="ghost"
            className="text-error hover:text-error"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}