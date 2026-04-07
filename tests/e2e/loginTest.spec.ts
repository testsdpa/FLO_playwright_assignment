import { test, expect } from '../../fixtures/prepostFixture';
import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';
import { TestDataUtil } from '../../utils/testData.util';
import { Logger } from '../../utils/logger.util';

test.use({
  testConfig: {
    testID: 'TC_LOGIN_001',
    requiresLogin: false,
    gotoUrl: '/login'
  }
});

test.describe('Login Page Tests', () => {
  test('TC_LOGIN_1_1 - Login page should load successfully', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    Logger.info('[VALIDATION] Verifying login page is loaded', 'TC_LOGIN_1_1');
    await loginPage.assertLoaded();
  });

  test('TC_LOGIN_1_2 - Username input should be visible', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    Logger.info('[VALIDATION] Verifying username input is visible', 'TC_LOGIN_1_2');
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('TC_LOGIN_1_3 - Password input should be visible', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    Logger.info('[VALIDATION] Verifying password input is visible', 'TC_LOGIN_1_3');
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('TC_LOGIN_1_4 - Login button should be visible', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    Logger.info('[VALIDATION] Verifying login button is visible', 'TC_LOGIN_1_4');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('TC_LOGIN_2_1 - Should login successfully with valid credentials', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    Logger.info('[ACTION] Attempting login with valid credentials', 'TC_LOGIN_2_1');
    await loginPage.login('testuser', 'testuser2025');

    Logger.info('[VALIDATION] Verifying home page loaded successfully', 'TC_LOGIN_2_1');
    await homePage.assertLoaded();
  });

  test('TC_LOGIN_2_2 - Username field should accept input', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    Logger.info('[ACTION] Entering username and verifying value', 'TC_LOGIN_2_2');
    await loginPage.enterUsername('testuser');

    await expect(loginPage.usernameInput).toHaveValue('testuser');
  });

  test('TC_LOGIN_2_3 - Password field should accept input', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const { password } = TestDataUtil.get('TC_LOGIN_001');

    Logger.info('[ACTION] Entering password and verifying value', 'TC_LOGIN_2_3');
    await loginPage.enterPassword(password);

    await expect(loginPage.passwordInput).toHaveValue(password);
  });

  test('TC_LOGIN_2_4 - Invalid login should show error message', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const { username, password } = TestDataUtil.get('TC_LOGIN_002');

    Logger.info('[ACTION] Attempting login with invalid credentials', 'TC_LOGIN_2_4');
    await loginPage.login(username, password);

    Logger.info('[VALIDATION] Verifying error message is displayed', 'TC_LOGIN_2_4');
    await loginPage.assertErrorVisible();

    Logger.info('[VALIDATION] Verifying login page is still loaded', 'TC_LOGIN_2_4');
    await loginPage.assertLoaded();
  });
});