import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from '../api/ApiClient';

export class InsuranceApiClient {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request);
    if (typeof (this.apiClient as any).setBaseURL === 'function') {
      (this.apiClient as any).setBaseURL(baseURL);
    } else {
      (this.apiClient as any).baseURL = baseURL;
    }
  }

  setAuthToken(token: string): void {
    this.apiClient.setAuthToken(token);
  }

  async validatePolicy(policyNumber: string, vin: string): Promise<APIResponse> {
    try {
      const params = { policyNumber, vin };
      return await this.apiClient.get('/api/v1/validate-policy', { params } as any);
    } catch (e) {
      throw e;
    }
  }

  async checkCoverage(policyNumber: string, claimAmount: number): Promise<APIResponse> {
    try {
      return await this.apiClient.post('/api/v1/coverage-check', { policyNumber, claimAmount });
    } catch (e) {
      throw e;
    }
  }

  async submitClaim(claimData: {
    policyNumber: string;
    vin: string;
    incidentDate: string;
    description: string;
    estimatedCost: number;
    images?: string[];
    documents?: string[];
  }): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/claims', claimData);
  }

  async getClaimStatus(externalClaimId: string): Promise<APIResponse> {
    try {
      return await this.apiClient.get(`/api/v1/claims/${externalClaimId}/status`);
    } catch (e) {
      throw e;
    }
  }

  async fraudCheck(claimData: {
    customerId: string;
    claimsInLast30Days: number;
    totalClaimValue: number;
    incidentPatterns: string[];
  }): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/fraud-check', claimData);
  }

  async getPolicyDetails(policyNumber: string): Promise<APIResponse> {
    try {
      return await this.apiClient.get(`/api/v1/policies/${policyNumber}`);
    } catch (e) {
      throw e;
    }
  }

  async updateClaimStatus(externalClaimId: string, status: string): Promise<APIResponse> {
    try {
      return await this.apiClient.put(`/api/v1/claims/${externalClaimId}/status`, { status });
    } catch (e) {
      throw e;
    }
  }
}
