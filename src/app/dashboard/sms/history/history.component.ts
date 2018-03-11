import { Component, OnInit } from '@angular/core';
import { SMSService } from '../../../services/sms.service';
import { SMSPage } from '../../../models/sms-page.model';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  arr = Array;
  companyId: number;
  smsPage: SMSPage;
  companyList: Company[] = [];
  errorMessage = '';
  
  constructor(
    private authService: AuthService,
    private smsService: SMSService,
    private companyService: CompanyService
  ) {
    this.companyId = +localStorage.getItem('companyId');
    if(this.companyId > 0)
      this.getSMSPage();
    this.getCompanyList();
  }

  ngOnInit() {
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  getCompanyList() {
    this.companyService.getCompanyList()
      .subscribe(
        data => {
          this.companyList = data;
          console.log(data);
          if (data.length == 1) {
            this.companyId = data[0].id;
            localStorage.setItem('companyId', this.companyId + '');
            this.getSMSPage();
          }
        }
      )
  }

  companyChanged(companyId: number) {
    this.companyId = companyId;
    localStorage.setItem('companyId', companyId + '');
    this.getSMSPage();
  }

  getSMSPage(page: number = null) {
    this.smsService.getHistory(this.companyId, page)
      .subscribe(
        data => this.smsPage = data,
        error => this.errorMessage = error
      )
  }
}
