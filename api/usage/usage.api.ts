import { APIRequestContext, expect } from '@playwright/test';
import {
  UsageResponse,
  CreateUsageRequest,
  CreateUsageResponse,
  UsageRecord
} from '../../types/usage.types';

export class UsageAPI {
  constructor(private readonly request: APIRequestContext) { }

  async getUsage(): Promise<UsageResponse> {
    const response = await this.request.get('/api/usage');

    expect(response.status()).toBe(200);

    const body = (await response.json()) as UsageResponse;

    if (!body.records || !Array.isArray(body.records)) {
      throw new Error('Invalid usage API response: records missing');
    }

    return body;
  }

  async findUsageByNmi(nmi: string): Promise<UsageRecord | undefined> {
    const data = await this.getUsage();
    return data.records.find(record => record.nmi === nmi);
  }

  async createUsage(payload: CreateUsageRequest): Promise<CreateUsageResponse> {
    const response = await this.request.post('/api/usage', {
      data: {
        ...payload,
        timestamp: payload.timestamp ?? new Date().toISOString(),
        unit: payload.unit ?? 'kWh'
      }
    });

    expect(response.status()).toBe(200);

    return (await response.json()) as CreateUsageResponse;
  }
}