import { Organization } from "./organization";

export interface User {
    _id: string;
    handle: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    region: string;
    profilePicture?: string;
    currentOrganizationId?: string;
    createdAt: string;
    updatedAt: string;
}
  
export interface AuthUser extends User {
    token: string;
    currentOrganizationId?: string;
    organizations?: Organization[];
    currentOrganization?: Organization;
}
  
export interface LoginCredentials {
    email: string;
    password: string;
}
  
export interface RegisterData {
    handle: string;
    name: string;
    email: string;
    password: string;
    region: string;
}