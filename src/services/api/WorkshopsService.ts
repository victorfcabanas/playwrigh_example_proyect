import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { Workshop, VehicleType } from '../../utils/types/Workshop';

export class WorkshopsService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request);
    // prefer the public setter so ApiClient can manage URL building consistently
    this.apiClient.setBaseURL(baseURL);
  }

  setAuthToken(token: string): void {
    this.apiClient.setAuthToken(token);
  }

  async createWorkshop(workshopData: Partial<Workshop>): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/workshops', workshopData);
  }

  async getWorkshop(workshopId: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/workshops/${workshopId}`);
  }

  async updateWorkshop(workshopId: string, updateData: Partial<Workshop>): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/workshops/${workshopId}`, updateData);
  }

  async deleteWorkshop(workshopId: string): Promise<APIResponse> {
    return await this.apiClient.delete(`/api/v1/workshops/${workshopId}`);
  }

  async getWorkshops(filters?: {
    city?: string;
    state?: string;
    specialization?: VehicleType;
    minRating?: number;
    availableCapacity?: boolean;
    page?: number;
    limit?: number;
  }): Promise<APIResponse> {
    const params: Record<string, string> = {};
    
    if (filters) {
      if (filters.city) params.city = filters.city;
      if (filters.state) params.state = filters.state;
      if (filters.specialization) params.specialization = filters.specialization;
      if (filters.minRating) params.minRating = filters.minRating.toString();
      if (filters.availableCapacity) params.availableCapacity = filters.availableCapacity.toString();
      if (filters.page) params.page = filters.page.toString();
      if (filters.limit) params.limit = filters.limit.toString();
    }

    // pass params as an options object so ApiClient can attach them correctly
    return await this.apiClient.get('/api/v1/workshops', { params });
  }

  async checkAvailability(workshopId: string, date: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/workshops/${workshopId}/availability?date=${date}`);
  }

  async getWorkshopClaims(workshopId: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/workshops/${workshopId}/claims`);
  }

  async updateCapacity(workshopId: string, capacity: number): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/workshops/${workshopId}/capacity`, { capacity });
  }
}
