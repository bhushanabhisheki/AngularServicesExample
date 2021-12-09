import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService],
})
export class NewAccountComponent {
  constructor(
    private accountService: AccountService,
    private loggingService: LoggingService
  ) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.accounts.push({
      name: accountName,
      status: accountStatus,
    });
    this.loggingService.logStatusChange(accountStatus);
  }
}
