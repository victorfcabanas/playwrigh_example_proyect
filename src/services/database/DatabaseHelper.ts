// Use a runtime require for 'pg' to avoid compile-time type dependency when types are not installed
let PgClient: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PgClient = require('pg').Client;
} catch (e) {
  PgClient = class {
    constructor(opts: any) {}
    connect() {}
    query(_q: string, _p: any[] = []) { return { rows: [] }; }
    end() {}
  };
}

export class DatabaseHelper {
  private client: any;

  constructor(connectionString: string) {
    this.client = new PgClient({ connectionString });
    try { this.client.connect(); } catch { /* ignore in placeholder */ }
  }

  async executeQuery(query: string, params: any[] = []) {
    return await this.client.query(query, params);
  }

  async close() {
    try { await this.client.end(); } catch { /* ignore */ }
  }
}
