/**
 * Logger utility for consistent logging across the app
 */
export class Logger {
  private static readonly TAG = '[ResumeBuilder]';

  static log(message: string, data?: any) {
    console.log(`${this.TAG} ${message}`, data);
  }

  static warn(message: string, data?: any) {
    console.warn(`${this.TAG} ${message}`, data);
  }

  static error(message: string, error?: Error | any) {
    console.error(`${this.TAG} ${message}`, error);
  }

  static debug(message: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`${this.TAG} ${message}`, data);
    }
  }
}
