import { test, expect } from '@playwright/test';

test('should authenticate with valid credentials', async ({ request }) => {
  const res = await request.post('/api/v1/auth/login', {
    data: { email: 'john.doe@email.com', password: 'Test123!' }
  });

  expect(res.status()).toBe(200);
});
