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
      // coerce values safely and only include defined ones
      if (filters.city) params.city = String(filters.city).trim();
      if (filters.state) params.state = String(filters.state).trim();
      if (typeof filters.specialization !== 'undefined' && filters.specialization !== null) params.specialization = String(filters.specialization);
      if (typeof filters.minRating === 'number' && !Number.isNaN(filters.minRating)) params.minRating = String(filters.minRating);
      if (typeof filters.availableCapacity === 'boolean') params.availableCapacity = String(filters.availableCapacity);
      if (typeof filters.page === 'number' && Number.isFinite(filters.page)) params.page = String(filters.page);
      if (typeof filters.limit === 'number' && Number.isFinite(filters.limit)) params.limit = String(filters.limit);
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
