export interface Organization {
    _id: string;
    name: string;
    logo?: {
        key: string;
        originalName: string;
        size: number;
        uploadedAt: string;
    };
    website: string;
    twitter?: string;
    description: string;
    reference?: string;
    status: 'active' | 'inactive';
    createdBy: string;
    approvedBy?: string;
    approvedAt?: string;
    createdAt: string;
    updatedAt: string;
    membership?: {
        role: 'owner' | 'admin' | 'member';
        permissions: string[];
        joinedAt: string;
    };
}

export interface OrganizationRequest {
    _id: string;
    organizationName: string;
    logo?: {
        key: string;
        originalName: string;
        size: number;
        uploadedAt: string;
    };
    website: string;
    twitter?: string;
    description: string;
    reference?: string;
    requestedRole: string;
    userId: string;
    status: 'pending' | 'approved' | 'rejected';
    reviewedBy?: string;
    reviewedAt?: string;
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrganizationRequestData {
    organizationName: string;
    website: string;
    twitter?: string;
    description: string;
    reference?: string;
    requestedRole: string;
    logo?: File;
}

export interface OrganizationMembership {
    _id: string;
    userId: string;
    organizationId: Organization;
    role: 'owner' | 'admin' | 'member';
    permissions: string[];
    status: 'active' | 'inactive' | 'pending';
    joinedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserCurrentOrganization {
    _id: string;
    userId: string;
    organizationId: Organization;
    role: 'owner' | 'admin' | 'member';
    permissions: string[];
    status: 'active' | 'inactive' | 'pending';
    joinedAt: string;
    createdAt: string;
    updatedAt: string;
}