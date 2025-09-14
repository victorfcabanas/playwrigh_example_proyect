// src/config/environments/staging.ts - placeholder generated from .github/PROJECT_SPEC.md
export const stagingConfig = {
  baseUrl: 'https://staging.automotive-claims.com',
  apiUrl: 'https://api-staging.automotive-claims.com',
  database: {
    host: 'localhost',
    port: 5432,
    name: 'claims_staging',
    username: 'staging_user',
    password: 'staging_pass'
  },
  features: {
    newClaimWorkflow: true
  }
};
