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
    // ensure we join baseURL and path without duplicating slashes
    if (!this.baseURL) return path;
    const base = this.baseURL.endsWith('/') ? this.baseURL.slice(0, -1) : this.baseURL;
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${base}${p}`;
  }

  private withAuthHeaders(options: any = {}) {
    const headers = Object.assign({}, options.headers || {});
    // normalize header keys to lower-case to avoid casing issues
    const normalized: Record<string, any> = {};
    Object.keys(headers).forEach(k => { normalized[k.toLowerCase()] = headers[k]; });
    // only set authorization header when we have a token and no explicit authorization provided
    if (this.authToken && !normalized['authorization']) normalized['authorization'] = `Bearer ${this.authToken}`;
    return { ...options, headers: normalized };
  }

  async get(path: string, options: any = {}): Promise<APIResponse> {
    const url = this.buildUrl(path);
    return await this.request.get(url, this.withAuthHeaders(options));
  }

  async post(path: string, data: any, options: any = {}): Promise<APIResponse> {
    const url = this.buildUrl(path);
    const opts = this.withAuthHeaders(options);
    return await this.request.post(url, { data, ...opts });
  }

  async put(path: string, data: any, options: any = {}): Promise<APIResponse> {
    const url = this.buildUrl(path);
    const opts = this.withAuthHeaders(options);
    return await this.request.put(url, { data, ...opts });
  }

  async delete(path: string, options: any = {}): Promise<APIResponse> {
    const url = this.buildUrl(path);
    return await this.request.delete(url, this.withAuthHeaders(options));
  }
}
