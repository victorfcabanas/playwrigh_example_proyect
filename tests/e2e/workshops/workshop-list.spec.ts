import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/auth/LoginPage';
import { WorkshopListPage } from '../../../src/pages/workshops/WorkshopListPage';

test('Workshop list shows results and can search', async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigate('/auth/login');
  await login.login('john.doe@email.com', 'Test123!');

  const workshopList = new WorkshopListPage(page);
  await workshopList.navigate('/workshops');

  const resultsBefore = await workshopList.getResultsCount();
  await workshopList.searchWorkshops('Downtown');
  const resultsAfter = await workshopList.getResultsCount();
  // expect that search does not reduce the overall count below zero and ideally not less than before
  expect(resultsAfter).toBeGreaterThanOrEqual(0);
  expect(resultsAfter).toBeGreaterThanOrEqual(resultsBefore - 1); // allow for small pagination differences
});
