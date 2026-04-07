import { test, expect } from '../../fixtures/prepostFixture';
import { DashboardPage } from '../../pages/dashboard.page';
import { UsageAPI } from '../../api/usage/usage.api';
import { FormatUtil } from '../../utils/format.util';
import { Logger } from '../../utils/logger.util';
test.use({
  testConfig: {
    testID: 'TC_LOGIN_001',
    requiresLogin: true,
    gotoUrl: '/dashboard'
  }
});

test('TC_DASH_API_001 - validate dashboard table with API', async ({ page, request }, testInfo) => {
  const dashboard = new DashboardPage(page);
  const usageApi = new UsageAPI(request);

  const data = await usageApi.getUsage();

  await expect(dashboard.tableRows).toHaveCount(data.records.length);

  for (let i = 0; i < data.records.length; i++) {
    const record = data.records[i];
    const row = dashboard.tableRows.nth(i);
    const cells = row.locator('td');
    Logger.info(`[VALIDATION] Validating row ${i + 1} with NMI: ${record.nmi}`);

    await expect(cells.nth(1)).toHaveText(
      FormatUtil.formatConsumption(record.consumption, record.unit)
    );

    await expect(cells.nth(2)).toHaveText(
      FormatUtil.formatTimestampForUi(record.timestamp)
    );
  }
});