import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { Workshop } from '../../utils/types/Workshop';

export class WorkshopsService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext) {
    this.apiClient = new ApiClient(request);
  }

  setAuthToken(token: string) {
    this.apiClient.setAuthToken(token);
  }

  async createWorkshop(payload: any): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/workshops', payload);
  }

  async getWorkshopById(id: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/workshops/${id}`);
  }

  async updateWorkshop(id: string, payload: any): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/workshops/${id}`, payload);
  }

  async deleteWorkshop(id: string): Promise<APIResponse> {
    return await this.apiClient.delete(`/api/v1/workshops/${id}`);
  }
}
