import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { User, UserRole } from '../../utils/types/User';

export class AuthService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request);
    // prefer the public setter so ApiClient can normalize URL building
    this.apiClient.setBaseURL(baseURL);
  }

  async login(email: string, password: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/login', { email, password });
  }

  async register(userData: Partial<User>): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/register', userData);
  }

  async logout(): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/logout', {});
  }

  async refreshToken(refreshToken: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/refresh', { refreshToken });
  }

  async forgotPassword(email: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/reset-password', { token, newPassword });
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/change-password', { oldPassword, newPassword });
  }

  async getCurrentUser(): Promise<APIResponse> {
    return await this.apiClient.get('/api/v1/auth/me');
  }
}
