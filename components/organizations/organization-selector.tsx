"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/lib/hooks/use-auth';
import { useOrganizations } from '@/lib/hooks/use-organization';
import { CreateOrganizationModal } from './create-organization-modal';
import { ChevronDown, Building, Plus, ExternalLink, Check } from 'lucide-react';
import { Organization, UserCurrentOrganization } from '@/types/organization';

export function OrganizationSelector() {
    const { user } = useAuth();
    const { 
        organizations, 
        switchToOrganization, 
        isSwitching 
    } = useOrganizations();

    const [showSelector, setShowSelector] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [switchingToId, setSwitchingToId] = useState<string>('');

    const currentOrganization = React.useMemo((): Organization | null => {
        if (user?.currentOrganization && 'organizationId' in user.currentOrganization) {
            const currentOrg = user.currentOrganization as unknown as UserCurrentOrganization;
            return {
                ...currentOrg.organizationId,
                membership: {
                    role: currentOrg.role,
                    permissions: currentOrg.permissions,
                    joinedAt: currentOrg.joinedAt
                }
            };
        }
        
        if (user?.currentOrganizationId && organizations.length > 0) {
            return organizations.find(org => org._id === user.currentOrganizationId) || null;
        }
        
        return null;
    }, [user?.currentOrganization, user?.currentOrganizationId, organizations]);

    const handleSwitchOrganization = async (organizationId: string) => {
        setSwitchingToId(organizationId);
        await switchToOrganization(organizationId);
        setSwitchingToId('');
        setShowSelector(false);
    };

    console.log('OrganizationSelector Debug:', {
        user: user,
        organizations: organizations,
        currentOrganization: currentOrganization
    });

    if (!currentOrganization) {
        return (
            <div className="text-center py-4">
                <p className="text-sm text-slate-400 mb-3">
                    No organization
                </p>
                <Button
                    size="sm"
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create organization
                </Button>
            </div>
        );
    }

    return (
        <>
            <div>
                <p className="text-xs text-slate-400 mb-2">Current organization</p>
                
                <Button
                    variant="outline"
                    className="w-full justify-between border-slate-700 hover:border-slate-600 hover:bg-slate-800"
                    onClick={() => setShowSelector(true)}
                >
                    <div className="flex items-center space-x-2 min-w-0">
                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                            <Building className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-left min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {currentOrganization.name}
                            </p>
                            <p className="text-xs text-slate-400">
                                {currentOrganization.membership?.role || 'Miembro'}
                            </p>
                        </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </Button>
            </div>

            <Dialog
                isOpen={showSelector}
                onClose={() => setShowSelector(false)}
                title="Change organization"
                description="Select the organization you want to work with"
                className="bg-slate-900 border-slate-800 text-white max-w-2xl"
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        {organizations.map((org) => (
                            <div
                                key={org._id}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                    org._id === currentOrganization._id
                                        ? 'border-blue-500 bg-blue-500/10'
                                        : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                                }`}
                                onClick={() => org._id !== currentOrganization._id && handleSwitchOrganization(org._id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                                            <Building className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-medium text-white truncate">
                                                {org.name}
                                            </h3>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Badge 
                                                    variant={org.membership?.role === 'owner' ? 'accent' : 'secondary'}
                                                    className="text-xs"
                                                >
                                                    {org.membership?.role}
                                                </Badge>
                                                {org.website && (
                                                    <a
                                                        href={org.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-400 hover:text-blue-400 transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {org._id === currentOrganization._id && (
                                            <Check className="w-5 h-5 text-green-500" />
                                        )}
                                        
                                        {isSwitching && switchingToId === org._id && (
                                            <Spinner size="sm" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                        <Button
                            variant="outline"
                            className="w-full border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                            onClick={() => {
                                setShowSelector(false);
                                setShowCreateModal(true);
                            }}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create new organization
                        </Button>
                    </div>
                </div>
            </Dialog>

            <CreateOrganizationModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            />
        </>
    );
}