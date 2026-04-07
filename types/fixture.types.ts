import { TestConfig } from './testConfig.types';

export interface CustomFixtures {
  testConfig: TestConfig;
  precondition: void;
  postcondition: void;
}