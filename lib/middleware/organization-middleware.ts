"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/use-auth';
import { useOrganizations } from '../hooks/use-organization';

export function useOrganizationGuard() {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const { organizations, isLoadingOrganizations } = useOrganizations();

    useEffect(() => {
        if (isLoading || isLoadingOrganizations) return;

        if (!user) {
            router.push('/login');
            return;
        }

        if (organizations.length === 0) {
            router.push('/organizations/select');
            return;
        }

        if (!user.currentOrganizationId && !user.currentOrganization) {
            router.push('/organizations/select');
            return;
        }
    }, [user, organizations, isLoading, isLoadingOrganizations, router]);

    return {
        isReady: !isLoading && !isLoadingOrganizations && user && (user.currentOrganizationId || user.currentOrganization),
        user,
        organizations
    };
}