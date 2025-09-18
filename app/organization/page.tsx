"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/lib/hooks/use-auth";
import { useOrganizations } from "@/lib/hooks/use-organization";
import { CreateOrganizationModal } from "@/components/organizations/create-organization-modal";
import { OrganizationRequestsStatus } from "@/components/organizations/organization-requests-status";
import { BarChart3, Plus, Building, ExternalLink, Calendar } from "lucide-react";
import { Organization } from "@/types/organization";
import { OrganizationRequest } from "@/types/organization";

export default function OrganizationSelectPage() {
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();
    const {
        organizations,
        requests,
        isLoadingOrganizations,
        switchToOrganization,
        isSwitching
    } = useOrganizations();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedOrgId, setSelectedOrgId] = useState<string>('');

    const handleSelectOrganization = async (organizationId: string) => {
        setSelectedOrgId(organizationId);
        await switchToOrganization(organizationId);
        router.push('/dashboard');
    };

    if (authLoading || isLoadingOrganizations) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <Spinner size="lg" className="mx-auto mb-4 text-blue-500" />
                    <p className="text-white">Loading organizations...</p>
                </div>
            </div>
        );
    }

    const hasPendingRequests = requests.some((req : OrganizationRequest) => req.status === 'pending');

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-semibold">EventMetrics</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-slate-300">
                                Welcome, {user?.name}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Select your organization
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Choose the organization you want to work with or create a new one
                    </p>
                </div>

                {hasPendingRequests && (
                    <div className="mb-8">
                        <OrganizationRequestsStatus requests={requests} />
                    </div>
                )}

                {organizations.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {organizations.map((org : Organization) => (
                                <Card key={org._id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                                                    <Building className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg text-white">
                                                        {org.name}
                                                    </CardTitle>
                                                    <Badge variant={org.membership?.role === 'owner' ? 'accent' : 'secondary'}>
                                                        {org.membership?.role}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center text-sm text-slate-300">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                <a 
                                                    href={org.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-blue-400 transition-colors truncate"
                                                >
                                                    {org.website.replace('https://', '').replace('http://', '')}
                                                </a>
                                            </div>
                                            
                                            {org.membership?.joinedAt && (
                                                <div className="flex items-center text-sm text-slate-400">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    Member since {new Date(org.membership.joinedAt).toLocaleDateString('es-ES')}
                                                </div>
                                            )}
                                        </div>

                                        <Button
                                            onClick={() => handleSelectOrganization(org._id)}
                                            disabled={isSwitching && selectedOrgId === org._id}
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                        >
                                            {isSwitching && selectedOrgId === org._id ? (
                                                <>
                                                    <Spinner size="sm" className="mr-2" />
                                                    Accessing...
                                                </>
                                            ) : (
                                                'Access'
                                            )}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                variant="outline"
                                size="lg"
                                className="border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create new organization
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Building className="w-12 h-12 text-slate-400" />
                        </div>
                        
                        <h3 className="text-2xl font-semibold mb-4">
                            You are not a member of any organization
                        </h3>
                        
                        <p className="text-slate-300 mb-8 max-w-md mx-auto">
                            Create your first organization to start using EventMetrics
                        </p>
                        <div className="flex justify-center">
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create organization
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <CreateOrganizationModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            />
        </div>
    );
}