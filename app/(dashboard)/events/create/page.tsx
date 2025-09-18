"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { EventForm } from "@/components/events/event-form";
import { useEvents } from "@/lib/hooks/use-events";
import { EventFormData } from "@/types/event";

export default function CreateEventPage() {
  const router = useRouter();
  const { createEvent } = useEvents();

  const handleSubmit = async (data: EventFormData) => {
    try {
      const newEvent = await createEvent(data);
      router.push(`/events/${newEvent._id}`);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Events", href: "/events" },
          { label: "Create Event", href: "/events/create" },
        ]}
      />
      
      <PageHeader
        title="Create Event"
        subtitle="Create a new blockchain event"
      />
      
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
}