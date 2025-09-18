import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../ui/table";
import { formatCurrency } from "@/lib/utils";
import { Medal, Award, ArrowUpDown } from "lucide-react";
import { UserMetrics } from "@/types/analytics";

interface UserMetricsTableProps {
  metrics?: UserMetrics[];
  isLoading?: boolean;
}

export function UserMetricsTable({ metrics, isLoading = false }: UserMetricsTableProps) {
  const placeholderMetrics: UserMetrics[] = [
    {
      _id: "1",
      userName: "Juan Rodriguez",
      eventCount: 12,
      totalAttendees: 847,
      totalNewWallets: 325,
      totalCost: 15200,
      efficiency: 0.021
    },
    {
      _id: "2",
      userName: "Maria Morales",
      eventCount: 9,
      totalAttendees: 612,
      totalNewWallets: 238,
      totalCost: 9800,
      efficiency: 0.024
    },
    {
      _id: "3",
      userName: "Carlos Silva",
      eventCount: 7,
      totalAttendees: 528,
      totalNewWallets: 187,
      totalCost: 8400,
      efficiency: 0.022
    }
  ];

  const data = metrics || placeholderMetrics;
  const [sortBy, setSortBy] = React.useState("efficiency");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const factor = sortDir === "asc" ? 1 : -1;
      return factor * ((a as unknown as Record<string, number>)[sortBy] - (b as unknown as Record<string, number>)[sortBy]);
    });
  }, [data, sortBy, sortDir]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("desc");
    }
  };

  const renderSortIcon = (column: string) => {
    if (sortBy !== column) return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return sortDir === "asc" ? 
      <ArrowUpDown className="w-4 h-4" style={{ transform: 'scaleY(-1)' }} /> : 
      <ArrowUpDown className="w-4 h-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("eventCount")}>
                <div className="flex items-center">
                  Events {renderSortIcon("eventCount")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("totalAttendees")}>
                <div className="flex items-center">
                  Attendees {renderSortIcon("totalAttendees")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("totalNewWallets")}>
                <div className="flex items-center">
                  Wallets {renderSortIcon("totalNewWallets")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("totalCost")}>
                <div className="flex items-center">
                  Cost {renderSortIcon("totalCost")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("efficiency")}>
                <div className="flex items-center">
                  Efficiency {renderSortIcon("efficiency")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-textSecondary">
                  Loading data...
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>
                    {index === 0 ? (
                      <Medal className="w-5 h-5 text-accent" />
                    ) : index === 1 ? (
                      <Medal className="w-5 h-5 text-secondary" />
                    ) : index === 2 ? (
                      <Medal className="w-5 h-5 text-primary" />
                    ) : (
                      index + 1
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{user.userName}</TableCell>
                  <TableCell>{user.eventCount}</TableCell>
                  <TableCell>{user.totalAttendees.toLocaleString()}</TableCell>
                  <TableCell>{user.totalNewWallets.toLocaleString()}</TableCell>
                  <TableCell>{formatCurrency(user.totalCost)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="font-medium text-success">
                        {(user.efficiency * 100).toFixed(1)}%
                      </span>
                      {index === 0 && <Award className="w-4 h-4 text-accent ml-1" />}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}