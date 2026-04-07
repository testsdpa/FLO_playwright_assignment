import { test, expect } from '../../fixtures/prepostFixture';
import { HomePage } from '../../pages/home.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { EnterUsagePage } from '../../pages/usage.page';
import { Logger } from '../../utils/logger.util';

test.use({
  testConfig: {
    testID: 'TC_LOGIN_001',
    requiresLogin: true,
    gotoUrl: '/home'
  }
});

test.describe('Home Page Tests', () => {
  test('TC_HOME_1_1 - Welcome header is visible', async ({ page }) => {
    const homePage = new HomePage(page);

    Logger.info('[VALIDATION] Verifying welcome header is visible', 'TC_HOME_1_1');
    await expect(homePage.welcomeHeader).toBeVisible();
  });

  test('TC_HOME_1_2 - Context header is visible', async ({ page }) => {
    const homePage = new HomePage(page);

    Logger.info('[VALIDATION] Verifying context header is visible', 'TC_HOME_1_2');
    await expect(homePage.contextHeader).toBeVisible();
  });

  test('TC_HOME_1_3 - Dashboard link is visible', async ({ page }) => {
    const homePage = new HomePage(page);

    Logger.info('[VALIDATION] Verifying dashboard link is visible', 'TC_HOME_1_3');
    await expect(homePage.dashboardLink).toBeVisible();
  });

  test('TC_HOME_1_4 - Usage form link is visible', async ({ page }) => {
    const homePage = new HomePage(page);

    Logger.info('[VALIDATION] Verifying usage form link is visible', 'TC_HOME_1_4');
    await expect(homePage.usageFormLink).toBeVisible();
  });

  test('TC_HOME_1_5 - Logout button is visible', async ({ page }) => {
    const homePage = new HomePage(page);

    Logger.info('[VALIDATION] Verifying logout button is visible', 'TC_HOME_1_5');
    await expect(homePage.logoutButton).toBeVisible();
  });
});

test.describe('Home Page Navigation', () => {
  test('TC_HOME_2_1 - should navigate to Dashboard when clicking Dashboard link', async ({ page }, testInfo) => {
    const homePage = new HomePage(page);
    const dashboardPage = new DashboardPage(page);

    Logger.info('[ACTION] Clicking Dashboard link from Home page', 'TC_HOME_2_1');
    await homePage.clickDashboard();

    Logger.info('[VALIDATION] Verifying Dashboard page loaded successfully', 'TC_HOME_2_1');
    await dashboardPage.assertLoaded();
  });

  test('TC_HOME_2_2 - should navigate to Usage Form when clicking Usage Form link', async ({ page }, testInfo) => {
    const homePage = new HomePage(page);
    const usageFormPage = new EnterUsagePage(page);

    Logger.info('[ACTION] Clicking Usage Form link from Home page', 'TC_HOME_2_2');
    await homePage.clickUsageForm();

    Logger.info('[VALIDATION] Verifying Usage Form page loaded successfully', 'TC_HOME_2_2');
    await usageFormPage.assertLoaded();
  });
});