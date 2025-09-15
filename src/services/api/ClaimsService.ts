import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { Claim, ClaimStatus } from '../../utils/types/Claim';

export class ClaimsService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request);
    this.apiClient.setBaseURL(baseURL);
  }

  // setAuthToken is declared with explicit return type below

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

  setAuthToken(token: string): void {
    this.apiClient.setAuthToken(token);
  }

  async listClaims(filters?: { status?: ClaimStatus; vehicleId?: string; page?: number; limit?: number }): Promise<APIResponse> {
    const params: Record<string, string> = {};
    if (filters) {
      if (typeof filters.status !== 'undefined' && filters.status !== null) params.status = String(filters.status);
      if (typeof filters.vehicleId !== 'undefined' && filters.vehicleId !== null) params.vehicleId = String(filters.vehicleId);
      if (typeof filters.page === 'number' && Number.isFinite(filters.page)) params.page = String(filters.page);
      if (typeof filters.limit === 'number' && Number.isFinite(filters.limit)) params.limit = String(filters.limit);
    }
    const options = Object.keys(params).length ? { params } : undefined;
    return await this.apiClient.get('/api/v1/claims', options as any);
  }
}
