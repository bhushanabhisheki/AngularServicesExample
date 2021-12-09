export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status is changed, new status: ' + status);
  }
}
