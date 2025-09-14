import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import { CreateClaimPage } from '../pages/claims/CreateClaimPage';
import { WorkshopListPage } from '../pages/workshops/WorkshopListPage';

type PageFixtures = {
  loginPage: LoginPage;
  createClaimPage: CreateClaimPage;
  workshopListPage: WorkshopListPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  createClaimPage: async ({ page }, use) => {
    const createClaimPage = new CreateClaimPage(page);
    await use(createClaimPage);
  },

  workshopListPage: async ({ page }, use) => {
    const workshopListPage = new WorkshopListPage(page);
    await use(workshopListPage);
  },
});

export { expect } from '@playwright/test';
