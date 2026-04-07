export const Logger = {
  info(message: string, context?: string) {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`);
  },

  error(message: string, context?: string) {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`);
  },

  debug(message: string, context?: string) {
    console.log(`[DEBUG] [${new Date().toISOString()}] ${message}`);
  }
};