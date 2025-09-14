import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';

export class UsersService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext) {
    this.apiClient = new ApiClient(request);
  }

  setAuthToken(token: string) {
    this.apiClient.setAuthToken(token);
  }

  async createUser(payload: any): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/users', payload);
  }

  async getUserById(id: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/users/${id}`);
  }

  async updateUser(id: string, payload: any): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/users/${id}`, payload);
  }

  async deleteUser(id: string): Promise<APIResponse> {
    return await this.apiClient.delete(`/api/v1/users/${id}`);
  }
}
