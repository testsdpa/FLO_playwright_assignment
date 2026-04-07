import { test, expect } from '../../fixtures/prepostFixture';
import { EnterUsagePage } from '../../pages/usage.page';
import { Logger } from '../../utils/logger.util';
import { DashboardPage } from '../../pages/dashboard.page';
import { UsageAPI } from '../../api/usage/usage.api';

test.use({
    testConfig: {
        testID: 'TC_LOGIN_001',
        requiresLogin: true,
        gotoUrl: '/enter-usage'
    }
});

test.describe('Usage Page Tests', () => {
    test('TC_USAGE_1_1 - Usage page should load successfully', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying usage page loads successfully', 'TC_USAGE_1_1');
        await usagePage.assertLoaded();
    });

    test('TC_USAGE_1_2 - Heading should be visible', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying energy consumption heading is visible', 'TC_USAGE_1_2');
        await expect(usagePage.heading).toBeVisible();
    });

    test('TC_USAGE_1_3 - NMI Prefix dropdown should be visible', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying NMI Prefix dropdown is visible', 'TC_USAGE_1_3');
        await expect(usagePage.nmiPrefixSelect).toBeVisible();
    });

    test('TC_USAGE_1_4 - NMI Suffix input should be visible', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying NMI Suffix input is visible', 'TC_USAGE_1_4');
        await expect(usagePage.nmiSuffixInput).toBeVisible();
    });

    test('TC_USAGE_1_5 - Suffix helper text should be visible', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying suffix helper text is visible', 'TC_USAGE_1_5');
        await usagePage.assertSuffixHelperTextVisible();
    });

    test('TC_USAGE_1_6 - Next button should be visible', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying Next button is visible', 'TC_USAGE_1_6');
        await expect(usagePage.nextButton).toBeVisible();
    });
});

test.describe('Usage Page Form Behavior', () => {
    test('TC_USAGE_2_1 - Next button should be disabled on initial load', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying Next button is disabled on initial load', 'TC_USAGE_2_1');
        await usagePage.assertNextButtonDisabled();
    });

    test('TC_USAGE_2_2 - NMI Suffix input should accept numeric input', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[ACTION] Entering NMI suffix and verifying value', 'TC_USAGE_2_2');
        await usagePage.enterNmiSuffix('1234567');

        await expect(usagePage.nmiSuffixInput).toHaveValue('1234567');
    });

    test('TC_USAGE_2_3 - User should be able to select NMI Prefix', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[ACTION] Selecting NMI Prefix and verifying selected value', 'TC_USAGE_2_3');
        await usagePage.selectNmiPrefix('NSW');

        await expect(usagePage.nmiPrefixSelect).toHaveValue('NSW');
    });

    test('TC_USAGE_2_4 - Next button should become enabled after valid inputs', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[ACTION] Filling step one with valid data', 'TC_USAGE_2_4');
        await usagePage.fillStepOne('NSW', '1234567');

        Logger.info('[VALIDATION] Verifying Next button becomes enabled', 'TC_USAGE_2_4');
        await usagePage.assertNextButtonEnabled();

    });
});

