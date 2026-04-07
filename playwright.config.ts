import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 5,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/playwright-report', open: 'never' }]
  ],

  outputDir: 'reports/test-results',

  use: {
    baseURL: BASE_URL,
    headless: false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  }
});