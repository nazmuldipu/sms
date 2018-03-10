import { Component, OnInit } from '@angular/core';
import { SMSService } from '../../../services/sms.service';
import { SMSPage } from '../../../models/sms-page.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  arr = Array;
  smsPage: SMSPage;
  errorMessage = '';
  constructor(
    private smsService: SMSService
  ) {
    this.getSMSPage();
  }

  ngOnInit() {
  }

  getSMSPage(page: number = null) {
    this.smsService.getHistory(page)
      .subscribe(
        data => this.smsPage = data,
        error => this.errorMessage = error;
      )
  }



}
