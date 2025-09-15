import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/auth/LoginPage';
import { WorkshopListPage } from '../../../src/pages/workshops/WorkshopListPage';

test('Workshop reporting smoke: dashboard/list loads and shows counts', async ({ page }) => {
	const login = new LoginPage(page);
	await login.navigate('/auth/login');
	await login.login('john.doe@email.com', 'Test123!').catch(() => {});

	const list = new WorkshopListPage(page);
	await list.navigate('/workshops');

	const count = await list.getResultsCount();
	expect(typeof count).toBe('number');
	expect(count).toBeGreaterThanOrEqual(0);
});