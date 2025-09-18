"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { EventsTable } from "@/components/events/events-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEvents } from "@/lib/hooks/use-events";

export default function EventsPage() {
  const { events, eventsQuery, pagination, setQueryParams, deleteEvent } = useEvents();
  
  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Events", href: "/events" },
        ]}
      />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader 
          title="Events" 
        />
        
        <Link href="/events/create">
          <Button leftIcon={<Plus className="w-4 h-4" />} className="cursor-pointer">
            Create Event
          </Button>
        </Link>
      </div>
      
      <EventsTable 
        events={events} 
        isLoading={eventsQuery.isLoading}
        onDelete={handleDelete}
      />
      
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <Button
            variant="outline"
            onClick={() => 
              setQueryParams(prev => ({ ...prev, page: Math.max(1, (prev.page ?? 1) - 1) }))
            }
            disabled={pagination.currentPage === 1}
          >
            Previous
          </Button>
          
          <span className="text-sm text-textSecondary">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <Button
            variant="outline"
            onClick={() => 
              setQueryParams(prev => ({ ...prev, page: Math.min(pagination.totalPages, (prev.page ?? 1) + 1) }))
            }
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}