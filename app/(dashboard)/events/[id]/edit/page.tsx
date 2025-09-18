"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { EventForm } from "@/components/events/event-form";
import { useEvents, useEvent } from "@/lib/hooks/use-events";
import { EventFormData } from "@/types/event";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { updateEvent, isUpdating } = useEvents();
  const { data: event, isLoading, isError } = useEvent(id);

  const handleSubmit = async (data: EventFormData) => {
    try {
      await updateEvent({ id, data });
      router.push(`/events/${id}`);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/events/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-xl font-semibold text-error mb-4">Error al cargar el evento</h2>
        <p className="text-textSecondary mb-6">No se pudieron cargar los datos del evento. Por favor intenta nuevamente.</p>
        <div className="flex space-x-3">
          <Link href={`/events/${id}`}>
            <Button variant="outline">Volver al Evento</Button>
          </Link>
          <Link href="/events">
            <Button>Volver a Eventos</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Preparar los datos del evento para el formulario
  const defaultValues: Partial<EventFormData> = {
    name: event.name,
    description: event.description,
    date: new Date(event.date).toISOString().split('T')[0], // Convertir a formato YYYY-MM-DD
    type: event.type,
    logo: event.logo as unknown as File,
    objectives: event.objectives || [],
    kpis: event.kpis || [],
    // Agregar otros campos si existen
    confirmedAttendees: event.confirmedAttendees,
    totalAttendees: event.totalAttendees,
    attendeesWithCertificate: event.attendeesWithCertificate,
    previosEventAttendees: event.previosEventAttendees,
    newWallets: event.newWallets,
    transactionsAfterEvent: event.transactionsAfterEvent,
    totalCost: event.totalCost,
    budgetSurplusDeficit: event.budgetSurplusDeficit,
    marketing: event.marketing,
    virtualMetrics: event.virtualMetrics,
    registeredAttendees: event.registeredAttendees,
    specialGuests: event.specialGuests,
    openedWalletAddresses: event.openedWalletAddresses,
    transactionsDuringEvent: event.transactionsDuringEvent
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Eventos", href: "/events" },
          { label: event.name, href: `/events/${id}` },
          { label: "Editar", href: `/events/${id}/edit` },
        ]}
      />
      
      <PageHeader
        title={`Editar ${event.name}`}
        subtitle="Actualiza los detalles e información del evento"
      />
      
      <EventForm 
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isUpdating}
        mode="edit"
      />
    </div>
  );
}