import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types/event";
import { formatCurrency } from "@/lib/utils";

interface EventMetricsProps {
  event: Event;
}

export function EventMetrics({ event }: EventMetricsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Registered</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {event.registeredAttendees?.length || 0}
                </div>
              </div>
              
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Confirmed</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {event.confirmedAttendees || 0}
                </div>
              </div>
              
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Total attendees</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {event.totalAttendees || 0}
                </div>
              </div>
              
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Previous event attendees</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {event.previosEventAttendees || 0}
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-textSecondary mb-2">Attendance rate</div>
              <div className="w-full bg-input rounded-full h-2">
                <div 
                  className="bg-secondary h-2 rounded-full"
                  style={{ 
                    width: `${event.registeredAttendees?.length ? 
                      (event.confirmedAttendees || 0) / event.registeredAttendees.length * 100 : 0}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-textSecondary">
                <span>0%</span>
                <span>
                  {event.registeredAttendees?.length ? 
                    ((event.confirmedAttendees || 0) / event.registeredAttendees.length * 100).toFixed(1) : 0}%
                </span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Wallet metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">New wallets</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {event.newWallets || 0}
                </div>
              </div>
              
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Registered wallets</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {event.openedWalletAddresses?.length || 0}
                </div>
              </div>
              
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Tx during event</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {event.transactionsDuringEvent?.reduce((sum, tx) => sum + tx.count, 0) || 0}
                </div>
              </div>
              
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Tx after event</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {event.transactionsAfterEvent || 0}
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-textSecondary mb-2">Wallet creation rate</div>
              <div className="w-full bg-input rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full"
                  style={{ 
                    width: `${event.confirmedAttendees ? 
                      (event.newWallets || 0) / event.confirmedAttendees * 100 : 0}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-textSecondary">
                <span>0%</span>
                <span>
                  {event.confirmedAttendees ? 
                    ((event.newWallets || 0) / event.confirmedAttendees * 100).toFixed(1) : 0}%
                </span>
                <span>100%</span>
              </div>
            </div>
          </div>
          
          {event.transactionsDuringEvent && event.transactionsDuringEvent.length > 0 && (
            <div className="mt-4 pt-4 border-t border-element">
              <div className="text-sm font-medium mb-3 text-text">Transactions by type</div>
              <div className="space-y-2">
                {event.transactionsDuringEvent.map((tx, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-textSecondary">{tx.type}</span>
                    <span className="font-medium text-text">{tx.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Financial metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Total cost</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {formatCurrency(event.totalCost || 0)}
                </div>
              </div>
              
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Budget difference</div>
                <div className={`text-xl font-bold mt-1 ${(event.budgetSurplusDeficit || 0) < 0 ? 'text-error' : 'text-success'}`}>
                  {formatCurrency(event.budgetSurplusDeficit || 0)}
                </div>
              </div>
              
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Cost per wallet</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {event.newWallets ? 
                    formatCurrency((event.totalCost || 0) / event.newWallets) : 
                    formatCurrency(0)
                  }
                </div>
              </div>
              
              <div className="bg-element p-3 rounded-md">
                <div className="text-sm text-textSecondary">Cost per attendee</div>
                <div className="text-xl font-bold mt-1 text-text">
                  {event.confirmedAttendees ? 
                    formatCurrency((event.totalCost || 0) / event.confirmedAttendees) : 
                    formatCurrency(0)
                  }
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-textSecondary mb-2">Budget efficiency</div>
              <div className="w-full bg-input rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${(event.budgetSurplusDeficit || 0) < 0 ? 'text-error' : 'text-success'}`}
                  style={{ 
                    width: `${event.totalCost ? 
                      Math.min(100, Math.abs((event.budgetSurplusDeficit || 0) / event.totalCost * 100)) : 0}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-textSecondary">
                <span>{event.totalCost ? 
                  ((event.budgetSurplusDeficit || 0) / event.totalCost * 100).toFixed(1) : 0}%
                </span>
                <span>of the budget {(event.budgetSurplusDeficit || 0) < 0 ? 'exceeded' : 'surplus'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}