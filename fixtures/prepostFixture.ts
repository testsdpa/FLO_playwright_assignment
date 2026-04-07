import { test as base, expect } from '@playwright/test';
import { AuthAPI } from '../api/auth/auth.api';
import { setAuthSession } from '../utils/auth.util';
import { TestConfig } from '../types/testConfig.types';
import { CustomFixtures } from '../types/fixture.types';
import { TestDataUtil } from '../utils/testData.util';
import { Logger } from '../utils/logger.util';

export const test = base.extend<CustomFixtures>({
  testConfig: async ({}, use) => {
    const defaultConfig: TestConfig = {
      requiresLogin: false,
      gotoUrl: '/',
      testID: ''
    };

    Logger.info(`[TEST CONFIG] Using default config ${JSON.stringify(defaultConfig)}`);
    await use(defaultConfig);
  },

  precondition: [
    async ({ page, request, baseURL, testConfig }, use, testInfo) => {
      const { requiresLogin = false, gotoUrl = '/', testID = '' } = testConfig;
      let testData;

      Logger.info(`[START TEST] ${testInfo.title}`, testID);

      if (testID) {
        testData = TestDataUtil.get(testID);
        //Logger.info(`[TEST DATA] ${testID}: ${JSON.stringify(testData)}`, testID);
      }

      if (requiresLogin) {
        const authApi = new AuthAPI(request);
        const token = await authApi.getToken(testID);

        Logger.info(`[AUTH] Logged in with token`, testID);

        await page.goto(`${baseURL}/login`);
        Logger.info(`[NAVIGATION] Navigated to ${baseURL}/login for authentication`, testID);

        await setAuthSession(page, token);
      }

      await page.goto(`${baseURL}${gotoUrl}`);
      Logger.info(`[NAVIGATION] Navigated to ${baseURL}${gotoUrl}`, testID);

      await use();
    },
    { auto: true }
  ],

  postcondition: [
    async ({ testConfig }, use, testInfo) => {
      await use();

      Logger.info(
        `[END TEST] ${testInfo.title} - STATUS: ${testInfo.status}`,
        testConfig?.testID ?? ''
      );
    },
    { auto: true }
  ]
});

export { expect };