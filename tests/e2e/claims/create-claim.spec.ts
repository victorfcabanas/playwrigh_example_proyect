import { test } from '@playwright/test';
import { LoginPage } from '../../../src/pages/auth/LoginPage';
import { CreateClaimPage } from '../../../src/pages/claims/CreateClaimPage';

test('Create claim workflow', async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigate('/auth/login');
  await login.login('john.doe@email.com', 'Test123!');

  const createClaim = new CreateClaimPage(page);
  await createClaim.navigate('/claims/create');

  await createClaim.fillDescription('Test claim created by automated test');
  await createClaim.fillEstimatedCost(1200);
  await createClaim.submitClaim();
});
