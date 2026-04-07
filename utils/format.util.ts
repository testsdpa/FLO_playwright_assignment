export class FormatUtil {
  static formatConsumption(consumption: number | string, unit: string): string {
    return `${consumption} ${unit}`;
  }

  static formatTimestampForUi(timestamp: string): string {
    return new Date(timestamp).toLocaleString('en-US', {
      timeZone: 'Asia/Singapore'
    });
  }
}