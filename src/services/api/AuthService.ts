import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { User } from '../../utils/types/User';

export class AuthService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext) {
    this.apiClient = new ApiClient(request);
  }

  setAuthToken(token: string) {
    this.apiClient.setAuthToken(token);
  }

  async login(email: string, password: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/login', { email, password });
  }

  async logout(): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/logout', {});
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/change-password', { oldPassword, newPassword });
  }

  async getCurrentUser(): Promise<APIResponse> {
    return await this.apiClient.get('/api/v1/auth/me');
  }
}
