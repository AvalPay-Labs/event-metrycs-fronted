"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OrganizationRequest } from '@/types/organization';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface OrganizationRequestsStatusProps {
    requests: OrganizationRequest[];
}

export function OrganizationRequestsStatus({ requests }: OrganizationRequestsStatusProps) {
    const pendingRequests = requests.filter(req => req.status === 'pending');
    const approvedRequests = requests.filter(req => req.status === 'approved').slice(0, 2);
    const rejectedRequests = requests.filter(req => req.status === 'rejected').slice(0, 2);

    if (requests.length === 0) return null;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'approved':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'rejected':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">Pending</Badge>;
            case 'approved':
                return <Badge variant="success" className="bg-green-500/20 text-green-300">Approved</Badge>;
            case 'rejected':
                return <Badge variant="error" className="bg-red-500/20 text-red-300">Rejected</Badge>;
            default:
                return <Badge variant="secondary">Unknown</Badge>;
        }
    };

    return (
        <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">
                        Status of organization requests
                    </h3>
                </div>

                <div className="space-y-3">
                    {pendingRequests.map(request => (
                        <div key={request._id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                                {getStatusIcon(request.status)}
                                <div>
                                    <p className="font-medium text-white">{request.organizationName}</p>
                                    <p className="text-sm text-slate-400">
                                        Requested at {new Date(request.createdAt).toLocaleDateString('es-ES')}
                                    </p>
                                </div>
                            </div>
                            {getStatusBadge(request.status)}
                        </div>
                    ))}

                    {approvedRequests.map(request => (
                        <div key={request._id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                                {getStatusIcon(request.status)}
                                <div>
                                    <p className="font-medium text-white">{request.organizationName}</p>
                                    <p className="text-sm text-slate-400">
                                        Approved at {request.reviewedAt ? new Date(request.reviewedAt).toLocaleDateString('es-ES') : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            {getStatusBadge(request.status)}
                        </div>
                    ))}

                    {rejectedRequests.map(request => (
                        <div key={request._id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                                {getStatusIcon(request.status)}
                                <div>
                                    <p className="font-medium text-white">{request.organizationName}</p>
                                    <p className="text-sm text-slate-400">
                                        Rejected at {request.reviewedAt ? new Date(request.reviewedAt).toLocaleDateString('es-ES') : 'N/A'}
                                    </p>
                                    {request.rejectionReason && (
                                        <p className="text-xs text-red-400 mt-1">
                                            Reason: {request.rejectionReason}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {getStatusBadge(request.status)}
                        </div>
                    ))}
                </div>

                {pendingRequests.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <p className="text-sm text-yellow-300">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {pendingRequests.length === 1 
                                ? 'You have 1 pending request for review.' 
                                : `You have ${pendingRequests.length} pending requests for review.`
                            }
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}