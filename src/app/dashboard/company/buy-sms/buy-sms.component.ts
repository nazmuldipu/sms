import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { CompanyPage } from '../../../models/company-page.model';
import { Company } from '../../../models/company.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-buy-sms',
  templateUrl: './buy-sms.component.html',
  styleUrls: ['./buy-sms.component.css']
})
export class BuySmsComponent implements OnInit {
  company: Company;
  companyPage: CompanyPage;
  companyForm: FormGroup;
  message = '';
  errMessage = '';

  constructor(private companyService: CompanyService) {
    this.company = new Company();
    this.getCompanyPage();
  }

  ngOnInit() {
    this.companyForm = new FormGroup({
      compnayId: new FormControl(null, Validators.required),
      smsQuota: new FormControl('', Validators.required)
    });
  }

  getCompanyPage(page: number = null) {
    this.companyService.getCompanyPage(page)
      .subscribe(
        data => this.companyPage = data,
        error => this.errMessage = 'Company could not load' + error.status,
    )
  }

  getCompanyId(id: number) {
    this.companyForm.controls.compnayId.setValue(id);
    Object.assign(this.company, this.companyPage.content.find(p => p.id == id));
  }

  buySMS() {
    const companyId = this.companyForm.controls.compnayId.value;
    const smsQuota = this.companyForm.controls.smsQuota.value;
    this.companyService.buySMS(companyId, smsQuota)
    .subscribe(
      data => {
        this.companyPage.content.splice(this.companyPage.content.findIndex(p => p.id == data.id), 1, data);
        this.message = 'SMS bought successfully';
      },
      error => this.errMessage = 'SMS Buying FAILED',
    )
  }

  clear() {
    this.company = new Company();
    this.companyForm.controls.smsQuota.setValue(null);
    this.message = '';
    this.errMessage = '';
  }

}
