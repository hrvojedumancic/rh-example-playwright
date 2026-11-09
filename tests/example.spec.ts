import { test, expect } from '@playwright/test';

// Placeholder: replace with tests against the real app once it exists.
test('playwright works', async ({ page }) => {
  await page.setContent('<h1>Hello</h1>');
  await expect(page.getByRole('heading')).toHaveText('Hello');
});
