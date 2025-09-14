import { ApiClient } from './ApiClient';

export class VehiclesService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async registerVehicle(vehicle: any) {
    return await this.client.post('/api/v1/vehicles', vehicle);
  }

  async getVehicle(id: string) {
    return await this.client.get(`/api/v1/vehicles/${id}`);
  }
}
