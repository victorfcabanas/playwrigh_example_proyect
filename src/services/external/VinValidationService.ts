import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from '../api/ApiClient';

export class VinValidationService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request);
    // prefer ApiClient's setter if present, otherwise fall back to storing
    if (typeof (this.apiClient as any).setBaseURL === 'function') {
      (this.apiClient as any).setBaseURL(baseURL);
    } else {
      (this.apiClient as any).baseURL = baseURL;
    }
  }

  async validateVin(vin: string): Promise<APIResponse> {
    try {
      return await this.apiClient.get(`/api/v1/validate/${vin}`);
    } catch (e) {
      throw e;
    }
  }

  async decodeVin(vin: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/decode/${vin}`);
  }

  async getVehicleSpecs(vin: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/specs/${vin}`);
  }

  async checkRecalls(vin: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/recalls/${vin}`);
  }

  async getMarketValue(vin: string, mileage: number, condition: string): Promise<APIResponse> {
    const params = { mileage: String(mileage), condition };
    return await this.apiClient.get(`/api/v1/market-value/${vin}`, { params } as any);
  }

  async getMaintenanceHistory(vin: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/maintenance-history/${vin}`);
  }
}
