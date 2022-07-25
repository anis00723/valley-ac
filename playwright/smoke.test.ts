import { test, expect } from '@playwright/test';

test.setTimeout(35e3);

test('go to /', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.waitForSelector(`#__next > main > div.bg-white > div > div.mt-4.flow-root > div > div > div`);
});

test('test 404', async ({ page }) => {
  const res = await page.goto('http://localhost:3000/post/not-found');
  expect(res?.status()).toBe(404);
});

export {};
