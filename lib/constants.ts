// API endpoints
export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      ME: '/auth/me',
    },
    EVENTS: {
      BASE: '/events',
      BY_ID: (id: string) => `/events/${id}`,
      IMPORT: '/events/import',
    },
    USERS: {
      BASE: '/users',
      BY_ID: (id: string) => `/users/${id}`,
      PROFILE: '/users/profile',
      PROFILE_PICTURE: '/users/profile/picture',
    },
    ANALYTICS: {
      OVERALL: '/analytics/overall',
      USERS: '/analytics/users',
      TIMELINE: '/analytics/timeline',
      REGIONS: '/analytics/regions',
      WALLETS: '/analytics/wallets',
    },
  };
  
  // Event types
  export const EVENT_TYPES = [
    { value: 'in-person', label: 'In-person' },
    { value: 'virtual', label: 'Virtual' },
    { value: 'hybrid', label: 'Hybrid' },
  ];
  
  // Available regions
  export const REGIONS = [
    { value: 'mexico', label: 'Mexico' },
    { value: 'colombia', label: 'Colombia' },
    { value: 'argentina', label: 'Argentina' },
    { value: 'brazil', label: 'Brasil' },
    { value: 'chile', label: 'Chile' },
    { value: 'peru', label: 'Perú' },
    { value: 'venezuela', label: 'Venezuela' },
    { value: 'ecuador', label: 'Ecuador' },
    { value: 'other', label: 'Other' },
  ];
  
  // User roles
  export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
  };
  
  // Limits and pagination
  export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    LIMITS: [10, 25, 50, 100],
  };
  
  // Navigation routes
  export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    EVENTS: {
      LIST: '/events',
      CREATE: '/events/create',
      DETAILS: (id: string) => `/events/${id}`,
      EDIT: (id: string) => `/events/${id}/edit`,
    },
    ANALYTICS: {
      BASE: '/analytics',
      OVERALL: '/analytics/overall',
      USERS: '/analytics/users',
      TIMELINE: '/analytics/timeline',
      REGIONS: '/analytics/regions',
      WALLETS: '/analytics/wallets',
    },
    PROFILE: '/profile',
  };