import apiClient from './axios-config';
import { Organization, OrganizationRequest, CreateOrganizationRequestData } from '@/types/organization';

export const getUserOrganizations = async (): Promise<Organization[]> => {
    const response = await apiClient.get('/organization/user-organizations');
    return response.data;
};

export const switchOrganization = async (organizationId: string): Promise<{ organization: Organization }> => {
    const response = await apiClient.post('/organization/switch', { organizationId });
    return response.data;
};

export const createOrganizationRequest = async (data: CreateOrganizationRequestData): Promise<{ message: string; requestId: string }> => {
    const formData = new FormData();
    formData.append('organizationName', data.organizationName);
    formData.append('website', data.website);
    if (data.twitter) formData.append('twitter', data.twitter);
    formData.append('description', data.description);
    if (data.reference) formData.append('reference', data.reference);
    formData.append('requestedRole', data.requestedRole);
    if (data.logo) formData.append('logo', data.logo);

    const response = await apiClient.post('/organization/request', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getUserOrganizationRequests = async (): Promise<OrganizationRequest[]> => {
    const response = await apiClient.get('/organization/requests');
    return response.data;
};