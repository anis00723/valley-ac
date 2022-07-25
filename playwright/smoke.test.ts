import { test, expect } from '@playwright/test';

test.setTimeout(35e3);

test('go to /', async ({ page }) => {
  const env = process.env.NODE_ENV;
  if (env == 'development') {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector(`#__next > nav > div > div > div.flex.flex-1.items-center.justify-center.sm\\:items-stretch.sm\\:justify-start > div.flex.flex-shrink-0.items-center > img.hidden.h-8.w-auto.cursor-pointer.lg\\:block`);
  } else if (env == 'production') {
    await page.goto('https://valley-iw0p6zpqb-anis00723.vercel.app/');
    await page.waitForSelector(`#__next > nav > div > div > div.flex.flex-1.items-center.justify-center.sm\\:items-stretch.sm\\:justify-start > div.flex.flex-shrink-0.items-center > img.hidden.h-8.w-auto.cursor-pointer.lg\\:block`);
  }

});

test('test 404', async ({ page }) => {
  const env = process.env.NODE_ENV;
  if (env == 'development') {
    const res = await page.goto('http://localhost:3000/post/not-found');
    expect(res?.status()).toBe(404);

  } else if (env == 'production') {
    await page.goto('https://valley-iw0p6zpqb-anis00723.vercel.app/post/not-found');
    const res = await page.goto('http://localhost:3000/post/not-found');
    expect(res?.status()).toBe(404);
  }
});

export {};
