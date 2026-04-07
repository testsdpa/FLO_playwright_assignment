import { Page } from '@playwright/test';

export async function setAuthSession(page: Page, token: string) {
  await page.evaluate((value) => {
    sessionStorage.setItem('authToken', value);
  }, token);
}