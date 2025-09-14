import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from '../api/ApiClient';

export class VinValidationService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request);
    (this.apiClient as any).baseURL = baseURL;
  }

  async validateVin(vin: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/validate/${vin}`);
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
    return await this.apiClient.get(`/api/v1/market-value/${vin}`, {
      mileage: mileage.toString(),
      condition
    });
  }

  async getMaintenanceHistory(vin: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/maintenance-history/${vin}`);
  }
}
