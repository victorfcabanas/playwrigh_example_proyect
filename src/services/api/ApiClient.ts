import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;
  private baseURL?: string;
  private authToken?: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private buildUrl(path: string): string {
    if (!path) return path;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return this.baseURL ? `${this.baseURL}${path}` : path;
  }

  private withAuthHeaders(options: any = {}) {
    const headers = Object.assign({}, options.headers || {});
    if (this.authToken) headers['authorization'] = `Bearer ${this.authToken}`;
    return { ...options, headers };
  }

  async get(path: string, options: any = {}): Promise<APIResponse> {
    const url = this.buildUrl(path);
    return await this.request.get(url, this.withAuthHeaders(options));
  }

  async post(path: string, data: any, options: any = {}): Promise<APIResponse> {
    const url = this.buildUrl(path);
    return await this.request.post(url, { data, ...this.withAuthHeaders(options) });
  }

  async put(path: string, data: any, options: any = {}): Promise<APIResponse> {
    const url = this.buildUrl(path);
    return await this.request.put(url, { data, ...this.withAuthHeaders(options) });
  }

  async delete(path: string, options: any = {}): Promise<APIResponse> {
    const url = this.buildUrl(path);
    return await this.request.delete(url, this.withAuthHeaders(options));
  }
}
