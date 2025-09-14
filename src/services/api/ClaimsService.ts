import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { Claim, ClaimStatus } from '../../utils/types/Claim';

export class ClaimsService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request);
    this.apiClient.setBaseURL(baseURL);
  }

  setAuthToken(token: string) {
    this.apiClient.setAuthToken(token);
  }

  async createClaim(claim: Partial<Claim>): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/claims', claim);
  }

  async getClaim(id: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/claims/${id}`);
  }

  async updateClaim(id: string, update: Partial<Claim>): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/claims/${id}`, update);
  }

  async deleteClaim(id: string): Promise<APIResponse> {
    return await this.apiClient.delete(`/api/v1/claims/${id}`);
  }

  async listClaims(filters?: { status?: ClaimStatus; vehicleId?: string; page?: number; limit?: number }): Promise<APIResponse> {
    const params: Record<string, string> = {};
    if (filters) {
      if (filters.status) params.status = filters.status;
      if (filters.vehicleId) params.vehicleId = filters.vehicleId;
      if (filters.page) params.page = String(filters.page);
      if (filters.limit) params.limit = String(filters.limit);
    }
    return await this.apiClient.get('/api/v1/claims', { params });
  }
}
