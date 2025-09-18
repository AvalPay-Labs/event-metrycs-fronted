import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-element pb-6">
        <div>
          <div className="h-9 w-48 bg-element rounded mb-2"></div>
          <div className="h-5 w-80 bg-element rounded"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-element rounded"></div>
          <div className="h-10 w-32 bg-element rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-element rounded"></div>
                <div className="h-7 w-16 bg-element rounded"></div>
                <div className="h-3 w-24 bg-element rounded"></div>
              </div>
              <div className="h-12 w-12 bg-element rounded-full"></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="h-5 w-32 bg-element rounded"></div>
              <div className="h-4 w-20 bg-element rounded"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center p-3 bg-element rounded-lg">
                  <div className="w-10 h-10 bg-element/50 rounded-full flex items-center justify-center mr-4"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="h-4 w-32 bg-element/50 rounded"></div>
                      <div className="h-4 w-16 bg-element/50 rounded-full"></div>
                    </div>
                    <div className="h-3 w-24 bg-element/50 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="h-5 w-40 bg-element rounded"></div>
              <div className="h-4 w-20 bg-element rounded"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center p-3 bg-element rounded-lg">
                  <div className="w-10 h-10 bg-element/50 rounded-full flex items-center justify-center mr-4"></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div className="h-4 w-32 bg-element/50 rounded"></div>
                      <div className="h-4 w-20 bg-element/50 rounded"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-3 w-36 bg-element/50 rounded"></div>
                      <div className="h-3 w-16 bg-element/50 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="h-5 w-32 bg-element rounded"></div>
            <div className="h-4 w-28 bg-element rounded"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <Spinner size="lg" variant="primary" className="opacity-30" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}