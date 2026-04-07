export interface UsageRecord {
  nmi: string;
  timestamp: string;
  unit: string;
  consumption: string;
  id?: string;
}

export interface UsageResponse {
  records: UsageRecord[];
}

export interface CreateUsageRequest {
  id: string;
  nmi: string;
  consumption: string;
  timestamp?: string;
  unit?: string;
}

export interface CreateUsageResponse {
  id: string;
  nmi: string;
  consumption: string;
  timestamp: string;
  unit: string;
}