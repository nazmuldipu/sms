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
  companyForm: FormGroup;

  constructor(private companyService: CompanyService) {
    this.company = new Company();
    this.companyService.getCompanyPage();
  }

  ngOnInit() {
    this.companyForm = new FormGroup({
      compnayId: new FormControl(null, Validators.required),
      smsQuota: new FormControl('', Validators.required)
    });
  }

  get message(): string{
    return this.companyService.getMessage();
  }
  get errMessage(): string{
    return this.companyService.getErrorMessage();
  }

  get companyPage():CompanyPage{
    return this.companyService.getCompanies();
  }

  getCompanyPage(page: number = null){
    this.companyService.getCompanyPage(page);
  }

  getCompanyId(id:number){
    this.companyForm.controls.compnayId.setValue(id);
    this.company = this.companyService.getCompany(id);
  }

  buySMS(){
    const companyId = this.companyForm.controls.compnayId.value;
    const smsQuota = this.companyForm.controls.smsQuota.value;
    this.companyService.buySMS(companyId, smsQuota);
  }

}
