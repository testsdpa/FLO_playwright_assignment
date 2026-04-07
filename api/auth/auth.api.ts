import { APIRequestContext, expect } from '@playwright/test';
import { TestDataUtil } from '../../utils/testData.util';

export class AuthAPI {
  constructor(private readonly request: APIRequestContext) {}

  async getToken(testID: string): Promise<string> {
    const testData = TestDataUtil.get(testID);

    const response = await this.request.post('/api/auth', {
      data: {
        username: testData.username,
        password: testData.password
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    if (!body?.token || typeof body.token !== 'string') {
      throw new Error('Token not found in /api/auth response');
    }

    return body.token;
  }
}