// src/config/environments/production.ts - placeholder generated from .github/PROJECT_SPEC.md
export const productionConfig = {
  baseUrl: 'https://production.automotive-claims.com',
  apiUrl: 'https://api-production.automotive-claims.com',
  database: {
    host: 'localhost',
    port: 5432,
    name: 'claims_production',
    username: 'production_user',
    password: 'production_pass'
  },
  features: {
    newClaimWorkflow: true
  }
};
