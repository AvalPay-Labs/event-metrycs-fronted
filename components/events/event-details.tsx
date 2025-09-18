import React from "react";
import Image from "next/image";
import { Calendar, Users, Wallet, DollarSign, Award, Clock, Tag, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { EventMap } from "./event-map";
import { formatDate, formatCurrency, getEventTypeLabel } from "@/lib/utils";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  const getBadgeVariant = (type: string) => {
    switch(type) {
      case 'in-person': return 'primary';
      case 'virtual': return 'secondary';
      case 'hybrid': return 'accent';
      default: return 'outline';
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatTimezone = (timezone: string) => {
    const timezoneNames: { [key: string]: string } = {
      'America/Bogota': 'COT',
      'America/Mexico_City': 'CST',
      'America/New_York': 'EST',
      'America/Los_Angeles': 'PST',
      'Europe/Madrid': 'CET',
      'Europe/London': 'GMT',
      'Asia/Tokyo': 'JST',
    };
    return timezoneNames[timezone] || timezone;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-text">Detalles del evento</CardTitle>
            <Badge variant={getBadgeVariant(event.type) as BadgeProps['variant']}>
              {getEventTypeLabel(event.type)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Logo del evento */}
            {event.logoUrl && (
              <div className="flex justify-center">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-element">
                  <Image
                    src={event.logoUrl}
                    alt={`${event.name} logo`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
            
            {/* Fecha y horarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-textSecondary">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center text-textSecondary">
                <Clock className="w-4 h-4 mr-2" />
                <span>
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  <span className="text-xs ml-1">({formatTimezone(event.timezone)})</span>
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-textSecondary">Descripción</h3>
              <p className="mt-1 text-text">{event.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-textSecondary">Creado por</h3>
                <p className="mt-1 text-text">
                  {typeof event.creator === 'string' ? 'User' : (event.creator as { name: string }).name}
                </p>
              </div>
              
              {event.marketing && (
                <div>
                  <h3 className="text-sm font-medium text-textSecondary">Campaña de marketing</h3>
                  <p className="mt-1 text-text">{event.marketing.campaign}</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-start text-textSecondary mb-2">
                  <Target className="w-4 h-4 mr-2 mt-0.5" />
                  <h3 className="text-sm font-medium">Objetivos</h3>
                </div>
                {event.objectives && event.objectives.length > 0 ? (
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    {event.objectives.map((objective, index) => (
                      <li key={index} className="text-sm text-text">
                        {typeof objective === 'string' ? objective : JSON.stringify(objective)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-textSecondary/70 text-sm">No hay objetivos definidos</p>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start text-textSecondary mb-2">
                  <Tag className="w-4 h-4 mr-2 mt-0.5" />
                  <h3 className="text-sm font-medium">KPIs</h3>
                </div>
                {event.kpis && event.kpis.length > 0 ? (
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    {event.kpis.map((kpi, index) => (
                      <li key={index} className="text-sm text-text">
                        {typeof kpi === 'string' ? kpi : JSON.stringify(kpi)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-textSecondary/70 text-sm">No hay KPIs definidos</p>
                )}
              </div>
            </div>
            
            {event.specialGuests && event.specialGuests.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-textSecondary mb-2">Invitados especiales</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {event.specialGuests.map((guest, index) => (
                    <Badge key={index} variant="secondary">
                      {guest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {event.marketing && event.marketing.channels && (
              <div>
                <h3 className="text-sm font-medium text-textSecondary mb-2">Canales de marketing</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {event.marketing.channels.map((channel, index) => (
                    <Badge key={index} variant="outline">
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mapa de ubicación */}
      {event.location && (event.type === 'in-person' || event.type === 'hybrid') && (
        <Card>
          <CardContent className="pt-6">
            <EventMap location={event.location} eventName={event.name} />
          </CardContent>
        </Card>
      )}
      
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="mb-2 p-3 bg-secondary/10 rounded-full">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-text">{event.confirmedAttendees}</div>
              <p className="text-sm text-textSecondary">Asistentes</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="mb-2 p-3 bg-accent/10 rounded-full">
                <Wallet className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-text">{event.newWallets}</div>
              <p className="text-sm text-textSecondary">Wallets creadas</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="mb-2 p-3 bg-primary/10 rounded-full">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-text">{event.attendeesWithCertificate || 0}</div>
              <p className="text-sm text-textSecondary">Certificados</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="mb-2 p-3 bg-success/10 rounded-full">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-text">{formatCurrency(event.totalCost || 0)}</div>
              <p className="text-sm text-textSecondary">Costo total</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}