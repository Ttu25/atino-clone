import { apiRequest } from './api';

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  orderCount?: number;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
  users: number;
}

export interface UsersResponse {
  success: boolean;
  data: AdminUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface StatsResponse {
  success: boolean;
  data: UserStats;
}

export interface UpdateResponse {
  success: boolean;
  message: string;
  data: AdminUser;
}

// Admin Users API
export const adminUsersAPI = {
  // Get all users with pagination and filters
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
    search?: string;
  }): Promise<UsersResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.role) queryParams.append('role', params.role);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString();
    const url = `/admin/users${query ? `?${query}` : ''}`;

    return apiRequest(url, {
      method: 'GET'
    });
  },

  // Get user statistics
  getUserStats: async (): Promise<StatsResponse> => {
    return apiRequest('/admin/users/stats', {
      method: 'GET'
    });
  },

  // Update user status (active/inactive)
  updateUserStatus: async (userId: string, isActive: boolean): Promise<UpdateResponse> => {
    return apiRequest(`/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isActive })
    });
  },

  // Update user role
  updateUserRole: async (userId: string, role: 'user' | 'admin'): Promise<UpdateResponse> => {
    return apiRequest(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role })
    });
  },

  // Get user details with full info
  getUserDetails: async (userId: string): Promise<{ success: boolean; data: AdminUser & { recentOrders: any[] } }> => {
    return apiRequest(`/admin/users/${userId}`, {
      method: 'GET'
    });
  }
};
