import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://localhost:3000',
    navigationTimeout: 30000,
  },

  projects: [
    // API Tests
    // Add your project configurations here, for example:
    // {
    //   name: 'API Tests',
    //   testMatch: /.*api\.spec\.ts/,
    // },
  ],

  webServer: {
    command: 'npm run start',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
