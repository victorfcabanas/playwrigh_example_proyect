import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { User, UserRole } from '../../utils/types/User';

export class UsersService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request);
    (this.apiClient as any).baseURL = baseURL;
  }

  setAuthToken(token: string): void {
    this.apiClient.setAuthToken(token);
  }

  async createUser(userData: Partial<User>): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/users', userData);
  }

  async getUser(userId: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/users/${userId}`);
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/users/${userId}`, updateData);
  }

  async deleteUser(userId: string): Promise<APIResponse> {
    return await this.apiClient.delete(`/api/v1/users/${userId}`);
  }

  async getUsers(filters?: { role?: UserRole; page?: number; limit?: number }): Promise<APIResponse> {
    const params: Record<string, string> = {};
    if (filters) {
      if (filters.role) params.role = filters.role;
      if (filters.page) params.page = filters.page.toString();
      if (filters.limit) params.limit = filters.limit.toString();
    }
    return await this.apiClient.get('/api/v1/users', params);
  }
}
