import { loginUsers } from '../test-data/testData';

export class TestDataUtil {
  static get(testID: string) {
    const data = loginUsers[testID as keyof typeof loginUsers];

    if (!data) {
      throw new Error(`No test data found for testID: ${testID}`);
    }

    return data;
  }
}