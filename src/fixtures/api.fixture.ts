import { test as base } from '@playwright/test';
import { ClaimsService } from '../services/api/ClaimsService';
import { WorkshopsService } from '../services/api/WorkshopsService';
import { AuthService } from '../services/api/AuthService';

type ApiFixtures = {
  claimsService: ClaimsService;
  workshopsService: WorkshopsService;
  authService: AuthService;
};

export const apiTest = base.extend<ApiFixtures>({
  claimsService: async ({ request }, use) => {
    const claimsBaseURL = process.env.API_BASE_URL || 'https://api.example.com';
    const svc = new ClaimsService(request, claimsBaseURL);
    svc.setAuthToken(process.env.API_TEST_TOKEN || '');
    await use(svc);
  },

  workshopsService: async ({ request }, use) => {
  const workshopsBaseURL = process.env.API_BASE_URL || 'https://api.example.com';
  const svc = new WorkshopsService(request, workshopsBaseURL);
    svc.setAuthToken(process.env.API_TEST_TOKEN || '');
    await use(svc);
  },

  authService: async ({ request }, use) => {
  const authBaseURL = process.env.API_BASE_URL || 'https://api.example.com';
  const svc = new AuthService(request, authBaseURL);
    // AuthService handles auth flows via login/register; do not set token here.
    await use(svc);
  },
});

export { expect } from '@playwright/test';
