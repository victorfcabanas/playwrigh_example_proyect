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
    const baseURL = process.env.API_BASE_URL || 'https://api.example.com';
    await use(claimsService);
  },

  workshopsService: async ({ request }, use) => {
    const baseURL = process.env.API_BASE_URL || 'https://api.example.com';
    await use(workshopsService);
  },

  authService: async ({ request }, use) => {
    const baseURL = process.env.API_BASE_URL || 'https://api.example.com';
    await use(authService);
  },
});

export { expect } from '@playwright/test';
