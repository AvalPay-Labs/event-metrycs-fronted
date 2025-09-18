"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  Users, 
  Wallet, 
  DollarSign, 
  Edit,
  Trash,
  FileText,
  ImageIcon,
  Clock
} from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { formatDate, formatCurrency, getEventTypeLabel } from "@/lib/utils";
import { Event } from "@/types/event";
import { Dialog } from "@/components/ui/dialog";

interface EventsTableProps {
  events: Event[];
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export function EventsTable({ events, onDelete, isLoading = false }: EventsTableProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedEventId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedEventId && onDelete) {
      onDelete(selectedEventId);
    }
    setShowDeleteDialog(false);
  };

  const getBadgeVariant = (type: string) => {
    switch(type) {
      case 'in-person': return 'primary';
      case 'virtual': return 'secondary';
      case 'hybrid': return 'accent';
      default: return 'default';
    }
  };

  return (
    <>
      <div className="rounded-md border border-element overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Wallets</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-32">
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className="w-8 h-8 text-textSecondary animate-pulse mb-2" />
                    <p className="text-textSecondary">Loading events...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-32">
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className="w-8 h-8 text-textSecondary mb-2" />
                    <p className="text-textSecondary">No events available</p>
                    <Link href="/events/create" className="mt-2">
                      <Button size="sm">Create event</Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event._id} className="group">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-element flex items-center justify-center flex-shrink-0">
                        {event.logoUrl ? (
                          <Image
                            src={event.logoUrl}
                            alt={`${event.name} logo`}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback si la imagen no carga
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-textSecondary" />
                        )}
                        <Calendar className="w-5 h-5 text-primary hidden" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{event.name}</div>
                        <div className="text-sm text-textSecondary truncate max-w-[200px]">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1 text-textSecondary" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-xs text-textSecondary">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(event.startTime)} - {formatDate(event.endTime)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(event.type) as BadgeProps['variant']}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-secondary" />
                      <span>{event.confirmedAttendees || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Wallet className="w-4 h-4 mr-1 text-accent" />
                      <span>{event.newWallets || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-success" />
                      <span>{formatCurrency(event.totalCost || 0)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/events/${event._id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 cursor-pointer">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/events/${event._id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 cursor-pointer">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-error hover:text-error cursor-pointer"
                        onClick={() => handleDeleteClick(event._id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Delete event"
        description="Are you sure you want to delete this event? This action cannot be undone."
      >
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            className="text-error hover:text-error"
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
}