import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../ui/table";
import { RegionMetrics } from "@/types/analytics";
import { formatCurrency } from "@/lib/utils";

interface RegionMapProps {
  data?: RegionMetrics[];
  isLoading?: boolean;
}

export function RegionMap({ data, isLoading = false }: RegionMapProps) {
  const placeholderData: RegionMetrics[] = [
    { _id: "1", region: "México", eventCount: 25, totalAttendees: 1850, totalNewWallets: 650, totalCost: 28500 },
    { _id: "2", region: "Colombia", eventCount: 18, totalAttendees: 1280, totalNewWallets: 420, totalCost: 19800 },
    { _id: "3", region: "Brasil", eventCount: 22, totalAttendees: 1650, totalNewWallets: 580, totalCost: 24600 },
    { _id: "4", region: "Argentina", eventCount: 12, totalAttendees: 950, totalNewWallets: 320, totalCost: 14500 },
    { _id: "5", region: "Chile", eventCount: 8, totalAttendees: 580, totalNewWallets: 180, totalCost: 9500 }
  ];

  const regionsData = data || placeholderData;
  
  const totalWallets = regionsData.reduce((sum, item) => sum + item.totalNewWallets, 0);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Region distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-8 text-center text-textSecondary">Loading data...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Wallets</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>% of total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regionsData.map((region) => {
                const percentage = ((region.totalNewWallets / totalWallets) * 100).toFixed(1);
                
                return (
                  <TableRow key={region._id}>
                    <TableCell className="font-medium">{region.region}</TableCell>
                    <TableCell>{region.eventCount}</TableCell>
                    <TableCell>{region.totalAttendees.toLocaleString()}</TableCell>
                    <TableCell>{region.totalNewWallets.toLocaleString()}</TableCell>
                    <TableCell>{formatCurrency(region.totalCost)}</TableCell>
                    <TableCell>
                      <div className="w-full bg-input rounded-full h-2 mb-1">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-textSecondary">{percentage}%</span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}