import { test, expect } from '../../fixtures/prepostFixture';
import { UsageAPI } from '../../api/usage/usage.api';
import { Logger } from '../../utils/logger.util';

function generate8Digit(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateConsumption(): string {
  return Math.floor(1 + Math.random() * 1000).toString();
}

test.use({
  testConfig: {
    testID: 'TC_LOGIN_001',
    requiresLogin: false,
    gotoUrl: '/dashboard'
  }
});

test.describe('Usage API Tests', () => {
  test('TC_USAGE_API_001 - GET usage should return valid response structure', async ({ request }) => {
    const usageApi = new UsageAPI(request);

    Logger.info('[ACTION] Calling GET /api/usage', 'TC_USAGE_API_001');
    const data = await usageApi.getUsage();

    Logger.info('[VALIDATION] Verifying records array exists', 'TC_USAGE_API_001');
    expect(data).toBeDefined();
    expect(Array.isArray(data.records)).toBe(true);

    if (data.records.length > 0) {
      const firstRecord = data.records[0];

      Logger.info('[VALIDATION] Verifying first record structure', 'TC_USAGE_API_001');
      expect(firstRecord).toHaveProperty('nmi');
      expect(firstRecord).toHaveProperty('timestamp');
      expect(firstRecord).toHaveProperty('unit');
      expect(firstRecord).toHaveProperty('consumption');

      expect(typeof firstRecord.nmi).toBe('string');
      expect(typeof firstRecord.timestamp).toBe('string');
      expect(typeof firstRecord.unit).toBe('string');
    }
  });

  test('TC_USAGE_API_002 - POST usage should create a new usage record', async ({ request }) => {
    const usageApi = new UsageAPI(request);

    const prefix = 'NSW';
    const suffix = generate8Digit();
    const expectedNmi = `${prefix}${suffix}`;
    const expectedConsumption = generateConsumption();

    Logger.info(`[ACTION] Creating usage record for NMI: ${expectedNmi}`, 'TC_USAGE_API_002');
    const createResponse = await usageApi.createUsage({
      id: Math.random().toString(36).substring(2, 9),
      nmi: expectedNmi,
      consumption: expectedConsumption
    });

 
    Logger.info('[ACTION] Fetching usage records after POST', 'TC_USAGE_API_002');
    const data = await usageApi.getUsage();

    Logger.info(`[VALIDATION] Searching for created record: ${expectedNmi}`, 'TC_USAGE_API_002');
    const createdRecord = data.records.find(record => record.nmi === expectedNmi);

    expect(createdRecord).toBeDefined();
    expect(createdRecord?.nmi).toBe(expectedNmi);
    expect(String(createdRecord?.consumption)).toBe(expectedConsumption);
    expect(createdRecord?.unit).toBe('kWh');
    expect(createdRecord?.timestamp).toBeTruthy();
  });
});