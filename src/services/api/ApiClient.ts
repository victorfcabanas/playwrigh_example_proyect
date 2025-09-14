import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  setAuthToken(token: string) {
    // Set auth header for future requests
  }

  async get(path: string, options: any = {}): Promise<APIResponse> {
    return await this.request.get(path, options);
  }

  async post(path: string, data: any, options: any = {}): Promise<APIResponse> {
    return await this.request.post(path, { data, ...options });
  }

  async put(path: string, data: any, options: any = {}): Promise<APIResponse> {
    return await this.request.put(path, { data, ...options });
  }

  async delete(path: string, options: any = {}): Promise<APIResponse> {
    return await this.request.delete(path, options);
  }
}
