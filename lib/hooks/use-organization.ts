"use client";

import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
    getUserOrganizations, 
    switchOrganization, 
    createOrganizationRequest,
    getUserOrganizationRequests
} from '../api/organizations-api';
import { Organization, CreateOrganizationRequestData } from '@/types/organization';
import { useAuthStore } from '../store/auth-store';

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
}

export function useOrganizations() {
    const queryClient = useQueryClient();
    const { user, setUser } = useAuthStore();

    const organizationsQuery = useQuery({
        queryKey: ['user-organizations'],
        queryFn: getUserOrganizations,
        enabled: !!user,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const requestsQuery = useQuery({
        queryKey: ['organization-requests'],
        queryFn: getUserOrganizationRequests,
        enabled: !!user,
        staleTime: 60 * 1000, // 1 minute
    });

    const switchOrgMutation = useMutation({
        mutationFn: switchOrganization,
        onSuccess: (data: { organization: Organization }) => {
            setUser({
                ...user!,
                currentOrganizationId: data.organization._id,
                currentOrganization: data.organization
            });
            
            toast.success(`Changed to ${data.organization.name}`);
            
            queryClient.invalidateQueries({ queryKey: ['events'] });
            queryClient.invalidateQueries({ queryKey: ['analytics'] });
        },
        onError: (error: ApiError) => {
            toast.error(
                error?.response?.data?.message || 'Error changing organization'
            );
        },
    });

    const createRequestMutation = useMutation({
        mutationFn: createOrganizationRequest,
        onSuccess: () => {
            toast.success('Organization request sent successfully');
            queryClient.invalidateQueries({ queryKey: ['organization-requests'] });
        },
        onError: (error: ApiError) => {
            toast.error(
                error?.response?.data?.message || 'Error creating organization request'
            );
        },
    });

    const switchToOrganization = useCallback((organizationId: string) => {
        switchOrgMutation.mutate(organizationId);
    }, [switchOrgMutation]);

    const createRequest = useCallback((data: CreateOrganizationRequestData) => {
        return createRequestMutation.mutateAsync(data);
    }, [createRequestMutation]);

    return {
        organizations: organizationsQuery.data || [],
        requests: requestsQuery.data || [],
        
        isLoadingOrganizations: organizationsQuery.isLoading,
        isLoadingRequests: requestsQuery.isLoading,
        isSwitching: switchOrgMutation.isPending,
        isCreatingRequest: createRequestMutation.isPending,

        organizationsError: organizationsQuery.error,
        requestsError: requestsQuery.error,

        switchToOrganization,
        createRequest,
        refetchOrganizations: organizationsQuery.refetch,
        refetchRequests: requestsQuery.refetch,
    };
}