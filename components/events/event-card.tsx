import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge, BadgeProps } from "../ui/badge";
import { formatDate, getEventTypeLabel } from "@/lib/utils";
import { Calendar, Users, Wallet, ArrowRight } from "lucide-react";
import type { Event } from "@/types/event";
import Image from "next/image";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const getBadgeVariant = (type: string) => {
    switch(type) {
      case 'in-person': return 'primary';
      case 'virtual': return 'secondary';
      case 'hybrid': return 'accent';
      default: return 'outline';
    }
  };

  return (
    <Link href={`/events/${event._id}`} className="block transition-transform hover:-translate-y-1 cursor-pointer">
      <Card className="h-full overflow-hidden hover:border-primary/50">
        <div className="relative h-40 overflow-hidden">
          {event.logo ? (
            <Image 
              src={event.logo as unknown as string} 
              alt={event.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <Calendar className="w-16 h-16 text-text/30" />
            </div>
          )}
          <Badge 
            variant={getBadgeVariant(event.type) as BadgeProps['variant']}
            className="absolute top-3 right-3"
          >
            {getEventTypeLabel(event.type)}
          </Badge>
        </div>
        
        <CardContent className="pt-4">
          <h3 className="text-lg font-semibold line-clamp-2 text-text">{event.name}</h3>
          <p className="text-sm text-textSecondary mt-1 line-clamp-2">{event.description}</p>
          
          <div className="flex items-center mt-3 text-sm text-textSecondary">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center p-2 rounded bg-element">
              <Users className="w-4 h-4 mb-1 text-primary" />
              <span className="text-sm font-medium text-text">{event.confirmedAttendees}</span>
              <span className="text-xs text-textSecondary">Attendees</span>
            </div>
            
            <div className="flex flex-col items-center p-2 rounded bg-element">
              <Wallet className="w-4 h-4 mb-1 text-accent" />
              <span className="text-sm font-medium text-text">{event.newWallets}</span>
              <span className="text-xs text-textSecondary">Wallets</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-3 pb-4 border-t border-element flex justify-between">
          <div className="flex items-center text-xs text-textSecondary">
            <span>Created by </span>
            <span className="font-medium ml-1 text-text">
              {typeof event.creator === 'string' ? 'User' : (event.creator as { name: string }).name}
            </span>
          </div>
          
          <div className="text-xs font-medium text-primary flex items-center">
            See details <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}