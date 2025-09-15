import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { Vehicle, VehicleType } from '../../utils/types/Vehicle';

export class VehiclesService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request);
    this.apiClient.setBaseURL(baseURL);
  }

  setAuthToken(token: string): void {
    this.apiClient.setAuthToken(token);
  }

  async createVehicle(vehicleData: Partial<Vehicle>): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/vehicles', vehicleData);
  }

  async getVehicle(vehicleId: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/vehicles/${vehicleId}`);
  }

  async updateVehicle(vehicleId: string, updateData: Partial<Vehicle>): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/vehicles/${vehicleId}`, updateData);
  }

  async deleteVehicle(vehicleId: string): Promise<APIResponse> {
    return await this.apiClient.delete(`/api/v1/vehicles/${vehicleId}`);
  }

  async getVehicles(filters?: {
    ownerId?: string;
    make?: string;
    type?: VehicleType;
    year?: number;
    page?: number;
    limit?: number;
  }): Promise<APIResponse> {
    const params: Record<string, string> = {};

    if (filters) {
      if (typeof filters.ownerId !== 'undefined' && filters.ownerId !== null) params.ownerId = String(filters.ownerId);
      if (typeof filters.make !== 'undefined' && filters.make !== null) params.make = String(filters.make);
      if (typeof filters.type !== 'undefined' && filters.type !== null) params.type = String(filters.type);
      if (typeof filters.year === 'number' && Number.isFinite(filters.year)) params.year = String(filters.year);
      if (typeof filters.page === 'number' && Number.isFinite(filters.page)) params.page = String(filters.page);
      if (typeof filters.limit === 'number' && Number.isFinite(filters.limit)) params.limit = String(filters.limit);
    }

    const options = Object.keys(params).length ? { params } : undefined;
    return await this.apiClient.get('/api/v1/vehicles', options as any);
  }

  async validateVin(vin: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/vehicles/validate-vin/${vin}`);
  }

  async decodeVin(vin: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/vehicles/decode-vin/${vin}`);
  }

  async checkRecalls(vin: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/vehicles/recalls/${vin}`);
  }

  async getVehicleHistory(vehicleId: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/vehicles/${vehicleId}/history`);
  }
}
