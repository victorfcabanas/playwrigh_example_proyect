# API Testing Guide

Use Playwright request fixtures for API testing. Example:

```ts
import { test } from '@playwright/test';

test('API example', async ({ request }) => {
  const res = await request.get('/api/v1/claims');
  console.log(res.status());
});
```
