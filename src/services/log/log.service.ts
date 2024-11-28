/**
 * Simple log service
 * describe the way we can logging message, warning, error
 * Could be replaced with a more advanced logger
 */

export class LogService {
  log(message: string, ...rest: any[]): void {
    console.log(message, ...rest);
  }

  warn(message: string, ...rest: any[]): void {
    console.warn(message);
  }

  error(message: string, ...rest: any[]): void {
    console.error(message);
  }
}

const logService = new LogService();

export default logService;