test.describe('Usage Page Navigation', () => {
    test('TC_USAGE_3_1 - Home nav link should be visible', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying Home nav link is visible', 'TC_USAGE_3_1');
        await expect(usagePage.homeNavLink).toBeVisible();
    });

    test('TC_USAGE_3_2 - Dashboard nav link should be visible', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying Dashboard nav link is visible', 'TC_USAGE_3_2');
        await expect(usagePage.dashboardNavLink).toBeVisible();
    });

    test('TC_USAGE_3_3 - Usage Form nav link should be visible', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying Usage Form nav link is visible', 'TC_USAGE_3_3');
        await expect(usagePage.usageFormNavLink).toBeVisible();
    });

    test('TC_USAGE_3_4 - Logout button should be visible', async ({ page }) => {
        const usagePage = new EnterUsagePage(page);

        Logger.info('[VALIDATION] Verifying Logout button is visible', 'TC_USAGE_3_4');
        await expect(usagePage.logoutButton).toBeVisible();
    });

    test.describe('Usage page Submission', () => {
        test('TC_USAGE_4_1 - Previous button functionality upon step 2 load', async ({ page }) => {
            const usagePage = new EnterUsagePage(page);

            Logger.info('[ACTION] Filling step one with valid data', 'TC_USAGE_4_1');
            await usagePage.fillStepOne('NSW', '1234567');

            Logger.info('[VALIDATION] Verifying Next button becomes enabled', 'TC_USAGE_4_1');
            await usagePage.assertNextButtonEnabled();

            Logger.info('[ACTION] Clicking Next button to submit form', 'TC_USAGE_4_1');
            await usagePage.clickNext();

            Logger.info('[VALIDATION] Verifying Previous button is enabled', 'TC_USAGE_4_1');
            await usagePage.assertPreviousEnabled();
        });

        test('TC_USAGE_4_2 - Submit button functionality upon step 2 load', async ({ page }) => {
            const usagePage = new EnterUsagePage(page);

            Logger.info('[ACTION] Filling step one with valid data', 'TC_USAGE_4_2');
            await usagePage.fillStepOne('NSW', '1234567');

            Logger.info('[VALIDATION] Verifying Next button becomes enabled', 'TC_USAGE_4_2');
            await usagePage.assertNextButtonEnabled();

            Logger.info('[ACTION] Clicking Next button to submit form', 'TC_USAGE_4_2');
            await usagePage.clickNext();

            Logger.info('[VALIDATION] Verifying Submit button is disabled', 'TC_USAGE_4_2');
            await usagePage.assertSubmitDisabled();
        });

        test('TC_USAGE_4_3 - Submit button functionality upon input of Consumption', async ({ page }) => {
            const usagePage = new EnterUsagePage(page);

            Logger.info('[ACTION] Filling step one with valid data', 'TC_USAGE_4_3');
            await usagePage.fillStepOne('NSW', '1234567');

            Logger.info('[VALIDATION] Verifying Next button becomes enabled', 'TC_USAGE_4_3');
            await usagePage.assertNextButtonEnabled();

            Logger.info('[ACTION] Clicking Next button to submit form', 'TC_USAGE_4_3');
            await usagePage.clickNext();

            Logger.info('[ACTION] Entering consumption value', 'TC_USAGE_4_3');
            await usagePage.enterConsumption('100');

            Logger.info('[VALIDATION] Verifying Submit button is enabled', 'TC_USAGE_4_3');
            await usagePage.assertSubmitEnabled();
        });

        test('TC_USAGE_4_4 - User should be able to submit the form', async ({ page, request }) => {
            const usagePage = new EnterUsagePage(page);
            const dashboard = new DashboardPage(page);
            const usageApi = new UsageAPI(request);

            const NMIPrefix = 'NSW';
            const NMISuffix = Math.floor(10000000 + Math.random() * 90000000).toString();
            const consumptionValue = Math.floor(1 + Math.random() * 1000).toString();
            const expectedNmi = `${NMIPrefix}${NMISuffix}`;

            Logger.info('[ACTION] Filling step one with valid data', 'TC_USAGE_4_4');
            await usagePage.fillStepOne(NMIPrefix, NMISuffix);

            Logger.info('[VALIDATION] Verifying Next button becomes enabled', 'TC_USAGE_4_4');
            await usagePage.assertNextButtonEnabled();

            Logger.info('[ACTION] Clicking Next button', 'TC_USAGE_4_4');
            await usagePage.clickNext();

            Logger.info('[ACTION] Entering consumption value', 'TC_USAGE_4_4');
            await usagePage.enterConsumption(consumptionValue);

            Logger.info('[VALIDATION] Verifying Submit button is enabled', 'TC_USAGE_4_4');
            await usagePage.assertSubmitEnabled();

            Logger.info('[ACTION] Clicking Submit button', 'TC_USAGE_4_4');
            await usagePage.clickSubmit();

            Logger.info('[VALIDATION] Verifying redirect to dashboard', 'TC_USAGE_4_4');
            await dashboard.assertLoaded();

            Logger.info(`[VALIDATION] Searching for new record with NMI ${expectedNmi}`, 'TC_USAGE_4_4');
            const myRecord = await usageApi.findUsageByNmi(expectedNmi);

            expect(myRecord).toBeDefined();
            expect(String(myRecord?.consumption)).toBe(consumptionValue);
            expect(myRecord?.unit).toBe('kWh');
        });
    });
});