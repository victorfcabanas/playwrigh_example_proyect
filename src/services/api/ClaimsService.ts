import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { Claim, ClaimStatus } from '../../utils/types/Claim';

export class ClaimsService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext) {
    this.apiClient = new ApiClient(request);
  }

  setAuthToken(token: string) {
    this.apiClient.setAuthToken(token);
  }

  async createClaim(payload: any): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/claims', payload);
  }

  async getClaimById(id: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/claims/${id}`);
  }

  async updateClaim(id: string, payload: any): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/claims/${id}`, payload);
  }

  async deleteClaim(id: string): Promise<APIResponse> {
    return await this.apiClient.delete(`/api/v1/claims/${id}`);
  }
}
