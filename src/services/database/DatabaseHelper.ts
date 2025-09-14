import { Client } from 'pg';

export class DatabaseHelper {
  private client: Client;

  constructor(connectionString: string) {
    this.client = new Client({ connectionString });
    this.client.connect();
  }

  async executeQuery(query: string, params: any[] = []) {
    return await this.client.query(query, params);
  }

  async close() {
    await this.client.end();
  }
}
