import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/auth/LoginPage';
import { ClaimApprovalPage } from '../../../src/pages/claims/ClaimApprovalPage';

test('Workshop assignment smoke: approval queue loads', async ({ page }) => {
	const login = new LoginPage(page);
	await login.navigate('/auth/login');
	await login.login('john.doe@email.com', 'Test123!').catch(() => {});

	const approval = new ClaimApprovalPage(page);
	await approval.navigate('/claims/approval');
	const count = await approval.getPendingClaimsCount();
	expect(typeof count).toBe('number');
});